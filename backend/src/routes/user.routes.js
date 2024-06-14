import { Router } from "express";
import {
  register,
  login,
  logout,
  changeCurrentPassword,
  refreshAccessToken,
  updateUserDetails,
  verifyUser,
  updateUserRole,
  requestRoleChange,
  approveRoleChangeRequest,
} from "../controllers/user.controller.js";
import {
  verifyJWT,
  isUserVerified,
  isAdmin,
  isAuthor,
} from "../middlewares/auth.middleware.js";
// import { upload } from "../middlewares/multer.middleware.js";

const router = Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(verifyJWT, logout);
router.route("/refresh-access-token").post(verifyJWT, refreshAccessToken);
router.get("/verify/:token").get(verifyUser);
router.route("/change-password").post(changeCurrentPassword);
router.route("/update-user-details").post(verifyJWT, updateUserDetails);
router
  .route("request-role-change")
  .post(verifyJWT, isUserVerified, requestRoleChange);
router
  .route("approve-role-change")
  .post(verifyJWT, isUserVerified, approveRoleChangeRequest);
router
  .route("/update-user-role")
  .post(verifyJWT, isUserVerified, isAdmin, updateUserRole);
// router.route("/refresh-access-token").post(refreshAccessToken);

export default router;
