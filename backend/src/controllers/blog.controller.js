import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { BlogPost } from "../models/blogPost.model.js";

// Create blog post
export const createBlog = asyncHandler(async (req, res) => {
  const { title, description, category, tags, isPublic, isActive } = req.body;
  const { userId } = req.user;

  // Check if all required fields are provided
  if (!title || !description) {
    throw new ApiError(400, "Title and description are required.");
  }

  const existingBlogPost = await BlogPost.findOne({ title, author: userId });
  if (existingBlogPost) {
    throw new ApiError(
      401,
      "You have already created a post with the same title."
    );
  }

  const blogPost = await BlogPost.create({
    title,
    description,
    author: userId,
    category,
    tags,
    isPublic,
    isActive,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, blogPost, "Blog created successfully.")); // Match status code with response
});

// Get all blog posts for a user
export const getUserBlogPost = asyncHandler(async (req, res) => {
  const { userId } = req.user;

  const userBlogPosts = await BlogPost.find({ author: userId });
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        userBlogPosts,
        "User's blog posts retrieved successfully."
      )
    );
});
