const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/authController");

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Admin - Get Users
router.get("/users", getUsers);

// Admin - Update User
router.put("/users/:id", updateUser);

// Admin - Delete User
router.delete("/users/:id", deleteUser);

module.exports = router;