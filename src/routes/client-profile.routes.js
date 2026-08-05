import express from "express";
import * as clientcontroller from "../controller/client-profile.controller.js";

const router = express.Router();

router.post("/createprofile", clientcontroller.createClientProfile);
router.post("/deleteprofile", clientcontroller.deleteClientProfile);
router.post("/updateprofile", clientcontroller.updateClientProfile);
router.post("/getprofile", clientcontroller.getClientProfile);

export default router;
