import Joi from "joi";
import { sendResponse } from "./helper.js";

export const validateRequest = (schema, data, res) => {
  const { error, value } = schema.validate(data, {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: false,
  });
  if (error) {
    const errors = {};

    error.details.forEach((err) => {
      const field = err.path.join("."); // Handles nested fields too

      // Keep only the first error for each field
      if (!errors[field]) {
        errors[field] = err.message.replace(/"/g, "");
      }
    });
    return sendResponse(res, 200, 0, "validation error", [], errors);
  }
  return value;
};

export const requestOtpSchema = Joi.object({
  email: Joi.string().email().required().allow("").min(16),

  phn_num: Joi.string().required().length(10).allow(""),

  c_code: Joi.string().required().length(3).allow(""),

  type: Joi.number().required().valid(0, 1, 2),
});
export const verifyOtpSchema = Joi.object({
  email: Joi.string().email().required().allow("").min(16),

  phn_num: Joi.string().required().length(10).allow(""),

  c_code: Joi.string().required().length(3).allow(""),

  otp: Joi.string().required().length(6),
});
