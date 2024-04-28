import mongoose, { Schema } from "mongoose";
// blog
//
const blogSchema = new Schema(
  {
    blogTitle: {
      type: String,
    },
    blogDescription: {
      type: String,
    },
    auther: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    categories: {
      type: Schema.Types.ObjectId,
      ref: "Categories",
    },
    comment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    likes: {
      typr: Schema.Types.ObjectId,
      ref: "Like",
    },
  },
  { timestamps: true }
);

export const Blog = mongoose.model("Blog", blogSchema);
