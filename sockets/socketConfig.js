import { Server } from "socket.io";
import http from "http";
import app from "../app.js";

// Create HTTP server using Express app
const server = http.createServer(app);

// Integrate Socket.io with the HTTP server
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://organic-memory-g4x9qrvp77wxhv6x5-5173.app.github.dev",
    ],
    credentials: true,
  },
});

// Socket.io connection handling
io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

export { server };
