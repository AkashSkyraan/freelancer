import multer from "multer";
import path from "path";
import { randomUUID } from "crypto";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, req.uploadFolder);
  },

  filename(req, file, cb) {
    const extension = path.extname(file.originalname);

    const storedName = `${randomUUID()}${extension}`;

    cb(null, storedName);
  },
});

const upload = multer({
  storage,
});

export default upload;
