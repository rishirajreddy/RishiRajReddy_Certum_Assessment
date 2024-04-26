import { Router } from "express";

import { find, getAbhaCard } from "../controllers/patient.js";
import { verifyJWT } from "../../../middlewares/verifyJWT.js";
const router = Router();

router.get("/patients", [], find);
router.get("/abha/patients", [verifyJWT], getAbhaCard);

export default router;
