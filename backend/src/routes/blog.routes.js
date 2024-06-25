import { Router } from "express";
import {
  createBlog,
  getAllBlogPostOfUser,
  updateBlogPost,
  deleteBlogPost,
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

router.route("/update-blog-post/:id").get(updateBlogPost);
router.route("/delete-blog-post/:id").get(deleteBlogPost);

// router
//   .route("/update-blog-post")
//   .post(verifyJWT, isUserVerified, isAuthor, updateBlogPost);

export default router;
