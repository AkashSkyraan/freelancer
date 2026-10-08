import express from "express";
import * as freelancerdashboardcontroller from "../controller/freelancer-dashboard.controller.js";
import { verifyRole } from "../middleware/verifyRole.middleware.js";

const router = express.Router();

router.post(
  "/getmyprojectscount",
  verifyRole(["FREELANCER"]),
  freelancerdashboardcontroller.getMyProjectsCount,
);
router.post(
  "/getprojects",
  verifyRole(["FREELANCER"]),
  freelancerdashboardcontroller.getProjects,
);
router.post(
  "/getprojectsdetails",
  verifyRole(["FREELANCER"]),
  freelancerdashboardcontroller.getProjectDetails,
);
router.post(
  "/rejectproject",
  verifyRole(["FREELANCER"]),
  freelancerdashboardcontroller.changeProjectConnection,
);
export default router;
