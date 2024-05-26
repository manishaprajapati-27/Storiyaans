import { Router } from "express";
import { createBlog } from "../controllers/blog.controller.js";
import {
  verifyJWT,
  isVerifiedUser,
  isAuthor,
} from "../middlewares/auth.middleware.js";

const router = Router();
router.route("/create-blog").post(verifyJWT, isAuthor, createBlog);

export default router;
