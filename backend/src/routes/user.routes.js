import { Router } from "express";
import {
  registerUser,
  //   updateUserAvatar,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
// router.route("/avatar");
//   .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);
router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  registerUser
);

export default router;
