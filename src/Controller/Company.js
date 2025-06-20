const Company = require("../Models/Company");

// CREATE
const createEvent = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      type,
      salary,
      description,
      requirements,
      postedDate,

    } = req.body;

    if (!title || !location || !requirements) {
      return res.status(400).json({ error: 'title, location, and requirements are required' });
    }

    const companyPost = new Company({
      title,
      company,
      location,
      type,
      salary,
      description,
      requirements,
      postedDate,
companyId: req.user
    });

    await companyPost.save();

    res.status(201).json({
      message: 'Company Job post created successfully',
      companyPost
    });

  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Failed to create Company Job post' });
  }
};

// GET ALL
const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find()
      .select('-__v') // Exclude __v (optional)
      .sort({ createdAt: -1 });

    res.status(200).json(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
};


const getCompaniesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const companies = await Company.find({ companyId: userId })
    //   .populate("companyId", "name email role") // Optional
      .sort({ createdAt: -1 });

    if (companies.length === 0) {
      return res.status(404).json({ message: "No companies found for this user" });
    }

    return res.status(200).json({ companies });

  } catch (error) {
    console.error("Error fetching companies by user ID:", error);
    return res.status(500).json({ message: "Failed to fetch companies" });
  }
};

// UPDATE
const updateCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    // Check if the user is the owner or admin
       if (company.companyId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
  return res.status(403).json({ error: 'Not authorized to delete this job post' });
}


    const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json({
      message: 'Company job post updated successfully',
      updatedCompany
    });

  } catch (error) {
    console.error('Error updating company:', error);
    res.status(500).json({ error: 'Failed to update company job post' });
  }
};

const deleteCompany = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ error: "Company ID is required" });
    }

    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    if (company.companyId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to delete this job post' });
    }

    await Company.findByIdAndDelete(id);
    res.status(200).json({ message: 'Company job post deleted successfully' });

  } catch (error) {
    console.error('Error deleting company:', error);
    res.status(500).json({ error: 'Failed to delete company job post' });
  }
};

module.exports = {
  createEvent,
  getAllCompanies,
  getCompaniesByUserId,
  updateCompany,
  deleteCompany
};
