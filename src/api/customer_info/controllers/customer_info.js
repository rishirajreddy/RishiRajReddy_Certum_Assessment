// import { getPagination, getMeta, errorResponse } from "rapidjet";
import Customer_info from "../models/customer_info.js";
import { request, response } from "express";
import User from "../../user/models/user.js";
import Role from "../../role/models/role.js";
import sequelize from "../../../../config/database.js";
import generateCustomerID from "../utils/generateCustomerUnique.js";
import Media from "../../media/models/media.js";
import {
  generatePaginationMeta,
  getPagination,
} from "../../../utils/helpers.js";
import { errorResponse } from "../../../services/errorHandler.js";
import uploadImage from "../../../services/upload.js";

export const create = async (req, res) => {
  try {
    const customer_info = await Customer_info.create(req.body);
    return res.status(200).send(customer_info);
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
    let pagination = req.query.pagination;
    let meta;
    var data;

    const { limit, offset } = getPagination(pagination);
    const customer_infos = await Customer_info.findAndCountAll({
      offset: offset,
      limit: limit,
    });

    data = customer_infos;
    meta = generatePaginationMeta({
      pagination,
      data_length: data.count,
    });
    return res.status(200).send({ data: data.rows, meta });
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
    const customer_info = await Customer_info.findByPk(id, {
      include: [
        { model: Media, as: "avatar" },
        { model: User, as: "user" },
      ],
    });
    if (!customer_info) {
      return res
        .status(404)
        .send(
          errorResponse({ status: 404, message: "customer_info not found!" })
        );
    }
    return res.status(200).send({ data: customer_info });
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
    const getCustomer_info = await Customer_info.findByPk(id);

    if (!getCustomer_info) {
      return res.status(400).send(errorResponse({ message: "Invalid ID" }));
    }

    const media = await uploadImage(req, ["avatar"]);
    if (avatar) {
      req.body["AvatarId"] = media.avatar.id;
    }
    const [rowCount, [customer_info]] = await Customer_info.update(req.body, {
      where: { id },
      returning: true,
    });
    return res
      .status(200)
      .send({ message: "customer_info updated!", data: customer_info });
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

export const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const getCustomer_info = await Customer_info.findByPk(id);

    if (getCustomer_info) {
      return res.status(400).send(errorResponse({ message: "Invalid ID" }));
    }

    const customer_info = Customer_info.destroy({ where: { id } });
    return res.status(200).send({ message: "customer_info deleted!" });
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

export const registerCustomer = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    //register customer
    const images = await uploadImage(req, ["avatar"]);

    const { name, email, phone, country_code, bio, latitude, longitude } =
      req.body;

    const customer_role = await Role.findOne({
      where: { name: "Customer" },
      attributes: ["id"],
    });

    const customer_uniqueID = generateCustomerID(name);
    //create user
    //create customer_info
    //link with user
    const user = await User.create(
      {
        name,
        email,
        phone,
        country_code,
        RoleId: customer_role.id,
      },
      {
        raw: true,
        transaction: t,
      }
    );

    const addCustomerInfo = await Customer_info.create(
      {
        bio,
        latitude,
        longitude,
        unique_id: customer_uniqueID,
        UserId: user.id,
        AvatarId: images.avatar.id,
      },
      {
        raw: true,
        transaction: t,
      }
    );

    // console.log(addCustomerInfo);
    await t.commit();
    return res.status(200).send(user);
  } catch (err) {
    // console.log(err);
    await t.rollback();
    return res
      .status(400)
      .send({ error: err.name, message: err.errors[0].message });
  }
};
