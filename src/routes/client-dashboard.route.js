import express from "express";
import * as clientdashboardcontroller from "../controller/client-dashboard.controller.js";
import { verifyRole } from "../middleware/verifyRole.middleware.js";

const router = express.Router();

router.post(
  "/getmyprojectscount",
  verifyRole(["CLIENT"]),
  clientdashboardcontroller.getMyProjectsCount,
);
router.post(
  "/getprojects",
  verifyRole(["CLIENT"]),
  clientdashboardcontroller.getProjects,
);
router.post(
  "/getprojectsdetails",
  verifyRole(["CLIENT"]),
  clientdashboardcontroller.getProjectDetails,
);
router.post(
  "/rejectproject",
  verifyRole(["CLIENT"]),
  clientdashboardcontroller.changeProjectConnection,
);

export default router;
