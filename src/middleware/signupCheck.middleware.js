import express from "express";
import { getServerError, sendResponse } from "../utils/helper.js";
import { authModel } from "../model/auth.model.js";
import { signUpSchema, validateRequest } from "../utils/validator.js";
const authMdl = new authModel();

export const signupCheck = async (req, res, next) => {
  try {
    const validatedData = validateRequest(signUpSchema, req.body, res);
    const { email } = validatedData;

    const result = await authMdl.signupCheck({ email });

    if (result?.data.length === 0) {
      return next();
    } else if (result?.data.length >= 1) {
      const reason = result?.data[0]?.user_role.toLowerCase();
      return sendResponse(
        res,
        200,
        0,
        `This credential is already registered as ${reason}`,
        [],
        "",
      );
    }
  } catch (error) {
    return getServerError(res, error);
  }
};
