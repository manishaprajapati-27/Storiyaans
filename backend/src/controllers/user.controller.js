import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";

// Register User 
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, username, email, password } = req.body;
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

  let avatarLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.avatar) &&
    req.files.avatar.length > 0
  ) {
    avatarLocalPath = req.files.avatar[0].path;
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  const userEntry = await User.create({
    fullName,
    avatar: avatar?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(userEntry._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering user 😑");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Registered Successfully 😀"));
});

// Login User
// const loginUser = asyncHandler(async (req, res) => {
//   const { email, username, password } = req.body;

//   if (!username && !email) {
//     throw new ApiError(400, "Username or Email is required 😐");
//   }

//   const user = await User.findOne({
//     $or: [{ email }, { username }],
//   });

//   if (!user) {
//     throw new ApiError(401, "User does not exist ☹️");
//   }

//   const isPasswordValid = await user.isPasswordCorrect(password);

//   if (!isPasswordValid) {
//     throw new ApiError(401, "Invalid user credentials");
//   }

//   const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
//     user._id
//   );

//   const loggedInUser = await User.findById(user._id).select(
//     "-password -refreshToken"
//   );

//   const options = {
//     httpOnly: true,
//     secure: true,
//   };

//   return res
//     .status(200)
//     .cookie("accessToken", accessToken, options)
//     .cookie("refreshToken", refreshToken, options)
//     .json(
//       new ApiResponse(
//         200,
//         {
//           user: loggedInUser,
//           accessToken,
//           refreshToken,
//         }, // This is good If User want to save Accesstoken and Refreshtoken from itself.
//         "User logged In Successfully"
//       )
//     );
// });

export { registerUser };
