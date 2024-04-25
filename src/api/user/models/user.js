import { DataTypes } from "sequelize";
import sequelize from "../../../../config/database.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
    },
    country_code: {
      type: DataTypes.STRING,
    },
    verified: { type: DataTypes.BOOLEAN, defaultValue: false },
    refresh_token: {
      type: DataTypes.STRING,
    },
    refresh_token_expiration: { type: DataTypes.DATE },
  },
  {
    indexes: [
      {
        fields: ["phone"],
      },
    ],
  }
);

User.sync();

export default User;
