import express from "express";
import cors from "cors";

const server = express();
server.use(express.json());
server.use(cors());

server.listen(8000, () => {
  console.log("Server Started at 8000");
});
