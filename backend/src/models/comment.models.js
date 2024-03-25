import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
  blog: {
    type: Schema.Types.ObjectId,
    ref: "blog",
  },
  content: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Comment = mongoose.model("Comment", commentSchema);
