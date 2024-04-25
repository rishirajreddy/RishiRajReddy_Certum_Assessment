import { Router } from "express";

import {
  create,
  find,
  update,
  destroy,
  findOne,
  verifyOtp,
  login,
} from "../controllers/user.js";
const router = Router();

router.post("/signup", [], create);
router.post("/verify-otp", [], verifyOtp);
router.post("/login", [], login);

export default router;
