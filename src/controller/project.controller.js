import express from "express";
import { projectModel } from "../model/project.model.js";
import {
  getServerError,
  replaceNullWithEmptyString,
  sendResponse,
} from "../utils/helper.js";
import {
  createProjectSchema,
  deleteProjectSchema,
  getIndividualProjectSchema,
  updateProjectSchema,
  validateRequest,
} from "../utils/validator.js";

const projectMdl = new projectModel();

export const createProject = async (req, res) => {
  try {
    const validatedData = validateRequest(createProjectSchema, req.body, res);

    const {
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
    } = validatedData;

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

    const result = await projectMdl.deleteSoloProject({ id });

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

export const searchProjects = async (req, res) => {
  try {
  } catch (error) {
    return getServerError(res, error);
  }
};
