import { Router } from "express";
import { createBlog } from "../controllers/blog.controller";

const router = Router();
router.route("/create-blog").post(createBlog);
