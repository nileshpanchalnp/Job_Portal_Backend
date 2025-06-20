const express = require("express");
const {
  registerUser,
  loginUser,
  getMe,
  updateMe,
} = require("../Controller/User");
const protect = require("../Middleware/authMiddleware");

const User_router = express.Router();

User_router.post("/register", registerUser);
User_router.post("/login", loginUser);
User_router.get("/get", protect, getMe);
User_router.put("/update", protect, updateMe);

module.exports = User_router;