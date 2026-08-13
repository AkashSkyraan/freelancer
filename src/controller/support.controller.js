import express from "express";
import {
  checkpasswordSchema,
  deleterecentSearchSchema,
  recentSearchSchema,
  validateRequest,
} from "../utils/validator.js";
import { supportModel } from "../model/support.model.js";
import {
  getServerError,
  replaceNullWithEmptyString,
  sendResponse,
} from "../utils/helper.js";
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

export const getRecentSearch = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const validatedData = validateRequest(recentSearchSchema, req.body, res);
    const { type } = validatedData;

    const recent_result = await supportMdl.getRecentSearches({ user_id, type });

    let data = recent_result?.data;
    data = replaceNullWithEmptyString(data);

    if (recent_result?.success === 1) {
      return sendResponse(
        res,
        200,
        1,
        "Recent searches fetched successfully",
        data,
        "",
      );
    } else if (recent_result?.success === 0) {
      return sendResponse(
        res,
        200,
        0,
        "Failed to fetch Recent searches",
        [],
        "",
      );
    }
  } catch (error) {
    return getServerError(res, error);
  }
};

export const deleteRecentSearch = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const validatedData = validateRequest(
      deleterecentSearchSchema,
      req.body,
      res,
    );
    const { search_id } = validatedData;

    const recent_result = await supportMdl.deleteRecentSearches({
      search_id,
      user_id,
    });

    if (recent_result?.success === 1) {
      return sendResponse(
        res,
        200,
        1,
        "Recent searches deleted successfully",
        [],
        "",
      );
    } else if (recent_result?.success === 0) {
      return sendResponse(
        res,
        200,
        0,
        "Failed to delete Recent searches",
        [],
        "",
      );
    }
  } catch (error) {
    return getServerError(res, error);
  }
};

export const getTrendingsearch = async (req, res) => {
  try {
    const validatedData = validateRequest(recentSearchSchema, req.body, res);
    const { type } = validatedData;

    const result = await supportMdl.getTrendingSearches({ type });

    let data = result?.data;
    data = replaceNullWithEmptyString(data);

    if (result?.success === 1) {
      return sendResponse(
        res,
        200,
        1,
        "Trending searches fetched successfully",
        data,
        "",
      );
    } else if (result?.success === 0) {
      return sendResponse(
        res,
        200,
        0,
        "Failed to fetch trending search",
        [],
        "",
      );
    }
  } catch (error) {
    return getServerError(res, error);
  }
};
