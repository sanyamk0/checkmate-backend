import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.js";
import cors from "cors";

dotenv.config();

const server = express();

server.use(express.json()); // Use JSON parsing middleware to handle JSON requests
server.use(cors()); // Enable CORS to allow requests from different origins

//Database Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connected"))
  .catch((err) => {
    console.error(err.message);
  });
server.use("/", userRouter); // Use the userRouter for handling routes starting from the root ("/") URL

server.listen(process.env.PORT, () => {
  console.log(`Server Started at Port ${process.env.PORT}`);
});
