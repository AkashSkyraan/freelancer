import express from "express";
import * as authcontroller from "../controller/auth.controller.js";

const router = express.Router();

router.post("/requestotp", authcontroller.requestotp);
router.post("/verifyotp", authcontroller.verifyotp);

export default router;
