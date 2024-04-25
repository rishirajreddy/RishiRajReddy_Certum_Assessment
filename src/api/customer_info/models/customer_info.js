import { DataTypes } from "sequelize";
import sequelize from "../../../../config/database.js";

const Customer_Info = sequelize.define(
  "Customer_Info",
  {
    unique_id: {
      type: DataTypes.STRING,
    },
    bio: {
      type: DataTypes.STRING,
    },
    latitude: {
      type: DataTypes.STRING,
    },
    longitude: {
      type: DataTypes.STRING,
    },
  },
  {
    indexes: [
      {
        fields: ["UserId"],
      },
    ],
  }
);

Customer_info.sync();

export default Customer_info;
