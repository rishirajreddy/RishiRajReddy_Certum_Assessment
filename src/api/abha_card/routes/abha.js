import { Router } from "express";

import { createAbha, find } from "../controllers/abha.js";
import { verifyJWT } from "../../../middlewares/verifyJWT.js";
import {
  abhaInputValidation,
  checkAbhaCardExist,
} from "../middlewares/abha.js";
const router = Router();

router.post(
  "/abha",
  [verifyJWT, abhaInputValidation, checkAbhaCardExist],
  createAbha
);
router.get("/abha", find);
export default router;
