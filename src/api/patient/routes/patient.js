import { Router } from "express";

import { find } from "../controllers/patient.js";
const router = Router();

router.get("/patients", [], find);

export default router;
