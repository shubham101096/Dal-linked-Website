const express = require("express");
const router = express.Router();

const announcementsController = require("../controllers/announcements");

router.get("/", announcementsController.getAllAnnouncements);

router.post("/", announcementsController.createAnnouncement);

router.get("/:id", announcementsController.getAnnouncementById);

router.delete("/:id", announcementsController.deleteAnnouncement);

module.exports = router;
