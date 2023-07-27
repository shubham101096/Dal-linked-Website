/* MADE BY SHUBHAM MISHRA */

const express = require('express');
const router = express.Router();

const jobSectorController = require('../controllers/jobSectors');

router.get('/', jobSectorController.getAllJobSectors);

router.get('/:id', jobSectorController.getJobSectorById);

router.post('/', jobSectorController.createJobSector);

router.put('/:id', jobSectorController.updateJobSectorById);

router.delete('/:id', jobSectorController.deleteJobSectorById);

module.exports = router;
