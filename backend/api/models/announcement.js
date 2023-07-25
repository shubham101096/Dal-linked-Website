const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  datePosted: {
    type: Date,
    default: Date.now
  },
  body: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Announcement', announcementSchema);