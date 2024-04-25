// import * as relation from "./db_relation.js";
import dotnev from "dotenv";
dotnev.config();

export default async () => {
  const PORT = process.env.PORT;
  console.log("Intializing Server🚀");

  //load all permissions
  // const updatePermissions = await Permission.bulkCreate(permissions, {
  //   updateOnDuplicate: ["api", "method", "endpoint", "name"],
  // });
  console.log("Setting Up Configuration📤");
  //   dbCache.set("main_instance", mainDb.sequelize);
  console.log("Server Started!💻");
  console.log(
    `╔═════════════════════════════════════════╗\n║ Server Running On http://localhost:${PORT} ║\n╚═════════════════════════════════════════╝`
  );
};
