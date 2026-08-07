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

// AUTHENTICATION
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

//DROPDOWN MASTER SCHEMA'S
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

// CREATE CLIENT PROFILE SCHEMAS
export const createCProfileSchema = Joi.object({
  name: Joi.string().required(),

  profile: Joi.string().required().allow(""),

  com_name: Joi.string().required(),

  com_type: Joi.number().required().allow(null),

  com_size: Joi.number().required().allow(null),

  com_site: Joi.string().required().allow(""),

  email: Joi.string().required().email(),

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

  email: Joi.string().required().allow("").email(),

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

//CREATE PROJECT SCHEMAS
export const createProjectSchema = Joi.object({
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
  price: Joi.number().integer().required(),
  price_type: Joi.string().required(),
  open_position: Joi.number().required(),
});

// CATEGORIES AND SUB CATEGORIES
export const addCategorySchema = Joi.object({
  name: Joi.string().required(),
  icon: Joi.string().required().allow(""),
  parent_id: Joi.number().required(),
});
export const getCategorySchema = Joi.object({
  parent_id: Joi.number().required(),
});
export const updateCategorySchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  icon: Joi.string().required().allow(""),
  parent_id: Joi.number().required(),
});

//CREATE FREELANCER PROFILE WITH MULTIPLE STEPS
export const createFreelancerProfileSchema = Joi.object({
  name: Joi.string().required(),
  profile_pic: Joi.string().required(),
  email: Joi.string().required().email(),
  phn_num: Joi.string().required(),
  c_code: Joi.string().required(),
  zip_code: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  country: Joi.string().required(),
  about: Joi.string().required().max(500),
  languages: Joi.array()
    .min(1)
    .items(
      Joi.object({
        language_id: Joi.number().integer().required(),
        proficiency_id: Joi.number().integer().required(),
      }),
    )
    .required(),
});
export const createFreelancerPositionSchema = Joi.object({
  position_id: Joi.number().required(),
  experience_id: Joi.number().required(),
});
export const createFreelancerServiceSchema = Joi.object({
  service_id: Joi.array().items(Joi.number()).min(1).required(),
});
export const createFreelancerSkillSchema = Joi.object({
  skill_id: Joi.array().items(Joi.number()).min(1).required(),
});
export const updateFreelancerProfileSchema = Joi.object({
  
})

export const createFreelancerEducationSchema = Joi.object({
  course: Joi.string().required(),
  start_month: Joi.number().required(),
  start_year: Joi.number().required(),
  end_month: Joi.number().required(),
  end_year: Joi.number().required(),
});
export const updateFreelancerEducationSchema = Joi.object({
  id: Joi.number().required(),
  course: Joi.string().required(),
  start_month: Joi.number().required(),
  start_year: Joi.number().required(),
  end_month: Joi.number().required(),
  end_year: Joi.number().required(),
});
export const deleteFreelancerEducationSchema = Joi.object({
  id: Joi.number().required(),
});

export const createFreelancerWorkexpSchema = Joi.object({
  job_role: Joi.string().required(),
  start_month: Joi.number().required(),
  start_year: Joi.number().required(),
  end_month: Joi.number().required(),
  end_year: Joi.number().required(),
});
export const updateFreelancerWorkexpSchema = Joi.object({
  id: Joi.number().required(),
  job_role: Joi.string().required(),
  start_month: Joi.number().required(),
  start_year: Joi.number().required(),
  end_month: Joi.number().required(),
  end_year: Joi.number().required(),
});
export const deleteFreelancerWorkexpSchema = Joi.object({
  id: Joi.number().required(),
});
