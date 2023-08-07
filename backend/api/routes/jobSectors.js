/* MADE BY SHUBHAM MISHRA */

// Import the express library
const express = require('express');

// Create a router instance
const router = express.Router();

// Import the jobSectorController to handle route logic
const jobSectorController = require('../controllers/jobSectors');

// Define routes and associate them with controller methods
router.get('/', jobSectorController.getAllJobSectors);

router.get('/:id', jobSectorController.getJobSectorById);

router.post('/', jobSectorController.createJobSector);

router.put('/:id', jobSectorController.updateJobSectorById);

router.delete('/:id', jobSectorController.deleteJobSectorById);

// Export the router for use in other parts of the application
module.exports = router;
