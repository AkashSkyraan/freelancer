import express from "express";
import {
  getServerError,
  replaceNullWithEmptyString,
  sendResponse,
} from "../utils/helper.js";
import {
  addDropdownSchema,
  deleteDropdownSchema,
  getDropdownSchema,
  updateDropdownSchema,
  validateRequest,
} from "../utils/validator.js";
import { dropdownModel } from "../model/dropdowns.model.js";

const dropdownMdl = new dropdownModel();

export const getDropdown = async (req, res) => {
  try {
    const validatedData = validateRequest(getDropdownSchema, req.body, res);

    const { category } = validatedData;

    const result = await dropdownMdl.getDropdown({ category });

    const data = replaceNullWithEmptyString(result?.data);

    if (result?.success === 1) {
      return sendResponse(
        res,
        200,
        1,
        "dropdown fetched successfully",
        data,
        "",
      );
    } else if (result?.success === 0) {
      return sendResponse(res, 200, 0, "failed to fetch", [], "");
    }
  } catch (error) {
    return getServerError(res, error);
  }
};

export const deleteDropdown = async (req, res) => {
  try {
    const validatedData = validateRequest(deleteDropdownSchema, req.body, res);
    const { id } = validatedData;
    const result = await dropdownMdl.deleteDropdown({ id });
    if (result?.success === 1) {
      return sendResponse(res, 200, 1, "dropdown deleted successfully", [], "");
    } else if (result?.success === 0) {
      return sendResponse(
        res,
        200,
        0,
        "failed to delete the dropdown value",
        [],
        "",
      );
    }
  } catch (error) {
    return getServerError(res, error);
  }
};

export const addDropdown = async (req, res) => {
  try {
    const validatedData = validateRequest(addDropdownSchema, req.body, res);

    const { category, value, icon } = validatedData;

    const result = await dropdownMdl.addDropdown({ category, value });

    if (result?.success === 1) {
      return sendResponse(res, 200, 1, "dropdown added successfully", [], "");
    } else if (result?.success === 0) {
      return sendResponse(res, 200, 0, "failed to add dropdown value", [], "");
    }
  } catch (error) {
    return getServerError(res, error);
  }
};

export const updateDropdown = async (req, res) => {
  try {
    const validatedData = validateRequest(updateDropdownSchema, req.body, res);

    const { id, value } = validatedData;

    const result = await dropdownMdl.updateDropdown({ id, value });

    if (result?.success === 1) {
      return sendResponse(res, 200, 1, "dropdown updated successfully", [], "");
    } else if (result?.success === 0) {
      return sendResponse(
        res,
        200,
        0,
        "failed to update dropdown value",
        [],
        "",
      );
    }
  } catch (error) {
    return getServerError(res, error);
  }
};
