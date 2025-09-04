const mongoose = require("mongoose");
const timesheetSchema = new mongoose.Schema(
  {
    project: { type: String, required: true },
    role: { type: String, required: true },
    activity: { type: String, required: true },
    week: { type: String, required: true }, // Example: "2025-W32"
    dailyHours: {
      type: [Number], // Array of 7 numbers (Mon to Sun)
      validate: {
        validator: arr => arr.length === 7,
        message: "dailyHours must have 7 values (Mon to Sun).",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TimeSheet", timesheetSchema);