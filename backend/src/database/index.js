import mongoose from "mongoose";
import { DB_Name } from "../constant.js";

const connectDb = async () => {
  try {
    const connectionIn = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_Name}`
    );
    console.log(
      `Mongo DB Connected 😊 !! DB Host: ${connectionIn.connection.host}`
    );
  } catch (error) {
    console.log("Error 😒 in MongoBD Connection: ", error);
    process.exit(1);
  }
};

export default connectDb;
