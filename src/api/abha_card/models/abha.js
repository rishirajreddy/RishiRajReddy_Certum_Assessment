import { DataTypes } from "sequelize";
import sequelize from "../../../../config/database.js";

const Abha = sequelize.define("Abha", {
  abha_address: {
    type: DataTypes.STRING,
  },
  abha_number: {
    type: DataTypes.STRING,
  },
});

Abha.sync();

export default Abha;
