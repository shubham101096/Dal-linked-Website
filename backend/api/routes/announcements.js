/* MADE BY SHUBHAM MISHRA */

// Import the express library
const express = require("express");

// Create a router instance
const router = express.Router();

// Import the announcementsController to handle route logic
const announcementsController = require("../controllers/announcements");

// Define routes and associate them with controller methods
router.get("/", announcementsController.getAllAnnouncements);

router.post("/", announcementsController.createAnnouncement);

router.get("/:id", announcementsController.getAnnouncementById);

router.delete("/:id", announcementsController.deleteAnnouncement);

// Export the router for use in other parts of the application
module.exports = router;
