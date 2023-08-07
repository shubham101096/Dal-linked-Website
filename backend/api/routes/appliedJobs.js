/* MADE BY MAYANKKUMAR PATEL */

const express = require("express");
const requireAuth = require("../../middleware/requireAuth");

const router = express.Router();

const appliedJobsController = require("../controllers/appliedJobs");

router.use(requireAuth);

router.post("/save", appliedJobsController.saveJob);

router.get("/getByStudent/", appliedJobsController.getByStudent);

router.get("/getByJobId/", appliedJobsController.getByJobId);

router.post("/updateStatusById", appliedJobsController.updateStatusById);

module.exports = router;
