// import express, { Router } from "express";
import nodemailer from "nodemailer";
// import { asyncHandler } from "../utils/asyncHandler.js";
// import { ApiError } from "../utils/apiError.js";
// import { ApiResponse } from "../utils/apiResponse.js";

// const router = express.Router();

export const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    secure: process.env.EMAIL_PORT == 465,
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    //   to: "mp2712268@gmail.com",
    //   subject: "Test Mail",
    //   text: "This is the text",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log("Mail not sent", error);
    }
    console.log("Email sent: " + info.response);
  });
};
// router.post(
//   "/send-email",
//   asyncHandler(async (req, res) => {
//     const { to, subject, text } = req.body;

//     const mailOptions = {
//       from: process.env.EMAIL,
//       to,
//       subject,
//       text,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         throw new ApiError(500, "Failed to send email");
//       }
//       res
//         .status(200)
//         .json(new ApiResponse(200, info, "Email sent successfully"));
//     });
//   })
// );

// export default Router;
