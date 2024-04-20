import { User } from "../models/user.model.js";
// Generate Refresh and Access Token
export const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Save password for Refresh Token
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false }); // For not ask password again and again

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while genertaing Access token and Refresh Token"
    );
  }
};
