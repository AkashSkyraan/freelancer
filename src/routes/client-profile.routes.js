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

export default router;
