import express from "express";
import authroutes from "./auth.routes.js";
import userroutes from "./user.routes.js";

const router = express.Router();

router.use("/auth", authroutes);
router.use("/user", userroutes);

export default router;
