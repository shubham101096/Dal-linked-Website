const express = require('express');
const router = express.Router();

const jobController = require('../controllers/jobs');

router.get('/', jobController.getAllJobs);

router.get('/:id', jobController.getJobById);

router.post('/create', jobController.postJob);

module.exports = router;