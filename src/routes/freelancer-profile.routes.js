import express from "express";
import * as freelancercontroller from "../controller/freelancer-profile.controller.js";
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

// GET FREELANCER PROFILE
router.post("/getprofile", freelancercontroller.getFreelancerProfile);

// FREELANCER PROFILE UPDATE
router.post(
  "/updateprofile",
  verifyRole(["FREELANCER"]),
  freelancercontroller.updateFreelancerProfile,
);
router.post(
  "/updateposition",
  verifyRole(["FREELANCER"]),
  freelancercontroller.updateFreelancerPosition,
);
router.post(
  "/updateskill",
  verifyRole(["FREELANCER"]),
  freelancercontroller.updateFreelacnerSkills,
);
router.post(
  "/updatelang",
  verifyRole(["FREELANCER"]),
  freelancercontroller.updateFreelancerLanguages,
);
router.post(
  "/addlang",
  verifyRole(["FREELANCER"]),
  freelancercontroller.addFreelancerLanguages,
);

// SETTINGS PAGE API
router.post(
  "/updateaddress",
  verifyRole(["FREELANCER"]),
  freelancercontroller.updateFreelancerAddress,
);
router.post(
  "/preference",
  verifyRole(["FREELANCER"]),
  freelancercontroller.updateFreelancerPreferences,
);
router.post(
  "/updatepwd",
  verifyRole(["FREELANCER"]),
  freelancercontroller.updateFreelancerPassword,
);
router.post(
  "/updatecredential",
  verifyRole(["FREELANCER"]),
  freelancercontroller.updateFreelancerCredential,
);

// SEARCH PROJECT
router.post(
  "/searchproject",
  verifyRole(["FREELANCER"]),
  freelancercontroller.searchProject,
);

// SAVED PROJECTS
router.post(
  "/getsavedproject",
  verifyRole(["FREELANCER"]),
  freelancercontroller.getSavedProject,
);
router.post(
  "/addsaveproject",
  verifyRole(["FREELANCER"]),
  freelancercontroller.addSaveProject,
);
router.post(
  "/unsaveproject",
  verifyRole(["FREELANCER"]),
  freelancercontroller.unsaveProject,
);

// RECENTLY VISITED PROJECTS
router.post(
  "/addrecentlyvisitprojects",
  verifyRole(["FREELANCER"]),
  freelancercontroller.addRecentlyVisitedProject,
);
router.post(
  "/getrecentlyvisitprojects",
  verifyRole(["FREELANCER"]),
  freelancercontroller.getRecentlyVisitedProject,
);
export default router;
