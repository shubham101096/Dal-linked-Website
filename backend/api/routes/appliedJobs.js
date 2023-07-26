const express = require('express');
const router = express.Router();

const appliedJobsController = require("../controllers/appliedJobs");

router.post("/save", appliedJobsController.saveJob);

router.get("/getByStudent/:id", appliedJobsController.getByStudent);

router.get("/getByJobId/:id", appliedJobsController.getByJobId);

module.exports = router;