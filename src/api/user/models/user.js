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
    user_type: {
      type: DataTypes.ENUM("PATIENT", "DOCTOR"),
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    pincode: {
      type: DataTypes.STRING,
    },
    dob: {
      type: DataTypes.DATEONLY,
    },
    gender: {
      type: DataTypes.ENUM("MALE", "FEMALE", "OTHERS"),
    },
    otp: {
      type: DataTypes.STRING,
    },
    otp_expiration: {
      type: DataTypes.DATE,
    },
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
