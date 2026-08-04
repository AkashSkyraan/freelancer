import multer from "multer";
import upload from "../config/multer.js";
import { deleteUploadedFiles, sendResponse } from "../utils/helper.js";

const VIDEO_FIELD = "file";
const MAX_VIDEO_COUNT = 1;

const VIDEO_UPLOAD_FOLDER = "src/uploads/videos";

const MAX_VIDEO_SIZE = 85 * 1024 * 1024;

const ALLOWED_VIDEO_TYPES = [
  "video/mp4",
  "video/mkv",
  "video/mov",
  "video/webm",
];

const videoUpload = (req, res, next) => {
  req.uploadFolder = VIDEO_UPLOAD_FOLDER;

  upload.array(VIDEO_FIELD, MAX_VIDEO_COUNT)(req, res, async (err) => {
    try {
      // Multer error
      if (err) {
        throw err;
      }

      // No files uploaded
      if (!req.files?.length) {
        const error = new Error("Please upload at least one video.");
        error.statusCode = 400;
        throw error;
      }

      // Validate every uploaded file
      for (const file of req.files) {
        if (!ALLOWED_VIDEO_TYPES.includes(file.mimetype)) {
          const error = new Error(
            `${file.originalname} is not a supported video.`,
          );
          error.statusCode = 400;
          throw error;
        }

        if (file.size > MAX_VIDEO_SIZE) {
          const error = new Error(
            `${file.originalname} exceeds the maximum allowed size.`,
          );
          error.statusCode = 400;
          throw error;
        }
      }

      // Everything is valid
      next();
    } catch (error) {
      if (req.files?.length) {
        await deleteUploadedFiles(req.files);
      }
      // console.log(error.message)
      return sendResponse(res, error.statusCode, 0, error.message, [], "");
    }
  });
};

export default videoUpload;
