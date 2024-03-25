import mongoose, { Schema } from "mongoose";

const categoriesSchema = new Schema({});

export const Categories = mongoose.model("Categories", categoriesSchema);
