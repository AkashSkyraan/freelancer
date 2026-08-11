import express from "express";
import { checkpasswordSchema, validateRequest } from "../utils/validator.js";
import { supportModel } from "../model/support.model.js";
import { getServerError, sendResponse } from "../utils/helper.js";
import bcrypt from "bcrypt";

const supportMdl = new supportModel();

export const checkPassword = async (req, res) => {
  try {
    const validatedData = validateRequest(checkpasswordSchema, req.body, res);
    const user_id = req.user.user_id;
    const { password } = validatedData;
    // console.log(password, user_id);

    const fetch_pwd = await supportMdl.fetchPwd({ user_id });
    const pwd = fetch_pwd?.data[0]?.password;

    const is_match = await bcrypt.compare(password, pwd);

    if (fetch_pwd?.success === 1 && is_match) {
      return sendResponse(res, 200, 1, "password verified", [], "");
    } else if (fetch_pwd?.success === 0 || !is_match) {
      return sendResponse(res, 200, 0, "password not verified", [], "");
    }
  } catch (error) {
    return getServerError(res, error);
  }
};
