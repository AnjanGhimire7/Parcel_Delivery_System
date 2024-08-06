import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: 587,
  tls:true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

const sendMail= async (messageOptions)=>{


transporter.sendMail(messageOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
  }
  return res.status(200).json(new ApiResponse(200, {}, "Email sent!!!"));
});}

export {sendMail}
