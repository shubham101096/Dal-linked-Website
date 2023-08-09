/* MADE BY MAYANK PANDEY */

/* This module defines a function to retrieve applicants for jobs associated with a specific employee.
   It queries the database for applied jobs where the job's employeeId matches the given parameter. */

const AppliedJob = require("../models/appliedJobs");

const getApplicantsByEmployeeId = async (req, res) => {
    try {
        const employeeId = req.params.id;

        const appliedJobs = await AppliedJob.find({ "job.employeeId": employeeId });

        res.status(200).json(appliedJobs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};
module.exports = { getApplicantsByEmployeeId };