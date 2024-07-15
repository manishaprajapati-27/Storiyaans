import mongoose, { Schema } from "mongoose";

const tagSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

tagSchema.index({ title: 1 });
tagSchema.index({ user: 1 });

export const Tag = mongoose.model("Tag", tagSchema);
