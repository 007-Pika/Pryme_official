const express = require("express");
const path = require("path");
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const socketHandler = require("./socket/socket.js"); // Your socket logic

// Load environment variables
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Validate Mongo URI
if (!MONGO_URI) {
  console.error("❌ MONGO_URI not defined! Set it in Render environment variables.");
  process.exit(1);
}

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Initialize Express
const app = express();

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/auth", require("./routes/userRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/services", require("./routes/serviceRoutes"));
app.use("/api/notifications", require("./routes/notificationRoute"));
app.use("/api/bookings", require("./routes/bookingRoute"));
app.use("/api/timesheets", require("./routes/timeRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));

// Serve frontend (React/Vite) build in production
const frontendPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

// All other requests serve index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Create HTTP server & bind Socket.io
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: { origin: true, credentials: true },
});
app.set("io", io);
socketHandler(io);

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
