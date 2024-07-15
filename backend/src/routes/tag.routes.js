import { Router } from "express";
import {
  createTag,
  getAllTags,
  getSingleTag,
  deleteTag,
  updateTag,
} from "../controllers/tag.controller.js";

const router = Router();

router.route("/create-tag").post(createTag);
router.route("/get-all-tags").get(getAllTags);
router.route("/get-single-tag/:id").get(getSingleTag);
router.route("/update-tag/:id").get(updateTag);
router.route("/delete-tag/:id").get(deleteTag);

export default router;
