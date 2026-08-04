import express from "express";
import {
  deleteUploadedFiles,
  getServerError,
  sendResponse,
} from "../utils/helper.js";
import { pool } from "../config/db.js";
import { mediaModel } from "../model/media.model.js";

const mediaMdl = new mediaModel();

export const uploadMedia = async (req, res) => {
  let connection;
  try {
    const media_id = [];
    connection = await pool.getConnection();

    await connection.beginTransaction();

    for (const file of req.files) {
      const org_name = file.originalname;
      const stored_name = file.filename;
      const media_type = file.mimetype;
      const media_size = file.size;
      const path_name = file.path.replace(/\\/g, "/");
      const url = file.path.replace(/\\/g, "/").replace("src/", "");
      const media_extension = file.mimetype.split("/")[1];

      const result = await mediaMdl.uploadMedia(
        {
          org_name,
          stored_name,
          media_type,
          media_size,
          path_name,
          url,
          media_extension,
        },
        connection,
      );

      media_id.push(result?.data.insertId);

      if (result?.success === 0) {
        if (connection) {
          await connection.rollback();
        }
        media_id.length = 0;
        await deleteUploadedFiles(req.files);
        return sendResponse(res, 200, 0, "upload failed", [], "");
      }
    }
    if (connection) {
      await connection.commit();
    }
    return sendResponse(res, 200, 1, "upload successfull", media_id, "");
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    await deleteUploadedFiles(req.files);
    return getServerError(res, error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
