/* MADE BY MAYANKKUMAR PATEL & MAYANK PANDEY */

const Job = require("../models/jobs");

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({});
    res.status(200).json({
        jobs: jobs
    });
}

const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        res.status(200).json({
            job: job
        });
    } catch (error) {
        console.log("Error getting job by given id", error);
        res.status(200).json({
            message: "Job with given id does not exist."
        });
    }
}

const postJob = async (req, res) => {
    const job = new Job(req.body);
    try {
        const savedJob = await job.save();
        res.status(200).json({
            message: "Job saved",
            job: savedJob
        });
    } catch (error) {
        console.log("Error saving job", error);
    }
}

const getJobByEmployerId = async (req, res) => {
    try {
        const job = await Job.find({ employeeId: req.params.id });
        res.status(200).json({
            job: job
        });
    } catch (error) {
        console.log("Error getting job by given employee id", error);
        res.status(200).json({
            message: "Job with given employee id does not exist."
        });
    }
}

module.exports = { getAllJobs, getJobById, postJob, getJobByEmployerId };