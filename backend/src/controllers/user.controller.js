import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";
import { generateAccessAndRefreshToken } from "../utils/generateAccessRefreshToken.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";

// Register User
export const register = asyncHandler(async (req, res) => {
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

export const login = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if (!username && !email) {
    throw new ApiError(400, "Username and email is required");
  }

  const user = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (!user) {
    throw new ApiError(401, "User does not exist.");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid User Credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accesstoken", accessToken, options)
    .cookie("refreshtoken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User Logged In Successfully."
      )
    );
});

export const logout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accesstoken", options)
    .clearCookie("refreshtoken", options)
    .json(new ApiResponse(200, "User Logged Out Successfully."));
});
