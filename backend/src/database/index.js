import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const DatabaseName = "news-and-blogs";

    const connectionIn = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DatabaseName}`
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
