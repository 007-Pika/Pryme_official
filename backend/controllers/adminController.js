require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASS
  ) {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("admin_token", token, {
      httpOnly: true,
      secure: false, // 🔴 Must be false for localhost (http)
      sameSite: "lax", // ✅ 'strict' can cause issues with cross-site POST
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      admin: {
        email,
        role: "admin",
      },
    });
  }

  res.status(401).json({ error: "Invalid admin credentials" });
};

exports.logoutAdmin = (req, res) => {
  res.clearCookie("admin_token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  res.json({ message: "Admin logged out successfully" });
};

exports.getAdminInfo = (req, res) => {
  res.json({
    admin: {
      email: process.env.ADMIN_EMAIL,
      role: "admin",
    },
  });
};
