import express from "express";
import {
  getServerError,
  replaceNullWithEmptyString,
  sendResponse,
} from "../utils/helper.js";
import { freelancerDashModel } from "../model/freelancer-dashboard.model.js";
import {
  changeProjectConnectionSchema,
  getProjectsDetailsSchema,
  getProjectsSchema,
  validateRequest,
} from "../utils/validator.js";

const freelancerDashMdl = new freelancerDashModel();

export const getMyProjectsCount = async (req, res) => {
  try {
    const user_id = req.user.user_id;

    const result = await freelancerDashMdl.getProjectsCount({
      user_id,
    });
    if (result?.success === 0) {
      return sendResponse(res, 200, 0, "Failed to fetch project count", [], "");
    }

    const data = replaceNullWithEmptyString(result?.data);

    if (result?.success === 1) {
      return sendResponse(
        res,
        200,
        1,
        "Project count fetched successfully",
        data,
        "",
      );
    }
  } catch (error) {
    return getServerError(res, error);
  }
};

export const getProjects = async (req, res) => {
  try {
    const validatedData = validateRequest(getProjectsSchema, req.body, res);
    const { status } = validatedData;
    const user_id = req.user.user_id;

    const project_id_result = await freelancerDashMdl.getProjectid({
      user_id,
      status: status === "" ? null : status,
    });
    if (project_id_result?.success === 0) {
      return sendResponse(res, 200, 0, "Failed to fetch project id", [], "");
    }

    const project_ids = project_id_result?.data.map((row) => row.project_id);

    const project_result = await freelancerDashMdl.getMyProjects({
      project_ids,
    });
    console.log(project_result);
    if (project_result?.success === 0) {
      return sendResponse(res, 200, 0, "Failed to fetch projects", [], "");
    }

    const data = replaceNullWithEmptyString(project_result?.data);

    if (project_result?.success === 1) {
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

export const getProjectDetails = async (req, res) => {
  try {
    const validatedData = validateRequest(
      getProjectsDetailsSchema,
      req.body,
      res,
    );
    const { project_id, status, init_by, is_pinned } = validatedData;

    const result = await freelancerDashMdl.getprojectDetails({
      project_id,
      status,
      init_by,
      is_pinned,
    });
    if (result?.success === 0) {
      return sendResponse(
        res,
        200,
        0,
        "Failed to fetch project details",
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
        "Project details fetched successfully",
        data,
        "",
      );
    }
  } catch (error) {
    return getServerError(res, error);
  }
};

export const changeProjectConnection = async (req, res) => {
  try {
    const validatedData = validateRequest(
      changeProjectConnectionSchema,
      req.body,
      res,
    );
    const { id, type, reason } = validatedData;

    const result = await freelancerDashMdl.changeProjectConnection({
      id,
      reason: reason === "" ? null : reason,
      type,
    });

    if (result?.success === 0) {
      return sendResponse(res, 200, 0, "Failed to remove from project", [], "");
    }

    if (result?.success === 1) {
      return sendResponse(
        res,
        200,
        1,
        "Removed from project successfully",
        [],
        "",
      );
    }
  } catch (error) {
    return getServerError(res, error);
  }
};
