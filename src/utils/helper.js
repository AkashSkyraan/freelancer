import express from "express";
import crypto from "crypto";
import { pool } from "../config/db.js";
import dotenv from "dotenv";
dotenv.config();
import { customAlphabet } from "nanoid";

const nanoidCustom = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", 12);

export const sendResponse = async (
  res,
  statuscode,
  success,
  message,
  data,
  error,
) => {
  return res.status(statuscode).json({
    status: statuscode,
    success: success,
    message: message,
    data: data || [],
    error: error || "",
  });
};

export const generateOtp = (length = 6) => {
  try {
    const min = 10 ** (length - 1);
    const max = 10 ** length;
    let otp;
    if (process.env.NODE_ENV === "development") {
      otp = "123456";
    } else {
      otp = crypto.randomInt(min, max).toString();
    }
    return otp;
  } catch (error) {
    throw error;
  }
};

export const executeQuery = async (query, params = [], connection = null) => {
  try {
    const executor = connection || pool;
    const [rows] = await executor.execute(query, params);
    return {
      success: 1,
      data: rows,
    };
  } catch (error) {
    return {
      success: 0,
      error: error.message,
    };
  }
};

export const getServerError = async (res, error) => {
  return sendResponse(
    res,
    500,
    0,
    "Something went wrong",
    [],
    process.env.NODE_ENV === "development"
      ? error.message
      : "Internal server error",
  );
};

export const generateUserId = () => {
  return `USER_${nanoidCustom()}`;
};
