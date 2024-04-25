// import { getPagination, getMeta, errorResponse } from "rapidjet";
import { errorResponse } from "../../../services/errorHandler.js";
import User from "../models/user.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../services/jwtTokenGenerator.js";
import bcrypt from "bcryptjs";
import { request, response } from "express";
import admin from "../../../utils/firebase.js";
import { verifyJWT, verifyJWTRefresh } from "../../../services/jwtHandler.js";

export const create = async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send(
      errorResponse({
        status: 500,
        message: "Internal Server Error",
        details: error.message,
      })
    );
  }
};

export const find = async (req, res) => {
  try {
    const query = req.query;
    const pagination = await getPagination(query.pagination);
    const users = await User.findAndCountAll({
      offset: pagination.offset,
      limit: pagination.limit,
    });
    const meta = await getMeta(pagination, users.count);
    return res.status(200).send({ data: users.rows, meta });
  } catch (error) {
    console.log(error);
    return res.status(500).send(
      errorResponse({
        status: 500,
        message: "Internal Server Error",
        details: error.message,
      })
    );
  }
};

export const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    let query;
    if (id.length >= 10) {
      query = { where: { phone: id } };
    } else {
      query = { where: { id: id } };
    }
    const user = await User.findOne(query);
    if (!user) {
      return res
        .status(404)
        .send(errorResponse({ status: 204, message: "User not found!" }));
    }
    return res.status(200).send({ data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).send(
      errorResponse({
        status: 500,
        message: "Internal Server Error",
        details: error.message,
      })
    );
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const getUser = await User.findByPk(id);

    if (!getUser) {
      return res.status(400).send(errorResponse({ message: "Invalid ID" }));
    }

    const [rowCount, [user]] = await User.update(req.body, {
      where: { id },
      returning: true,
    });
    return res.status(200).send({ message: "user updated!", data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).send(
      errorResponse({
        status: 500,
        message: "Internal Server Error",
        details: error.message,
      })
    );
  }
};

export const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const getUser = await User.findByPk(id);

    if (getUser) {
      return res.status(400).send(errorResponse({ message: "Invalid ID" }));
    }

    const user = User.destroy({ where: { id } });
    return res.status(200).send({ message: "user deleted!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send(
      errorResponse({
        status: 500,
        message: "Internal Server Error",
        details: error.message,
      })
    );
  }
};

export const firebasePhoneAuthVerify = async (req, res) => {
  try {
    // const idToken = await admin.auth().verifyIdToken(req.body.token);
    const phoneNumber = req.body.phone;
    let phone = phoneNumber.slice(-10);
    if (phone == req.body.phone.slice(-10)) {
      const user = await User.findOne({ where: { phone: phone } });
      console.log("User Verified");
      //update user
      if (user) {
        console.log(
          "Phone number verified successfully And the user is confirmed"
        );
        const access_token = generateAccessToken(user);
        const { refresh_token, hashedRefreshToken, token_expiration } =
          await generateRefreshToken(user);
        //store the refresh_token
        const updateUser = await user.update({
          verified: true,
          refresh_token: hashedRefreshToken,
          refresh_token_expiration: token_expiration,
        });
        return res
          .send({
            access_token,
            refresh_token,
            user,
          })
          .status(200);
      } else {
        return res
          .send({
            message: "Something Went Wrong",
          })
          .status(500);
      }
    } else {
      return res.send({ message: "Phone Number Not Verified" }).status(400);
    }
  } catch (err) {
    console.log(err);
    return res.send(err).status(500);
  }
};

export const generateNewAccessToken = async (req, res) => {
  try {
    //get refresh_token
    const { refresh_token } = req.body;

    //decode jwt token
    const { data, error } = verifyJWTRefresh(refresh_token);

    if (error) {
      return res
        .status(401)
        .send(errorResponse({ status: 401, message: error }));
    }
    const user = await User.findByPk(data.id);

    if (!user) {
      return res.status(400).send(
        errorResponse({
          status: 400,
          message: "User is missing from the database 😱",
        })
      );
    }

    if (user.refresh_token_expiration < new Date()) {
      return res
        .status(400)
        .send(
          errorResponse({ status: 400, message: "Token has been Expired" })
        );
    }
    const hashedRefreshToken = user.refresh_token;
    const isTokenMatched = await bcrypt.compare(
      refresh_token,
      hashedRefreshToken
    );

    if (!isTokenMatched) {
      return res
        .status(400)
        .send(errorResponse({ status: 400, message: "Token is not matched" }));
    }

    //generate new access token
    const access_token = generateAccessToken(user);

    return res.status(200).send({ access_token, user });
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .send(errorResponse({ status: 500, message: err.message }));
  }
};
