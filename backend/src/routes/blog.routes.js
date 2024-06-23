import { Router } from "express";
import {
  createBlog,
  getAllBlogPostOfUser,
  updateBlogPost,
} from "../controllers/blog.controller.js";
import {
  verifyJWT,
  isUserVerified,
  isAuthor,
} from "../middlewares/auth.middleware.js";

const router = Router();
router
  .route("/create-blog")
  .post(verifyJWT, isUserVerified, isAuthor, createBlog);
router
  .route("/get-all-blog-post")
  .post(verifyJWT, isUserVerified, isAuthor, getAllBlogPostOfUser);
router.route("/blogPost/:id").get(updateBlogPost);

router
  .route("/update-blog-post")
  .post(verifyJWT, isUserVerified, isAuthor, updateBlogPost);

export default router;
