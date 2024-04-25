import { Router } from "express";
import {
  create,
  find,
  update,
  destroy,
  findOne,
} from "../controllers/media.js";
import upload from "../../../services/fileUploader.js";
// const router = Router();
export default {
  api: "Media",
  routes: [
    {
      endpoint: "/api/uploads",
      method: "POST",
      name: "Upload Media",
      handler: create,
      middlewares: [upload.array("file", 5)],
    },
    {
      endpoint: "/api/uploads",
      method: "GET",
      name: "Get Media",
      handler: find,
      middlewares: [],
    },
    {
      endpoint: "/api/uploads/:id",
      method: "GET",
      name: "List Single Media",
      handler: findOne,
      middlewares: [],
    },
    {
      endpoint: "/api/uploads/:id",
      method: "PUT",
      name: "Update Media",
      handler: update,
      middlewares: [],
    },
    {
      endpoint: "/api/uploads/:id",
      method: "DELETE",
      name: "Delete Media",
      handler: destroy,
      middlewares: [],
    },
  ],
};
