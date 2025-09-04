const express = require("express");
const router = express.Router();
const authController = require("../controllers/authControllers");

router.post("/register", authController.register);
router.post("/login", authController.login);
// routes/authRoutes.js
router.get("/me", authController.getCurrentUser);

router.post("/forgot-password", authController.forgotPassword);
router.post("/verify-otp", authController.verifyOtp);
router.post("/reset-password", authController.resetPassword);
router.post("/logout", authController.logout);

module.exports = router; 
 