import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

import app from "./app.js";
import connectDB from "./config/db.js";
import { initializeSocket } from "./sockets/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const clientOrigin = process.env.CLIENT_URL || "http://localhost:5173";

// Connect Database
connectDB();

// Create HTTP Server
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: clientOrigin,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  },
});
app.set("io", io);
// Initialize Socket Events
initializeSocket(io);

// Start Server
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});