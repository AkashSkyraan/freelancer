import express from "express";
import { executeQuery } from "../utils/helper.js";

export class categoryModel {
  async addCategory({ name, parent_id, icon = null }) {
    let query;
    let params;

    query = `INSERT INTO categories (name,icon, parent_id) VALUES (?, ?, ?)`;
    params = [name, icon, parent_id];

    const result = await executeQuery(query, params);

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
  async getCategory({ parent_id }) {
    let query;
    let params;

    query = `SELECT id, name, icon, parent_id FROM categories WHERE parent_id = ?`;
    params = [parent_id];

    const result = await executeQuery(query, params);

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
  async updateCategory({ id, name, icon = null, parent_id }) {
    let query;
    let params;

    query = `UPDATE categories SET name = ?, icon = ?, parent_id = ? WHERE id = ? `;
    params = [name, icon, parent_id, id];

    const result = await executeQuery(query, params);

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
