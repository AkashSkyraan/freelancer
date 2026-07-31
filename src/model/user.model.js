import express from "express";
import { executeQuery } from "../utils/helper.js";

export class userModel {
  async createCProfile({
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
    about,
    is_email_verified,
    is_number_verified,
  }) {
    let query;
    let params;
    const placeholders = Array(18).fill("?").join(", ");

    query = `INSERT INTO client_profile (user_id, name, profile_pic, company_name, company_type, company_size, company_site, email, phn_num, c_code, zip_code, address, city, state, country, is_email_verified, is_number_verified, about) VALUES (${placeholders})`;

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
      about,
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
