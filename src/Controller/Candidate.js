const Application = require("../Models/Candidate");
const Company = require("../Models/Company")

const applyToJob = async (req, res) => {
  try {
const { jobId } = req.body;

if (!jobId) {
  return res.status(400).json({ message: "Job ID is required" });
}

    const existingApp = await Application.findOne({
      jobId,
      candidateId: req.user._id,
    });

    if (existingApp) {
      return res.status(400).json({ message: "Already applied to this job" });
    }

    const application = new Application({
      jobId,
      candidateId: req.user._id,
      resume: req.file ? req.file.filename : undefined,
    });

    await application.save();

    res.status(201).json({ message: "Applied successfully", application });
  } catch (error) {
    console.error("Error applying to job:", error);
    res.status(500).json({ message: "Server error while applying" });
  }
};

const getApplicationsByCandidate = async (req, res) => {
  try {
    const applications = await Application.find({ candidateId: req.user._id })
      .populate("jobId")
      .sort({ appliedDate: -1 });

    res.status(200).json({ applications });
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: "Failed to fetch applications" });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedApp = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedApp) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({ message: "Status updated", updatedApp });
  } catch (error) {
    console.error("Status update failed:", error);
    res.status(500).json({ message: "Failed to update status" });
  }
};

// Candidate.js controller
const getApplicationsByCompany = async (req, res) => {
  const companyId = req.user.id;

  try {
    const jobs = await Company.find({ companyId }).select('_id');
    const jobIds = jobs.map(j => j._id);

    const applications = await Application.find({ jobId: { $in: jobIds } });
    res.json({ applications });
  } catch (err) {
    console.error("Error getting company applications:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  applyToJob,
  getApplicationsByCandidate,
  updateApplicationStatus,
  getApplicationsByCompany
};
