import express from "express";
import {
  forgotPasswordSchema,
  loginSchema,
  signUpSchema,
  validateRequest,
  verifyOtpSchema,
} from "../utils/validator.js";
import { requestOtpSchema } from "../utils/validator.js";
import {
  generateOtp,
  generateUserId,
  getServerError,
  sendResponse,
} from "../utils/helper.js";
import { authModel } from "../model/auth.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../config/db.js";
const authMdl = new authModel();

export const requestOtp = async (req, res) => {
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

    const result = await authMdl.requestOtp({
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

export const verifyOtp = async (req, res) => {
  try {
    const validatedData = validateRequest(verifyOtpSchema, req.body, res);
    const { email, phn_num, c_code, otp, type } = validatedData;

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

    const result = await authMdl.fetchOtp({ email, phn_num, c_code });

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

    await authMdl.verifyOtp(data?.id);

    if (result?.success === 1 && type === 0) {
      return sendResponse(res, 200, 1, "otp verified successfully", [], "");
    } else if (result?.success === 1 && type === 1) {
      const reset_token = await jwt.sign(
        { email },
        process.env.JWT_RESET_TOKEN_KEY,
        { expiresIn: "6m" },
      );
      return sendResponse(
        res,
        200,
        1,
        "Otp verified successfully",
        [reset_token],
        "",
      );
    } else if (result?.success === 0) {
      return sendResponse(res, 200, 0, "failed to verify otp", [], "");
    }
  } catch (error) {
    return getServerError(res, error);
  }
};

export const signUp = async (req, res) => {
  let connection;
  try {
    const { email, password, user_role } = req.body;

    const allowed_roles = ["CLIENT", "FREELANCER"];

    if (!allowed_roles.includes(user_role)) {
      return sendResponse(res, 200, 0, "Invalid role", [], "");
    }

    const check_email_verified = await authMdl.fetchOtp({ email });

    const verification_result = check_email_verified?.data[0]?.is_verified;
    if (verification_result !== 1) {
      return sendResponse(
        res,
        200,
        0,
        "please do signup process again",
        [],
        "",
      );
    }

    const salt = 10;
    const hashed_pwd = await bcrypt.hash(password, salt);

    const user_id = await generateUserId();

    const token = jwt.sign(
      { email, user_role, user_id },
      process.env.JWT_SECRET_KEY,
    );

    connection = await pool.getConnection();
    await connection.beginTransaction();
    const result = await authMdl.signUp(
      { user_id, email, hashed_pwd },
      connection,
    );
    const register_role = await authMdl.registerRole(
      { user_id, user_role },
      connection,
    );

    if (result?.success === 1 && register_role?.success === 1) {
      await connection.commit();
      return sendResponse(res, 200, 1, "signup successfully done", [token], "");
    } else if (result?.success === 0 || register_role?.success === 0) {
      await connection.rollback();
      return sendResponse(res, 200, 0, "signup failed", [], "");
    }
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    return getServerError(res, error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const login = async (req, res) => {
  try {
    const validatedData = validateRequest(loginSchema, req.body, res);

    const { email, password, role } = validatedData;

    const login_check_result = await authMdl.loginCheck({ email });

    if (login_check_result?.data.length < 1) {
      return sendResponse(res, 200, 0, "signup Required", [], "");
    }

    const login_check = login_check_result?.data[0];
    const { user_role, user_id } = login_check;

    if (role !== user_role) {
      return sendResponse(res, 200, 0, "Invalid role", [], "");
    }

    let is_match = false;
    if (email === login_check?.email) {
      is_match = await bcrypt.compare(password, login_check?.password);
    }

    let token;

    if (is_match) {
      token = jwt.sign(
        { email, user_id, user_role },
        process.env.JWT_SECRET_KEY,
      );
      return sendResponse(res, 200, 1, "login successfull", [token], "");
    } else {
      return sendResponse(res, 200, 0, "Invalid credentials", [], "");
    }
  } catch (error) {
    return getServerError(res, error);
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const validatedData = validateRequest(forgotPasswordSchema, req.body, res);
    const email = req.user.email;
    const { password } = validatedData;

    const salt = 10;
    const hashed_pwd = await bcrypt.hash(password, salt);

    const result = await authMdl.forgotPassword({ email, hashed_pwd });

    if (result?.success === 1) {
      return sendResponse(res, 200, 1, "Password changed successfully", [], "");
    } else if (result?.success === 0) {
      return sendResponse(res, 200, 0, "Failed to update password", [], "");
    }
  } catch (error) {
    return getServerError(res, error);
  }
};
