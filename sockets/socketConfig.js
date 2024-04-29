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
      process.env.WEB_URL,
    ],
    credentials: true,
  },
});

global.onlineUser = {};

io.on("connection", (socket) => {
  console.log("A user connected" + socket.id);

  const userId = socket.handshake.auth.userId;
  const socketId = socket.id;

  if (socket.handshake.auth.userId) {
    onlineUser[userId] = socketId;
    io.emit("onlineUsers", Object.keys(onlineUser));
  }
  socket.on("typing", ({ senderId, receiverId }) => {
    // Broadcast "typing" event to the receiver
    onlineUser[receiverId] &&
      io.to(onlineUser[receiverId]).emit("typing", { senderId });
  });

  socket.on("stopTyping", ({ senderId, receiverId }) => {
    // Broadcast "stopTyping" event to the receiver
    onlineUser[receiverId] &&
      io.to(onlineUser[receiverId]).emit("stopTyping", { senderId });
  });

  socket.on("disconnect", () => {
    delete onlineUser[userId];
    io.emit("onlineUsers", Object.keys(onlineUser));

    console.log("User disconnected" + socket.id);
  });
});

export { server, io };
