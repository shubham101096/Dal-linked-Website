const express = require("express");
const router = express.Router();

const savedJobsController = require("../controllers/savedJobs");

router.post("/save", savedJobsController.saveJob);

router.get("/getByStudent/:id", savedJobsController.getByStudent);

router.get("/getByJobId/:id", savedJobsController.getByJobId);

module.exports = router;
