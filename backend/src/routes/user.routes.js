import { Router } from "express";
import {
  register,
  login,
  logout,
  refreshAccessToken,
  //   updateUserAvatar,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
// import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(verifyJWT, logout);
router.route("/refresh-access-token").post(refreshAccessToken);

export default router;
