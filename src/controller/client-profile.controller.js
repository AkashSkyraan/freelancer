import express from "express";
import {
  getServerError,
  replaceNullWithEmptyString,
  sendResponse,
} from "../utils/helper.js";
import {
  addRecentlyVisitedFreelancerSchema,
  addSaveFreelancerSchema,
  createCProfileSchema,
  createProjectSchema,
  deleteClientProfileSchema,
  getViewFreelancerProfileSchema,
  inviteToProjectSchema,
  rateFreelancerSchema,
  reportFreelancerSchema,
  searchFreelancerSchema,
  updateCProfileSchema,
  updateCredentialSchema,
  updateFreelancerPreferenceSchema,
  updatepasswordSchema,
  validateRequest,
} from "../utils/validator.js";
import { clientModel } from "../model/client-profile.model.js";
import { authModel } from "../model/auth.model.js";
import { pool } from "../config/db.js";
import bcrypt from "bcrypt";
import { supportModel } from "../model/support.model.js";
import { projectModel } from "../model/project.model.js";
import { freelancerModel } from "../model/freelancer-profile.model.js";

const clientMdl = new clientModel();
const authMdl = new authModel();
const supportMdl = new supportModel();
const projectMdl = new projectModel();
const freelancerMdl = new freelancerModel();

