const nodemailer = require("nodemailer");
require("dotenv").config();
 
exports.sendOTPEmail = async (to, otp) => {
    console.log("Sending OTP email to:", to);
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Pryme" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Your Password Reset Code",
      text: `Your OTP code is: ${otp}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #007bff; text-align: center;">Password Reset Verification</h2>
          <p>Hi there,</p>
          <p>You requested to reset your password. Please use the following OTP code to continue:</p>
          <div style="text-align: center; margin: 30px 0;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #333; border: 2px dashed #007bff; padding: 10px 20px; display: inline-block;">${otp}</span>
          </div>
          <p style="color: #555;">This code will expire shortly for your security. If you did not request a password reset, please ignore this email.</p>
          <p style="margin-top: 40px;">Thanks,<br>Your App Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    console.log(`✅ OTP email sent to ${to}`);
  } catch (err) {
    console.error("❌ Failed to send OTP email:", err);
    throw new Error("Failed to send email");
  }
};
