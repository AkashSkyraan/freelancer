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
export const signUpSchema = Joi.object({
  email: Joi.string().email().required().min(16),

  password: Joi.string().required().min(6),

  role: Joi.string().required().valid("CLIENT", "FREELANCER").messages({
    "any.only": "Invalid role.",
    "any.required": "Role is required.",
  }),
});
export const loginSchema = Joi.object({
  email: Joi.string().email().required().min(16),

  password: Joi.string().required().min(6),

  role: Joi.string().required().valid("CLIENT", "FREELANCER").messages({
    "any.only": "Invalid role.",
    "any.required": "Role is required.",
  }),
});

export const getDropdownSchema = Joi.object({
  category: Joi.string().required(),
});
export const deleteDropdownSchema = Joi.object({
  id: Joi.number().required(),
});
export const addDropdownSchema = Joi.object({
  category: Joi.string().required(),
  value: Joi.string().required(),
  icon: Joi.string().required().allow(""),
});
export const updateDropdownSchema = Joi.object({
  id: Joi.number().required(),
  value: Joi.string().required(),
});

export const createCProfileSchema = Joi.object({
  user_id: Joi.string().required(),

  name: Joi.string().required(),

  profile: Joi.string().required().allow(""),

  com_name: Joi.string().required(),

  com_type: Joi.number().required().allow(null),

  com_size: Joi.number().required().allow(null),

  com_site: Joi.string().required().allow(""),

  email: Joi.string().required(),

  phn_num: Joi.string().required(),

  c_code: Joi.string().required(),

  zip_code: Joi.string().required(),

  address: Joi.string().required(),

  city: Joi.string().required(),

  state: Joi.string().required(),

  country: Joi.string().required(),

  about: Joi.string().required(),
});
export const updateCProfileSchema = Joi.object({
  id: Joi.number().required(),

  name: Joi.string().required().allow(""),

  profile: Joi.string().required().allow(""),

  com_name: Joi.string().required().allow(""),

  com_type: Joi.number().required().allow(null),

  com_size: Joi.number().required().allow(null),

  com_site: Joi.string().required().allow(""),

  email: Joi.string().required().allow(""),

  phn_num: Joi.string().required().allow(""),

  c_code: Joi.string().required().allow(""),

  zip_code: Joi.string().required().allow(""),

  address: Joi.string().required().allow(""),

  city: Joi.string().required().allow(""),

  state: Joi.string().required().allow(""),

  country: Joi.string().required().allow(""),

  about: Joi.string().required().allow(""),
});
export const deleteClientProfileSchema = Joi.object({
  id: Joi.number().required(),
});
export const getClientProfileSchema = Joi.object({
  user_id: Joi.string().required(),
});

export const createProjectSchema = Joi.object({
  user_id: Joi.string().required(),
  title: Joi.string().required().max(50),
  description: Joi.string().required().max(500),
  skills: Joi.string().required(),
  talent_role: Joi.number().required(),
  duration: Joi.number().required(),
  duration_type: Joi.string().required(),
  experience: Joi.number().required(),
  price: Joi.string().required(),
  price_type: Joi.string().required(),
  open_position: Joi.number().required(),
});
export const deleteProjectSchema = Joi.object({
  id: Joi.number().required(),
});
export const getIndividualProjectSchema = Joi.object({
  id: Joi.number().required(),
});
export const updateProjectSchema = Joi.object({
  id: Joi.number().required(),
  title: Joi.string().required().max(50),
  description: Joi.string().required().max(500),
  skills: Joi.string().required(),
  talent_role: Joi.number().required(),
  duration: Joi.number().required(),
  duration_type: Joi.string().required(),
  experience: Joi.number().required(),
  price: Joi.string().required(),
  price_type: Joi.string().required(),
  open_position: Joi.number().required(),
});
