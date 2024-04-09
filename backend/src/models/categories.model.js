import mongoose, { Schema } from "mongoose";

const categoriesSchema = new Schema(
  {
    category: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Categories = mongoose.model("Categories", categoriesSchema);
