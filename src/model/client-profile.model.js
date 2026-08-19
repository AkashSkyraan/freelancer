import express from "express";
import { executeQuery } from "../utils/helper.js";

export class clientModel {
  async createCProfile(
    {
      user_id,
      name,
      profile,
      com_name,
      com_type,
      com_size,
      com_site,
      email,
      phn_num,
      c_code,
      zip_code,
      address,
      city,
      state,
      country,
      lat,
      lng,
      about,
      is_email_verified,
      is_number_verified,
    },
    connection = null,
  ) {
    let query;
    let params;
    const placeholders = Array(20).fill("?").join(", ");

    query = `INSERT INTO client_profile (user_id, name, profile_pic, company_name, company_type, company_size, company_site, email, phn_num, c_code, zip_code, address, city, state, country, lat, lng, is_email_verified, is_number_verified, about) VALUES (${placeholders})`;

    params = [
      user_id,
      name,
      profile,
      com_name,
      com_type,
      com_size,
      com_site,
      email,
      phn_num,
      c_code,
      zip_code,
      address,
      city,
      state,
      country,
      lat,
      lng,
      is_email_verified,
      is_number_verified,
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
  async deleteClientProfile({ id, user_id }) {
    let query;
    let params;

    query = `DELETE FROM client_profile WHERE id = ? and user_id = ?`;
    params = [id, user_id];

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
  async updateClientProfile({ query, params }) {
    let sql_query;
    let sql_params;

    sql_query = `UPDATE client_profile SET ${query.join(", ")} WHERE id = ? AND user_id = ?`;
    sql_params = params;

    const result = await executeQuery(sql_query, sql_params);

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
  async getClientProfile({ user_id }) {
    let query;
    let params;

    query = `SELECT id, name, profile_pic, company_name, company_type, company_size, company_site, email, phn_num, c_code, zip_code, address, city, state, country, is_email_verified, is_number_verified, about FROM client_profile WHERE user_id = ?`;
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

  async add_phnnum({ phn_num, c_code, user_id }, connection = null) {
    let query;
    let params;

    query = `UPDATE users SET phn_num = ?, c_code = ? WHERE user_id = ?`;
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

  async changeFormStatus({ user_id }, connection = null) {
    let query;
    let params;

    query = `UPDATE users SET form_status = ? WHERE user_id = ?`;
    params = [1, user_id];

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

  async is_already_registered({ email, phn_num }) {
    let query;
    let params;

    query = `SELECT user_id, email from client_profile WHERE email = ? AND phn_num = ?`;
    params = [email, phn_num];

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
  // async is_user_exist({ user_id }) {
  //   let query;
  //   let params;

  //   query = `SELECT user_id, email from users WHERE user_id = ?`;
  //   params = [user_id];

  //   const result = await executeQuery(query, params);

  //   if (result?.success === 1) {
  //     return {
  //       success: 1,
  //       data: result?.data,
  //     };
  //   } else if (result?.success === 0) {
  //     return {
  //       success: 0,
  //       error: result?.error,
  //     };
  //   }
  // }

  // UPDATE CLIENT PASSWORD
  async updateClientPassword({ user_id, hashed_pwd }) {
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

  // UPDATE CLIENT CREDENTIALS
  async updateClientEmail({ user_id, email }, connection = null) {
    let query;
    let params;

    query = `UPDATE client_profile SET email = ? WHERE user_id = ?`;
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
  async updateClientPhn_num({ phn_num, c_code, user_id }, connection = null) {
    let query;
    let params;

    query = `UPDATE client_profile SET phn_num = ?, c_code = ? WHERE user_id = ?`;
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

  // UPDATE CLIENT PREFERENCE
  async updateClientPreference({ column_name, params }) {
    let query;

    query = `UPDATE client_profile SET ${column_name.join(", ")} WHERE id = ?`;

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

  //SAVED FREELACNER
  async checkSavedFreelancer({ user_id, freelancer_id }) {
    let query;
    let params;

    query = `SELECT id, freelancer_id, status FROM saved_freelancers WHERE user_id = ? AND freelancer_id = ?`;
    params = [user_id, freelancer_id];

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
  async addSaveFreelancer({ user_id, freelancer_id }) {
    let query;
    let params;

    query = `INSERT INTO saved_freelancers (user_id, freelancer_id) VALUES (?, ?)`;
    params = [user_id, freelancer_id];

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
  async updateSavedFreelancer({ user_id, freelancer_id, status }) {
    let query;
    let params;

    query = `UPDATE saved_freelancers SET status = ? WHERE user_id = ? AND freelancer_id = ?`;
    params = [status, user_id, freelancer_id];

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
  async getSavedFreelancer({ user_id }) {
    let query;
    let params;

    query = `SELECT sf.id,
    
    fp.id AS freelancer_profile_id, fp.name, fp.profile_pic, fp.city, fp.state, fp.country,
    fp.about,

    dm.value AS position
      
    FROM saved_freelancers sf 

    LEFT JOIN freelancer_profile fp ON fp.id = sf.freelancer_id

    LEFT JOIN freelancer_positions fpo ON fpo.freelancer_profile_id = sf.freelancer_id

    LEFT JOIN dropdown_master dm ON dm.id = fpo.position_id
    
    WHERE sf.user_id = ? and sf.status = ?`;
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

  // RECENTLY VISITED FREELANCERS
  async fetchRecentlyVisitedFreelancers({ user_id, freelancer_id }) {
    let query;
    let params;

    query = `SELECT id FROM recently_viewed_freelancers WHERE user_id = ? AND freelancer_id = ?`;
    params = [user_id, freelancer_id];

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
  async delete_recently_visited_freelancers(
    { user_id, freelancer_id },
    connection = null,
  ) {
    let query;
    let params;

    query = `DELETE FROM recently_viewed_freelancers
WHERE user_id = ?
  AND id NOT IN (
      SELECT id
      FROM (
          SELECT id
          FROM recently_viewed_freelancers
          WHERE user_id = ?
          ORDER BY updated_at DESC
          LIMIT 5
      ) AS latest)`;
    params = [user_id, user_id];

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
  async addRecentlyVisitedFreelancers(
    { user_id, freelancer_id },
    connection = null,
  ) {
    let query;
    let params;

    query = `INSERT INTO recently_viewed_freelancers (user_id, freelancer_id) VALUES (?, ?)`;
    params = [user_id, freelancer_id];

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
  async updateRecentlyVisitedFreelancers({ user_id, freelancer_id }) {
    let query;
    let params;

    query = `UPDATE recently_viewed_freelancers SET updated_at = NOW() WHERE user_id = ? AND freelancer_id = ?`;
    params = [user_id, freelancer_id];

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
  async getRecentlyViewedFreelancer({ user_id }) {
    let query;
    let params;

    query = `SELECT rvf.id,
    
    fp.id AS freelancer_profile_id, fp.name, fp.profile_pic, fp.city, fp.state, fp.country,
    fp.about,

    dm.value AS position
      
    FROM recently_viewed_freelancers rvf

    LEFT JOIN freelancer_profile fp ON fp.id = rvf.freelancer_id

    LEFT JOIN freelancer_positions fpo ON fpo.freelancer_profile_id = rvf.freelancer_id

    LEFT JOIN dropdown_master dm ON dm.id = fpo.position_id
    
    WHERE rvf.user_id = ? ORDER BY rvf.updated_at DESC`;

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

  // SEARCH FREELANCERS
  async searchFreelancers({
    categories,
    experience,
    rating,
    keyword,
    location,
  }) {
    let query;
    let params;

    query = `SELECT 
    fp.id, fp.name, fp.profile_pic, fp.cover_pic, fp.city, fp.state,

    dm.value AS position,
    GROUP_CONCAT(s.value) AS skills,

    COUNT(DISTINCT CASE
    WHEN pc.status IN (?, ?, ?, ?)
    THEN pc.id
    END) AS total_jobs,

    COUNT(DISTINCT CASE
    WHEN pc.status = ?
    THEN pc.id
    END) AS completed_jobs
    
    FROM freelancer_profile fp

    LEFT JOIN freelancer_positions fpo ON fpo.freelancer_profile_id = fp.id

    LEFT JOIN dropdown_master dm ON dm.id = fpo.position_id
    AND dm.category = 'positions'

    LEFT JOIN freelancer_skills fs ON fs.freelancer_profile_id = fp.id

    LEFT JOIN skills s ON s.id = fs.skill_id

    LEFT JOIN project_connections pc ON pc.freelancer_id = fp.id
    
    WHERE 1 = 1 
    
    GROUP BY fp.id`;

    params = ["accepted", "inprogress", "completed", "removed", "completed"];

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

  // SUPPORT QUERIES
  async fetchClientId({ user_id }) {
    let query;
    let params;

    query = `SELECT id FROM client_profile WHERE user_id = ?`;
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
  async fetchClientLocation({ user_id }) {
    let query;
    let params;

    query = `SELECT zip_code, city, state, country, address, lat, lng FROM client_profile WHERE user_id = ?`;
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
  async isValidClient({ client_id }) {
    let query;
    let params;

    query = `SELECT id, name, profile_pic FROM client_profile WHERE id = ?`;
    params = [client_id];

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
