import { DataTypes } from "sequelize";
import sequelize from "../../../../config/database.js";

const Appointment = sequelize.define("Appointment", {
  appointment_date: {
    type: DataTypes.DATE,
  },
  status: {
    type: DataTypes.ENUM("SCHEDULED", "COMPLETED", "CANCELLED"),
  },
});

Appointment.sync();

export default Appointment;
