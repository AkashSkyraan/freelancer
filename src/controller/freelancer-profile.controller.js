import express from "express";
import { getServerError, sendResponse } from "../utils/helper.js";
import {
  createFreelancerEducationSchema,
  createFreelancerPositionSchema,
  createFreelancerProfileSchema,
  createFreelancerServiceSchema,
  createFreelancerSkillSchema,
  createFreelancerWorkexpSchema,
  deleteFreelancerEducationSchema,
  deleteFreelancerWorkexpSchema,
  getFreelancerProfileSchema,
  updateFreelancerEducationSchema,
  updateFreelancerWorkexpSchema,
  validateRequest,
} from "../utils/validator.js";
import { pool } from "../config/db.js";
import { authModel } from "../model/auth.model.js";
import { freelancerModel } from "../model/freelancer-profile.model.js";
const authMdl = new authModel();
const freelancerMdl = new freelancerModel();

// FREELANCER ONBOARDING PROFILE
export const createFreelancerProfile = async (req, res) => {
  let connection;
  try {
    const validatedData = validateRequest(
      createFreelancerProfileSchema,
      req.body,
      res,
    );
    const {
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
      languages,
    } = validatedData;

    const user_check = await authMdl.is_user_exist({ user_id });
    if (user_check?.data.length < 1) {
      return sendResponse(res, 200, 0, "Invalid user", [], "");
    }

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
    const { user_id, position_id, experience_id } = validatedData;

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
    const { user_id, service_id } = validatedData;

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
    const { user_id, skill_id } = validatedData;

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
    const { user_id, course, start_month, start_year, end_month, end_year } =
      validatedData;

    const is_user_exist = await authMdl.is_user_exist({ user_id });
    if (is_user_exist?.success === 0) {
      return sendResponse(
        res,
        200,
        0,
        "failed to create freelancer education",
        [],
        "",
      );
    } else if (is_user_exist?.data.length === 0) {
      return sendResponse(res, 200, 0, "No freelancer found", [], "");
    }

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
    const {
      user_id,
      id,
      course,
      start_month,
      start_year,
      end_month,
      end_year,
    } = validatedData;

    const is_user_exist = await authMdl.is_user_exist({ user_id });
    if (is_user_exist?.success === 0) {
      return sendResponse(
        res,
        200,
        0,
        "failed to update freelancer education",
        [],
        "",
      );
    } else if (is_user_exist?.data.length === 0) {
      return sendResponse(res, 200, 0, "No freelancer found", [], "");
    }

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
    const { user_id, id } = validatedData;

    const is_user_exist = await authMdl.is_user_exist({ user_id });
    if (is_user_exist?.success === 0) {
      return sendResponse(
        res,
        200,
        0,
        "failed to delete freelancer education",
        [],
        "",
      );
    } else if (is_user_exist?.data.length === 0) {
      return sendResponse(res, 200, 0, "No freelancer found", [], "");
    }

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
    const { user_id, job_role, start_month, start_year, end_month, end_year } =
      validatedData;

    const is_user_exist = await authMdl.is_user_exist({ user_id });
    if (is_user_exist?.success === 0) {
      return sendResponse(
        res,
        200,
        0,
        "failed to create freelancer work experience",
        [],
        "",
      );
    } else if (is_user_exist?.data.length === 0) {
      return sendResponse(res, 200, 0, "No freelancer found", [], "");
    }

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
    const {
      user_id,
      id,
      job_role,
      start_month,
      start_year,
      end_month,
      end_year,
    } = validatedData;

    const is_user_exist = await authMdl.is_user_exist({ user_id });
    if (is_user_exist?.success === 0) {
      return sendResponse(
        res,
        200,
        0,
        "failed to update freelancer work experience",
        [],
        "",
      );
    } else if (is_user_exist?.data.length === 0) {
      return sendResponse(res, 200, 0, "No freelancer found", [], "");
    }

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
    const { user_id, id } = validatedData;

    const is_user_exist = await authMdl.is_user_exist({ user_id });
    if (is_user_exist?.success === 0) {
      return sendResponse(
        res,
        200,
        0,
        "failed to delete freelancer work experience",
        [],
        "",
      );
    } else if (is_user_exist?.data.length === 0) {
      return sendResponse(res, 200, 0, "No freelancer found", [], "");
    }

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
    const validatedData = validateRequest(
      getFreelancerProfileSchema,
      req.body,
      res,
    );
    const { user_id } = validatedData;

    const is_user_exist = await authMdl.is_user_exist({ user_id });
    if (is_user_exist?.success === 0) {
      return sendResponse(
        res,
        200,
        0,
        "failed to fetch freelancer profile",
        [],
        "",
      );
    } else if (is_user_exist?.data.length === 0) {
      return sendResponse(res, 200, 0, "No freelancer found", [], "");
    }

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
    console.log(freelancer_id);

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
        "Failed to fetch freelancer profile",
        [
          profile_data,
          languages_data,
          educations_data,
          positions_data,
          services_data,
          skills_data,
          work_exps_data,
        ],
        "",
      );
    } else if (
      profile?.success === 0 &&
      languages?.success === 0 &&
      educations?.success === 0 &&
      positions?.success === 0 &&
      services?.success === 0 &&
      skills?.success === 0 &&
      work_exps?.success === 0
    ) {
      return sendResponse(
        res,
        200,
        1,
        "Freelancer profile fetched successfully",
        [],
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
  } catch (error) {
    return getServerError(res, error);
  }
};
