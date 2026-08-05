import express from "express";
import { getServerError, sendResponse } from "../utils/helper.js";
import {
  createFreelancerProfileSchema,
  validateRequest,
} from "../utils/validator.js";
import { pool } from "../config/db.js";
import { authModel } from "../model/auth.model.js";
import { freelancerModel } from "../model/freelancer-profile.model.js";
const authMdl = new authModel();
const freelancerMdl = new freelancerModel();

export const createFreelancerProfile = async (req, res) => {
  let connection;
  try {
    const validatedData = validateRequest(
      createFreelancerProfileSchema,
      req.body,
      res,
    );
    const {
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
      languages,
    } = validatedData;

    const user_check = await authMdl.is_user_exist({ user_id });
    if (user_check?.data.length < 1) {
      return sendResponse(res, 200, 0, "Invalid user", [], "");
    }

    const [email_verify, number_verify] = await Promise.all([
      authMdl.is_email_num_verified({ email }),
      authMdl.is_email_num_verified({ phn_num }),
    ]);

    if (email_verify?.success === 0 || number_verify?.success === 0) {
      return sendResponse(
        res,
        200,
        0,
        "failed to verify email and number",
        [],
        "",
      );
    }
    const is_email_verified = email_verify?.data[0]?.is_verified || 0;
    const is_number_verified = number_verify?.data[0]?.is_verified || 0;

    if (is_email_verified === 0) {
      return sendResponse(
        res,
        200,
        0,
        "Please verify the provided email",
        [],
        "",
      );
    } else if (is_number_verified === 0) {
      return sendResponse(
        res,
        200,
        0,
        "Please verify the provided number",
        [],
        "",
      );
    }

    connection = await pool.getConnection();
    await connection.beginTransaction();
    const result = await freelancerMdl.createProfile(
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
      connection,
    );

    if (result?.success === 0) {
      if (connection) {
        await connection.rollback();
      }
      return sendResponse(res, 200, 0, "Failed to create profile", [], "");
    }

    const id = result?.data?.insertId;

    for (const language of languages) {
      const languages_result = await freelancerMdl.createFreelancerLanguage(
        {
          id,
          language_id: language.language_id,
          proficiency_id: language.proficiency_id,
        },
        connection,
      );
      if (languages_result?.success === 0) {
        if (connection) {
          await connection.rollback();
        }
        return sendResponse(res, 200, 0, "Failed to create profile", [], "");
      }
    }

    await connection.commit();
    return sendResponse(
      res,
      200,
      1,
      "Freelancer profile created successfully",
      [],
      "",
    );
  } catch (error) {
    if (connection) {
      connection.rollback();
    }
    return getServerError(res, error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
