/* MADE BY PIYUSH AKOLIYA */

const mongoose = require("mongoose");

const successStorySchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "The username of the post created is not provided."],
  },
  userId: {
    type: String,
    required: [true, "The user-id of the post created is not provided."],
  },
  creationDate: {
    type: Date,
    required: [true, "The creation date of the post created is not provided."],
  },
  jobSector: {
    type: String,
    required: [true, "The job sector of the post created is not provided."],
  },
  message: {
    type: String,
    required: [true, "The message content was not provided."],
  },
  profileImage: {
    type: String,
    required: [true, "The message content was not provided."],
  },
  likes: {
    type: [String],
  },
});

const SuccessStory = mongoose.model("SuccessStory", successStorySchema);

module.exports = SuccessStory;
