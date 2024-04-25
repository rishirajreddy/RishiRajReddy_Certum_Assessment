import express from "express";
import generator from "../api/permission/services/generator.js";

import app from "../../server.js";
import { checkRolePermissions } from "../middlewares/checkPermissions.js";
const router = express.Router();
const { routes } = await generator();

routes.forEach((item) => {
  router[item.method.toLowerCase()](
    item.endpoint,
    [checkRolePermissions, ...item.middlewares],
    item.handler
  );
});
app.use(router);
// app.use(notFoundHandler);
