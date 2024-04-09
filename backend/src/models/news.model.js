import mongoose, { Schema } from "mongoose";
// blog
//
const newsSchema = new Schema(
  {
    newsContent: {
      type: String,
    },
    writtenBy: {
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

export const Blog = mongoose.model("Blog", newsSchema);
