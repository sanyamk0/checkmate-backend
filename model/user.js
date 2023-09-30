import mongoose from "mongoose";

const { Schema } = mongoose;

// Define the User schema
const userSchema = new Schema({
  userName: {
    type: String,
    required: true, // Username is required
    unique: true, // Username must be unique
  },
  email: {
    type: String,
    required: true, // Email is required
    unique: true, // Email must be unique
    validate: {
      validator: function (v) {
        // Validate email using a regular expression
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`, // Custom error message for invalid emails
    },
  },
  password: {
    type: String,
    minLength: 8, // Password must be at least 8 characters long
    required: true, // Password is required
  },
});

// Create and export the User model
export default mongoose.model("User", userSchema);
