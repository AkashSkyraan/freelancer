import express from "express";
import { executeQuery } from "../utils/helper.js";

export class freelancerDashModel {
  async getProjectsCount({ user_id }) {
    let query;
    let params;

    query = `SELECT 
    
    COUNT(DISTINCT CASE
    WHEN p.project_status = "opened"
    THEN p.id
    END) AS opened_count,

    COUNT(DISTINCT CASE
    WHEN p.project_status = "completed"
    THEN p.id
    END) AS completed_count,

    COUNT(DISTINCT CASE
    WHEN p.project_status = "inprogress"
    THEN p.id
    END) AS inprogress_count,

    COUNT(DISTINCT CASE
    WHEN p.project_status = "closed"
    THEN p.id
    END) AS closed_count,

    COUNT(DISTINCT CASE
    WHEN p.project_status = "expired"
    THEN p.id
    END) AS expired_count,

    COUNT(DISTINCT CASE
    WHEN p.project_status = "interested"
    THEN p.id
    END) AS interested_count,

    COUNT(DISTINCT CASE
    WHEN p.project_status = "accepted"
    THEN p.id
    END) AS accepted_count,

    COUNT(DISTINCT CASE
    WHEN 1 = 1
    THEN p.id
    END) AS total_count
    
    FROM projects p

    LEFT JOIN project_connections pc ON pc.project_id = p.id

    WHERE p.user_id = ? AND p.is_deleted = ?`;

    params = [user_id, 0];

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
  async getProjectid({ user_id, status }) {
    let query;
    let params = [];

    query = `SELECT
    DISTINCT p.id AS project_id
    
    FROM projects p

    LEFT JOIN project_connections pc ON pc.project_id = p.id

    WHERE 1 = 1`;

    if (status === "pending") {
      query += ` AND pc.status = ? AND pc.initiated_by = ?`;
      params.push(status, "FREELANCER");
      // } else if (status === "accepted") {
      //   query += ` AND p.project_status = ?`;
      //   params.push(status);
    } else if (status != undefined) {
      query += ` AND p.project_status = ? AND p.user_id = ?`;
      params.push(status, user_id);
    } else {
      query += ` AND p.user_id = ?`;
      params.push(user_id);
    }

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
  async getMyProjects({ project_ids }) {
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

  COUNT(DISTINCT CASE
  WHEN pc.status = "pending" AND pc.initiated_by = "FREELANCER"
  THEN pc.id
  END) AS interested_count,

  COUNT(DISTINCT CASE
  WHEN pc.status = "accepted"
  THEN pc.id
  END) AS accepted_count

  FROM projects p

  LEFT JOIN dropdown_master dm_pos ON dm_pos.id = p.talent_role
  AND dm_pos.category = "positions"

  LEFT JOIN dropdown_master dm_exp ON dm_exp.id = p.experience
  AND dm_exp.category = "experience"

  LEFT JOIN dropdown_master dm_ptype ON dm_ptype.id = p.price_type
  AND dm_ptype.category = "price_type"

  LEFT JOIN project_connections pc ON pc.project_id = p.id

  LEFT JOIN skills s ON FIND_IN_SET (s.id, p.skills) > 0

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
  async getprojectDetails({ project_id, status, init_by, is_pinned }) {
    let query;
    let params = [];

    query = `SELECT 
    fp.id, fp.name, fp.profile_pic, fp.cover_pic, fp.city, fp.state, fp.avg_ratings, fp.total_ratings,

    dm.value AS position,
    GROUP_CONCAT(DISTINCT s.value) AS skills,

    pc.updated_at
    
    FROM freelancer_profile fp

    LEFT JOIN freelancer_positions fpo ON fpo.freelancer_profile_id = fp.id

    LEFT JOIN dropdown_master dm ON dm.id = fpo.position_id
    AND dm.category = 'positions'

    LEFT JOIN freelancer_skills fs ON fs.freelancer_profile_id = fp.id

    LEFT JOIN skills s ON s.id = fs.skill_id

    LEFT JOIN project_connections pc ON pc.freelancer_id = fp.id

    LEFT JOIN freelancer_service_categories fsc ON fsc.freelancer_profile_id = fp.id

    LEFT JOIN categories c ON c.id = fsc.service_id
    
    WHERE 1 = 1`;

    if (project_id) {
      query += ` AND pc.project_id = ?`;
      params.push(project_id);
    }
    if (status !== "") {
      query += ` AND pc.status = ?`;
      params.push(status);
    }
    if (init_by !== "") {
      query += ` AND pc.initiated_by = ?`;
      params.push(init_by);
    }
    if (is_pinned != undefined) {
      query += ` AND pc.is_pinned = ?`;
      params.push(is_pinned);
    }

    query += ` GROUP BY fp.id HAVING fp.id IS NOT NULL`;
    // console.log(query);

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
  async changeProjectConnection({ id, type, reason }) {
    let query;
    let params = [];

    if (type === 0) {
      query = `UPDATE project_connections SET status = ?`;
      params.push("accepted");
    }

    if (type === 1) {
      query = `UPDATE project_connections SET status = ?`;
      params.push("rejected");
    }
    if (type === 2) {
      query = `UPDATE project_connections SET status = ?, removed_reason = ?`;
      params.push("removed", reason);
    }

    query += ` WHERE id = ?`;
    params.push(id);

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
