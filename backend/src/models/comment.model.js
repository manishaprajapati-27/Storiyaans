import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    blog: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
      index: true,
    },
    comment: {
      type: String,
      required: true,
    },
    commentedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

export const Comment = mongoose.model("Comment", commentSchema);
