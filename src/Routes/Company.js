const express = require("express");

const {
    createEvent,
  getAllCompanies,
  getCompaniesByUserId,
  updateCompany,
  deleteCompany
} = require("../Controller/Company");
const protect = require("../Middleware/authMiddleware");

const Company_router = express.Router();

Company_router.post("/create",protect, createEvent);            // POST new job
Company_router.put("/update/:id",protect, updateCompany);        // UPDATE job by ID
Company_router.delete("/delete/:id",protect, deleteCompany);     // DELETE job by ID
Company_router.get("/getone/:userId", protect, getCompaniesByUserId);
Company_router.get("/get", getAllCompanies);         // GET all jobs


module.exports = Company_router;