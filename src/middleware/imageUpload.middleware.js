import multer from "multer";
import upload from "../config/multer.js";
import { deleteUploadedFiles, sendResponse } from "../utils/helper.js";

const IMAGE_FIELD = "file";
const MAX_IMAGE_COUNT = 1;

const IMAGE_UPLOAD_FOLDER = "src/uploads/images";

const MAX_IMAGE_SIZE = 1 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const imageUpload = (req, res, next) => {
  req.uploadFolder = IMAGE_UPLOAD_FOLDER;

  upload.array(IMAGE_FIELD, MAX_IMAGE_COUNT)(req, res, async (err) => {
    try {
      // Multer error
      if (err) {
        throw err;
      }

      // No files uploaded
      if (!req.files?.length) {
        const error = new Error("Please upload at least one image.");
        error.statusCode = 400;
        throw error;
      }

      // Validate every uploaded file
      for (const file of req.files) {
        if (!ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
          const error = new Error(
            `${file.originalname} is not a supported image.`,
          );
          error.statusCode = 400;
          throw error;
        }

        if (file.size > MAX_IMAGE_SIZE) {
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

export default imageUpload;
