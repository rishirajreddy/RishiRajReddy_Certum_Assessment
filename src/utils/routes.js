import express from "express";
import app from "../../server.js";
const router = express.Router();
import userRoutes from "../api/user/routes/user.js";
import patientRoutes from "../api/patient/routes/patient.js";
import doctorRoutes from "../api/doctor/routes/doctor.js";
import appointmentRoutes from "../api/appointment/routes/appointment.js";
import abhaRoutes from "../api/abha_card/routes/abha.js";

router.use("/", userRoutes);
router.use("/", patientRoutes);
router.use("/", appointmentRoutes);
router.use("/", doctorRoutes);
router.use("/", abhaRoutes);

export default router;
