import { Router } from "express";
import {
  getAllCategory,
  getSingleCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import {
  verifyJWT,
  isUserVerified,
  isAuthor,
} from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create-category").post(createCategory);
router.route("/get-all-category").get(getAllCategory);
router.route("/get-single-category/:id").get(getSingleCategory);
router.route("/update-category/:id").get(updateCategory);
router.route("/delete-category/:id").get(deleteCategory);

export default router;
