import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { BlogPost } from "../models/blogPost.model";

// Create blogs
export const createBlog = asyncHandler(async (req, res) => {
  const { blogTitle, blogDescription } = req.body;
  const { userId } = req.user;

  const blogPost = await BlogPost.create({
    blogTitle,
    blogDescription,
    author: userId,
  });

  return res
    .status(201)
    .json(new ApiResponse(200, blogPost, "Blog created successfully."));
});

// Get all blog post
export const getUserBlogPost = asyncHandler(async (req, res) => {
  const { userId } = req.user;

  const userBlogPost = await BlogPost.find({ auther: userId });
  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        userBlogPost,
        "User's Blog Posts Retrieved Successfully."
      )
    );
});
