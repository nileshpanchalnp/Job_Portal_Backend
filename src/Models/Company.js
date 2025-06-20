const mongoose = require("mongoose")


const CompanySchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true },
    salary: { type: String, required: true },
    description: { type: String, required: true },
    requirements: { type: [String], required: true },
    postedDate: { type: Date, default: Date.now },
     companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true
  },
},
    {
        timestamps: true,
    }
);
// Export the model
const Company = mongoose.model("Company", CompanySchema);
module.exports = Company;