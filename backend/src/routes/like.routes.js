import { Router } from "express";

import {
  createLike,
  getLikesByUser,
  getLikes,
  deleteLikes,
} from "../controllers/like.controller.js";

const router = Router();

router.route("/create-like").post(createLike);
router.route("/get-likes-by-user/:id").get(getLikesByUser);
router.route("/get-likes/").get(getLikes);
router.route("/delete-like/:id").get(deleteLikes);
// router.route("/create-like").post(createLike);

export default router;
