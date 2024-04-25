import { create, find } from "../controllers/permission.js";

export default {
  api: "permissions",
  routes: [
    {
      endpoint: "/api/permissions",
      method: "POST",
      name: "create permissions",
      handler: create,
      middlewares: [],
    },
    {
      endpoint: "/api/permissions",
      method: "GET",
      name: "list permissions",
      handler: find,
      middlewares: [],
    },
    // {
    //     endpoint: "/api/permissions/:id",
    //     method: "GET",
    //     name: "List Single User"
    // },
    // {
    //     endpoint: "/api/permissions/:id",
    //     method: "PUT",
    //     name: "Update User"
    // },
    // {
    //     endpoint: "/api/users/:id",
    //     method: "DELETE",
    //     name: "Delete User"
    // },
  ],
};
