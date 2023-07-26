const AppliedJob = require("../models/appliedJobs");

const saveJob = async (req, res) => {
  req.body["studentId"] = req.user._id;
  const newSaveJob = new AppliedJob(req.body);
  try {
    await newSaveJob.save();
    res.status(200).json({
      message: "Job saved",
      job: newSaveJob,
    });
  } catch (err) {
    console.log("Error in saving job.", err);
    res.status(500).json({
      message: "Error in saving job.",
    });
  }
};

const getByStudent = async (req, res) => {
  try {
    const studentJobs = await AppliedJob.find({ studentId: req.user._id });
    res.status(200).json({
      jobs: studentJobs,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error in getting jobs for given student id.",
    });
  }
};

const getByJobId = async (req, res) => {
  try {
    const jobs = await AppliedJob.find({ jobId: req.user._id });
    res.status(200).json({
      jobs: jobs,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error in getting jobs for given student id.",
    });
  }
};

module.exports = { saveJob, getByStudent, getByJobId };
