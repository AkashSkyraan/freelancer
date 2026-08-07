import express from "express";
import { getServerError, sendResponse } from "../utils/helper.js";

export const verifyRole = (role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.user_role)) {
      return sendResponse(
        res,
        403,
        0,
        "You are not authorized to access this resource",
        [],
        "",
      );
    }
    next();
  };
};
