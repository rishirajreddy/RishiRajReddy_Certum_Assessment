import { Router } from "express";
import { create, find, update, destroy, findOne } from "../controllers/role.js";
const router = Router();

export default {
    api: "Role",
    routes: [
        {
            endpoint: "/api/roles",
            method: "POST",
            name: "Create User",
            handler: create,
            middlewares: [],
        },
        {
            endpoint: "/api/roles",
            method: "GET",
            name: "List Users",
            handler: find,
            middlewares: [],
        },
        {
            endpoint: "/api/roles/:id",
            method: "GET",
            name: "List Single User",
            handler: findOne,
            middlewares: [],
        },
        {
            endpoint: "/api/roles/:id",
            method: "PUT",
            name: "Update User",
            handler: update,
            middlewares: [],
        },
        {
            endpoint: "/api/roles/:id",
            method: "DELETE",
            name: "Delete User",
            handler: destroy,
            middlewares: [],
        },
    ],
};

