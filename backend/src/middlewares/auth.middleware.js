import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

// Verify JWT
export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Authorization is required");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Access Token");
  }
});

// Verify User
export const isUserVerified = asyncHandler(async (req, _, next) => {
  try {
    const user = req.user;
    if (!user.verified) {
      throw new ApiError(400, "User is not verified");
    }
    next();
  } catch (error) {
    throw new ApiError(400, error?.message);
  }
});

// Check if user is an Author
export const isAuthor = asyncHandler(async (req, _, next) => {
  try {
    const user = req.user;
    if (user.role !== "author") {
      throw new ApiError(401, "You are not an Author");
    }
    next();
  } catch (error) {
    throw new ApiError(401, error?.message);
  }
});

export const isAdmin = asyncHandler(async (req, _, next) => {
  try {
    const user = req.user;
    if (user.role !== "admin") {
      throw new ApiError(403, "Access denied. Admins only.");
    }
    next();
  } catch (error) {
    throw new ApiError(403, error?.message);
  }
});
