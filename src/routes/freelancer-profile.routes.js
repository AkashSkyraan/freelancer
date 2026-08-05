import express from "express";
import * as freelancercontroller from "../controller/freelancer-profile.controller.js";

const router = express.Router();

router.post("/createprofile", freelancercontroller.createFreelancerProfile);

export default router;
