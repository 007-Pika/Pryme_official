const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { verifyAdmin } = require("../utils/verifyAdmin");

router.post("/login", adminController.loginAdmin);
router.post("/logout", adminController.logoutAdmin);

router.get("/dashboard", verifyAdmin, (req, res) => {
  res.json({ message: "You are an authenticated admin!" });
});

router.get("/me", verifyAdmin, adminController.getAdminInfo);

module.exports = router;
