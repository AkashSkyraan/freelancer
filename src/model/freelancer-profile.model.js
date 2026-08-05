import express from "express";
import { executeQuery } from "../utils/helper.js";

export class freelancerModel {
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
}
