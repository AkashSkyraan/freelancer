import express from "express";
import upload from "../config/multer.js";
import * as mediacontroller from "../controller/media.controller.js";
import imageUpload from "../middleware/imageUpload.middleware.js";
import videoUpload from "../middleware/videoUpload.middleware.js";
import docUpload from "../middleware/docUpload.middleware.js";
import { verifyToken } from "../middleware/verifyToken.middleware.js";

const router = express.Router();

router.post("/upload-image", imageUpload, mediacontroller.uploadMedia);
router.post("/upload-video", videoUpload, mediacontroller.uploadMedia);
router.post("/upload-doc", docUpload, mediacontroller.uploadMedia);
// router.post("/upload");

export default router;
