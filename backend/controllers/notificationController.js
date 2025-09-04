const Notification = require("../models/notificationModel");

// ✅ Internal use: emit and save
exports.createNotificationInternal = async ({ req, message, type = "general", user, data }) => {
  try {
    const notification = new Notification({
      message,
      type,
      user,
    });

    await notification.save();

    // ✅ Emit via Socket.IO to "admin" room
    const io = req.app.get("io");
    if (io) {
      io.to("admin").emit("admin-notification", {
        type,
        title: "New Notification",
        message,
        data,
        createdAt: notification.createdAt,
      });
    }

    return notification;
  } catch (error) {
    console.error("createNotificationInternal error:", error);
  }
};

// ✅ External: POST /api/notifications
exports.createNotification = async (req, res) => {
  try {
    const { message, type = "general", user } = req.body;

    const notification = new Notification({
      message,
      type,
      user,
    });

    await notification.save();

    const io = req.app.get("io");
    if (io) {
      io.to("admin").emit("admin-notification", {
        type,
        title: "New Notification",
        message,
        createdAt: notification.createdAt,
      });
    }

    res.status(201).json(notification);
  } catch (error) {
    console.error("createNotification error:", error);
    res.status(500).json({ error: "Failed to create notification" });
  }
};

// ✅ GET /api/notifications
exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};
