import express from "express";
import * as authcontroller from "../controller/auth.controller.js";
import { signupCheck } from "../middleware/signupCheck.middleware.js";
import { verifyResetToken } from "../middleware/verifyResetToken.middleware.js";
import { verifyToken } from "../middleware/verifyToken.middleware.js";

const router = express.Router();

router.post("/requestotp", authcontroller.requestOtp);
router.post("/verifyotp", authcontroller.verifyOtp);
router.post("/signup", signupCheck, authcontroller.signUp);
router.post("/login", authcontroller.login);
router.post("/forgot-pwd", verifyResetToken, authcontroller.forgotPassword);

router.post("/me", verifyToken, authcontroller.getCurrentUser);
router.post("/logout", verifyToken, authcontroller.logout);

export default router;
