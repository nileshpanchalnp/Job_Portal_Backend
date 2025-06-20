const express = require("express");
const { applyToJob, getApplicationsByCandidate, updateApplicationStatus,getApplicationsByCompany } = require("../Controller/Candidate");
const protect = require("../Middleware/authMiddleware");
const upload = require("../Middleware/multerConfig")

const Application_router = express.Router();

Application_router.post("/apply", protect, upload.single("resume"), applyToJob);
Application_router.get("/my-applications", protect, getApplicationsByCandidate);
Application_router.put("/update-status/:id", protect, updateApplicationStatus); // only admin/company should access this
Application_router.get("/company-applications", protect, getApplicationsByCompany);

module.exports = Application_router;