import express from "express";
import {
  getServerError,
  replaceNullWithEmptyString,
  sendResponse,
} from "../utils/helper.js";
import {
  addCategorySchema,
  getCategorySchema,
  updateCategorySchema,
  validateRequest,
} from "../utils/validator.js";
import { categoryModel } from "../model/category.model.js";

const categoryMdl = new categoryModel();

export const addCategory = async (req, res) => {
  try {
    const validatedData = validateRequest(addCategorySchema, req.body, res);

    const { name, parent_id } = validatedData;

    const result = await categoryMdl.addCategory({ name, parent_id });

    if (result?.success === 1) {
      return sendResponse(res, 200, 1, "Category added successfully", [], "");
    } else if (result?.success === 0) {
      return sendResponse(res, 200, 0, "Failed to add category", [], "");
    }
  } catch (error) {
    return getServerError(res, error);
  }
};

export const getCategory = async (req, res) => {
  try {
    const validatedData = validateRequest(getCategorySchema, req.body, res);

    const { parent_id } = validatedData;

    const result = await categoryMdl.getCategory({ parent_id });

    const data = replaceNullWithEmptyString(result?.data);

    if (result?.success === 1) {
      return sendResponse(
        res,
        200,
        1,
        "category fetched successfully",
        data,
        "",
      );
    } else if (result?.success === 0) {
      return sendResponse(res, 200, 0, "Failed to fetch categories", [], "");
    }
  } catch (error) {
    return getServerError(res, error);
  }
};

export const updateCategory = async (req, res) => {
  try {
    const validatedData = validateRequest(updateCategorySchema, req.body, res);

    const { id, name, parent_id } = validatedData;

    const result = await categoryMdl.updateCategory({
      id,
      name,
      parent_id,
    });

    if (result?.success === 1) {
      return sendResponse(res, 200, 1, "category updated successfully", [], "");
    } else if (result?.success === 0) {
      return sendResponse(res, 200, 0, "Failed to update categories", [], "");
    }
  } catch (error) {
    return getServerError(res, error);
  }
};

export const deleteCategory = async (req, res) => {
  try {
    // for deleting just make the is_active to 0, so hierarchy will be balanced
  } catch (error) {
    return getServerError(res, error);
  }
};
