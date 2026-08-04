import express from "express";
import { executeQuery } from "../utils/helper.js";

export class projectModel {
  async createProject({
    user_id,
    title,
    description,
    skills,
    talent_role,
    duration,
    duration_type,
    experience,
    price,
    price_type,
    open_position,
  }) {
    let query;
    let params;

    query = `INSERT INTO projects (user_id, title, descp, skills, talent_role, duration, duration_type, experience, price, price_type, open_position) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    params = [
      user_id,
      title,
      description,
      skills,
      talent_role,
      duration,
      duration_type,
      experience,
      price,
      price_type,
      open_position,
    ];

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
  async getSoloProject({ id }) {
    let query;
    let params;

    query = `SELECT title, descp, skills, talent_role, duration, duration_type, experience, price, price_type, open_position, project_status FROM projects WHERE id = ?`;
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
  async deleteSoloProject({ id }) {
    let query;
    let params;

    query = `DELETE FROM projects WHERE id = ?`;
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
  async updateProject({
    id,
    title,
    description,
    skills,
    talent_role,
    duration,
    duration_type,
    experience,
    price,
    price_type,
    open_position,
  }) {
    let query;
    let params;

    query = `UPDATE projects SET title = ?, descp = ?, skills = ?, talent_role = ?, duration = ?, duration_type = ?, experience = ?, price = ?, price_type = ?, open_position = ? WHERE id = ?`;
    params = [
      title,
      description,
      skills,
      talent_role,
      duration,
      duration_type,
      experience,
      price,
      price_type,
      open_position,
      id,
    ];

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
