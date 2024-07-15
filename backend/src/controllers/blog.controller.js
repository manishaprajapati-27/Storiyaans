import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { BlogPost } from "../models/blogPost.model.js";

// Create blog post
export const createBlog = asyncHandler(async (req, res) => {
  const { title, description, category, tags, isPublic, isActive } = req.body;
  const { userId, isVerified } = req.user;

  if (!isVerified) {
    throw new ApiError(
      403,
      "You need to verify your email to create a blog post"
    );
  }

  // Check fields are provided
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
export const getAllBlogPostOfUser = asyncHandler(async (req, res) => {
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

// Get all blog posts for a user
export const getSingleBlogPost = asyncHandler(async (req, res) => {
  const blogPostId = req.params.id;

  if (!blogPostId) {
    throw new ApiError(401, "Blog post id is required.");
  }

  const userBlogPost = await BlogPost.findById(blogPostId);

  return res
    .status(200)
    .json(new ApiResponse(200, userBlogPost, "Blog retrived successfully."));
});

// Update blog post
export const updateBlogPost = asyncHandler(async (req, res) => {
  const { title, description, category, tags, isPublic, isActive } = req.body;
  //   const { userId, isVerified } = req.user;
  const blogPostId = req.params.id;

  console.log("Received blogPostId:", blogPostId);

  if (!blogPostId) {
    throw new ApiError(400, "Blog post Id is required.");
  }

  //   Find Blog post By ID
  const blogPost = await BlogPost.findById(blogPostId);

  if (!blogPost) {
    throw new ApiError(404, "Blog post not found.");
  }

  //   Update blog post fields
  blogPost.title = title;
  blogPost.description = description;
  blogPost.category = category;
  blogPost.tags = tags;
  blogPost.isPublic = isPublic;
  blogPost.isActive = isActive;

  await blogPost.save();

  res
    .status(200)
    .json(new ApiResponse(200, blogPost, "Blog Post Updated Successfully."));
});

// Delete blog post
export const deleteBlogPost = asyncHandler(async (req, res) => {
  const blogPostId = req.params.id;
  console.log("Received blogPostId:", blogPostId);

  // Find and delete blog post
  const blogPost = await BlogPost.findByIdAndDelete(blogPostId);

  if (!blogPost) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Blog Post Not Found."));
  }

  res
    .status(200)
    .json(new ApiResponse(200, blogPost, "Blog Post Deleted Successfully."));
});
