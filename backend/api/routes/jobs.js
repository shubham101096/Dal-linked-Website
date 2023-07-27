/* MADE BY MAYANKKUMAR PATEL & MAYANK PANDEY */

const express = require('express');
const router = express.Router();

const jobController = require('../controllers/jobs');

router.get('/', jobController.getAllJobs);

router.get('/:id', jobController.getJobById);

router.get("/getByEmployerId/:id", jobController.getJobByEmployerId);

router.post('/create', jobController.postJob);

module.exports = router;