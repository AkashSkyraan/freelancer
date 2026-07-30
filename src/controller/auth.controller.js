import express from "express";
import { validateRequest, verifyOtpSchema } from "../utils/validator.js";
import { requestOtpSchema } from "../utils/validator.js";
import { generateOtp, getServerError, sendResponse } from "../utils/helper.js";
import { authModel } from "../model/auth.model.js";
import { error } from "console";

const authMdl = new authModel();

export const requestotp = async (req, res) => {
  try {
    const validatedData = validateRequest(requestOtpSchema, req.body, res);
    const { email, phn_num, c_code, type } = validatedData;

    if (email && (phn_num || c_code)) {
      return sendResponse(
        res,
        200,
        0,
        "validation error",
        [],
        "either email or number is supported",
      );
    }

    const user_result = await authMdl.fetchUserCount(email, phn_num);
    const user_count = user_result?.data.length;

    if (type === 0) {
      // do nothing
    } else if (type === 1 && user_count === 0) {
      return sendResponse(res, 200, 0, "Account not exist", [], "");
    } else if (type === 2 && user_count === 1) {
      return sendResponse(
        res,
        200,
        0,
        "Account has already been exist",
        [],
        "",
      );
    }

    const otp = generateOtp();
    const expiredTime =
      process.env.NODE_ENV === "development"
        ? new Date(Date.now() + 2 * 60 * 1000)
        : new Date(Date.now() + 5 * 60 * 1000);

    const result = await authMdl.requestotp({
      email,
      phn_num,
      c_code,
      otp,
      expiredTime,
    });

    if (result?.success === 1) {
      return sendResponse(res, 200, 1, "otp sent successfully", [otp], "");
    } else if (result?.success === 0) {
      return sendResponse(res, 200, 0, "failed to send otp", [], "");
    }
  } catch (error) {
    return getServerError(res, error);
  }
};

export const verifyotp = async (req, res) => {
  try {
    const validatedData = validateRequest(verifyOtpSchema, req.body, res);
    const { email, phn_num, c_code, otp } = validatedData;

    if (email && (phn_num || c_code)) {
      return sendResponse(
        res,
        200,
        0,
        "validation error",
        [],
        "either email or number is supported",
      );
    }

    const result = await authMdl.fetchotp({ email, phn_num, c_code });

    const data = result?.data[0];

    if (data?.otp !== otp) {
      return sendResponse(res, 200, 0, "invalid otp", [], "");
    }
    if (data?.is_used === 1) {
      return sendResponse(res, 200, 0, "otp already used", [], "");
    }
    if (data?.expired_at <= new Date()) {
      return sendResponse(res, 200, 0, "otp has been expired", [], "");
    }

    await authMdl.verifyotp(data?.id);

    if (result?.success === 1) {
      return sendResponse(res, 200, 1, "otp verified successfully", [otp], "");
    } else if (result?.success === 0) {
      return sendResponse(res, 200, 0, "failed to verify otp", [], "");
    }
  } catch (error) {
    return getServerError(res, error);
  }
};
