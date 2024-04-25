// import { getPagination, getMeta } from "../../../services/pagination.js";
import Permission from "../models/permission.js";
// import { errorResponse } from "../../../services/errorResponse.js";

export const create = async (req, res) => {
  try {
    const permission = permission.create(req.body);
    return res.status(200).send(permission);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

export const find = async (req, res) => {
  try {
    const permissions = await Permission.findAll();
    const groupedData = permissions.reduce((grouped, item) => {
      const api = item.api;
      if (!grouped[api]) {
        grouped[api] = [];
      }
      grouped[api].push(item);
      return grouped;
    }, {});

    const groupedArray = Object.entries(groupedData).map(([api, items]) => ({
      api,
      items,
    }));

    groupedArray.sort((a, b) => a.api.localeCompare(b.api));
    return res.status(200).send({
      data:[...groupedArray],
    });

    // return res.status(200).send({ data: permissions.rows });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

export const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const permission = permission.findByPk(id);
    if (!permission) {
      return res
        .status(404)
        .send(errorResponse({ status: 404, message: "permission not found!" }));
    }
    return res.status(200).send({ data: permission });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const getpermission = permission.findByPk(id);

    if (!getpermission) {
      return res.status(400).send(errorResponse({ message: "Invalid ID" }));
    }
    const [rowCount, [permission]] = permission.update(req.body, {
      where: { id },
      returning: true,
    });
    return res
      .status(200)
      .send({ message: "permission updated!", data: permission });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

export const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const getpermission = permission.findByPk(id);

    if (getpermission) {
      return res.status(400).send(errorResponse({ message: "Invalid ID" }));
    }
    const permission = permission.destroy({ where: { id } });
    return res.status(200).send({ message: "permission deleted!" });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
