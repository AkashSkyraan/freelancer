import express from "express";
import { getServerError, sendResponse } from "../utils/helper.js";
import jwt, { decode } from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config();

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
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
    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
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
