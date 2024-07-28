import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Comment } from "../models/comment.model.js";

// Create Comment
export const createComment = asyncHandler(async (req, res) => {
  const { blog, comment, commentedBy } = req.body;

  if (!blog || !comment || !commentedBy) {
    throw new ApiError(400, "All fields are required");
  }

  const newComment = await Comment.create({ blog, comment, commentedBy });

  return res
    .status(201)
    .json(new ApiResponse(201, newComment, "Comment created successfully"));
});

// Get comments
export const getComments = asyncHandler(async (req, res) => {
  const { blogId } = req.params;

  if (!blogId) {
    throw new ApiError(400, "Blog ID is required");
  }

  const comments = await Comment.find({ blog: blogId });

  return res
    .status(200)
    .json(new ApiResponse(200, comments, "Comments fetched successfully"));
});

// Update Comment
export const updateComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const { comment } = req.body;

  if (!commentId) {
    throw new ApiError(400, "Comment ID is required");
  }

  if (!comment) {
    throw new ApiError(400, "Comment text is required");
  }

  const updatedComment = await Comment.findByIdAndUpdate(
    commentId,
    { comment },
    { new: true }
  );

  if (!updatedComment) {
    throw new ApiError(404, "Comment not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedComment, "Comment updated successfully"));
});

// Delete Comment
export const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  if (!commentId) {
    throw new ApiError(400, "Comment ID is required");
  }

  const deletedComment = await Comment.findByIdAndDelete(commentId);

  if (!deletedComment) {
    throw new ApiError(404, "Comment not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, deletedComment, "Comment deleted successfully"));
});
