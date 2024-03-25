import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema({});

export const Blog = mongoose.model("Blog", blogSchema);
