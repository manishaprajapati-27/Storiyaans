import mongoose, { Schema } from "mongoose";

const tagSchema = new Schema({});

export const Tag = mongoose.model("Comment", tagSchema);
