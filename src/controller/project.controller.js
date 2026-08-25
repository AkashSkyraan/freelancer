import express from "express";
import { projectModel } from "../model/project.model.js";
import {
  getServerError,
  replaceNullWithEmptyString,
  sendResponse,
} from "../utils/helper.js";
import {
  changeProjectstatusSchema,
  createProjectSchema,
  deleteProjectSchema,
  getIndividualProjectSchema,
  projectRepostSchema,
  updateProjectSchema,
  updateProjectViewCountSchema,
  validateRequest,
} from "../utils/validator.js";
import { clientModel } from "../model/client-profile.model.js";
import { pool } from "../config/db.js";

const projectMdl = new projectModel();
const clientMdl = new clientModel();

export const createProject = async (req, res) => {
  try {
    const validatedData = validateRequest(createProjectSchema, req.body, res);
    const user_id = req.user.user_id;
    const {
      title,
      description,
      skills,
      talent_role,
      duration,
      duration_type,
      experience,
      price,
      price_type,
      open_position,
    } = validatedData;

    const location_result = await clientMdl.fetchClientLocation({ user_id });

    const zip_code = location_result?.data[0]?.zip_code;
    const city = location_result?.data[0]?.city;
    const state = location_result?.data[0]?.state;
    const country = location_result?.data[0]?.country;
    const address = location_result?.data[0]?.address;
    const lat = location_result?.data[0]?.lat;
    const lng = location_result?.data[0]?.lng;

    const result = await projectMdl.createProject({
      user_id,
      title,
      description,
      skills,
      talent_role,
      duration,
      duration_type,
      experience,
      price,
      price_type,
      open_position,
      address,
      city,
      state,
      country,
      zip_code,
      lat,
      lng,
    });
    if (result?.success === 1) {
      return sendResponse(res, 200, 1, "project created successfully", [], "");
    } else if (result?.success === 0) {
      return sendResponse(res, 200, 0, "failed to create project", [], "");
    }
  } catch (error) {
    return getServerError(res, error);
  }
};

export const deleteProject = async (req, res) => {
  try {
    const validatedData = validateRequest(deleteProjectSchema, req.body, res);
    const { id } = validatedData;
    const user_id = req.user.user_id;

    const result = await projectMdl.deleteSoloProject({ id, user_id });

    if (result?.success === 1) {
      return sendResponse(res, 200, 1, "project deleted successfully", [], "");
    } else if (result?.success === 0) {
      return sendResponse(res, 200, 0, "Failed to delete project", [], "");
    }
  } catch (error) {
    return getServerError(res, error);
  }
};

export const getSoloProject = async (req, res) => {
  try {
    const validatedData = validateRequest(
      getIndividualProjectSchema,
      req.body,
      res,
    );
    const { id } = validatedData;

    const result = await projectMdl.getSoloProject({ id });

    const data = replaceNullWithEmptyString(result?.data);

    if (result?.success === 1) {
      return sendResponse(
        res,
        200,
        1,
        "project details fetched successfully",
        data,
        "",
      );
    } else if (result?.success === 0) {
      return sendResponse(
        res,
        200,
        0,
        "Failed to fetch project detail",
        [],
        "",
      );
    }
  } catch (error) {
    return getServerError(res, error);
  }
};

export const updateProject = async (req, res) => {
  try {
    const validatedData = validateRequest(updateProjectSchema, req.body, res);
    const user_id = req.user.user_id;
    const {
      id,
      title,
      description,
      skills,
      talent_role,
      duration,
      duration_type,
      experience,
      price,
      price_type,
      open_position,
    } = validatedData;

    const result = await projectMdl.updateProject({
      id,
      user_id,
      title,
      description,
      skills,
      talent_role,
      duration,
      duration_type,
      experience,
      price,
      price_type,
      open_position,
    });

    if (result?.success === 1) {
      return sendResponse(res, 200, 1, "Project updated successfully", [], "");
    } else if (result?.success === 0) {
      return sendResponse(res, 200, 0, "Failed to update project", [], "");
    }
  } catch (error) {
    return getServerError(res, error);
  }
};

export const updateViewCount = async (req, res) => {
  let connection;
  try {
    const validatedData = validateRequest(
      updateProjectViewCountSchema,
      req.body,
      res,
    );
    const { id } = validatedData;
    const user_id = req.user.user_id;

    connection = await pool.getConnection();
    await connection.beginTransaction();

    const result = await projectMdl.updateProjectViewCount(
      { user_id, id },
      connection,
    );
    const update_result = await projectMdl.updateCount({ id }, connection);

    if (result?.success === 1) {
      if (connection) {
        await connection.commit();
      }
      return sendResponse(
        res,
        200,
        1,
        "project view updated successfully",
        [],
        "",
      );
    } else if (result?.success === 0) {
      if (connection) {
        await connection.rollback();
      }
      return sendResponse(
        res,
        200,
        0,
        "Failed to update project count",
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

export const changeProjectStatus = async (req, res) => {
  try {
    const validatedData = validateRequest(
      changeProjectstatusSchema,
      req.body,
      res,
    );

    const { project_id, status, reason } = validatedData;

    const result = await projectMdl.changeProjectStatus({
      project_id,
      change_status: status,
      reason: reason === "" ? null : reason,
    });

    if (result?.success === 0) {
      return sendResponse(res, 200, 0, "Failed to change status", [], "");
    }

    if (result?.success === 1) {
      return sendResponse(res, 200, 1, "status changed successfully", [], "");
    }
  } catch (error) {
    return getServerError(res, error);
  }
};

export const ProjectRepost = async (req, res) => {
  try {
    const validatedData = validateRequest(projectRepostSchema, req.body, res);

    const { project_id } = validatedData;

    const result = await projectMdl.projectRepost({ project_id });

    if (result?.success === 0) {
      return sendResponse(res, 200, 0, "Failed to repost project", [], "");
    }

    if (result?.success === 1) {
      return sendResponse(res, 200, 1, "Project reposted successfully", [], "");
    }
  } catch (error) {
    return getServerError(res, error);
  }
};
