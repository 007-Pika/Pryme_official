const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("🟢 New client connected:", socket.id);

    // Admin joins the "admin" room
    socket.on("register-admin", ({ role }) => {
      if (role === "admin") {
        socket.join("admin");
        console.log(`🟡 Admin joined the 'admin' room: ${socket.id}`);
      }
    });

    socket.on("disconnect", () => {
      console.log("🔴 Client disconnected:", socket.id);
    });
  });
};

module.exports = socketHandler;
