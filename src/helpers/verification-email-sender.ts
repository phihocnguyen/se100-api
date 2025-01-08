import { SupplyOrderDetail } from "@prisma/client";
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

export const sendMailSupplier = async (email: string, supplyOrderList: any[], totalPrice: number, supplyOrderId: string) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "[E-SHOPHUB] Hóa đơn cung cấp hàng hóa",
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #fff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); overflow: hidden;">
            <div style="background-color: #0066cc; color: #fff; padding: 20px; text-align: center;">
              <h1 style="margin: 0;">Yêu cầu cung cấp hàng hóa</h1>
            </div>
            <div style="padding: 20px;">
              <p style="font-size: 16px; color: #333;">Xin chào,</p>
              <p style="font-size: 16px; color: #333;">Chúng tôi gửi đến bạn danh sách các mặt hàng cần được cung cấp như sau:</p>
              <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <thead>
                  <tr>
                    <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f7f7f7;">Tên món hàng</th>
                    <th style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #f7f7f7;">Hình ảnh</th>
                    <th style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #f7f7f7;">Số lượng</th>
                    <th style="border: 1px solid #ddd; padding: 8px; text-align: right; background-color: #f7f7f7;">Đơn giá</th>
                    <th style="border: 1px solid #ddd; padding: 8px; text-align: right; background-color: #f7f7f7;">Tổng giá</th>
                  </tr>
                </thead>
                <tbody>
                  ${supplyOrderList.map((item, index) => {
                    return (
                      `<tr key=${index}  >
                        <td style="border: 1px solid #ddd; padding: 8px;">${item.product.productName}</td>
                        <td style="border: 1px solid #ddd; padding: 8px; text-align: center;"><img src="${item.product.image}" alt="${item.product.productName}" style="width: 50px; height: 50px;"></td>
                        <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${item.quantity}</td>
                        <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${item.product.purchasePrice}</td>
                        <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${item.totalPrice} VND</td>
                      </tr>
                      `
                    )
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="4" style="border: 1px solid #ddd; padding: 8px; text-align: right; font-weight: bold;">Tổng giá trị:</td>
                    <td style="border: 1px solid #ddd; padding: 8px; text-align: right; font-weight: bold;">${totalPrice} VND</td>
                  </tr>
                </tfoot>
              </table>
              <div style="text-align: center; margin-top: 20px;">
                <a href="http://localhost:5173/confirm-order/${supplyOrderId}" style="display: inline-block; background-color: #28a745; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">Xác nhận đơn hàng</a>
              </div>
              <p style="font-size: 14px; color: #777; text-align: center; margin-top: 20px;">Nếu không nhấn xác nhận, vui lòng bỏ qua email này.</p>
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