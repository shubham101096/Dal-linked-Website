/* MADE BY SHUBHAM MISHRA */

// Import the mongoose library
const mongoose = require('mongoose');

// Define the announcement schema
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

// Create and export the Announcement model based on the schema
module.exports = mongoose.model('Announcement', announcementSchema);