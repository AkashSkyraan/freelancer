import multer from "multer";
import upload from "../config/multer.js";
import { deleteUploadedFiles, sendResponse } from "../utils/helper.js";

const DOC_FIELD = "file";
const MAX_DOC_COUNT = 1;

const DOC_UPLOAD_FOLDER = "src/uploads/docs";

const MAX_DOC_SIZE = 1 * 1024 * 1024;

const ALLOWED_DOC_TYPES = ["application/pdf", "application/msword"];

const docUpload = (req, res, next) => {
  req.uploadFolder = DOC_UPLOAD_FOLDER;

  upload.array(DOC_FIELD, MAX_DOC_COUNT)(req, res, async (err) => {
    try {
      // Multer error
      if (err) {
        throw err;
      }

      // No files uploaded
      if (!req.files?.length) {
        const error = new Error("Please upload at least one document.");
        error.statusCode = 400;
        throw error;
      }

      // Validate every uploaded file
      for (const file of req.files) {
        if (!ALLOWED_DOC_TYPES.includes(file.mimetype)) {
          const error = new Error(
            `${file.originalname} is not a supported document.`,
          );
          error.statusCode = 400;
          throw error;
        }

        if (file.size > MAX_DOC_SIZE) {
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

export default docUpload;
