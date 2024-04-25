import { DataTypes } from "sequelize";
import sequelize from "../../../../config/database.js";

const Role = sequelize.define("Role", {
  name: {
    type: DataTypes.STRING,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
  },
});

Role.sync();

export default Role;
