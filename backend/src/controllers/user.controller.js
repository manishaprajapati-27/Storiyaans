import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";

// Register User
const registerUser = asyncHandler(async (req, res) => {
  //   console.log("Sucess");
  //   res.status(200).json({
  //     message: "ok",
  //   });
  const { fullName, username, email, password } = req.body;
  console.log(req.body);
  if (
    [fullName, username, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All Fields are important");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    if (existedUser.username === username) {
      throw new ApiError(409, "The User with Username already exists.");
    }
    if (existedUser.email === email) {
      throw new ApiError(409, "The User with Email already exists.");
    }
  }

  //   //   let avatarLocalPath;
  //   //   if (
  //   //     req.files &&
  //   //     Array.isArray(req.files.avatar) &&
  //   //     req.files.avatar.length > 0
  //   //   ) {
  //   //     avatarLocalPath = req.files.avatar[0].path;
  //   //   }

  //   //   const avatar = await uploadOnCloudinary(avatarLocalPath);

  const createdUser = await User.create({
    fullName,
    email,
    password,
    username,
  });

  const user = await User.findById(createdUser._id).select(
    "-password -refreshToken"
  );

  if (!user) {
    throw new ApiError(500, "Something went wrong while registering user 😑");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, user, "User Registered Successfully 😀"));
});

export { registerUser };
