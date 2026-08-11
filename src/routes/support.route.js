import express from "express";
import * as supportcontroller from "../controller/support.controller.js";
import { verifyRole } from "../middleware/verifyRole.middleware.js";

const router = express.Router();

router.post(
  "/checkpwd",
  verifyRole(["FREELANCER", "CLIENT"]),
  supportcontroller.checkPassword,
);

export default router;
