import express from "express";
import * as projectcontroller from "../controller/project.controller.js";

const router = express.Router();

router.post("/createproject", projectcontroller.createProject);
router.post("/deleteproject", projectcontroller.deleteProject);
router.post("/getsoloproject", projectcontroller.getSoloProject);
router.post("/updateproject", projectcontroller.updateProject);

export default router;
