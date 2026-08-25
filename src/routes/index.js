import express from "express";
import authroutes from "./auth.routes.js";
import clientroutes from "./client-profile.routes.js";
import mediaroutes from "./media.routes.js";
import dropdownroutes from "./dropdowns.routes.js";
import projectroutes from "./project.routes.js";
import categoryroutes from "./category.routes.js";
import freelancerroutes from "./freelancer-profile.routes.js";
import supportroutes from "./support.route.js";
import clientdashroutes from "./client-dashboard.route.js";
import freelancerdashroutes from "./freelancer-dashboard.route.js";
import { verifyToken } from "../middleware/verifyToken.middleware.js";

const router = express.Router();

router.use("/auth", authroutes);
router.use("/client", verifyToken, clientroutes);
router.use("/media", verifyToken, mediaroutes);
router.use("/dropdowns", dropdownroutes);
router.use("/project", verifyToken, projectroutes);
router.use("/category", categoryroutes);
router.use("/freelancer", verifyToken, freelancerroutes);
router.use("/support", verifyToken, supportroutes);
router.use("/cdash", verifyToken, clientdashroutes);
router.use("/fdash", verifyToken, freelancerdashroutes);

export default router;
