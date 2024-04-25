import { Router } from "express";

import { find } from "../controllers/doctor.js";
const router = Router();

router.get("/doctors", [], find);

export default router;
