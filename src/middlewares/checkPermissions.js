import Client from "../api/client/models/client.js";
import Role_permission from "../api/permission/models/Role_permission.js";
import Permission from "../api/permission/models/permission.js";
import Role from "../api/role/models/role.js";
import User from "../api/user/models/user.js";
import { errorResponse } from "../services/errorHandler.js";
import { verifyJWT } from "../services/jwtHandler.js";

export async function checkRolePermissions(req, res, next) {
  let url = req.url;
  let params = req.params;
  let method = req.method;
  let token = req.headers["authorization"];
  let role;

  let user;
  let endpoint = url.split("?")[0];

  endpoint = Object.entries(params).reduce(
    (str, [key, value]) => str.replace(new RegExp(value, "g"), `:${key}`),
    endpoint
  );

  // check permission
  const permission = await Permission.findOne({
    where: { endpoint: endpoint, method },
  });
  if (!permission) {
    return res.status(401).send(
      errorResponse({
        status: 401,
        message: "No Permission Found from the requested endpoint",
      })
    );
  }
  if (token) {
    const token = verifyJWT(req);
    if (token.error) return res.status(400).send({ error: token.error });
    user = await User.findOne({
      where: { id: token.id },
      include: [{ model: Role, as: "role" }],
    });

    if (!user || !user.role) {
      return res.status(403).send(
        errorResponse({
          status: 403,
          name: "ForbiddenError",
          message: "Forbidden",
          details: "You don't have permission to access this route",
        })
      );
    }

    //fetch client
    const client = await Client.findOne({ where: { UserId: user.id } });
    client ? (res.locals.client_id = client.id) : (res.locals.client_id = null);
    res.locals.user_id = user.id;
    role = user.role.id;
  } else {
    const getrole = await Role.findOne({
      where: { name: "Public" },
    });
    role = getrole.id;
  }

  const role_permission = await Role_permission.findOne({
    where: { RoleId: role, PermissionId: permission.id },
  });

  if (!role_permission) {
    return res
      .status(401)
      .send(errorResponse({ status: 401, message: "UnAuthorized Access" }));
  }

  return next();
}
