import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";

// Create Express app
const app = express();

// Middleware
app.use(express.json({ limit: "4mb" }));

// Apply CORS globally BEFORE routes
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // allow cookies and headers
  })
);

// Create HTTP server for socket.io
const server = http.createServer(app);

// Initialize socket.io
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Online users map
export const userSocketMap = {};

// Socket.io connection
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("User connected:", userId);

  if (userId) userSocketMap[userId] = socket.id;

  // Emit online users to all clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User disconnected:", userId);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// Routes
app.use("/api/status", (req, res) => res.send("Server is live"));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

// Connect to MongoDB and start server
if(process.env.NODE_ENV !== "production"){
  const PORT = process.env.PORT || 8000;
  await connectDB();
  server.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));

}
//Export server for vercel
export default server;
