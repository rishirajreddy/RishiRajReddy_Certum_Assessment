import { DataTypes } from "sequelize";
import sequelize from "../../../../config/database.js";

const Patient = sequelize.define("Patient", {});

Patient.sync();

export default Patient;
