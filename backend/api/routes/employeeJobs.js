/* MADE BY MAYANK PANDEY */

/* This module defines routes for fetching applicants associated with employee jobs.
   It requires authentication and utilizes the getApplicantsByEmployeeId function from the employeeJobsController. */

const express = require('express');
const router = express.Router();
const employeeJobsController = require('../controllers/employeeJobs');

const requireAuth = require('../../middleware/requireAuth')
router.use(requireAuth)
router.get('/getApplicantsByEmployeeid/:id', employeeJobsController.getApplicantsByEmployeeId);

module.exports = router;