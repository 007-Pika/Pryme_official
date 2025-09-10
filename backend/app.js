// app.js
const express = require("express");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const socketHandler = require("./socket/socket.js");

// Load environment variables
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is not defined! Set it in Render environment variables.");
  process.exit(1);
}

// Initialize Express
const app = express();

// Middleware
app.use(
  cors({
    origin: "https://pryme-backend-2khs.onrender.com", // your frontend URL
    credentials: true,
  })
);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// -------------------
// API Routes
// -------------------
const authRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const notificationRoutes = require("./routes/notificationRoute");
const bookingRoutes = require("./routes/bookingRoute");
const timesheetRoutes = require("./routes/timeRoutes.js");
const reviewRoutes = require("./routes/reviewRoutes.js");

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/timesheets", timesheetRoutes);
app.use("/api/reviews", reviewRoutes);

// -------------------
// Serve frontend build
// -------------------
app.use(express.static(path.join(__dirname, "dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// -------------------
// Create HTTP server and Socket.IO
// -------------------
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://pryme-backend-2khs.onrender.com",
    credentials: true,
  },
});

app.set("io", io);
socketHandler(io);

// -------------------
// Connect to MongoDB
// -------------------
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

// -------------------
// Start server
// -------------------
server.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
  connectDB();
});
