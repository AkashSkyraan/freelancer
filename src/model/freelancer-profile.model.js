import express from "express";
import { executeQuery } from "../utils/helper.js";

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
}
