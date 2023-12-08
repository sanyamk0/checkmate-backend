import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv/config";
import userRouter from "./routes/user.js";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

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
  socket.on("created", (data) => {
    console.log(data);
  });
  socket.on("joined", (data) => {
    console.log(data);
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
