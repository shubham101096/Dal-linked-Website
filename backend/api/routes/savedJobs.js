/* MADE BY PIYUSH AKOLIYA */

const express = require("express");
const requireStudentAuth = require("../../middleware/requireStudentAuth");
const router = express.Router();

const savedJobsController = require("../controllers/savedJobs");

router.use(requireStudentAuth);

router.post("/save", savedJobsController.saveJob);

router.get("/getByStudent", savedJobsController.getByStudent);

router.get("/getByJobId/:id", savedJobsController.getByJobId);

module.exports = router;
