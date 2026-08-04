import express from "express";
import * as dropdowncontroller from "../controller/dropdowns.controller.js";

const router = express.Router();

router.post("/getlookup", dropdowncontroller.getDropdown);
router.post("/addlookup", dropdowncontroller.addDropdown);
router.post("/deletelookup", dropdowncontroller.deleteDropdown);
router.post("/updatelookup", dropdowncontroller.updateDropdown);

export default router;