export const createClientProfile = async (req, res) => {
  let connection;
  try {
    const validatedData = validateRequest(createCProfileSchema, req.body, res);
    const user_id = req.user.user_id;
    const {
      name,
      profile,
      com_name,
      com_type,
      com_size,
      com_site,
      email,
      phn_num,
      c_code,
      zip_code,
      address,
      city,
      state,
      country,
      lat,
      lng,
      about,
    } = validatedData;

    // const is_user_exist = await authMdl.is_user_exist({ user_id });
    // if (is_user_exist?.data.length < 1) {
    //   return sendResponse(res, 200, 0, "No user found", [], "");
    // }

    const [email_verify, number_verify, is_exist] = await Promise.all([
      authMdl.is_email_num_verified({ email }),
      authMdl.is_email_num_verified({ phn_num }),
      clientMdl.is_already_registered({ email, phn_num }),
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
    const is_already_registered = is_exist?.data.length;

    if (is_already_registered === 1) {
      return sendResponse(
        res,
        200,
        0,
        "Email or number already registered",
        [],
        "",
      );
    } else if (is_email_verified === 0) {
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
    const result = await clientMdl.createCProfile(
      {
        user_id,
        name,
        profile,
        com_name,
        com_type,
        com_size,
        com_site,
        email,
        phn_num,
        c_code,
        zip_code,
        address,
        city,
        state,
        country,
        lat,
        lng,
        about,
        is_email_verified,
        is_number_verified,
      },
      connection,
    );
    const add_phnnum_result = await clientMdl.add_phnnum(
      { phn_num, c_code, user_id },
      connection,
    );
    const change_form_status = await clientMdl.changeFormStatus(
      { user_id },
      connection,
    );

    if (
      result?.success === 1 &&
      add_phnnum_result?.success === 1 &&
      change_form_status?.success === 1
    ) {
      await connection.commit();
      return sendResponse(res, 200, 1, "Profile created successfully", [], "");
    } else if (
      result?.success === 0 ||
      add_phnnum_result?.success === 0 ||
      change_form_status?.success === 0
    ) {
      await connection.rollback();
      return sendResponse(res, 200, 0, "Failed to create profile", [], "");
    }
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    return getServerError(res, error);
  } finally {
    if (connection) {
      await connection.release();
    }
  }
};

export const deleteClientProfile = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const validatedData = validateRequest(
      deleteClientProfileSchema,
      req.body,
      res,
    );

    const { id } = validatedData;

    const result = await clientMdl.deleteClientProfile({ id, user_id });

    if (result?.success === 1) {
      return sendResponse(
        res,
        200,
        1,
        "Client profile deleted successfully",
        [],
        "",
      );
    } else if (result?.success === 0) {
      return sendResponse(
        res,
        200,
        0,
        "Failed to delete client profile",
        [],
        "",
      );
    }
  } catch (error) {
    return getServerError(res, error);
  }
};

export const updateClientProfile = async (req, res) => {
  try {
    const validatedData = validateRequest(updateCProfileSchema, req.body, res);
    const user_id = req.user.user_id;
    const {
      id,
      name,
      profile,
      com_name,
      com_type,
      com_size,
      com_site,
      email,
      phn_num,
      c_code,
      zip_code,
      address,
      city,
      state,
      country,
      about,
    } = validatedData;

    let query = [];
    let params = [];

    if (name) {
      query.push("name = ?");
      params.push(name);
    }
    if (profile) {
      query.push("profile_pic = ?");
      params.push(profile);
    }
    if (com_name) {
      query.push("company_name = ?");
      params.push(com_name);
    }
    if (com_type) {
      query.push("company_type = ?");
      params.push(com_type);
    }
    if (com_size) {
      query.push("company_size = ?");
      params.push(com_size);
    }
    if (com_site) {
      query.push("company_site = ?");
      params.push(com_site);
    }
    if (email) {
      const is_email_verified = await authMdl.is_email_num_verified({ email });
      if (
        is_email_verified?.data.length === 0 ||
        is_email_verified?.data[0]?.is_verified === 0
      ) {
        return sendResponse(res, 200, 0, "Email not verified", [], "");
      }
      query.push("email = ?");
      params.push(email);
    }
    if (phn_num) {
      const is_email_verified = await authMdl.is_email_num_verified({
        phn_num,
      });
      if (
        is_email_verified?.data.length === 0 ||
        is_email_verified?.data[0]?.is_verified === 0
      ) {
        return sendResponse(res, 200, 0, "Number not verified", [], "");
      }
      query.push("phn_num = ?");
      params.push(phn_num);
    }
    if (c_code) {
      const is_email_verified = await authMdl.is_email_num_verified({
        phn_num,
      });
      if (
        is_email_verified?.data.length === 0 ||
        is_email_verified?.data[0]?.is_verified === 0
      ) {
        return sendResponse(res, 200, 0, "Number not verified", [], "");
      }
      query.push("c_code = ?");
      params.push(c_code);
    }
    if (zip_code) {
      query.push("zip_code = ?");
      params.push(zip_code);
    }
    if (address) {
      query.push("address = ?");
      params.push(address);
    }
    if (city) {
      query.push("city = ?");
      params.push(city);
    }
    if (state) {
      query.push("state = ?");
      params.push(state);
    }
    if (country) {
      query.push("country = ?");
      params.push(country);
    }
    if (about) {
      query.push("about = ?");
      params.push(about);
    }

    params.push(id, user_id);

    const result = await clientMdl.updateClientProfile({ query, params });

    if (result?.success === 1) {
      return sendResponse(
        res,
        200,
        1,
        "Client profile updated successfully",
        [],
        "",
      );
    } else if (result?.success === 0) {
      return sendResponse(
        res,
        200,
        0,
        "Failed to update client profile",
        [],
        "",
      );
    }
  } catch (error) {
    return getServerError(res, error);
  }
};

export const getClientProfile = async (req, res) => {
  try {
    const user_id = req.user.user_id;

    const result = await clientMdl.getClientProfile({ user_id });

    const data = replaceNullWithEmptyString(result?.data);

    if (result?.success === 1) {
      return sendResponse(
        res,
        200,
        1,
        "Client profile fetched successfully",
        data,
        "",
      );
    } else if (result?.success === 0) {
      return sendResponse(
        res,
        200,
        1,
        "Failed to fetch client profile",
        [],
        "",
      );
    }
  } catch (error) {
    return getServerError(res, error);
  }
};

export const updateClientPassword = async (req, res) => {
  try {
    const validatedData = validateRequest(updatepasswordSchema, req.body, res);
    const user_id = req.user.user_id;
    const { password } = validatedData;

    const salt = 10;
    const hashed_pwd = await bcrypt.hash(password, salt);

    const result = await clientMdl.updateClientPassword({
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

export const updateClientCredential = async (req, res) => {
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
      const freelancer_result = await clientMdl.updateClientEmail(
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
      const freelancer_result = await clientMdl.updateClientPhn_num(
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

export const updateClientPreferences = async (req, res) => {
  try {
    const validatedData = validateRequest(
      updateFreelancerPreferenceSchema,
      req.body,
      res,
    );
    const user_id = req.user.user_id;
    const { is_available, is_notification } = validatedData;

    let freelancer_id = await clientMdl.fetchClientId({ user_id });
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

    const result = await clientMdl.updateClientPreference({
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

// SAVED FREELACNERS
export const addSaveFreelancer = async (req, res) => {
  try {
    const validatedData = validateRequest(
      addSaveFreelancerSchema,
      req.body,
      res,
    );
    const { freelancer_id } = validatedData;
    const user_id = req.user.user_id;

    const check_saved_freelancer = await clientMdl.checkSavedFreelancer({
      user_id,
      freelancer_id,
    });
    if (check_saved_freelancer?.success === 0) {
      return sendResponse(res, 200, 0, "Failed to save freelancer", [], "");
    }

    if (check_saved_freelancer?.data.length < 1) {
      const result = await clientMdl.addSaveFreelancer({
        user_id,
        freelancer_id,
      });
      if (result?.success === 0) {
        return sendResponse(res, 200, 0, "Failed to save freelancer", [], "");
      } else if (result?.success === 1) {
        return sendResponse(
          res,
          200,
          1,
          "Freelancer saved successfully",
          [],
          "",
        );
      }
    }

    if (check_saved_freelancer?.data.length > 0) {
      const status = 1;
      if (check_saved_freelancer?.data[0]?.status === 0) {
        const result = await clientMdl.updateSavedFreelancer({
          user_id,
          freelancer_id,
          status,
        });
        if (result?.success === 0) {
          return sendResponse(res, 200, 0, "Failed to save freelancer", [], "");
        } else if (result?.success === 1) {
          return sendResponse(
            res,
            200,
            1,
            "Freelancer saved successfully",
            [],
            "",
          );
        }
      } else {
        return sendResponse(
          res,
          200,
          0,
          "Failed to save or already saved",
          [],
          "",
        );
      }
    }
  } catch (error) {
    return getServerError(res, error);
  }
};

export const unsaveFreelancer = async (req, res) => {
  try {
    const validatedData = validateRequest(
      addSaveFreelancerSchema,
      req.body,
      res,
    );
    const { freelancer_id } = validatedData;
    const user_id = req.user.user_id;
    const status = 0;

    const unSaveResult = await clientMdl.updateSavedFreelancer({
      user_id,
      freelancer_id,
      status,
    });
    if (unSaveResult?.success === 0) {
      return sendResponse(res, 200, 0, "Failed to unsave freelancer", [], "");
    } else if (unSaveResult?.success === 1) {
      return sendResponse(
        res,
        200,
        1,
        "unsaved freelancer successfully",
        [],
        "",
      );
    }
  } catch (error) {
    return getServerError(res, error);
  }
};

export const getSavedFreelancer = async (req, res) => {
  try {
    const user_id = req.user.user_id;

    const result = await clientMdl.getSavedFreelancer({ user_id });
    if (result?.success === 0) {
      return sendResponse(
        res,
        200,
        0,
        "Failed to fetch saved freelancers",
        [],
        "",
      );
    }
    const data = replaceNullWithEmptyString(result?.data);

    if (result?.success === 1) {
      return sendResponse(
        res,
        200,
        1,
        "Fetched saved freelancers successfully",
        data,
        "",
      );
    }
  } catch (error) {
    return getServerError(res, error);
  }
};

// RECENTLY VISITED FREELANCERS
export const addRecentlyVisitedFreelancers = async (req, res) => {
  let connection;
  try {
    const validatedData = validateRequest(
      addRecentlyVisitedFreelancerSchema,
      req.body,
      res,
    );
    const { freelancer_id } = validatedData;
    const user_id = req.user.user_id;

    const is_already_visit = await clientMdl.fetchRecentlyVisitedFreelancers({
      user_id,
      freelancer_id,
    });
    // console.log(is_already_visit);
    if (is_already_visit?.success === 0) {
      return sendResponse(
        res,
        200,
        0,
        "Failed to add recently visited freelancers",
        [],
        "",
      );
    }

    connection = await pool.getConnection();
    await connection.beginTransaction();

    if (is_already_visit?.data.length < 1) {
      const result = await clientMdl.addRecentlyVisitedFreelancers(
        {
          user_id,
          freelancer_id,
        },
        connection,
      );
      const delete_result = await clientMdl.delete_recently_visited_freelancers(
        { user_id, freelancer_id },
        connection,
      );

      if (result?.success === 0 || delete_result?.success === 0) {
        if (connection) {
          await connection.rollback();
        }
        return sendResponse(
          res,
          200,
          0,
          "Failed to add recently visited freelancers",
          [],
          "",
        );
      } else if (result?.success === 1 && delete_result?.success === 1) {
        if (connection) {
          await connection.commit();
        }
        return sendResponse(
          res,
          200,
          1,
          "Recently visited freelancers added successfully",
          [],
          "",
        );
      }
    }

    if (is_already_visit?.data.length > 0) {
      const result = await clientMdl.updateRecentlyVisitedFreelancers({
        user_id,
        freelancer_id,
      });
      if (result?.success === 0) {
        return sendResponse(
          res,
          200,
          0,
          "Failed to add recently visited freelancers",
          [],
          "",
        );
      } else if (result?.success === 1) {
        return sendResponse(
          res,
          200,
          1,
          "Recently visited freelancers added successfully",
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
export const getRecentlyVisitedFreelancers = async (req, res) => {
  try {
    const user_id = req.user.user_id;

    const result = await clientMdl.getRecentlyViewedFreelancer({ user_id });
    if (result?.success === 0) {
      return sendResponse(
        res,
        200,
        0,
        "Failed to fetch recently visited freelancers",
        [],
        "",
      );
    }

    const data = replaceNullWithEmptyString(result?.data);

    if (result?.success === 1) {
      return sendResponse(
        res,
        200,
        1,
        "Recently visited freelancers fetched successfully",
        data,
        "",
      );
    }
  } catch (error) {
    return getServerError(res, error);
  }
};

// SEARCH FREELANCER
export const searchFreelancer = async (req, res) => {
  try {
    const validatedData = validateRequest(
      searchFreelancerSchema,
      req.body,
      res,
    );
    const { categories, experience, rating, keyword, location } = validatedData;
    const user_id = req.user.user_id;

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

    const result = await clientMdl.searchFreelancers({
      user_id,
      categories,
      experience,
      rating,
      keyword,
      location,
    });
    if (result?.success === 0) {
      return sendResponse(res, 200, 0, "Failed to fetch freelancers", [], "");
    }

    const data = replaceNullWithEmptyString(result?.data);

    if (result?.success === 1) {
      return sendResponse(
        res,
        200,
        1,
        "Freelancers fetched successfully",
        data,
        "",
      );
    }
  } catch (error) {
    return getServerError(res, error);
  }
};

// RATE AND REVIEW FREELANCER -> rating and also update in freelancer profile avg_rating
export const addRateFreelancer = async (req, res) => {
  let connection;
  try {
    const validatedData = validateRequest(rateFreelancerSchema, req.body, res);
    const { freelancer_id, project_id, rating, review } = validatedData;
    const user_id = req.user.user_id;

    const fetch_client_result = await clientMdl.fetchClientId({ user_id });
    if (fetch_client_result?.success === 0) {
      return sendResponse(res, 200, 0, "Failed to rate freelancer", [], "");
    }

    const client_id = fetch_client_result?.data[0]?.id;

    connection = await pool.getConnection();
    await connection.beginTransaction();

    const result = await clientMdl.addRateFreelancer(
      {
        client_id,
        freelancer_id,
        project_id,
        rating,
        review,
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
        "Failed to add freelancer ratings",
        [],
        "",
      );
    }

    const fetch_result = await clientMdl.fetchAverageRatings(
      { freelancer_id },
      connection,
    );
    if (fetch_result?.success === 0) {
      if (connection) {
        await connection.rollback();
      }
      return sendResponse(
        res,
        200,
        0,
        "Failed to add freelancer ratings",
        [],
        "",
      );
    }

    const average_ratings = fetch_result?.data[0]?.average_ratings;
    const total_ratings = fetch_result?.data[0]?.total_ratings;
    const update_result = await clientMdl.updateAverageRatings(
      {
        freelancer_id,
        average_ratings,
        total_ratings,
      },
      connection,
    );
    if (update_result?.success === 0) {
      if (connection) {
        await connection.rollback();
      }
      return sendResponse(
        res,
        200,
        0,
        "Failed to add freelancer ratings",
        [],
        "",
      );
    }

    if (
      result?.success === 1 &&
      fetch_result?.success === 1 &&
      update_result?.success === 1
    ) {
      if (connection) {
        await connection.commit();
      }
      return sendResponse(res, 200, 1, "Rated freelancer successfully", [], "");
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

// GET MY PROJECTS
export const getMyProjects = async (req, res) => {
  try {
    const user_id = req.user.user_id;

    const fetch_project_id = await clientMdl.getMyProjects({ user_id });

    if (fetch_project_id?.success === 0) {
      return sendResponse(res, 200, 0, "Failed to fetch my projects", [], "");
    }
    const project_ids = fetch_project_id?.data.map((row) => row.id);

    const result = await projectMdl.getProjects({ project_ids });
    if (result?.success === 0) {
      return sendResponse(res, 200, 0, "Failed to fetch my projects", [], "");
    }

    const data = replaceNullWithEmptyString(result?.data);
    if (result?.success === 1) {
      return sendResponse(
        res,
        200,
        1,
        "My projects fetched successfully",
        data,
        "",
      );
    }
  } catch (error) {
    return getServerError(res, error);
  }
};

// INVITE TO PROJECTS
export const inviteToProjects = async (req, res) => {
  try {
    const validatedData = validateRequest(inviteToProjectSchema, req.body, res);
    const { project_id, freelancer_id } = validatedData;

    let result;
    for (const id of project_id) {
      result = await clientMdl.inviteToProjects({
        project_id: id,
        freelancer_id,
      });
      if (result?.success === 0) {
        return sendResponse(
          res,
          200,
          0,
          "Failed to send project invite",
          [],
          "",
        );
      }
    }
    if (result?.success === 1) {
      return sendResponse(
        res,
        200,
        1,
        "Project invite sent successfully",
        [],
        "",
      );
    }
  } catch (error) {
    return getServerError(res, error);
  }
};

// VIEW FREELANCER PROFILE
export const getViewFreelancerProfile = async (req, res) => {
  try {
    const validatedData = validateRequest(
      getViewFreelancerProfileSchema,
      req.body,
      res,
    );
    const { freelancer_id } = validatedData;

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

    const [ratings, completed_projects, feedbacks] = await Promise.all([
      freelancerMdl.getMyRatings({ freelancer_id }),
      freelancerMdl.getCompletedProjects({ freelancer_id }),
      freelancerMdl.getMyFeedbacks({ freelancer_id }),
    ]);

    if (
      profile?.success === 0 ||
      languages?.success === 0 ||
      educations?.success === 0 ||
      positions?.success === 0 ||
      services?.success === 0 ||
      skills?.success === 0 ||
      work_exps?.success === 0 ||
      ratings?.success === 0 ||
      feedbacks?.success === 0 ||
      completed_projects?.success === 0
    ) {
      return sendResponse(
        res,
        200,
        0,
        "Failed to fetch freelancer profile",
        [],
        "",
      );
    }

    const profile_data = profile?.data;
    const languages_data = languages?.data;
    const educations_data = educations?.data;
    const positions_data = positions?.data;
    const services_data = services?.data;
    const skills_data = skills?.data;
    const work_exps_data = work_exps?.data;
    const ratings_data = ratings?.data;
    const feedbacks_data = feedbacks?.data;
    const completed_projects_data = completed_projects?.data;

    const data = {
      profile: profile_data,
      languages: languages_data,
      educations: educations_data,
      positions: positions_data,
      services: services_data,
      skills: skills_data,
      work_exps: work_exps_data,
      ratings: ratings_data,
      feedbacks: feedbacks_data,
      completed_projects: completed_projects_data,
    };
    const final_response = replaceNullWithEmptyString(data);
    if (
      profile?.success === 1 &&
      languages?.success === 1 &&
      educations?.success === 1 &&
      positions?.success === 1 &&
      services?.success === 1 &&
      skills?.success === 1 &&
      work_exps?.success === 1 &&
      ratings?.success === 1 &&
      feedbacks?.success === 1 &&
      completed_projects?.success === 1
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

// REPORT FREELANCER PROFILE
export const reportFreelancerProfile = async (req, res) => {
  try {
    const validatedData = validateRequest(
      reportFreelancerSchema,
      req.body,
      res,
    );
    const user_id = req.user.user_id;
    const { freelancer_id, reason_id, reason } = validatedData;

    const result = await clientMdl.addReportFreelancer({
      user_id,
      freelancer_id,
      reason_id,
      reason: reason?.trim() || null,
    });

    if (result?.success === 0) {
      return sendResponse(res, 200, 0, "Failed to report freelancer", [], "");
    }

    if (result?.success === 1) {
      return sendResponse(
        res,
        200,
        1,
        "Reported freelancer successfully",
        [],
        "",
      );
    }
  } catch (error) {
    return getServerError(res, error);
  }
};
