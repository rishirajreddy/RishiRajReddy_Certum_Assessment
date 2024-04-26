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
import {
  createRequest,
  loginValidation,
  verifyOTPValidation,
} from "../middlewares/user.js";
const router = Router();

router.post("/signup", [createRequest], create);
router.post("/verify-otp", [verifyOTPValidation], verifyOtp);
router.post("/login", [loginValidation], login);

export default router;
