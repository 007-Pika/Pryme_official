const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    country: { type: String, default: "Australia" }, // Hardcoded in form
    city: { type: String, required: true },
    postCode: { type: String, required: true },
    details: { type: String }, // Property details
    service: {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
      title: { type: String, required: true },
      price: { type: Number, required: true },
      shortDescription: { type: String },
      thumbnail: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
