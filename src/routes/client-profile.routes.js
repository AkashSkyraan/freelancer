import express from "express";
import * as clientcontroller from "../controller/client-profile.controller.js";
import { verifyToken } from "../middleware/verifyToken.middleware.js";
import { verifyRole } from "../middleware/verifyRole.middleware.js";

const router = express.Router();

router.post(
  "/createprofile",
  verifyRole(["CLIENT"]),
  clientcontroller.createClientProfile,
);
router.post(
  "/deleteprofile",
  verifyRole(["CLIENT"]),
  clientcontroller.deleteClientProfile,
);
router.post(
  "/updateprofile",
  verifyRole(["CLIENT"]),
  clientcontroller.updateClientProfile,
);
router.post("/getprofile", clientcontroller.getClientProfile);

router.post(
  "/updatepwd",
  verifyRole(["CLIENT"]),
  clientcontroller.updateClientPassword,
);
router.post(
  "/updatecredential",
  verifyRole(["CLIENT"]),
  clientcontroller.updateClientCredential,
);
router.post(
  "/preference",
  verifyRole(["CLIENT"]),
  clientcontroller.updateClientPreferences,
);

// SAVED FREELANCER
router.post(
  "/addsavefreelancer",
  verifyRole(["CLIENT"]),
  clientcontroller.addSaveFreelancer,
);
router.post(
  "/unsavefreelancer",
  verifyRole(["CLIENT"]),
  clientcontroller.unsaveFreelancer,
);
router.post(
  "/getsavedfreelancer",
  verifyRole(["CLIENT"]),
  clientcontroller.getSavedFreelancer,
);

// RECENTLY VISITED FREELANCERS
router.post(
  "/addrecentlyvisitfreelancer",
  verifyRole(["CLIENT"]),
  clientcontroller.addRecentlyVisitedFreelancers,
);
router.post(
  "/getrecentlyvisitfreelancer",
  verifyRole(["CLIENT"]),
  clientcontroller.getRecentlyVisitedFreelancers,
);

// SEARCH FREELANCER
router.post(
  "/searchfreelancer",
  verifyRole(["CLIENT"]),
  clientcontroller.searchFreelancer,
);

// RATE FREELANCER
router.post(
  "/addratefreelancer",
  verifyRole(["CLIENT"]),
  clientcontroller.addRateFreelancer,
);

// GET MY PROJECTS
router.post(
  "/getmyprojects",
  verifyRole(["CLIENT"]),
  clientcontroller.getMyProjects,
);

// INVITE TO PROJECT
router.post(
  "/invitetoproject",
  verifyRole(["CLIENT"]),
  clientcontroller.inviteToProjects,
);

// VIEW FREELANCER PROFILE
router.post(
  "/viewfreelancerprofile",
  verifyRole(["CLIENT"]),
  clientcontroller.getViewFreelancerProfile,
);
export default router;
