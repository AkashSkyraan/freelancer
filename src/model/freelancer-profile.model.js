import express from "express";
import { executeQuery } from "../utils/helper.js";
import { projectModel } from "./project.model.js";

export class freelancerModel {
  // FREELANCER ON BOARDING FORM
  async createProfile(
    {
      user_id,
      name,
      profile_pic,
      email,
      phn_num,
      c_code,
      zip_code,
      address,
      city,
      state,
      country,
      about,
    },
    connection = null,
  ) {
    let query;
    let params;

    query = `INSERT INTO freelancer_profile (user_id, name, profile_pic, email, phn_num, c_code, zip_code, address, city, state, country, about) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    params = [
      user_id,
      name,
      profile_pic,
      email,
      phn_num,
      c_code,
      zip_code,
      address,
      city,
      state,
      country,
      about,
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

  async createFreelancerLanguage(
    { id, language_id, proficiency_id },
    connection = null,
  ) {
    let query;
    let params;

    query = `INSERT INTO freelancer_languages (freelancer_profile_id, language_id, proficiency_id) VALUES (?, ?, ?)`;
    params = [id, language_id, proficiency_id];

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

  async is_step_1_exist({ user_id }) {
    let query;
    let params;

    query = `SELECT id, user_id, step_count, is_profile_completed FROM freelancer_profile WHERE user_id = ?`;
    params = [user_id];

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

  async createFreelancerPosition(
    { freelancer_id, position_id, experience_id },
    connection = null,
  ) {
    let query;
    let params;

    query = `INSERT INTO freelancer_positions (freelancer_profile_id, position_id, experience_id) VALUES (?, ?, ?)`;
    params = [freelancer_id, position_id, experience_id];

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

  async createFreelancerServices({ freelancer_id, id }, connection = null) {
    let query;
    let params;

    query = `INSERT INTO freelancer_service_categories (freelancer_profile_id, service_id) VALUES (?, ?)`;
    params = [freelancer_id, id];

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

  async createFreelancerSkills({ freelancer_id, id }, connection = null) {
    let query;
    let params;

    query = `INSERT INTO freelancer_skills (freelancer_profile_id, skill_id) VALUES (?, ?)`;
    params = [freelancer_id, id];

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

  async changeStepcount(
    { step_count, freelancer_id, is_profile_completed = 0 },
    connection = null,
  ) {
    let query;
    let params;

    query = `UPDATE freelancer_profile SET step_count = ?, is_profile_completed = ? WHERE id = ?`;
    params = [step_count, is_profile_completed, freelancer_id];

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

  //FREELANCER EDUCATION
  async createFreelancerEducation({
    freelancer_id,
    course,
    start_month,
    start_year,
    end_month,
    end_year,
  }) {
    let query;
    let params;

    query = `INSERT INTO freelancer_education (freelancer_profile_id, course, start_month, start_year, end_month, end_year) VALUES (?, ?, ?, ?, ?, ?)`;
    params = [
      freelancer_id,
      course,
      start_month,
      start_year,
      end_month,
      end_year,
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
  async updateFreelancerEducation({
    freelancer_id,
    id,
    course,
    start_month,
    start_year,
    end_month,
    end_year,
  }) {
    let query;
    let params;

    query = `UPDATE freelancer_education SET course = ?, start_month = ?, start_year = ?, end_month = ?, end_year = ? WHERE freelancer_profile_id = ? and id = ?`;
    params = [
      course,
      start_month,
      start_year,
      end_month,
      end_year,
      freelancer_id,
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
  async deleteFreelancerEducation({ freelancer_id, id }) {
    let query;
    let params;

    query = `DELETE FROM freelancer_education WHERE freelancer_profile_id = ? and id = ?`;
    params = [freelancer_id, id];

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

  // FREELANCER WORK EXPERIENCE
  async createFreelancerWorkexp({
    freelancer_id,
    job_role,
    start_month,
    start_year,
    end_month,
    end_year,
  }) {
    let query;
    let params;

    query = `INSERT INTO freelancer_work_exp (freelancer_profile_id, job_role, start_month, start_year, end_month, end_year) VALUES (?, ?, ?, ?, ?, ?)`;
    params = [
      freelancer_id,
      job_role,
      start_month,
      start_year,
      end_month,
      end_year,
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
  async updateFreelancerWorkexp({
    freelancer_id,
    id,
    job_role,
    start_month,
    start_year,
    end_month,
    end_year,
  }) {
    let query;
    let params;

    query = `UPDATE freelancer_work_exp SET job_role = ?, start_month = ?, start_year = ?, end_month = ?, end_year = ? WHERE freelancer_profile_id = ? and id = ?`;
    params = [
      job_role,
      start_month,
      start_year,
      end_month,
      end_year,
      freelancer_id,
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
  async deleteFreelancerWorkexp({ freelancer_id, id }) {
    let query;
    let params;

    query = `DELETE FROM freelancer_work_exp WHERE freelancer_profile_id = ? and id = ?`;
    params = [freelancer_id, id];

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

  //FREELANCER GET PROFILE
  async getProfile({ freelancer_id }) {
    let query;
    let params;

    query = `SELECT id, name, profile_pic, email, phn_num, c_code, zip_code, address, city, state, country, about FROM freelancer_profile WHERE id = ?`;
    params = [freelancer_id];

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
  async getLanguages({ freelancer_id }) {
    let query;
    let params;

    query = `SELECT id, language_id, proficiency_id FROM freelancer_languages WHERE freelancer_profile_id = ?`;
    params = [freelancer_id];

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
  async getEducations({ freelancer_id }) {
    let query;
    let params;

    query = `SELECT id, course, start_month, start_year, end_month, end_year FROM freelancer_education WHERE freelancer_profile_id = ?`;
    params = [freelancer_id];

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
  async getPositions({ freelancer_id }) {
    let query;
    let params;

    query = `SELECT id, position_id, experience_id FROM freelancer_positions WHERE freelancer_profile_id = ?`;
    params = [freelancer_id];

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
  async getServices({ freelancer_id }) {
    let query;
    let params;

    query = `SELECT id, service_id FROM freelancer_service_categories WHERE freelancer_profile_id = ?`;
    params = [freelancer_id];

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
  async getSkills({ freelancer_id }) {
    let query;
    let params;

    query = `SELECT id, skill_id FROM freelancer_skills WHERE freelancer_profile_id = ?`;
    params = [freelancer_id];

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
  async getWork_exps({ freelancer_id }) {
    let query;
    let params;

    query = `SELECT id, job_role, start_month, start_year, end_month, end_year FROM freelancer_work_exp WHERE freelancer_profile_id = ?`;
    params = [freelancer_id];

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

  // UPDATE FREELANCER PROFILE
  async updateFreelancerProfile({ query, params }) {
    let Query;

    Query = `UPDATE freelancer_profile SET ${query.join(", ")} WHERE id = ?`;

    const result = await executeQuery(Query, params);

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
  async updateFreelancerPosition({
    id,
    freelancer_id,
    position_id,
    experience_id,
  }) {
    let query;
    let params;

    query = `UPDATE freelancer_positions SET position_id = ?, experience_id = ? WHERE id = ? AND freelancer_profile_id = ?`;
    params = [position_id, experience_id, id, freelancer_id];

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
  async updateFreelancerLanguages(
    { id, language_id, proficiency_id, freelancer_id },
    connection = null,
  ) {
    let query;
    let params;

    query = `UPDATE freelancer_languages SET language_id = ?, proficiency_id = ? WHERE id = ? AND freelancer_profile_id = ?`;
    params = [language_id, proficiency_id, id, freelancer_id];

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
  async updateFreelancerAddress({
    zip_code,
    address,
    city,
    state,
    country,
    freelancer_id,
  }) {
    let query;
    let params;

    query = `UPDATE freelancer_profile SET zip_code = ?, address = ?, city = ?, state = ?, country = ? WHERE id = ?`;
    params = [zip_code, address, city, state, country, freelancer_id];

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
  async updateFreelancerPreference({ column_name, params }) {
    let query;

    query = `UPDATE freelancer_profile SET ${column_name.join(", ")} WHERE id = ?`;

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

  // UPDATE PROFILE PASSWORD
  async updateFreelancerPassword({ user_id, hashed_pwd }) {
    let query;
    let params;

    query = `UPDATE users SET password = ? WHERE user_id = ?`;
    params = [hashed_pwd, user_id];

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

  // UPDATE FREELANCER CREDENTIALS
  async updateFreelancerEmail({ user_id, email }, connection = null) {
    let query;
    let params;

    query = `UPDATE freelancer_profile SET email = ? WHERE user_id = ?`;
    params = [email, user_id];

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
  async updateFreelancerPhn_num(
    { phn_num, c_code, user_id },
    connection = null,
  ) {
    let query;
    let params;

    query = `UPDATE freelancer_profile SET phn_num = ?, c_code = ? WHERE user_id = ?`;
    params = [phn_num, c_code, user_id];

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

  // SEARCH PROJECTS
  async searchProjects({ categories, experience, price, keyword, location }) {
    let query;
    let params = [];

    query = `SELECT
  p.id, p.title, p.descp, p.duration, p.duration_type,
  p.price, p.open_position, p.project_status, p.views_count,
  p.address, p.city, p.state, p.country,
  p.country, p.zip_code, p.lat, p.lng, p.created_at,
  cp.id AS client_id, cp.profile_pic, cp.company_name,
  
  GROUP_CONCAT(DISTINCT c.name) AS skills,
  e.value AS experience,
  pt.value AS price_type

  FROM projects p

  LEFT JOIN categories c ON FIND_IN_SET(c.id, p.skills) > 0

  LEFT JOIN dropdown_master e ON e.id = p.experience
  AND e.category = 'experience'

  LEFT JOIN dropdown_master pt ON pt.id = p.price_type
  AND pt.category = 'price_type'

  LEFT JOIN client_profile cp ON cp.user_id = p.user_id
  
  WHERE 1 = 1`;

    if (categories?.length) {
      const conditions = categories
        .map(() => `FIND_IN_SET(?, p.skills) > 0`)
        .join(" OR ");

      query += ` AND (${conditions})`;
      params.push(...categories);
    }
    if (experience?.length) {
      const placeholders = experience.map(() => "?").join(", ");

      query += ` AND p.experience IN (${placeholders})`;
      params.push(...experience);
    }
    if (price?.length) {
      const placeholders = price.map(() => "?").join(", ");

      query += ` AND p.price_type IN (${placeholders})`;
      params.push(...price);
    }
    if (keyword) {
      query += ` AND (p.title LIKE ? 
                 OR p.descp LIKE ? 
                 OR c.name LIKE ?)`;

      const searchKeyword = `%${keyword}%`;
      params.push(searchKeyword, searchKeyword, searchKeyword);
    }
    if (location) {
      query += ` AND (p.address LIKE ?
      OR p.city LIKE ?
      OR p.state LIKE ?
      OR p.country LIKE ?)`;
      const searchKeyword = `%${location}%`;
      params.push(searchKeyword, searchKeyword, searchKeyword, searchKeyword);
    }

    query += ` GROUP BY p.id ORDER BY p.created_at DESC`;

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

  // SAVED PROJECTS
  async getSavedProjects({ user_id }) {
    let query;
    let params;

    query = `SELECT id, project_id, created_at FROM saved_projects WHERE user_id = ? AND status = ?`;
    params = [user_id, 1];

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
  async addSaveProject({ user_id, project_id }) {
    let query;
    let params;

    query = `INSERT INTO saved_projects (user_id, project_id) VALUES (?, ?)`;
    params = [user_id, project_id];

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
  async updateSavedProject({ user_id, project_id, status }) {
    let query;
    let params;

    query = `UPDATE saved_projects SET status = ? WHERE user_id = ? AND project_id = ?`;
    params = [status, user_id, project_id];

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
  async checkSavedProject({ user_id, project_id }) {
    let query;
    let params;

    query = `SELECT id, user_id, project_id, status FROM saved_projects WHERE user_id = ? AND project_id = ?`;
    params = [user_id, project_id];

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

  // RECENTLY VISITED PROJECTS
  async fetchRecentlyVisitedProjects({ user_id, project_id }) {
    let query;
    let params;

    query = `SELECT id FROM recently_viewed_projects WHERE user_id = ? AND project_id = ?`;
    params = [user_id, project_id];

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
  async addRecentlyVisitedProject({ user_id, project_id }) {
    let query;
    let params;

    query = `INSERT INTO recently_viewed_projects (user_id, project_id) VALUES(?, ?)`;
    params = [user_id, project_id];

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
  async updateRecentlyVisitedProject({ user_id, project_id }) {
    let query;
    let params;

    query = `UPDATE recently_viewed_projects SET updated_at = NOW() WHERE user_id = ? AND project_id = ?`;
    params = [user_id, project_id];

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
  async delete_recently_viewed_projects({ user_id, project_id }) {
    let query;
    let params;

    query = `DELETE FROM recently_viewed_projects
WHERE user_id = ?
  AND id NOT IN (
      SELECT id
      FROM (
          SELECT id
          FROM recently_viewed_projects
          WHERE user_id = ?
          ORDER BY updated_at DESC
          LIMIT 10
      ) AS latest);`;

    params = [user_id, user_id];

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
  async getRecentlyVisitedProject({ user_id }) {
    let query;
    let params;

    query = `SELECT project_id FROM recently_viewed_projects WHERE user_id = ? ORDER BY updated_at DESC`;
    params = [user_id];

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

  // ADD REPORT CLIENT
  async addReportClient({ user_id, client_id, reason_id, reason }) {
    let query;
    let params;

    query = `INSERT INTO user_reports (reporter_user_id, client_id, reason_id, reason) VALUES (?, ?, ?, ?)`;
    params = [user_id, client_id, reason_id, reason?.trim() || null];

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

  // SEND INTEREST
  async sendProjectInterest({
    freelancer_id,
    project_id,
    initiated_by,
    status,
  }) {
    let query;
    let params;

    query = `INSERT INTO project_connections (freelancer_id, project_id, initiated_by, status) VALUES (?, ?, ?, ?)`;
    params = [freelancer_id, project_id, initiated_by, status];

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

  //SUPPORT QUERIES
  async fetchFreelancerId({ user_id }) {
    let query;
    let params;

    query = `SELECT id FROM freelancer_profile WHERE user_id = ?`;
    params = [user_id];

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
  async fetchFreelancerSkillIds({ freelancer_id }) {
    let query;
    let params;

    query = `SELECT id FROM freelancer_skills WHERE freelancer_profile_id = ?`;
    params = [freelancer_id];

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
  async deleteFreelancerSkills({ id, freelancer_id }, connection = null) {
    let query;
    let params;

    query = `DELETE FROM freelancer_skills WHERE id = ? AND freelancer_profile_id = ?`;
    params = [id, freelancer_id];

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
  async addFreelancerSkills({ language_id, proficiency_id, freelancer_id }) {
    let query;
    let params;

    query = `INSERT INTO freelancer_languages (language_id, proficiency_id, freelancer_profile_id) VALUES (?, ?, ?)`;
    params = [language_id, proficiency_id, freelancer_id];

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
