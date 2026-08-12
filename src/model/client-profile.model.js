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
}
