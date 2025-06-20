const mongoose = require("mongoose")
const roles = ["admin", "company", "candidate"];

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // don't return password by default
    },
    role: {
      type: String,
      enum: roles,
      default: "candidate",
    },
      bookmarkedJobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
  }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);
// Export the model
const User = mongoose.model("User", userSchema);
module.exports = User;