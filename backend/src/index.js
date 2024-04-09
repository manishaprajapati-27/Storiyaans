import dotenv from "dotenv";
import connectDb from "./database/index.js";
import app from "./app.js";

dotenv.config({
  path: "./.env",
});

connectDb()
  .then(() => {
    try {
      app.listen(process.env.PORT || 3001, () => {
        console.log(`Server is runnig at port : ${process.env.PORT} 🙂`);
      });
    } catch (error) {
      console.log("Error at server 😑 ", error);
    }
  })
  .catch((error) => {
    console.log("Mongo DB Connection Error 🙄", error);
  });
