/* MADE BY PIYUSH AKOLIYA */

const express = require("express");

const successStoryController = require("../controllers/successStoryController");

const router = express.Router();

router
  .route("/")
  .get(successStoryController.getAllSuccessStories)
  .post(successStoryController.createSuccessStory);

router
  .route("/:id")
  .put(successStoryController.updateSuccessStory)
  .delete(successStoryController.deleteSuccessStory);

router
  .route("/dislike/:id")
  .put(successStoryController.updateSuccessStoryRemoveLike);

module.exports = router;
