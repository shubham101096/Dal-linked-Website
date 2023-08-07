/* MADE BY SHUBHAM MISHRA */

// Import the JobSector model
const JobSector = require('../models/jobSector');

// Get all job sectors
const getAllJobSectors = async (req, res) => {
  try {
    const jobSectors = await JobSector.find();
    res.json(jobSectors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve job sectors' });
  }
};

// Get job sector by ID
const getJobSectorById = async (req, res) => {
  const { id } = req.params;
  try {
    const jobSector = await JobSector.findById(id);
    if (!jobSector) {
      return res.status(404).json({ error: 'Job sector not found' });
    }
    res.json(jobSector);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve the job sector' });
  }
};

// Create a new job sector
const createJobSector = async (req, res) => {
  const { name } = req.body;
  try {
    const jobSector = new JobSector({ name });
    await jobSector.save();
    res.json(jobSector);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create the job sector' });
  }
};

// Update job sector by ID
const updateJobSectorById = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const jobSector = await JobSector.findByIdAndUpdate(id, { name }, { new: true });
    if (!jobSector) {
      return res.status(404).json({ error: 'Job sector not found' });
    }
    res.json(jobSector);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the job sector' });
  }
};

// Delete job sector by ID
const deleteJobSectorById = async (req, res) => {
  const { id } = req.params;
  try {
    const jobSector = await JobSector.findByIdAndRemove(id);
    if (!jobSector) {
      return res.status(404).json({ error: 'Job sector not found' });
    }
    res.json({ message: 'Job sector deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the job sector' });
  }
};

// Export the functions for use in other modules
module.exports = {
  getAllJobSectors,
  getJobSectorById,
  createJobSector,
  updateJobSectorById,
  deleteJobSectorById,
};
