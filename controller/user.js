import User from "../model/user.js";

// Get a user by ID
export const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json("User Not Found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal Server Error");
  }
};

// Create a new user
export const createUser = async (req, res) => {
  try {
    const user = new User({ ...req.body });
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message || "Bad Request");
  }
};

// Check user credentials (for authentication)
export const checkUser = async (req, res) => {
  try {
    const user = await User.findOne({
      userName: req.body.userName,
      password: req.body.password,
    });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json("User Not Found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
};

// Delete a user by ID
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await User.findOneAndDelete({ _id: id });
    if (doc) {
      res.status(200).json("User Deleted");
    } else {
      res.status(404).json("User Not Found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal Server Error");
  }
};

// Update a user by ID
export const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await User.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (doc) {
      res.status(200).json(doc);
    } else {
      res.status(404).json("User Not Found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal Server Error");
  }
};
