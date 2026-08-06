import express from "express";
import * as freelancercontroller from "../controller/freelancer-profile.controller.js";

const router = express.Router();

// FREELANCER ONBOARDING FORM
router.post("/createprofile", freelancercontroller.createFreelancerProfile);
router.post("/createposition", freelancercontroller.createFreelancerPosition);
router.post("/createservice", freelancercontroller.createFreelancerServices);
router.post("/createskill", freelancercontroller.createFreelancerSkills);

// FREELANCER EDUCATION
router.post("/createeducation", freelancercontroller.createFreelancerEducation);
router.post("/updateeducation", freelancercontroller.updateFreelancerEducation);
router.post("/deleteeducation", freelancercontroller.deleteFreelancerEducation);

// FREELANCER WORK EXPERIENCE
router.post("/creatework", freelancercontroller.createFreelancerWorkexp);
router.post("/updatework", freelancercontroller.updateFreelancerWorkexp);
router.post("/deletework", freelancercontroller.deleteFreelancerWorkexp);

// FREELANCER PROFILE UPDATE
router.post("/updateprofile", freelancercontroller.updateFreelancerProfile);

// GET FREELANCER PROFILE
router.post("/getprofile", freelancercontroller.getFreelancerProfile);

export default router;
