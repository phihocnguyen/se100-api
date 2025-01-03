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

export const sendVerificationEmail = async (email: string, token: string) => {
  const link = `http://localhost:${process.env.PORT}/user/verify?token=${token}`;
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "E-ShopHub Verification email",
    html: `<p>Please click the link below to verify your email:</p><a href="${link}">${link}</a>\`,`
  })
}

export const sendInvoice = async (email: string, status: string) => {
  let emailContent = "";

  if (status === "SHIPPING") {
    emailContent = "Đơn hàng của bạn đang được vận chuyển";
  } else if (status === "COMPLETED") {
    emailContent = "Đơn hàng của bạn đã giao thành công";
  } else if (status === "CANCELED") {
    emailContent = "Đơn hàng của bạn đã bị hủy";
  } else {
    emailContent = "Trạng thái đơn hàng chưa rõ";
  }

  // Gửi email với nội dung được cải thiện
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "[E-SHOPHUB] Tình trạng đơn hàng",
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #fff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); overflow: hidden;">
            <div style="background-color: #0066cc; color: #fff; padding: 20px; text-align: center;">
              <h1 style="margin: 0;">Thông báo về tình trạng đơn hàng</h1>
            </div>
            <div style="padding: 20px;">
              <p style="font-size: 16px; color: #333;">Xin chào,</p>
              <p style="font-size: 16px; color: #333;">${emailContent}</p>
              <p style="font-size: 16px; color: #333;">Cảm ơn bạn đã mua sắm tại E-SHOPHUB!</p>
            </div>
            <div style="background-color: #f7f7f7; padding: 20px; text-align: center; font-size: 14px; color: #777;">
              <p style="margin: 0;">© 2025 E-SHOPHUB. Tất cả các quyền được bảo lưu.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  });
}

export const sendMailEmployee = async (email: string, password: string) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "E-ShopHub Verification email",
    html: `<p>Tài khoản của bạn đã được tạo thành công với email: ${email} và password: ${password}</p>`
  })
}