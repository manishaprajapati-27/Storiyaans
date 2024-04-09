import mongoose, { Schema } from "mongoose";
// blog
//
const quotesSchema = new Schema(
  {
    quote: {
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

export const Quote = mongoose.model("Quote", quotesSchema);
