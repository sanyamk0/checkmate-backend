import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv/config";
import userRouter from "./routes/user.js";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(express.json()); // Use JSON parsing middleware to handle JSON requests
app.use(cors()); // Enable CORS to allow requests from different origins
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const rooms = {};
io.on("connection", (socket) => {
  console.log(`User Connected ${socket.id}`);

  socket.on("create", (name) => {
    // Generate a random ID
    const randomId = uuidv4();
    socket.join(randomId);
    rooms[randomId] = [socket.id]; // Store the socket IDs for users in the room
    socket.emit("create", { name, randomId });
  });

  socket.on("join-game", (gameId) => {
    const room = rooms[gameId];
    if (room && room.length === 1) {
      socket.join(gameId);
      room.push(socket.id); // Add the second user to the room
      io.to(gameId).emit("secondUserJoined");
    } else {
      socket.emit("roomFull");
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    // Handle disconnect logic, leave rooms, etc.
    // Also, remove the room from the rooms object if it becomes empty
    for (const gameId in rooms) {
      const index = rooms[gameId].indexOf(socket.id);
      if (index !== -1) {
        rooms[gameId].splice(index, 1);
        if (rooms[gameId].length === 0) {
          delete rooms[gameId];
        }
        break;
      }
    }
  });
});

//Database Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connected"))
  .catch((err) => {
    console.error(err.message);
  });
app.use("/", userRouter); // Use the userRouter for handling routes starting from the root ("/") URL

server.listen(process.env.PORT, () => {
  console.log(`Server Started at Port ${process.env.PORT}`);
});
