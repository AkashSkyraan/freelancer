import express from "express";
import * as usercontroller from "../controller/user.controller.js";

const router = express.Router();

router.post("/createcprofile", usercontroller.createClientProfile);
router.post("/createfprofile", usercontroller.createFreelancerProfile);

export default router;
