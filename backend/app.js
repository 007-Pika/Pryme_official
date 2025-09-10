require("dotenv").config();

const express = require("express");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const cookieParserMiddleware = require("cookie-parser");
const mongoose = require("mongoose");
const socketHandler = require("./socket/socket.js");

// Environment variables
const port = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Check Mongo URI
if (!MONGO_URI) {
  console.error("❌ MONGO_URI is not defined! Please set it in Render environment variables.");
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Exit if DB fails
  });

// Initialize Express
const app = express();

// Middleware
app.use(cors({ credentials: true, origin: "*" })); // allow all origins for now
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParserMiddleware());

// Routes
app.use("/api/auth", require("./routes/userRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/services", require("./routes/serviceRoutes"));
app.use("/api/notifications", require("./routes/notificationRoute"));
app.use("/api/bookings", require("./routes/bookingRoute"));
app.use("/api/timesheets", require("./routes/timeRoutes.js"));
app.use("/api/reviews", require("./routes/reviewRoutes.js"));

// Create HTTP server + Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // change to frontend URL later
    credentials: true,
  },
});

// Attach socket
app.set("io", io);
socketHandler(io);

// Start server
server.listen(port, () => {
  console.log(`🚀 Server is listening on port ${port}`);
});
