const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    type: { type: String, enum: ["booking", "general"], default: "booking" },
    isRead: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // optional: who triggered it
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
