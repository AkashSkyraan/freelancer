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
    address,
    city,
    state,
    country,
    zip_code,
    lat,
    lng,
  }) {
    let query;
    let params;

    query = `INSERT INTO projects (user_id, title, descp, skills, talent_role, duration, duration_type, experience, price, price_type, open_position, address, city, state, country, zip_code, lat, lng) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

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
      address,
      city,
      state,
      country,
      zip_code,
      lat,
      lng,
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

    query = `SELECT id, title, descp, skills, talent_role, duration, duration_type, experience, price, price_type, open_position, project_status FROM projects WHERE id = ?`;
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
  async deleteSoloProject({ id, user_id }) {
    let query;
    let params;

    query = `UPDATE projects SET is_deleted = ? WHERE id = ? AND user_id = ?`;
    params = [1, id, user_id];

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

    query = `UPDATE projects SET title = ?, descp = ?, skills = ?, talent_role = ?, duration = ?, duration_type = ?, experience = ?, price = ?, price_type = ?, open_position = ? WHERE id = ? and user_id = ?`;
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
      user_id,
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
  async updateProjectViewCount({ user_id, id }, connection = null) {
    let query;
    let params;

    query = `INSERT INTO project_views (user_id, project_id) VALUES (?, ?)`;
    params = [user_id, id];

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
  async updateCount({ id }, connection = null) {
    let query;
    let params;

    query = `UPDATE projects SET views_count = views_count + 1 WHERE id = ?`;
    params = [id];

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
  async getProjects({ project_ids }) {
    let query;
    let params;

    const placeholders = project_ids.map(() => "?").join(", ");

    query = `SELECT
  p.id, p.title, p.descp, dm_pos.value AS talent_role,
  p.duration, p.duration_type,
  dm_exp.value AS experience, p.price, dm_ptype.value AS price_type,
  p.open_position, p.project_status,
  p.views_count, p.address, p.city, p.state,
  p.country, p.zip_code, p.lat, p.lng, p.created_at,

  GROUP_CONCAT(DISTINCT s.value) AS skills,

  CASE
  WHEN p.id IN (sp.project_id)
  THEN 1
  ELSE 0
  END AS is_saved

  FROM projects p

  LEFT JOIN dropdown_master dm_pos ON dm_pos.id = p.talent_role
  AND dm_pos.category = "positions"

  LEFT JOIN dropdown_master dm_exp ON dm_exp.id = p.experience
  AND dm_exp.category = "experience"

  LEFT JOIN dropdown_master dm_ptype ON dm_ptype.id = p.price_type
  AND dm_ptype.category = "price_type"

  LEFT JOIN skills s ON FIND_IN_SET (s.id, p.skills) > 0

  LEFT JOIN saved_projects sp ON sp.project_id = p.id

  WHERE p.id IN (${placeholders}) GROUP BY p.id ORDER BY FIELD(p.id, ${placeholders})`;
    params = [...project_ids, ...project_ids];

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
  async changeProjectStatus(
    { project_id, change_status, reason = null },
    connection = null,
  ) {
    let query;
    let params = [];

    query = `UPDATE projects SET project_status = ?`;
    params.push(change_status);

    if (reason != undefined) {
      query += ` , closed_reason = ?`;
      params.push(reason);
    }
    query += ` where id = ?`;
    params.push(project_id);

    if (change_status === "inprogress") {
      query += ` AND project_status = "accepted"`;
    }
    if (change_status === "completed") {
      query += ` AND project_status = "inprogress"`;
    }
    if (change_status === "interested") {
      query += ` AND project_status = "opened"`;
    }
    if (change_status === "accepted") {
      query += ` AND project_status = "interested"`;
    }

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
  async projectRepost({ project_id }) {
    let query;
    let params;

    query = `UPDATE projects SET project_status = ?, is_reposted = ?, expired_at = NOW() WHERE id = ? AND project_status IN ('expired', 'closed')`;
    params = ["opened", 1, project_id];

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
