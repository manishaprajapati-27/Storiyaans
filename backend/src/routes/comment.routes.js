import { Router } from "express";
import {
  createComment,
  getComments,
  updateComment,
  deleteComment,
} from "../controllers/comment.controller.js";

const router = Router();

router.post("/comments", createComment);
router.get("/comments/:blogId", getComments);
router.put("/comments/:commentId", updateComment);
router.delete("/comments/:commentId", deleteComment);

export default router;
