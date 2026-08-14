import express from "express";
import * as projectcontroller from "../controller/project.controller.js";
import { verifyToken } from "../middleware/verifyToken.middleware.js";
import { verifyRole } from "../middleware/verifyRole.middleware.js";

const router = express.Router();

router.post(
  "/createproject",
  verifyRole(["CLIENT"]),
  projectcontroller.createProject,
);
router.post(
  "/deleteproject",
  verifyRole(["CLIENT"]),
  projectcontroller.deleteProject,
);
router.post(
  "/updateproject",
  verifyRole(["CLIENT"]),
  projectcontroller.updateProject,
);
router.post("/getsoloproject", projectcontroller.getSoloProject);

router.post(
  "/updateviewcount",
  verifyRole(["FREELANCER"]),
  projectcontroller.updateViewCount,
);

export default router;
