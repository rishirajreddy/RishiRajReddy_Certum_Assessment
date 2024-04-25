import * as relation from "./db_relation.js";
import dotnev from "dotenv";
dotnev.config();

export default async () => {
  const PORT = process.env.PORT;
  console.log("Intializing Server🚀");

  console.log("Setting Up Configuration📤");
  console.log("Server Started!💻");
  console.log(
    `╔═════════════════════════════════════════╗\n║ Server Running On http://localhost:${PORT} ║\n╚═════════════════════════════════════════╝`
  );
};
