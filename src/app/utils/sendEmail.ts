import nodemailer from "nodemailer";
import { configuration } from "../config";

// need to watch video to  do node mailer

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: configuration.NODE_ENV === "Production", // true for port 465, false for other ports
    auth: {
      user: "mdrayhanuddin098@gmail.com",
      pass: "jn7jnAPzxyQBp6D",
    },
  });

  await transporter.sendMail({
    from: '"Rayhan theke 👻" <mdrayhanuddin098@gmail.com>', // sender address
    to, // list of receivers
    subject: "reset ur password within 10 min", // Subject line
    text: "", // plain text body
    html, // html body
  });
};
