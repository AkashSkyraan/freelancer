import express from "express";
import authroutes from "./auth.routes.js";
import clientroutes from "./client.routes.js";
import mediaroutes from "./media.routes.js";
import dropdownroutes from "./dropdowns.routes.js";
import projectroutes from "./project.routes.js";

const router = express.Router();

router.use("/auth", authroutes);
router.use("/client", clientroutes);
router.use("/media", mediaroutes);
router.use("/dropdowns", dropdownroutes);
router.use("/project", projectroutes);

export default router;
