import express from "express";
import {
  getServerError,
  replaceNullWithEmptyString,
  sendResponse,
} from "../utils/helper.js";
import {
  addFreelancerLanguagesSchema,
  addRecentlyVisitedProjectSchema,
  addSaveProjectSchema,
  checkpasswordSchema,
  createFreelancerEducationSchema,
  createFreelancerPositionSchema,
  createFreelancerProfileSchema,
  createFreelancerServiceSchema,
  createFreelancerSkillSchema,
  createFreelancerWorkexpSchema,
  deleteFreelancerEducationSchema,
  deleteFreelancerWorkexpSchema,
  ReportClientSchema,
  searchProjectSchema,
  sendInterestSchema,
  updateCredentialSchema,
  updateFreelancerAddressSchema,
  updateFreelancerEducationSchema,
  updateFreelancerLanguagesSchema,
  updateFreelancerPositionSchema,
  updateFreelancerPreferenceSchema,
  updateFreelancerProfileSchema,
  updateFreelancerSkillsSchema,
  updateFreelancerWorkexpSchema,
  updatepasswordSchema,
  validateRequest,
} from "../utils/validator.js";
import { pool } from "../config/db.js";
import { authModel } from "../model/auth.model.js";
import { freelancerModel } from "../model/freelancer-profile.model.js";
import bcrypt from "bcrypt";
import { supportModel } from "../model/support.model.js";
import { projectModel } from "../model/project.model.js";
import { clientModel } from "../model/client-profile.model.js";
const authMdl = new authModel();
const freelancerMdl = new freelancerModel();
const clientMdl = new clientModel();
const supportMdl = new supportModel();
const projectMdl = new projectModel();

