import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "16kb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.routes.js";
import blogRouter from "./routes/blog.routes.js";
import categoryRouter from "./routes/category.routes.js";
import tagRouter from "./routes/tag.routes.js";
// import sendEmailRoute from "./utils/sendEmail.js";

// Routes
app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/category", categoryRouter);
app.use("/api/tag", tagRouter);
// app.use("/api/mail", sendEmailRoute);

app.post("/api", (req, res) => {
  res.json({
    message: "Hello World!",
  });
});
export default app;

// 7977719313
