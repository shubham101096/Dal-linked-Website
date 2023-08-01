const AppliedJob = require("../models/appliedJobs");

const getApplicantsByEmployeeId = async (req, res) => {
    try {
        const employeeId = req.params.id;
        console.log('employeeId:', employeeId);  // Debugging line

        const appliedJobs = await AppliedJob.find({ "job.employeeId": employeeId });
        console.log('appliedJobs:', appliedJobs);  // Debugging line

        res.status(200).json(appliedJobs);
    } catch (err) {
        console.error(err);  // Print the whole error
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getApplicantsByEmployeeId };