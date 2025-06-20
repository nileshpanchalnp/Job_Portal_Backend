const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "reviewed", "accepted", "rejected"],
    default: "pending",
  },
  appliedDate: {
    type: Date,
    default: Date.now,
  },
  resume: {
    type: String, // File name or file path
  }
});

// Export the model
const Application = mongoose.model("Application", applicationSchema);
module.exports = Application;
