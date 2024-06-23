import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";
import { generateAccessAndRefreshToken } from "../utils/generateAccessRefreshToken.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";

// import mongoose from "mongoose";

// Register User
export const register = asyncHandler(async (req, res) => {
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

  const verificationToken = crypto.randomBytes(32).toString("hex");
  const verificationTokenExpires = Date.now() + 3600000;

  const createdUser = await User.create({
    fullName,
    email: email.toLowerCase(),
    password,
    username,
    isVerified: false,
    verificationToken,
    verificationTokenExpires,
  });

  const user = await User.findById(createdUser._id).select(
    "-password -refreshToken"
  );

  if (!user) {
    throw new ApiError(500, "Something went wrong while registering user 😑");
  }

  const verificationUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/users/verify/${verificationToken}`;
  const message = `Hello,\nPlease click on the following link to verify your account:\n${verificationUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Account Verifaction",
      message,
    });
    console.log("Varification email sent to:", user.email);
  } catch (error) {
    console.log("Error in sending verification link:", error);
    throw new ApiError(
      500,
      "Failed to send verification email. Please try again later."
    );
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        user,
        "User Registered Successfully 😀. Verification link sent to your mail."
      )
    );
});

// Login User
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
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
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

// Logout User
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
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "User Logged Out Successfully."));
});

// Verify User
export const verifyUser = asyncHandler(async (req, res) => {
  const { token } = req.params;
  console.log("Verification Token: ", token);

  if (!token) {
    console.log("Verification token is missing.");
    throw new ApiError(400, "Invalid or missing verification token");
  }

  const user = await User.findOne({
    verificationToken: token,
    verificationTokenExpires: { $gte: Date.now() },
  });

  if (!user) {
    throw new ApiError(400, "Invalid or expired verification token");
  }

  try {
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;

    await user.save({
      validateBeforeSave: false,
    });
  } catch (error) {
    console.error("Error verifying user:", error);
  }

  console.log("User verified successfully:", user.email);
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User verified Successfully."));
});

// Request for change Role
export const roleChangeRequest = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (!user.isVerified) {
    throw new ApiError(
      400,
      "User must verify their email to request a role change."
    );
  }

  if (user.roleChangeRequest === "author") {
    throw new ApiError(400, "Role change request is already pending.");
  }
  user.roleChangeRequest = "author";
  await user.save();

  res
    .status(200)
    .json(
      new ApiResponse(200, user, "Role change request submitted successfully.")
    );
});

// Role change request approve
export const approveRoleChangeRequest = asyncHandler(async (req, res) => {
  const { userId, approve } = req.body;

  console.log(
    "Received  role change request for user: ",
    userId,
    "Approve: ",
    approve
  );

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found.");
  }
  if (user.roleChangeRequest !== "author") {
    throw new ApiError(400, "No role change request found.");
  }

  if (approve) {
    user.role = "author";
  }
  user.roleChangeRequest = "none";
  await user.save();

  res
    .status(200)
    .json(200, user, "Role change request processed successfully.");
});

// Update User Role
export const updateUserRole = asyncHandler(async (req, res) => {
  const { userId, role } = req.body;

  const validRoles = ["user", "admin", "author"];
  if (!validRoles.includes(role)) {
    throw new ApiError(400, "Invalid role specified.");
  }

  // Find user by ID
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  // Check if user is verified
  if (!user.isVerified) {
    throw new ApiError(400, "User must be verified to change the role.");
  }

  // Update user role
  user.role = role;
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User role updated successfully."));
});

// Change Password
export const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user?._id);
  const isPasswordCorrect = user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password Changed successfully"));
});

// Update Account Details
export const updateUserDetails = asyncHandler(async (req, res) => {
  const { fullName, email } = req.body;

  if (!fullName || !email) {
    throw new ApiError(401, "All fields are required");
  }

  const user = User.findById(
    req.user?._id,
    {
      $set: {
        fullName: fullName,
        email: email,
      },
    },
    {
      new: true,
    }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"));
});

// Refresh access token
export const refreshAccessToken = asyncHandler(async (req, res) => {
  try {
    const incomingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
      throw new ApiError(401, "Unauthorized Request");
    }

    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newrefreshToken } =
      await generateAccessAndRefreshToken(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newrefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newrefreshToken },
          "Access token is refreshed successfully"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message, "Invalid refresh token");
  }
});
