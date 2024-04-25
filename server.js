import express from "express";
import { json, urlencoded } from "express";
import morgan from "morgan";
import path from "path";

const app = express();
app.use(morgan("dev"));

app.use(
  json({
    limit: "1mb",
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);

app.get("/", (req, res) => {
  return res.status(200)
    .send(` <div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
      <div style="text-align: center;">
        <h1>Welcome to Dynish's✨ Backend🌐</h1>
      </div>
    </div>`);
});
app.use("/public", express.static(path.join(process.cwd(), "public")));

export default app;
