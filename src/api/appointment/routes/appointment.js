import { Router } from "express";

import {
  bookAppointment,
  getAllAppointments,
  getAppointmentDoctors,
} from "../controllers/appointment.js";
import { verifyJWT } from "../../../middlewares/verifyJWT.js";
import { appoinmentValidation } from "../middlewares/appointment.js";
const router = Router();

router.post(
  "/appointments",
  [verifyJWT, appoinmentValidation],
  bookAppointment
);
router.get("/appointments", [verifyJWT], getAllAppointments);
router.get("/doctors/appointments", [verifyJWT], getAppointmentDoctors);

export default router;
