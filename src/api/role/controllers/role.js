// Controller function to create a new role

import { errorResponse } from "../../../services/errorHandler.js";
import {
  generatePaginationMeta,
  getPagination,
} from "../../../utils/helpers.js";
import Role_permission from "../../permission/models/Role_permission.js";
import Permission from "../../permission/models/permission.js";
import Role from "../models/role.js";
import { roles } from "../role_constants.js";
import { Op } from "sequelize";

export const create = async (req, res) => {
  try {
    const { name, description, permissions } = req.body;
    const capName = () => name.replace(/^./, (match) => match.toUpperCase());
    let role_captitalize = capName();
    const role = await Role.findOrCreate({
      where: { name: role_captitalize },
      defaults: { description },
    });

    if (permissions && permissions.length > 0) {
      for (const item of permissions) {
        const [found, created] = await Role_permission.findOrCreate({
          where: { PermissionId: item, RoleId: role[0].id },
          defaults: { RoleId: role[0].id, PermissionId: item },
        });
      }
    }
    return res.status(200).send({ data: role[0] });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
// Controller function to get all roles
export const find = async (req, res) => {
  try {
    const roles = await Role.findAll({
      order: [["name", "asc"]],
    });

    return res.status(200).send({ data: roles });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(
      errorResponse({
        status: 500,
        message: "Internal server Error",
        details: error.message,
      })
    );
  }
};

export const findOne = async (req, res) => {
  try {
    const { id } = req.params;

    const role = await Role.findByPk(id, {
      include: ["permissions"],
    });

    if (role) {
      const { id, name, description, createdAt, updatedAt, permissions } = role;
      const allPermissions = permissions;
      allPermissions;
      const groupedData = allPermissions.reduce((grouped, item) => {
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
        data: {
          id,
          name,
          description,
          createdAt,
          updatedAt,
          permissions: groupedArray,
        },
      });
    } else {
      return res.status(404).send(
        errorResponse({
          status: 404,
          message: "Role not found!",
          details: "role id seems to be invalid",
        })
      );
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(
      errorResponse({
        status: 500,
        message: "Internal server Error",
      })
    );
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, permissions, delete_permissions } = req.body;
    let capName;
    if (name) {
      capName = name.replace(/^./, (match) => match.toUpperCase());
    }
    const findRole = await Role.findByPk(id);

    if (!findRole) {
      return res
        .status(400)
        .send(errorResponse({ message: "Invalid Role ID" }));
    }
    let roleData = Object.values(roles).find((r) => r.name === findRole.name);
    if (roleData) {
      return res
        .status(400)
        .send(errorResponse({ message: "You can not update this role" }));
    }
    await findRole.update({ name: capName, description }, { where: { id } });

    if (permissions.length > 0) {
      for (const item of permissions) {
        //find permission
        const permission = await Permission.findByPk(item);
        if (!permission) {
          return res
            .status(400)
            .send(
              errorResponse({
                message: `No Permission Found with the given ID:${item}`,
              })
            );
        }
        const [found, created] = await Role_permission.findOrCreate({
          where: { PermissionId: item, RoleId: id },
          defaults: { RoleId: id, PermissionId: item },
        });
      }
    }
    if (delete_permissions && delete_permissions.length > 0) {
      await Role_permission.destroy({
        where: {
          [Op.and]: [
            { PermissionId: { [Op.in]: [...delete_permissions] } },
            { RoleId: id },
          ],
        },
      });
    }

    return res.status(200).send({ message: "Role Updated successfully!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send(errorResponse({ status: 500, message: "Internal server Error" }));
  }
};

export const destroy = async (req, res) => {
  const t = await req.db.transaction();
  try {
    const { id } = req.params;
    const findRole = await Role.findByPk(id);
    if (!findRole) {
      return res
        .status(400)
        .send(errorResponse({ status: 400, message: "Invalid  ID" }));
    }
    let roleData = roles.find((r) => r.name === findRole.name);
    if (roleData) {
      return res
        .status(400)
        .send(errorResponse({ message: "You can not delete this role" }));
    }
    await findRole.destroy({
      where: { id },
      transaction: t,
    });
    await Role_permission.destroy({
      where: { RoleId: id },
      transaction: t,
    });
    await t.commit();
    return res.status(200).send({ message: `Role ${id} Deleted!!` });
  } catch (error) {
    await t.rollback();
    console.log(error);
    return res
      .status(500)
      .send(errorResponse({ status: 500, message: "Internal server Error" }));
  }
};
