const Booking = require("../models/bookingsModel");
const { createNotificationInternal } = require("./notificationController");

exports.createBooking = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      address,
      city,
      postCode,
      details,
      service,
    } = req.body;

    if (!service || !service._id || !service.title || !service.price) {
      return res.status(400).json({ message: "Invalid service information." });
    }

    const booking = new Booking({
      firstName,
      lastName,
      email,
      address,
      city,
      postCode,
      details,
      service,
    });

    await booking.save();

    // ✅ Create notification and emit to admin via Socket.IO
    await createNotificationInternal({
      req,
      message: `${firstName} ${lastName} booked the "${service.title}" service.`,
      type: "booking",
      data: {
        bookingId: booking._id,
        service,
        userEmail: email,
      },
    });

    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    console.error("Create booking failed:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Get bookings failed:", error);
    res.status(500).json({ message: "Server error" });
  }
};
