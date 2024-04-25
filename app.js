import("dotenv");
import app from "./server.js";
import morgan from "morgan";
import cors from "cors";
import instance_starter from "./src/utils/instance_starter.js";
import "./src/utils/routes.js";

app.use(morgan("dev"));
instance_starter();

// app.use(syntaxErrorhandler);
// app.use(subdomainMiddleware);
app.use(cors({ origin: "*" }));
const PORT = process.env.PORT || 4500;
app.listen(PORT);
