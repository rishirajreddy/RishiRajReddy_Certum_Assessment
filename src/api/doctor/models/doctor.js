import { DataTypes } from "sequelize";
import sequelize from "../../../../config/database.js";

const Doctor = sequelize.define(
  "Doctor",
  {
    speciality: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.ENUM("IN_CLINIC", "ONLINE"),
    },
    availability_start: {
      type: DataTypes.TIME,
    },
    availability_end: {
      type: DataTypes.TIME,
    },
  },
  {
    indexes: [
      {
        fields: ["speciality"],
      },
    ],
  }
);

Doctor.sync();

export default Doctor;
