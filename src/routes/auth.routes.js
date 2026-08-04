import express from "express";
import * as authcontroller from "../controller/auth.controller.js";
import { signupCheck } from "../middleware/signupCheck.middleware.js";

const router = express.Router();

router.post("/requestotp", authcontroller.requestOtp);
router.post("/verifyotp", authcontroller.verifyOtp);
router.post("/signup", signupCheck, authcontroller.signUp);
router.post("/login", authcontroller.login);

export default router;