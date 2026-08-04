import express from "express";
import { executeQuery } from "../utils/helper.js";

export class mediaModel {
  async uploadMedia(
    {
      org_name,
      stored_name,
      media_type,
      media_size,
      path_name,
      media_extension,
      url,
    },
    connection = null,
  ) {
    let query;
    let params;

    query = `INSERT INTO media (url, path_name, stored_name, org_name, media_size, media_type, media_extension) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    params = [
      url,
      path_name,
      stored_name,
      org_name,
      media_size,
      media_type,
      media_extension,
    ];

    const result = await executeQuery(query, params, connection);

    if (result?.success === 1) {
      return {
        success: 1,
        data: result?.data,
      };
    } else if (result?.success === 0) {
      return {
        success: 0,
        error: result?.error,
      };
    }
  }
}
