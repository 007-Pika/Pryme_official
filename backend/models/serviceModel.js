// models/Service.js

const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String }, // e.g., "1 hour"
    thumbnail: { type: String }, // URL or path to image
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
