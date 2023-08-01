const express = require('express');
const router = express.Router();
const appliedJobsController = require('../controllers/employeeJobs');

router.get('/getApplicantsByEmployeeid/:id', appliedJobsController.getApplicantsByEmployeeId);

module.exports = router;