// FREELANCER ONBOARDING PROFILE
export const createFreelancerProfile = async (req, res) => {
  let connection;
  try {
    const validatedData = validateRequest(
      createFreelancerProfileSchema,
      req.body,
      res,
    );
    const user_id = req.user.user_id;
    const {
      name,
      profile_pic,
      email,
      phn_num,
      c_code,
      zip_code,
      address,
      city,
      state,
      country,
      about,
      languages,
    } = validatedData;

    // const user_check = await authMdl.is_user_exist({ user_id });
    // if (user_check?.data.length < 1) {
    //   return sendResponse(res, 200, 0, "Invalid user", [], "");
    // }

    const [email_verify, number_verify] = await Promise.all([
      authMdl.is_email_num_verified({ email }),
      authMdl.is_email_num_verified({ phn_num }),
    ]);

    if (email_verify?.success === 0 || number_verify?.success === 0) {
      return sendResponse(
        res,
        200,
        0,
        "failed to verify email and number",
        [],
        "",
      );
    }
    const is_email_verified = email_verify?.data[0]?.is_verified || 0;
    const is_number_verified = number_verify?.data[0]?.is_verified || 0;

    if (is_email_verified === 0) {
      return sendResponse(
        res,
        200,
        0,
        "Please verify the provided email",
        [],
        "",
      );
    } else if (is_number_verified === 0) {
      return sendResponse(
        res,
        200,
        0,
        "Please verify the provided number",
        [],
        "",
      );
    }

    connection = await pool.getConnection();
    await connection.beginTransaction();
    const result = await freelancerMdl.createProfile(
      {
        user_id,
        name,
        profile_pic,
        email,
        phn_num,
        c_code,
        zip_code,
        address,
        city,
        state,
        country,
        about,
      },
      connection,
    );

    if (result?.success === 0) {
      if (connection) {
        await connection.rollback();
      }
      return sendResponse(res, 200, 0, "Failed to create profile", [], "");
    }

    const id = result?.data?.insertId;

    for (const language of languages) {
      const languages_result = await freelancerMdl.createFreelancerLanguage(
        {
          id,
          language_id: language.language_id,
          proficiency_id: language.proficiency_id,
        },
        connection,
      );
      if (languages_result?.success === 0) {
        if (connection) {
          await connection.rollback();
        }
        return sendResponse(res, 200, 0, "Failed to create profile", [], "");
      }
    }

    await connection.commit();
    return sendResponse(
      res,
      200,
      1,
      "Freelancer profile created successfully",
      [],
      "",
    );
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    return getServerError(res, error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const createFreelancerPosition = async (req, res) => {
  let connection;
  try {
    const validatedData = validateRequest(
      createFreelancerPositionSchema,
      req.body,
      res,
    );
    const user_id = req.user.user_id;
    const { position_id, experience_id } = validatedData;

    const form_check = await freelancerMdl.is_step_1_exist({ user_id });
    if (form_check?.success === 0) {
      return sendResponse(
        res,
        200,
        0,
        "Unable to verify freelancer profile",
        [],
        "",
      );
    }

    if (form_check?.data.length !== 1 || form_check?.data[0]?.step_count < 1) {
      return sendResponse(
        res,
        200,
        0,
        "Complete the step 1 before proceeding",
        [],
        "",
      );
    } else if (form_check?.data[0]?.step_count > 1) {
      return sendResponse(
        res,
        200,
        0,
        "Step 2 has already been completed.",
        [],
        "",
      );
    }

    const freelancer_id = form_check?.data[0]?.id;
    const step_count = 2;

    connection = await pool.getConnection();
    await connection.beginTransaction();

    const result = await freelancerMdl.createFreelancerPosition(
      {
        freelancer_id,
        position_id,
        experience_id,
      },
      connection,
    );
    const change_step_count = await freelancerMdl.changeStepcount(
      {
        step_count,
        freelancer_id,
      },
      connection,
    );

    if (result?.success === 1 && change_step_count?.success === 1) {
      if (connection) {
        await connection.commit();
      }
      return sendResponse(
        res,
        200,
        1,
        "Freelancer position created successfully",
        [],
        "",
      );
    } else if (result?.success === 0 || change_step_count?.success === 0) {
      if (connection) {
        await connection.rollback();
      }
      return sendResponse(
        res,
        200,
        0,
        "Failed to create freelancer position",
        [],
        "",
      );
    }
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    return getServerError(res, error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const createFreelancerServices = async (req, res) => {
  let connection;
  try {
    const validatedData = validateRequest(
      createFreelancerServiceSchema,
      req.body,
      res,
    );
    const user_id = req.user.user_id;
    const { service_id } = validatedData;

    const form_check = await freelancerMdl.is_step_1_exist({ user_id });
    if (form_check?.success === 0) {
      return sendResponse(
        res,
        200,
        0,
        "Unable to verify freelancer profile",
        [],
        "",
      );
    }

    if (form_check?.data.length !== 1 || form_check?.data[0]?.step_count < 2) {
      return sendResponse(
        res,
        200,
        0,
        "Complete the previous steps before proceeding",
        [],
        "",
      );
    } else if (form_check?.data[0]?.step_count > 2) {
      return sendResponse(
        res,
        200,
        0,
        "Step 3 has already been completed.",
        [],
        "",
      );
    }

    const freelancer_id = form_check?.data[0]?.id;
    const step_count = 3;

    connection = await pool.getConnection();
    await connection.beginTransaction();

    for (const id of service_id) {
      const result = await freelancerMdl.createFreelancerServices(
        {
          freelancer_id,
          id,
        },
        connection,
      );
      if (result?.success === 0) {
        if (connection) {
          await connection.rollback();
        }
        return sendResponse(
          res,
          200,
          0,
          "Failed to create freelancer service",
          [],
          "",
        );
      }
    }

    const change_step_count = await freelancerMdl.changeStepcount(
      {
        step_count,
        freelancer_id,
      },
      connection,
    );
    if (change_step_count?.success === 0) {
      if (connection) {
        await connection.rollback();
      }
      return sendResponse(
        res,
        200,
        0,
        "Failed to create freelancer service",
        [],
        "",
      );
    }

    await connection.commit();
    return sendResponse(
      res,
      200,
      1,
      "Freelancer services created successfully",
      [],
      "",
    );
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    return getServerError(res, error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const createFreelancerSkills = async (req, res) => {
  let connection;
  try {
    const validatedData = validateRequest(
      createFreelancerSkillSchema,
      req.body,
      res,
    );
    const user_id = req.user.user_id;
    const { skill_id } = validatedData;

    const form_check = await freelancerMdl.is_step_1_exist({ user_id });
    if (form_check?.success === 0) {
      return sendResponse(
        res,
        200,
        0,
        "Unable to verify freelancer profile",
        [],
        "",
      );
    }

    if (form_check?.data.length !== 1 || form_check?.data[0]?.step_count < 3) {
      return sendResponse(
        res,
        200,
        0,
        "Complete the previous steps before proceeding",
        [],
        "",
      );
    } else if (form_check?.data[0]?.step_count > 3) {
      return sendResponse(
        res,
        200,
        0,
        "Step 4 has already been completed.",
        [],
        "",
      );
    }

    const freelancer_id = form_check?.data[0]?.id;
    const step_count = 4;
    const is_profile_completed = 1;

    connection = await pool.getConnection();
    await connection.beginTransaction();

    for (const id of skill_id) {
      const result = await freelancerMdl.createFreelancerSkills(
        {
          freelancer_id,
          id,
        },
        connection,
      );
      if (result?.success === 0) {
        if (connection) {
          await connection.rollback();
        }
        return sendResponse(
          res,
          200,
          0,
          "Failed to create freelancer skills",
          [],
          "",
        );
      }
    }

    const change_step_count = await freelancerMdl.changeStepcount(
      { step_count, freelancer_id, is_profile_completed },
      connection,
    );
    if (change_step_count?.success === 0) {
      if (connection) {
        await connection.rollback();
      }
      return sendResponse(
        res,
        200,
        0,
        "Failed to create freelancer skills",
        [],
        "",
      );
    }

    await connection.commit();
    return sendResponse(res, 200, 1, "Freelancer skills created", [], "");
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    return getServerError(res, error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

// FREELANCER EDUCATION
export const createFreelancerEducation = async (req, res) => {
  try {
    const validatedData = validateRequest(
      createFreelancerEducationSchema,
      req.body,
      res,
    );
    const user_id = req.user.user_id;
    const { course, start_month, start_year, end_month, end_year } =
      validatedData;

    // const is_user_exist = await authMdl.is_user_exist({ user_id });
    // if (is_user_exist?.success === 0) {
    //   return sendResponse(
    //     res,
    //     200,
    //     0,
    //     "failed to create freelancer education",
    //     [],
    //     "",
    //   );
    // } else if (is_user_exist?.data.length === 0) {
    //   return sendResponse(res, 200, 0, "No freelancer found", [], "");
    // }

    const freelancer_id_result = await freelancerMdl.fetchFreelancerId({
      user_id,
    });
    if (freelancer_id_result?.success === 0) {
      return sendResponse(
        res,
        200,
        0,
        "failed to fetch freelancer profile",
        [],
        "",
      );
    } else if (freelancer_id_result?.data.length === 0) {
      return sendResponse(
        res,
        200,
        0,
        "freelancer profile didn't exist",
        [],
        "",
      );
    }
    const freelancer_id = freelancer_id_result?.data[0]?.id;

    const result = await freelancerMdl.createFreelancerEducation({
      freelancer_id,
      course,
      start_month,
      start_year,
      end_month,
      end_year,
    });
    if (result?.success === 0) {
      return sendResponse(res, 200, 0, "Failed to create education", [], "");
    } else if (result?.success === 1) {
      return sendResponse(res, 200, 1, "Freelancer education created", [], "");
    }
  } catch (error) {
    return getServerError(res, error);
  }
};

export const updateFreelancerEducation = async (req, res) => {
  try {
    const validatedData = validateRequest(
      updateFreelancerEducationSchema,
      req.body,
      res,
    );
    const user_id = req.user.user_id;
    const { id, course, start_month, start_year, end_month, end_year } =
      validatedData;

    // const is_user_exist = await authMdl.is_user_exist({ user_id });
    // if (is_user_exist?.success === 0) {
    //   return sendResponse(
    //     res,
    //     200,
    //     0,
    //     "failed to update freelancer education",
    //     [],
    //     "",
    //   );
    // } else if (is_user_exist?.data.length === 0) {
    //   return sendResponse(res, 200, 0, "No freelancer found", [], "");
    // }

    const freelancer_id_result = await freelancerMdl.fetchFreelancerId({
      user_id,
    });
    if (freelancer_id_result?.success === 0) {
      return sendResponse(
        res,
        200,
        0,
        "failed to fetch freelancer profile",
        [],
        "",
      );
    } else if (freelancer_id_result?.data.length === 0) {
      return sendResponse(
        res,
        200,
        0,
        "freelancer profile didn't exist",
        [],
        "",
      );
    }
    const freelancer_id = freelancer_id_result?.data[0]?.id;

    const result = await freelancerMdl.updateFreelancerEducation({
      freelancer_id,
      id,
      course,
      start_month,
      start_year,
      end_month,
      end_year,
    });
    if (result?.success === 0) {
      return sendResponse(res, 200, 0, "Failed to update education", [], "");
    } else if (result?.success === 1) {
      return sendResponse(res, 200, 1, "Freelancer education updated", [], "");
    }
  } catch (error) {
    return getServerError(res, error);
  }
};

export const deleteFreelancerEducation = async (req, res) => {
  try {
    const validatedData = validateRequest(
      deleteFreelancerEducationSchema,
      req.body,
      res,
    );
    const user_id = req.user.user_id;
    const { id } = validatedData;

    // const is_user_exist = await authMdl.is_user_exist({ user_id });
    // if (is_user_exist?.success === 0) {
    //   return sendResponse(
    //     res,
    //     200,
    //     0,
    //     "failed to delete freelancer education",
    //     [],
    //     "",
    //   );
    // } else if (is_user_exist?.data.length === 0) {
    //   return sendResponse(res, 200, 0, "No freelancer found", [], "");
    // }

    const freelancer_id_result = await freelancerMdl.fetchFreelancerId({
      user_id,
    });
    if (freelancer_id_result?.success === 0) {
      return sendResponse(
        res,
        200,
        0,
        "failed to fetch freelancer profile",
        [],
        "",
      );
    } else if (freelancer_id_result?.data.length === 0) {
      return sendResponse(
        res,
        200,
        0,
        "freelancer profile didn't exist",
        [],
        "",
      );
    }
    const freelancer_id = freelancer_id_result?.data[0]?.id;

    const result = await freelancerMdl.deleteFreelancerEducation({
      freelancer_id,
      id,
    });
    if (result?.success === 0) {
      return sendResponse(res, 200, 0, "Failed to delete education", [], "");
    } else if (result?.success === 1) {
      return sendResponse(res, 200, 1, "Freelancer education deleted", [], "");
    }
  } catch (error) {
    return getServerError(res, error);
  }
};

// FREELANCER WORK EXPERIENCE
export const createFreelancerWorkexp = async (req, res) => {
  try {
    const validatedData = validateRequest(
      createFreelancerWorkexpSchema,
      req.body,
      res,
    );
    const user_id = req.user.user_id;
    const { job_role, start_month, start_year, end_month, end_year } =
      validatedData;

    const freelancer_id_result = await freelancerMdl.fetchFreelancerId({
      user_id,
    });
    if (freelancer_id_result?.success === 0) {
      return sendResponse(
        res,
        200,
        0,
        "failed to fetch freelancer profile",
        [],
        "",
      );
    } else if (freelancer_id_result?.data.length === 0) {
      return sendResponse(
        res,
        200,
        0,
        "freelancer profile didn't exist",
        [],
        "",
      );
    }
    const freelancer_id = freelancer_id_result?.data[0]?.id;

    const result = await freelancerMdl.createFreelancerWorkexp({
      freelancer_id,
      job_role,
      start_month,
      start_year,
      end_month,
      end_year,
    });
    if (result?.success === 0) {
      return sendResponse(
        res,
        200,
        0,
        "Failed to create work experience",
        [],
        "",
      );
    } else if (result?.success === 1) {
      return sendResponse(
        res,
        200,
        1,
        "Freelancer work experience created",
        [],
        "",
      );
    }
  } catch (error) {
    return getServerError(res, error);
  }
};

export const updateFreelancerWorkexp = async (req, res) => {
  try {
    const validatedData = validateRequest(
      updateFreelancerWorkexpSchema,
      req.body,
      res,
    );
    const user_id = req.user.user_id;
    const { id, job_role, start_month, start_year, end_month, end_year } =
      validatedData;

    // const is_user_exist = await authMdl.is_user_exist({ user_id });
    // if (is_user_exist?.success === 0) {
    //   return sendResponse(
    //     res,
    //     200,
    //     0,
    //     "failed to update freelancer work experience",
    //     [],
    //     "",
    //   );
    // } else if (is_user_exist?.data.length === 0) {
    //   return sendResponse(res, 200, 0, "No freelancer found", [], "");
    // }

    const freelancer_id_result = await freelancerMdl.fetchFreelancerId({
      user_id,
    });
    if (freelancer_id_result?.success === 0) {
      return sendResponse(
        res,
        200,
        0,
        "failed to fetch freelancer profile",
        [],
        "",
      );
    } else if (freelancer_id_result?.data.length === 0) {
      return sendResponse(
        res,
        200,
        0,
        "freelancer profile didn't exist",
        [],
        "",
      );
    }
    const freelancer_id = freelancer_id_result?.data[0]?.id;

    const result = await freelancerMdl.updateFreelancerWorkexp({
      freelancer_id,
      id,
      job_role,
      start_month,
      start_year,
      end_month,
      end_year,
    });
    if (result?.success === 0) {
      return sendResponse(
        res,
        200,
        0,
        "Failed to update work experience",
        [],
        "",
      );
    } else if (result?.success === 1) {
      return sendResponse(
        res,
        200,
        1,
        "Freelancer work experience updated",
        [],
        "",
      );
    }
  } catch (error) {
    return getServerError(res, error);
  }
};

export const deleteFreelancerWorkexp = async (req, res) => {
  try {
    const validatedData = validateRequest(
      deleteFreelancerWorkexpSchema,
      req.body,
      res,
    );
    const user_id = req.user.user_id;
    const { id } = validatedData;

    // const is_user_exist = await authMdl.is_user_exist({ user_id });
    // if (is_user_exist?.success === 0) {
    //   return sendResponse(
    //     res,
    //     200,
    //     0,
    //     "failed to delete freelancer work experience",
    //     [],
    //     "",
    //   );
    // } else if (is_user_exist?.data.length === 0) {
    //   return sendResponse(res, 200, 0, "No freelancer found", [], "");
    // }

    const freelancer_id_result = await freelancerMdl.fetchFreelancerId({
      user_id,
    });
    if (freelancer_id_result?.success === 0) {
      return sendResponse(
        res,
        200,
        0,
        "failed to fetch freelancer profile",
        [],
        "",
      );
    } else if (freelancer_id_result?.data.length === 0) {
      return sendResponse(
        res,
        200,
        0,
        "freelancer profile didn't exist",
        [],
        "",
      );
    }
    const freelancer_id = freelancer_id_result?.data[0]?.id;

    const result = await freelancerMdl.deleteFreelancerWorkexp({
      freelancer_id,
      id,
    });
    if (result?.success === 0) {
      return sendResponse(
        res,
        200,
        0,
        "Failed to delete work experience",
        [],
        "",
      );
    } else if (result?.success === 1) {
      return sendResponse(
        res,
        200,
        1,
        "Freelancer work experience deleted",
        [],
        "",
      );
    }
  } catch (error) {
    return getServerError(res, error);
  }
};

// GET FREELANCER PROFILE DETAILS
export const getFreelancerProfile = async (req, res) => {
  try {
    const user_id = req.user.user_id;

    const freelancer_id_result = await freelancerMdl.fetchFreelancerId({
      user_id,
    });
    if (freelancer_id_result?.success === 0) {
      return sendResponse(
        res,
        200,
        0,
        "failed to fetch freelancer profile",
        [],
        "",
      );
    } else if (freelancer_id_result?.data.length === 0) {
      return sendResponse(
        res,
        200,
        0,
        "freelancer profile didn't exist",
        [],
        "",
      );
    }
    const freelancer_id = freelancer_id_result?.data[0]?.id;
    // console.log(freelancer_id);

    const [
      profile,
      languages,
      educations,
      positions,
      services,
      skills,
      work_exps,
    ] = await Promise.all([
      freelancerMdl.getProfile({ freelancer_id }),
      freelancerMdl.getLanguages({ freelancer_id }),
      freelancerMdl.getEducations({ freelancer_id }),
      freelancerMdl.getPositions({ freelancer_id }),
      freelancerMdl.getServices({ freelancer_id }),
      freelancerMdl.getSkills({ freelancer_id }),
      freelancerMdl.getWork_exps({ freelancer_id }),
    ]);

    const profile_data = profile?.data;
    const languages_data = languages?.data;
    const educations_data = educations?.data;
    const positions_data = positions?.data;
    const services_data = services?.data;
    const skills_data = skills?.data;
    const work_exps_data = work_exps?.data;

    const data = {
      profile: profile_data,
      languages: languages_data,
      educations: educations_data,
      positions: positions_data,
      services: services_data,
      skills: skills_data,
      work_exps: work_exps_data,
    };

    const final_response = replaceNullWithEmptyString(data);

    if (
      profile?.success === 0 ||
      languages?.success === 0 ||
      educations?.success === 0 ||
      positions?.success === 0 ||
      services?.success === 0 ||
      skills?.success === 0 ||
      work_exps?.success === 0
    ) {
      return sendResponse(
        res,
        200,
        0,
        "Failed to fetch freelancer profiless",
        [],
        "",
      );
    } else if (
      profile?.success === 1 &&
      languages?.success === 1 &&
      educations?.success === 1 &&
      positions?.success === 1 &&
      services?.success === 1 &&
      skills?.success === 1 &&
      work_exps?.success === 1
    ) {
      return sendResponse(
        res,
        200,
        1,
        "Freelancer profile fetched successfully",
        [final_response],
        "",
      );
    }
  } catch (error) {
    return getServerError(res, error);
  }
};

// UPDATE FREELANCER PROFILE
export const updateFreelancerProfile = async (req, res) => {
  try {
    const validatedData = validateRequest(
      updateFreelancerProfileSchema,
      req.body,
      res,
    );
    const user_id = req.user.user_id;
    const { name, profile_pic, about } = validatedData;

    let freelancer_id = await freelancerMdl.fetchFreelancerId({ user_id });
    freelancer_id = freelancer_id?.data[0]?.id;

    const query = [];
    const params = [];

    if (name) {
      query.push("name = ?");
      params.push(name);
    }
    if (profile_pic) {
      query.push("profile_pic = ?");
      params.push(profile_pic);
    }
    if (about) {
      query.push("about = ?");
      params.push(about);
    }

    params.push(freelancer_id);

    const result = await freelancerMdl.updateFreelancerProfile({
      query,
      params,
    });

    if (result?.success === 0) {
      return sendResponse(
        res,
        200,
        0,
        "Failed to update freelancer profile",
        [],
        "",
      );
    } else if (result?.success === 1) {
      return sendResponse(res, 200, 1, "Freelancer profile updated", [], "");
    }
  } catch (error) {
    return getServerError(res, error);
  }
};

export const updateFreelancerPosition = async (req, res) => {
  try {
    const validatedData = validateRequest(
      updateFreelancerPositionSchema,
      req.body,
      res,
    );
    const user_id = req.user.user_id;
    const { id, position_id, experience_id } = validatedData;

    let freelancer_id = await freelancerMdl.fetchFreelancerId({ user_id });
    freelancer_id = freelancer_id?.data[0]?.id;

    const result = await freelancerMdl.updateFreelancerPosition({
      id,
      freelancer_id,
      position_id,
      experience_id,
    });

    if (result?.success === 0) {
      return sendResponse(
        res,
        200,
        0,
        "Failed to update freelancer position",
        [],
        "",
      );
    } else if (result?.success === 1) {
      return sendResponse(res, 200, 1, "Freelancer position updated", [], "");
    }
  } catch (error) {
    return getServerError(res, error);
  }
};

export const updateFreelacnerSkills = async (req, res) => {
  let connection;
  try {
    const validatedData = validateRequest(
      updateFreelancerSkillsSchema,
      req.body,
      res,
    );
    const user_id = req.user.user_id;
    const { skill_id } = validatedData;

    let freelancer_id = await freelancerMdl.fetchFreelancerId({ user_id });
    freelancer_id = freelancer_id?.data[0]?.id;

    let db_skill_id = await freelancerMdl.fetchFreelancerSkillIds({
      freelancer_id,
    });

    const existing_skills = db_skill_id?.data.map((row) => row.id);
    const new_skills = skill_id;

    const delete_skill = existing_skills.filter(
      (id) => !new_skills.includes(id),
    );
    const add_skill = new_skills.filter((id) => !existing_skills.includes(id));

    connection = await pool.getConnection();
    await connection.beginTransaction();

    for (const id of delete_skill) {
      const delete_result = await freelancerMdl.deleteFreelancerSkills(
        { id, freelancer_id },
        connection,
      );
      if (delete_result?.success === 0) {
        if (connection) {
          await connection.rollback();
        }
        return sendResponse(res, 200, 0, "Failed to update skills", [], "");
      }
    }

    for (const id of add_skill) {
      const insert_result = await freelancerMdl.addFreelancerSkills(
        { id, freelancer_id },
        connection,
      );
      if (insert_result?.success === 0) {
        if (connection) {
          await connection.rollback();
        }
        return sendResponse(res, 200, 0, "Failed to update skills", [], "");
      }
    }

    await connection.commit();
    return sendResponse(res, 200, 1, "Skills updated successfully", [], "");
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    return getServerError(res, error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

export const updateFreelancerLanguages = async (req, res) => {
  let connection;
  try {
    const validatedData = validateRequest(
      updateFreelancerLanguagesSchema,
      req.body,
      res,
    );
    const user_id = req.user.user_id;
    const { languages } = validatedData;

    let freelancer_id = await freelancerMdl.fetchFreelancerId({ user_id });
    freelancer_id = freelancer_id?.data[0]?.id;
    let result;

    connection = await pool.getConnection();
    await connection.beginTransaction();

    for (const row of languages) {
      const id = row.id;
      const language_id = row.language_id;
      const proficiency_id = row.proficiency_id;
      result = await freelancerMdl.updateFreelancerLanguages(
        {
          id,
          language_id,
          proficiency_id,
          freelancer_id,
        },
        connection,
      );
      if (result?.success === 0) {
        if (connection) {
          await connection.rollback();
        }
        return sendResponse(res, 200, 0, "Failed to update language", [], "");
      }
    }

    await connection.commit();
    if (result?.success === 1) {
      return sendResponse(res, 200, 1, "Language updated successfully", [], "");
    }
  } catch (error) {
    return getServerError(res, error);
  }
};

export const addFreelancerLanguages = async (req, res) => {
  try {
    const validatedData = validateRequest(
      addFreelancerLanguagesSchema,
      req.body,
      res,
    );
    const user_id = req.user.user_id;
    const { languages } = validatedData;

    let freelancer_id = await freelancerMdl.fetchFreelancerId({ user_id });
    freelancer_id = freelancer_id?.data[0]?.id;
    let result;

    // console.log(languages, freelancer_id);

    for (const row of languages) {
      const language_id = row.language_id;
      const proficiency_id = row.proficiency_id;
      result = await freelancerMdl.addFreelancerSkills({
        language_id,
        proficiency_id,
        freelancer_id,
      });
    }
    if (result?.success === 1) {
      return sendResponse(res, 200, 1, "Language added successfully", [], "");
    } else if (result?.success === 0) {
      return sendResponse(res, 200, 0, "Failed to add language", [], "");
    }
  } catch (error) {
    return getServerError(res, error);
  }
};

export const updateFreelancerAddress = async (req, res) => {
  try {
    const validatedData = validateRequest(
      updateFreelancerAddressSchema,
      req.body,
      res,
    );
    const user_id = req.user.user_id;
    const { zip_code, address, city, state, country } = validatedData;

    let freelancer_id = await freelancerMdl.fetchFreelancerId({ user_id });
    freelancer_id = freelancer_id?.data[0]?.id;

    const result = await freelancerMdl.updateFreelancerAddress({
      zip_code,
      address,
      city,
      state,
      country,
      freelancer_id,
    });

    if (result?.success === 1) {
      return sendResponse(res, 200, 1, "Address updated successfully", [], "");
    } else if (result?.success === 0) {
      return sendResponse(res, 200, 0, "Failed to update address", [], "");
    }
  } catch (error) {
    return getServerError(res, error);
  }
};

export const updateFreelancerPreferences = async (req, res) => {
  try {
    const validatedData = validateRequest(
      updateFreelancerPreferenceSchema,
      req.body,
      res,
    );
    const user_id = req.user.user_id;
    const { is_available, is_notification } = validatedData;

    let freelancer_id = await freelancerMdl.fetchFreelancerId({ user_id });
    freelancer_id = freelancer_id?.data[0]?.id;

    let column_name = [];
    let params = [];
    if (is_available !== undefined) {
      column_name.push("is_available = ?");
      params.push(is_available);
    }
    if (is_notification !== undefined) {
      column_name.push("is_notification = ?");
      params.push(is_notification);
    }
    params.push(freelancer_id);

    const result = await freelancerMdl.updateFreelancerPreference({
      column_name,
      params,
      freelancer_id,
    });
    if (result?.success === 1) {
      return sendResponse(res, 200, 1, "Preference updated", [], "");
    } else if (result?.success === 0) {
      return sendResponse(res, 200, 0, "Failed to update Preference", [], "");
    }
  } catch (error) {
    return sendResponse(res, error);
  }
};

export const updateFreelancerPassword = async (req, res) => {
  try {
    const validatedData = validateRequest(updatepasswordSchema, req.body, res);
    const user_id = req.user.user_id;
    const { password } = validatedData;

    const salt = 10;
    const hashed_pwd = await bcrypt.hash(password, salt);

    const result = await freelancerMdl.updateFreelancerPassword({
      user_id,
      hashed_pwd,
    });

    if (result?.success === 0) {
      return sendResponse(res, 200, 0, "Failed to update password", [], "");
    } else if (result?.success === 1) {
      return sendResponse(res, 200, 1, "Password updated", [], "");
    }
  } catch (error) {
    return getServerError(res, error);
  }
};

export const updateFreelancerCredential = async (req, res) => {
  let connection;
  try {
    const validatedData = validateRequest(
      updateCredentialSchema,
      req.body,
      res,
    );
    const user_id = req.user.user_id;
    const { email, phn_num, c_code } = validatedData;

    connection = await pool.getConnection();
    await connection.beginTransaction();

    if (email) {
      const is_email_verify = await authMdl.is_email_num_verified({ email });
      if (
        is_email_verify?.data.length < 1 ||
        is_email_verify?.data[0]?.is_verified !== 1
      ) {
        if (connection) {
          await connection.rollback();
        }
        return sendResponse(res, 200, 0, "verify your email address", [], "");
      }
      const freelancer_result = await freelancerMdl.updateFreelancerEmail(
        {
          email,
          user_id,
        },
        connection,
      );
      const user_result = await supportMdl.updateUserEmail(
        { email, user_id },
        connection,
      );

      if (freelancer_result?.success === 0 || user_result?.success === 0) {
        if (connection) {
          await connection.rollback();
        }
        return sendResponse(res, 200, 0, "Failed to update email", [], "");
      } else if (
        freelancer_result?.success === 1 &&
        user_result?.success === 1
      ) {
        if (connection) {
          await connection.commit();
        }
        return sendResponse(res, 200, 1, "Email updated successfully", [], "");
      }
    }
    if (phn_num && c_code) {
      const is_email_verify = await authMdl.is_email_num_verified({ phn_num });
      if (
        is_email_verify?.data.length < 1 ||
        is_email_verify?.data[0]?.is_verified !== 1
      ) {
        if (connection) {
          await connection.rollback();
        }
        return sendResponse(res, 200, 0, "verify your mobile number", [], "");
      }
      const freelancer_result = await freelancerMdl.updateFreelancerPhn_num(
        {
          phn_num,
          c_code,
          user_id,
        },
        connection,
      );
      const user_result = await supportMdl.updateUserPhn_num(
        { phn_num, c_code, user_id },
        connection,
      );

      if (freelancer_result?.success === 0 || user_result?.success === 0) {
        if (connection) {
          await connection.rollback();
        }
        return sendResponse(res, 200, 0, "Failed to update number", [], "");
      } else if (
        freelancer_result?.success === 1 &&
        user_result?.success === 1
      ) {
        if (connection) {
          await connection.commit();
        }
        return sendResponse(
          res,
          200,
          1,
          "Mobile number updated successfully",
          [],
          "",
        );
      }
    }
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    return getServerError(res, error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

// SEARCH PROJECT
export const searchProject = async (req, res) => {
  try {
    // console.log(req.body);
    const validatedData = validateRequest(searchProjectSchema, req.body, res);
    const user_id = req.user.user_id;
    const { categories, experience, price, keyword, location } = validatedData;

    if (keyword) {
      const recent_search = await supportMdl.addRecentSearch({
        user_id,
        keyword,
      });
      const [delete_search, trend_search] = await Promise.all([
        supportMdl.delete_recent_search({
          user_id,
          keyword,
        }),
        supportMdl.addTrendingSearch({ user_id, keyword }),
      ]);
    }
    if (location) {
      const recent_location = await supportMdl.addRecentSearch({
        user_id,
        location,
      });
      const [delete_search, trend_search] = await Promise.all([
        supportMdl.delete_recent_search({
          user_id,
          location,
        }),
        supportMdl.addTrendingSearch({ user_id, location }),
      ]);
    }

    const result = await freelancerMdl.searchProjects({
      categories,
      experience,
      price,
      keyword,
      location,
    });
    const data = replaceNullWithEmptyString(result?.data);

    if (result?.success === 0) {
      return sendResponse(res, 200, 0, "Failed to fetch projects", [], "");
    } else if (result?.success === 1) {
      return sendResponse(
        res,
        200,
        1,
        "Projects fetched successfully",
        data,
        "",
      );
    }
  } catch (error) {
    return getServerError(res, error);
  }
};

// SAVED PROJECT
export const getSavedProject = async (req, res) => {
  try {
    const user_id = req.user.user_id;

    const result = await freelancerMdl.getSavedProjects({ user_id });
    if (result?.success === 0) {
      return sendResponse(res, 200, 0, "Failed to fetch saved project", [], "");
    }

    const project_ids = result?.data.map((row) => row.project_id);

    const saved_project_result = await projectMdl.getProjects({ project_ids });

    let data = saved_project_result?.data;
    data = replaceNullWithEmptyString(data);

    if (saved_project_result?.success === 1 && result?.success === 1) {
      return sendResponse(
        res,
        200,
        1,
        "saved projects fetched successfully",
        data,
        "",
      );
    } else if (saved_project_result?.success === 0 || result?.success === 0) {
      return sendResponse(
        res,
        200,
        0,
        "Failed to fetch saved projects",
        [],
        "",
      );
    }
  } catch (error) {
    return getServerError(res, error);
  }
};
export const addSaveProject = async (req, res) => {
  try {
    const validatedData = validateRequest(addSaveProjectSchema, req.body, res);
    const { project_id } = validatedData;
    const user_id = req.user.user_id;

    const already_exist = await freelancerMdl.checkSavedProject({
      user_id,
      project_id,
    });
    let result;

    if (already_exist?.success === 0) {
      return sendResponse(res, 200, 0, "Failed to save project", [], "");
    }

    if (already_exist?.data.length < 1) {
      result = await freelancerMdl.addSaveProject({
        user_id,
        project_id,
      });
      if (result?.success === 1) {
        return sendResponse(res, 200, 1, "Project saved successfully", [], "");
      } else if (result?.success === 0) {
        return sendResponse(res, 200, 0, "Failed to save project", [], "");
      }
    }

    if (already_exist?.data.length > 0) {
      if (already_exist?.data[0]?.status === 1) {
        return sendResponse(res, 200, 0, "Project already saved", [], "");
      } else if (already_exist?.data[0]?.status === 0) {
        const status = 1;
        result = await freelancerMdl.updateSavedProject({
          user_id,
          project_id,
          status,
        });
        if (result?.success === 1) {
          return sendResponse(
            res,
            200,
            1,
            "Project saved successfully",
            [],
            "",
          );
        } else if (result?.success === 0) {
          return sendResponse(res, 200, 0, "Failed to save project", [], "");
        }
      }
    }
  } catch (error) {
    return getServerError(res, error);
  }
};
export const unsaveProject = async (req, res) => {
  try {
    const validatedData = validateRequest(addSaveProjectSchema, req.body, res);
    const { project_id } = validatedData;
    const user_id = req.user.user_id;
    const status = 0;

    const result = await freelancerMdl.updateSavedProject({
      user_id,
      project_id,
      status,
    });

    if (result?.success === 1) {
      return sendResponse(res, 200, 1, "project unsaved successfully", [], "");
    } else if (result?.success === 0) {
      return sendResponse(res, 200, 0, "Failed to unsave project", [], "");
    }
  } catch (error) {
    return getServerError(res, error);
  }
};

// RECENTLY VISITED PROJECT
export const addRecentlyVisitedProject = async (req, res) => {
  try {
    const validatedData = validateRequest(
      addRecentlyVisitedProjectSchema,
      req.body,
      res,
    );
    const { project_id } = validatedData;
    const user_id = req.user.user_id;
    let result;

    const is_already_visit = await freelancerMdl.fetchRecentlyVisitedProjects({
      user_id,
      project_id,
    });
    if (is_already_visit?.success === 0) {
      return sendResponse(
        res,
        200,
        0,
        "Failed to add recently visited projects",
        [],
        "",
      );
    }

    if (is_already_visit?.data.length < 1) {
      result = await freelancerMdl.addRecentlyVisitedProject({
        user_id,
        project_id,
      });
      const delete_result = await freelancerMdl.delete_recently_viewed_projects(
        {
          user_id,
          project_id,
        },
      );
      if (result?.success === 1 && delete_result?.success === 1) {
        return sendResponse(
          res,
          200,
          1,
          "Recently visited project updated",
          [],
          "",
        );
      } else if (result?.success === 0 || delete_result?.success === 0) {
        return sendResponse(
          res,
          200,
          0,
          "Failed to update recently viewed project",
          [],
          "",
        );
      }
    }

    if (is_already_visit?.data.length > 0) {
      result = await freelancerMdl.updateRecentlyVisitedProject({
        user_id,
        project_id,
      });
      if (result?.success === 1) {
        return sendResponse(
          res,
          200,
          1,
          "Recently visited project updated",
          [],
          "",
        );
      } else if (result?.success === 0) {
        return sendResponse(
          res,
          200,
          0,
          "Failed to update recently viewed project",
          [],
          "",
        );
      }
    }
  } catch (error) {
    return getServerError(res, error);
  }
};
export const getRecentlyVisitedProject = async (req, res) => {
  try {
    const user_id = req.user.user_id;

    const result = await freelancerMdl.getRecentlyVisitedProject({
      user_id,
    });

    if (result?.success === 0) {
      return sendResponse(
        res,
        200,
        0,
        "Failed to fetch recently visited project",
        [],
        "",
      );
    }

    const project_ids = result?.data.map((row) => row.project_id);

    const saved_project_result = await projectMdl.getProjects({ project_ids });
    let data = replaceNullWithEmptyString(saved_project_result?.data);

    if (saved_project_result?.success === 1) {
      return sendResponse(
        res,
        200,
        1,
        "Recently visited projects fetched successfully",
        data,
        "",
      );
    } else if (saved_project_result?.success === 0) {
      return sendResponse(
        res,
        200,
        0,
        "Failed to fetch recently visited projects",
        [],
        "",
      );
    }
  } catch (error) {
    return getServerError(res, error);
  }
};

// REPORT CLIENT PROFILE
export const addReportClientProfile = async (req, res) => {
  try {
    const validatedData = validateRequest(ReportClientSchema, req.body, res);
    const { client_id, reason_id, reason } = validatedData;
    const user_id = req.user.user_id;

    const is_valid_client = await clientMdl.isValidClient({ client_id });
    if (is_valid_client?.success === 0) {
      return sendResponse(res, 200, 0, "Failed to report client", [], "");
    }
    if (is_valid_client?.data.length < 1) {
      return sendResponse(res, 200, 0, "Invalid client", [], "");
    }

    const result = await freelancerMdl.addReportClient({
      user_id,
      client_id,
      reason_id,
      reason: reason?.trim() || null,
    });

    if (result?.success === 0) {
      return sendResponse(res, 200, 0, "Failed to report", [], "");
    } else if (result?.success === 1) {
      return sendResponse(res, 200, 1, "Successfully reported", [], "");
    }
  } catch (error) {
    return getServerError(res, error);
  }
};

// SEND INTEREST
export const sendProjectInterest = async (req, res) => {
  try {
    const validatedData = validateRequest(sendInterestSchema, req.body, res);
    const { project_id } = validatedData;
    const user_id = req.user.user_id;

    const [is_project_id_valid, freelancer_id_result] = await Promise.all([
      projectMdl.getSoloProject({
        id: project_id,
      }),
      freelancerMdl.fetchFreelancerId({
        user_id,
      }),
    ]);

    if (is_project_id_valid?.success === 0) {
      return sendResponse(res, 200, 0, "Failed to send interest", [], "");
    }
    if (is_project_id_valid?.data.length < 1) {
      return sendResponse(res, 200, 0, "Invalid project id", [], "");
    }

    if (freelancer_id_result?.success === 0) {
      return sendResponse(res, 200, 0, "Failed to send interest", [], "");
    }
    if (freelancer_id_result?.data.length < 1) {
      return sendResponse(res, 200, 0, "Invalid freelancer id", [], "");
    }

    const freelancer_id = freelancer_id_result?.data[0]?.id;

    const initiated_by = "FREELANCER";
    const status = "pending";

    const result = await freelancerMdl.sendProjectInterest({
      freelancer_id,
      project_id,
      initiated_by,
      status,
    });

    if (result?.success === 0) {
      return sendResponse(res, 200, 0, "Failed to send interest", [], "");
    } else if (result?.success === 1) {
      return sendResponse(res, 200, 1, "Project sent successfully", [], "");
    }
  } catch (error) {
    return getServerError(res, error);
  }
};
