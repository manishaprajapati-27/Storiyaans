import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Like } from "../models/like.model.js";
import { BlogPost } from "../models/blogPost.model.js";

export const createLike = asyncHandler(async (req, res) => {
  const { blogId, commentId, userId } = req.body;

  if (!blogId && !commentId) {
    throw new ApiError(400, "Either blogId and commentId must be provided");
  }
  if (!userId) {
    throw new ApiError(400, "User Id must be provided.");
  }
  const newLike = new Like({
    blog: blogId,
    comment: commentId,
    likedBy: userId,
  });

  await newLike.save();

  return res
    .status(200)
    .json(new ApiResponse(200, newLike, "Liked successfully"));
});

export const getLikesByUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const likes = await Like.find({ likedBy: userId }).populate(
    "blog comment likedBy"
  );
  const likesCount = await Like.countDocuments({ likedBy: userId });

  const likeInfo = {
    count: likesCount,
    likes: likes,
  };

  return res.status(200).json(new ApiResponse(200, likeInfo, "Likes Fetched"));
});

// Get likes for specific blog or comment
export const getLikes = asyncHandler(async (req, res) => {
  const { blogId, commentId } = req.query;

  const filter = {};

  if (blogId) {
    filter.blog = blogId;
  }
  if (commentId) {
    filter.comment = commentId;
  }

  const likes = await Like.find(filter).populate("blog comment likedBy");

  return res.status(200).json(new ApiResponse(200, likes, "All Likes fetched"));
});
export const deleteLikes = asyncHandler(async (req, res) => {
  const { likeId } = req.params;

  const like = await Like.findByIdAndDelete(likeId);

  //   if (!like) {
  //     throw new ApiError(404, "Like not found.");
  //   }

  //   await like.remove();
  return res
    .status(200)
    .json(new ApiResponse(200, like, "Like delete successfully."));
});
