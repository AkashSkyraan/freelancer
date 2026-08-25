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

    dm.value AS position,

    CASE
    WHEN rvf.freelancer_id IN (sf.freelancer_id)
    THEN 1
    ELSE 0
    END AS is_saved
      
    FROM recently_viewed_freelancers rvf

    LEFT JOIN freelancer_profile fp ON fp.id = rvf.freelancer_id

    LEFT JOIN freelancer_positions fpo ON fpo.freelancer_profile_id = rvf.freelancer_id

    LEFT JOIN dropdown_master dm ON dm.id = fpo.position_id

    LEFT JOIN saved_freelancers sf ON sf.freelancer_id = rvf.freelancer_id
    AND sf.user_id = ?
    
    WHERE rvf.user_id = ? ORDER BY rvf.updated_at DESC`;

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

  // SEARCH FREELANCERS
  async searchFreelancers({
    user_id,
    categories,
    experience,
    rating,
    keyword,
    location,
  }) {
    let query;
    let params;

    query = `SELECT 
    fp.id, fp.name, fp.profile_pic, fp.cover_pic, fp.city, fp.state, fp.avg_ratings, fp.total_ratings,

    dm.value AS position,
    GROUP_CONCAT(DISTINCT s.value) AS skills,

    COUNT(DISTINCT CASE
    WHEN pc.status IN (?, ?, ?, ?)
    THEN pc.id
    END) AS total_jobs,

    COUNT(DISTINCT CASE
    WHEN pc.status = ?
    THEN pc.id
    END) AS completed_jobs,

    CASE
    WHEN sf.id IS NOT NULL AND sf.status = 1
    THEN 1
    ELSE 0
    END AS is_saved
    
    FROM freelancer_profile fp

    LEFT JOIN freelancer_positions fpo ON fpo.freelancer_profile_id = fp.id

    LEFT JOIN dropdown_master dm ON dm.id = fpo.position_id
    AND dm.category = 'positions'

    LEFT JOIN freelancer_skills fs ON fs.freelancer_profile_id = fp.id

    LEFT JOIN skills s ON s.id = fs.skill_id

    LEFT JOIN project_connections pc ON pc.freelancer_id = fp.id

    LEFT JOIN saved_freelancers sf ON sf.freelancer_id = fp.id
    AND sf.user_id = ?

    LEFT JOIN freelancer_service_categories fsc ON fsc.freelancer_profile_id = fp.id

    LEFT JOIN categories c ON c.id = fsc.service_id
    
    WHERE 1 = 1`;

    params = [
      "accepted",
      "inprogress",
      "completed",
      "removed",
      "completed",
      user_id,
    ];

    if (categories.length) {
      const placeholders = categories.map(() => "?").join(", ");

      query += ` AND fsc.service_id IN (${placeholders})`;
      params.push(...categories);
    }
    if (experience.length) {
      const placeholders = experience.map(() => "?").join(", ");

      query += ` AND fpo.experience_id IN (${placeholders})`;
      params.push(...experience);
    }
    if (rating.length) {
      const placeholders = rating.map(() => "?").join(", ");

      query += ` AND FLOOR(fp.avg_ratings) IN (${placeholders})`;
      params.push(...rating);
    }
    if (keyword) {
      query += ` AND (fp.id IN (
      SELECT fs2.freelancer_profile_id
      FROM freelancer_skills fs2
      JOIN skills s2 ON s2.id = fs2.skill_id
      WHERE s2.value LIKE ?
    )
      OR dm.value LIKE ?
    )`;
      const searchKeyword = `%${keyword}%`;
      params.push(searchKeyword, searchKeyword);
    }
    if (location) {
      query += ` AND (fp.address LIKE ?
      OR fp.city LIKE ?
      OR fp.state LIKE ?
      OR fp.country LIKE ?)`;
      const searchKeyword = `%${location}%`;
      params.push(searchKeyword, searchKeyword, searchKeyword, searchKeyword);
    }

    query += ` GROUP BY fp.id`;

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

  // RATE FREELANCER RATINGS
  async addRateFreelancer(
    { client_id, freelancer_id, project_id, rating, review },
    connection = null,
  ) {
    let query;
    let params;

    query = `INSERT INTO freelancer_ratings (client_id, freelancer_id, project_id, rating, review) VALUES (?, ?, ?, ?, ?)`;
    params = [client_id, freelancer_id, project_id, rating, review];

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
  async fetchAverageRatings({ freelancer_id }, connection = null) {
    let query;
    let params;

    query = `SELECT 
            ROUND(AVG(rating), 1) AS average_ratings, 
            COUNT(*) AS total_ratings
            FROM freelancer_ratings 
            WHERE freelancer_id = ?`;
    params = [freelancer_id];

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
  async updateAverageRatings(
    { freelancer_id, average_ratings, total_ratings },
    connection = null,
  ) {
    let query;
    let params;

    query = `UPDATE freelancer_profile SET avg_ratings = ?, total_ratings = ? WHERE id = ?`;
    params = [average_ratings, total_ratings, freelancer_id];
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

  // INVITE TO PROJECTS
  async inviteToProjects({ project_id, freelancer_id }) {
    let query;
    let params;

    query = `INSERT INTO project_connections (freelancer_id, project_id, initiated_by, status) VALUES (?, ?, ?, ?)`;
    params = [freelancer_id, project_id, "CLIENT", "pending"];

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

  // REPORT FREELACNER
  async addReportFreelancer({ user_id, freelancer_id, reason_id, reason }) {
    let query;
    let params;

    query = `INSERT INTO user_reports (reporter_user_id, freelancer_id, reason_id, reason) VALUES (?, ?, ?, ?)`;
    params = [user_id, freelancer_id, reason_id, reason];

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
  async getMyProjects({ user_id }) {
    let query;
    let params;

    query = `SELECT id FROM projects WHERE user_id = ?`;
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
