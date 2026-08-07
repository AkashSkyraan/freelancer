import express from "express";
import * as freelancercontroller from "../controller/freelancer-profile.controller.js";
import { verifyToken } from "../middleware/verifyToken.middleware.js";
import { verifyRole } from "../middleware/verifyRole.middleware.js";

const router = express.Router();

// FREELANCER ONBOARDING FORM
router.post(
  "/createprofile",
  verifyRole(["FREELANCER"]),
  freelancercontroller.createFreelancerProfile,
);
router.post(
  "/createposition",
  verifyRole(["FREELANCER"]),
  freelancercontroller.createFreelancerPosition,
);
router.post(
  "/createservice",
  verifyRole(["FREELANCER"]),
  freelancercontroller.createFreelancerServices,
);
router.post(
  "/createskill",
  verifyRole(["FREELANCER"]),
  freelancercontroller.createFreelancerSkills,
);

// FREELANCER EDUCATION
router.post(
  "/createeducation",
  verifyRole(["FREELANCER"]),
  freelancercontroller.createFreelancerEducation,
);
router.post(
  "/updateeducation",
  verifyRole(["FREELANCER"]),
  freelancercontroller.updateFreelancerEducation,
);
router.post(
  "/deleteeducation",
  verifyRole(["FREELANCER"]),
  freelancercontroller.deleteFreelancerEducation,
);

// FREELANCER WORK EXPERIENCE
router.post(
  "/creatework",
  verifyRole(["FREELANCER"]),
  freelancercontroller.createFreelancerWorkexp,
);
router.post(
  "/updatework",
  verifyRole(["FREELANCER"]),
  freelancercontroller.updateFreelancerWorkexp,
);
router.post(
  "/deletework",
  verifyRole(["FREELANCER"]),
  freelancercontroller.deleteFreelancerWorkexp,
);

// FREELANCER PROFILE UPDATE
router.post("/updateprofile", freelancercontroller.updateFreelancerProfile);

// GET FREELANCER PROFILE
router.post("/getprofile", freelancercontroller.getFreelancerProfile);

export default router;
