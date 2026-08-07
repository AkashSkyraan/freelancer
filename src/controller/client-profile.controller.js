import express from "express";
import {
  getServerError,
  replaceNullWithEmptyString,
  sendResponse,
} from "../utils/helper.js";
import {
  createCProfileSchema,
  createProjectSchema,
  deleteClientProfileSchema,
  updateCProfileSchema,
  validateRequest,
} from "../utils/validator.js";
import { clientModel } from "../model/client-profile.model.js";
import { authModel } from "../model/auth.model.js";
import { pool } from "../config/db.js";

const clientMdl = new clientModel();
const authMdl = new authModel();

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
