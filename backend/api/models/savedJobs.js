/* MADE BY PIYUSH AKOLIYA */

const mongoose = require("mongoose");

const Job = require("../models/jobs");

const savedJobsSchema = new mongoose.Schema({
  studentId: {
    required: true,
    type: String,
  },
  jobId: {
    required: true,
    type: String,
  },
  savedDate: {
    required: true,
    type: Date,
  },
  status: {
    required: true,
    type: String,
  },
  job: {
    required: true,
    type: Job.schema,
  },
});

module.exports = mongoose.model("SavedJobs", savedJobsSchema);
