const express = require('express');
const router = express.Router();
const employeeJobsController = require('../controllers/employeeJobs');

const requireAuth = require('../../middleware/requireAuth')
// This ensures that all these routes are authenticated
router.use(requireAuth)
router.get('/getApplicantsByEmployeeid/:id', employeeJobsController.getApplicantsByEmployeeId);

module.exports = router;
