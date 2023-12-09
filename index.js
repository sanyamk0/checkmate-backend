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

io.on("connection", (socket) => {
  console.log(`User Connected ${socket.id}`);

  socket.on("create", (name) => {
    // Generate a random ID
    const randomId = uuidv4();
    socket.emit("create", { name, randomId });
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`User Disconnected ${socket.id}`);
    // Additional cleanup or logic for disconnection can be added here
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
