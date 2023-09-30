import express from "express";
import { Router } from "express";
import * as userController from "../controller/user.js";

const router = Router();

// Define routes and associate them with corresponding controller functions
router
  .get("/users/:id", userController.getUser) // Get a user by ID
  .post("/signup", userController.createUser) // Create a new user (signup)
  .post("/login", userController.checkUser) // Check user credentials (login)
  .delete("/delete/:id", userController.deleteUser) // Delete a user by ID
  .patch("/update/:id", userController.updateUser); // Update a user by ID

export default router;
