const express = require("express");
const requireStudentAuth = require("../../middleware/requireStudentAuth");

const router = express.Router();

const appliedJobsController = require("../controllers/appliedJobs");

router.use(requireStudentAuth);

router.post("/save", appliedJobsController.saveJob);

router.get("/getByStudent/", appliedJobsController.getByStudent);

router.get("/getByJobId/", appliedJobsController.getByJobId);

module.exports = router;
