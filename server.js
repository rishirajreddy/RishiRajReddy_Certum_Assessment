import express from "express";
import { json, urlencoded } from "express";
import morgan from "morgan";
import path from "path";
import router from "./src/utils/routes.js";

const app = express();

app.use(express.json());

app.use(morgan("dev"));

app.use("/api", router);
app.use("/public", express.static(path.join(process.cwd(), "public")));

export default app;
