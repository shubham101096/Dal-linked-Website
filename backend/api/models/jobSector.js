/* MADE BY SHUBHAM MISHRA */

const mongoose = require('mongoose');

const jobSectorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const JobSector = mongoose.model('JobSector', jobSectorSchema);

module.exports = JobSector;
