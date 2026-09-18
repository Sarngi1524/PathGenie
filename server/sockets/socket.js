const connectedDrivers = new Map();

export const initializeSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("Client Connected:", socket.id);

    socket.on("driver:join", (driverId) => {
      connectedDrivers.set(driverId, socket.id);

      console.log(`Driver ${driverId} connected`);
    });

    socket.on("driver:location", (data) => {
      io.emit("vehicle:location", data);
    });

    socket.on("disconnect", () => {
      for (const [driverId, socketId] of connectedDrivers.entries()) {
        if (socketId === socket.id) {
          connectedDrivers.delete(driverId);
          break;
        }
      }

      console.log("Client Disconnected:", socket.id);
    });
  });
};