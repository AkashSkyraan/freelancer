import express from "express";
import * as categoriescontroller from "../controller/category.controller.js";

const router = express.Router();

router.post("/addcategory", categoriescontroller.addCategory);
// router.post("/deletecategory", categoriescontroller.deleteCategory);
router.post("/updatecategory", categoriescontroller.updateCategory);
router.post("/getcategory", categoriescontroller.getCategory);

export default router;
