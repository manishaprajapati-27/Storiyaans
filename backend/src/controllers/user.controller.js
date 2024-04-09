import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, username, email, password } = req.body;
  if (
    [fullName, username, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All Fields are important");
  }

  const existedUsername = await User.findOne({
    $or: [{ username }],
  });

  if (existedUser) {
    throw new ApiError(409, "The User with Username already exist.");
  }

  const existedUserEMail = await User.findOne({
    $or: [{ email }],
  });

  if (existedUserEMail) {
    throw new ApiError(409, "The User with Email already exist.");
  }

  const avatarLocalPath =
    req.files?.avatar &&
    Array.isArray(req.files.avatar) &&
    req.files.avatar.length > 0
      ? req.files.avatar[0].path
      : undefined;

  const avatar = await uploadOnCloudinary(avatarLocalPath);
});

// if (!avatarLocalPath) {
//   throw new ApiError(400, "Avatar File is Required");
// }

export { registerUser };
