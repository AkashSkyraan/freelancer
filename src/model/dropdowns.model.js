import express from "express";
import { executeQuery } from "../utils/helper.js";

export class dropdownModel {
  async getDropdown({ category }) {
    let query;
    let params;

    query = `SELECT category, value FROM dropdown_master WHERE category = ? AND is_active = ?`;
    params = [category, 1];

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

  async deleteDropdown({ id }) {
    let query;
    let params;

    query = `DELETE FROM dropdown_master WHERE id = ?`;
    params = [id];

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
  async addDropdown({ category, value, icon = null }) {
    let query;
    let params;

    query = `INSERT INTO dropdown_master (category, value, icon) VALUE (?, ?, ?)`;
    params = [category, value, icon];

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
  async updateDropdown({ id, value, icon = null }) {
    let query;
    let params;

    query = `UPDATE dropdown_master SET value = ? WHERE id = ?`;
    params = [value, id];

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
