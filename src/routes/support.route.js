import express from "express";
import * as supportcontroller from "../controller/support.controller.js";
import { verifyRole } from "../middleware/verifyRole.middleware.js";

const router = express.Router();

router.post(
  "/checkpwd",
  verifyRole(["FREELANCER", "CLIENT"]),
  supportcontroller.checkPassword,
);
router.post(
  "/recentsearch",
  verifyRole(["FREELANCER", "CLIENT"]),
  supportcontroller.getRecentSearch,
);
router.post(
  "/deleterecentsearch",
  verifyRole(["FREELANCER", "CLIENT"]),
  supportcontroller.deleteRecentSearch,
);
router.post(
  "/gettrendsearch",
  verifyRole(["FREELANCER", "CLIENT"]),
  supportcontroller.getTrendingsearch,
);
export default router;
