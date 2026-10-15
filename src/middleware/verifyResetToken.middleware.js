import express from "express";
import { getServerError, sendResponse } from "../utils/helper.js";
import jwt from "jsonwebtoken";

export const verifyResetToken = async (req, res, next) => {
  try {
    const authHeader = req.cookies?.accessToken;

    if (!authHeader) {
      return sendResponse(
        res,
        401,
        0,
        "Authentication token is required",
        [],
        "",
      );
    }
    const [token] = authHeader.split(" ");

    if (!token) {
      return sendResponse(
        res,
        401,
        0,
        "Invalid authorization format or token",
        [],
        "",
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return sendResponse(res, 401, 0, "Token has expired", [], "");
    }
    return getServerError(res, error);
  }
};
