import { DataTypes } from "sequelize";
import sequelize from "../../../../config/database.js";
// import Role from '../../role/models/role.js';

const Permission = sequelize.define(
  "Permission",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    api: {
      type: DataTypes.STRING,
    },
    method: {
      type: DataTypes.ENUM("GET", "POST", "PUT", "DELETE", "PATCH"),
    },
    endpoint: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["api", "method", "endpoint", "name"],
      },
    ],
  }
);

Permission.sync();
export default Permission;
