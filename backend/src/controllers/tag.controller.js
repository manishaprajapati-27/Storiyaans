import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Tag } from "../models/tags.model.js";

// Create Tag
export const createTag = asyncHandler(async (req, res) => {
  const { title, description, user } = req.body;

  if (!title || !description) {
    throw new ApiError(401, "Title and Description are required.");
  }

  // Check if Tag already exist
  const existTag = await Tag.findOne({ title });
  if (existTag) {
    throw new ApiError(401, "You have already created a Tag with the same.");
  }
  const tags = await Tag.create({ title, description, user });

  return res
    .status(201)
    .json(new ApiResponse(201, tags, "Tag create successfull"));
});

// Get All Tags
export const getAllTags = asyncHandler(async (req, res) => {
  const allTags = await Tag.find();

  return res
    .status(201)
    .json(new ApiResponse(201, allTags, "All tags fetched successfully."));
});

// Create Tag
export const getSingleTag = asyncHandler(async (req, res) => {
  const tagId = req.params.id;
  if (!tagId) {
    throw new ApiError(401, "Tag Id required.");
  }
  const tag = await Tag.findById(tagId);

  return res.status(201).json(new ApiResponse(201, tag, "Tag is"));
});

// Update Tag
export const updateTag = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const tagId = req.params.id;

  const tags = await Tag.findById(tagId);

  // Update Tag
  tags.title = title;
  tags.description = description;

  await tags.save();

  return res
    .status(201)
    .json(new ApiResponse(201, tags, "Tag is Updated successfully."));
});

// Delete Tag
export const deleteTag = asyncHandler(async (req, res) => {
  const tagId = req.params.id;

  const tag = await Tag.findByIdAndDelete(tagId);

  return res
    .status(201)
    .json(new ApiResponse(201, tag, "Tag deleted successfully."));
});
