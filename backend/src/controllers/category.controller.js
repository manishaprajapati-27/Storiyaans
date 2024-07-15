import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Category } from "../models/category.model.js";

// Create Category
export const createCategory = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    throw new ApiError(401, "Title and Description are required.");
  }

  const existingCategory = await Category.findOne({ title });
  if (existingCategory) {
    throw new ApiError(
      404,
      "You have already created a Category with the same title."
    );
  }

  const categories = await Category.create({
    title,
    description,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, categories, "Category Created Successfully."));
});

// Get all Category
export const getAllCategory = asyncHandler(async (req, res) => {
  const categories = await Category.find();

  return res
    .status(201)
    .json(
      new ApiResponse(201, categories, "Fetched all categories successfully.")
    );
});

// Get all Category
export const getSingleCategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;

  console.log("Category ID", categoryId);

  if (!categoryId) {
    throw new ApiError(401, "Category Id is required");
  }
  const category = await Category.findById(categoryId);
  return res
    .status(201)
    .json(new ApiResponse(201, category, "Category Retrived Successfully"));
});

// Update Category
export const updateCategory = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const categoryId = req.params.id;
  if (!categoryId) {
    throw new ApiError(401, "Category Id is required");
  }
  const category = await Category.findById(categoryId);
  //   Update Fileds
  category.title = title;
  category.description = description;

  await category.save();

  return res
    .status(201)
    .json(new ApiResponse(201, category, "Category Updated Successfully."));
});

// Delete Category
export const deleteCategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;

  console.log("Category ID", categoryId);

  const category = await Category.findByIdAndDelete(categoryId);
  return res
    .status(201)
    .json(new ApiResponse(201, category, "Category Deleted Successfully"));
});
