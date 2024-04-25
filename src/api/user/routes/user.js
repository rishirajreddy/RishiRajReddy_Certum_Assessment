import { Router } from "express";
import {
  create,
  find,
  update,
  destroy,
  findOne,
  firebasePhoneAuthVerify,
  generateNewAccessToken,
} from "../controllers/user.js";

export default {
  api: "users",
  routes: [
    {
      endpoint: "/api/users",
      method: "POST",
      name: "Create users",
      handler: create,
      middlewares: [],
    },
    {
      endpoint: "/api/users",
      method: "GET",
      name: "List users",
      handler: find,
      middlewares: [],
    },
    {
      endpoint: "/api/users/:id",
      method: "GET",
      name: "List Single user",
      handler: findOne,
      middlewares: [],
    },
    {
      endpoint: "/api/users/:id",
      method: "PUT",
      name: "Update user",
      handler: update,
      middlewares: [],
    },
    {
      endpoint: "/api/users/:id",
      method: "DELETE",
      name: "Delete user",
      handler: destroy,
      middlewares: [],
    },
    {
      endpoint: "/api/users/firebase-verify",
      method: "POST",
      name: "Firebase Verify User",
      handler: firebasePhoneAuthVerify,
      middlewares: [],
    },
    {
      endpoint: "/api/token/refresh",
      method: "POST",
      name: "Refresh Access Token",
      handler: generateNewAccessToken,
      middlewares: [],
    },
  ],
};
