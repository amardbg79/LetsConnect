// import { Server } from "socket.io";
// import http from "http";
// import express from "express";

// const app = express();

// const server = http.createServer(app);
// const io = new Server(server, { 
//   cors: {
//     origin: ["http://localhost:3000"],
//     methods: ["GET", "POST"],
//   },
// });

// export const getReceiverSocketId=(receiverId)=>{
// 	return userSocketMap[receiverId];
// }

// const userSocketMap = {}; // { userId: socketId }

// export const getReceiverSocketId = (receiverId) => {
//   return userSocketMap[receiverId];
// };

// io.on("connection", (socket) => {
//   console.log("A user connected:", socket.id);

//   const userId = socket.handshake.query.userId;
// //   if(userId!="undefined") userSocketMap[userId]=socket.id;
//   console.log("Connected userId:", userId);

//   if (userId && userId !== "undefined") {
//     userSocketMap[userId] = socket.id;

//     // Notify all clients about online users
//     io.emit("getOnlineUsers", Object.keys(userSocketMap));
//   }

//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);

//     if (userId && userSocketMap[userId]) {
//       delete userSocketMap[userId];
//       io.emit("getOnlineUsers", Object.keys(userSocketMap));
//     }
//   });
// });

// export { app, io, server };

import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

// Setup Socket.IO server with CORS
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Your frontend URL
    credentials: true,
  },
});

// Track online users: Map<userId, socketId>
const onlineUsers = new Map();

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("🔌 New client connected:", socket.id);

  // ✅ Use `socket.handshake.auth` to get userId from client
  const userId = socket.handshake.auth.userId;
  console.log("User ID received:", userId);

  if (userId) {
    onlineUsers.set(userId, socket.id);

    // Notify all connected clients with the list of online users
    io.emit("getOnlineUsers", Array.from(onlineUsers.keys()));
  }

  // Handle client disconnect
  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);

    for (let [key, value] of onlineUsers.entries()) {
      if (value === socket.id) {
        onlineUsers.delete(key);
        break;
      }
    }

    // Update all clients with the new list of online users
    io.emit("getOnlineUsers", Array.from(onlineUsers.keys()));
  });
});

// ✅ Utility function to get receiver's socket ID
export const getReceiverSocketId = (receiverId) => {
  return onlineUsers.get(receiverId);
};

export { app, server, io };
