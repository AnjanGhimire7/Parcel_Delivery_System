import nodemailer from "nodemailer";

const createTransporter = async (config) => {
  const transporter = await nodemailer.createTransport(config);
  return transporter;
};

let configurations = {
  service: process.env.SERVICE,
  host: process.env.HOST,
  port: 587,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
};

const sendMail = async (messageoption) => {
  const transporter = await createTransporter(configurations);
  await transporter.verify();
  await transporter.sendMail(messageoption, (error, info) => {
    if (error) {
      console.log(error);
    }
    console.log(`Email sent successfully !!!${info.response}`);
  });
};

export { sendMail };
