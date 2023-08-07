/* MADE BY SHUBHAM MISHRA */

// Import the mongoose library
const mongoose = require('mongoose');

// Define the job sector schema
const jobSectorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

// Create and export the JobSector model based on the schema
const JobSector = mongoose.model('JobSector', jobSectorSchema);
module.exports = JobSector;
