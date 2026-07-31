import express from "express";
import { getServerError, sendResponse } from "../utils/helper.js";
import { createCProfileSchema, validateRequest } from "../utils/validator.js";
import { userModel } from "../model/user.model.js";
import { authModel } from "../model/auth.model.js";

const userMdl = new userModel();
const authMdl = new authModel();

export const createClientProfile = async (req, res) => {
  try {
    const validatedData = validateRequest(createCProfileSchema, req.body, res);
    const {
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
    } = validatedData;

    const [email_verify, number_verify] = await Promise.all([
      authMdl.fetchOtp({ email }),
      authMdl.fetchOtp({ phn_num, c_code }),
    ]);

    if (email_verify?.success === 0 || number_verify?.success === 0) {
      return sendResponse(res, 200, 0, "failed to verify", [], "");
    }
    const is_email_verified = email_verify?.data[0]?.is_verified;
    const is_number_verified = number_verify?.data[0]?.is_verified;

    const result = await userMdl.createCProfile({
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
    });

    console.log(result);
  } catch (error) {
    return getServerError(res, error);
  }
};

export const createFreelancerProfile = async (req, res) => {
  try {
  } catch (error) {
    return getServerError(res, error);
  }
};
