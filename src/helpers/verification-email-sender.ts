import nodemailer from "nodemailer";
require('dotenv').config({path: '../../.env'})

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendVerificationEmail = async (email: string, token: string) => {
  const link = `http://localhost:${process.env.PORT}/user/verify?token=${token}`;
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "E-ShopHub Verification email",
    html: `<p>Please click the link below to verify your email:</p><a href="${link}">${link}</a>\`,`
  })
}

export default sendVerificationEmail