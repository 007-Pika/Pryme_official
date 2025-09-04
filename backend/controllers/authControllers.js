const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { sendOTPEmail } = require("../utils/email");
const sendTokenAsCookie = require("../utils/sendTokenasCookie");
// Helper: Create JWT token
const signToken = (id) => {
  console.log("Signing token for user ID");
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

exports.getCurrentUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("name email role");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Register new user
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await User.create({ name, email, password, role });

    const token = signToken(user._id);
    sendTokenAsCookie(res, user, token);
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};
// Login user
exports.login = async (req, res) => {
  console.log("Login attempt with body:", req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }

  const user = await User.findOne({ email }).select("+password name email");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({ message: "Incorrect email or password" });
  }

  const token = signToken(user._id);
  sendTokenAsCookie(res, user, token);
};

exports.logout = (req, res) => {
  console.log("Logging out user");
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,          // required if you're using HTTPS (recommended in prod)
    sameSite: "Strict",    // prevents CSRF if both frontend and backend are on same origin
    path: "/",             // clear it for entire site
  });

  res.status(200).json({ message: "Logged out" });
};


// 1) Forgot Password (generate OTP & JWT)
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  // Check user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Generate 4-digit OTP
  const otp = Math.floor(1000 + Math.random() * 9000);

  // Create short-lived JWT with code & email
  const otpToken = jwt.sign({ email, otp }, process.env.JWT_SECRET, {
    expiresIn: "10m",
  });

  // Send OTP by email
  await sendOTPEmail(email, otp);

  res.status(200).json({
    status: "success",
    message: "OTP sent to email",
    otpToken, // Frontend stores this temporarily
  });
};

// 2) Verify OTP
exports.verifyOtp = async (req, res) => {
  const { otp, otpToken } = req.body;
  console.log("Verifying OTP:", { otp, otpToken });
  try {
    const decoded = jwt.verify(otpToken, process.env.JWT_SECRET);

    if (parseInt(otp) !== decoded.otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    res.status(200).json({ status: "success", message: "OTP verified" });
  } catch (err) {
    return res.status(400).json({ message: "OTP expired or invalid" });
  }
};

// Reset password
exports.resetPassword = async (req, res) => {
  const { otpToken, otp, email, newPassword } = req.body;
  console.log("Resetting password:", { otpToken, otp, email, newPassword });
  try {
    const decoded = jwt.verify(otpToken, process.env.JWT_SECRET);

    if (decoded.email !== email || parseInt(otp) !== decoded.otp) {
      return res.status(400).json({ message: "Invalid OTP or email" });
    }

    const user = await User.findOne({ email });
    console.log("Found user:", user);
    user.password = newPassword;
    await user.save();

    res.status(200).json({ status: "success", message: "Password updated" });
  } catch (err) {
    return res.status(400).json({ message: "Invalid or expired OTP token" });
  }
};
