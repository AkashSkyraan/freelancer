import express from "express";
import * as usercontroller from "../controller/client.controller.js";

const router = express.Router();

router.post("/createprofile", usercontroller.createClientProfile);
router.post("/deleteprofile", usercontroller.deleteClientProfile);
router.post("/updateprofile", usercontroller.updateClientProfile);
router.post("/getprofile", usercontroller.getClientProfile);

export default router;
