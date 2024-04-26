import sequelize from "../../config/database.js";
import Abha from "../api/abha_card/models/abha.js";
import Appointment from "../api/appointment/models/appointment.js";
import Doctor from "../api/doctor/models/doctor.js";
import Patient from "../api/patient/models/patient.js";
import User from "../api/user/models/user.js";

Doctor.belongsTo(User, { as: "user", foreignKey: "UserID" });
Patient.belongsTo(User, { as: "user", foreignKey: "UserID" });
Appointment.belongsTo(Patient, { as: "patient", foreignKey: "PatientId" });
Appointment.belongsTo(Doctor, { as: "doctor", foreignKey: "DoctorId" });
Abha.belongsTo(Patient, { as: "patient", foreignKey: "PatientId" });
// await sequelize.sync({ alter: true });
