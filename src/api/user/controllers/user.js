// import { getPagination, getMeta, errorResponse } from "rapidjet";
import { errorResponse } from "../../../services/errorHandler.js";
import User from "../models/user.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../services/jwtTokenGenerator.js";
import { generateOTP, setOtpExpiration } from "../../../utils/helpers.js";
import Patient from "../../patient/models/patient.js";
import Doctor from "../../doctor/models/doctor.js";

export const create = async (req, res) => {
  try {
    //find the user
    const { phone } = req.body;
    const user = await User.findOne({ where: { phone: phone } });
    const otp = generateOTP();
    const otp_expiration = setOtpExpiration();
    if (user) {
      //save otp and its expiration
      await user.update({ otp, otp_expiration });
      return res.status(200).send({ otp, user });
    }
    const { user_type } = req.body;

    const newUser = await User.create(req.body);
    if (user_type == "PATIENT") {
      //save to patients' table
      const patient = await Patient.create({ UserID: newUser.dataValues.id });
    } else {
      const { speciality, type, availability } = req.body;
      //save to doctors' table
      const doctor = await Doctor.create({
        UserID: newUser.dataValues.id,
        speciality,
        type,
        availability,
      });
    }
    await newUser.update({ otp, otp_expiration });
    return res.status(200).send({ otp, user: newUser });
  } catch (error) {
    console.log(error.message);
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

export const verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    const user = await User.findOne({ where: { phone } });
    if (!user) {
      return res.status(204).send(errorResponse({ status: 204 }));
    }
    console.log(user.otp_expiration);
    console.log(new Date());
    //check OTP
    if (user.otp == otp) {
      if (user.otp_expiration > new Date()) {
        const access_token = generateAccessToken(user);
        await user.update({ otp: null, otp_expiration: null });
        return res.status(200).send({ access_token, user });
      } else {
        return res
          .status(400)
          .send(errorResponse({ status: 400, message: "OTP Expired" }));
      }
    } else {
      return res
        .status(400)
        .send(errorResponse({ status: 400, message: "Invalid OTP" }));
    }
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .send(errorResponse({ status: 500, message: err.message }));
  }
};

export const login = async (req, res) => {
  try {
    const { phone } = req.body;

    const user = await User.findOne({ where: { phone: phone } });

    if (!user) {
      return res.status(204).send(
        errorResponse({
          status: 204,
          message: "User not found",
        })
      );
    }
    const otp = generateOTP();
    const otp_expiration = setOtpExpiration();
    await user.update({ otp, otp_expiration });

    return res.status(200).send({ otp, user });
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .send(errorResponse({ status: 500, message: err.message }));
  }
};
