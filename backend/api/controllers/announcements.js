/* MADE BY SHUBHAM MISHRA */

// Import the Announcement model
const Announcement = require("../models/announcement");

// Get all announcements
const getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find({});
    res.json(announcements);
  } catch (error) {
    console.error("Error retrieving announcements:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new announcement
const createAnnouncement = async (req, res) => {
  try {
    // Extract title and body from the request body
    const { title, body } = req.body;
    
    // Create a new Announcement instance
    const newAnnouncement = new Announcement({ title, body });
    
    // Save the new announcement to the database
    const createdAnnouncement = await newAnnouncement.save();
    
    res.json(createdAnnouncement);
  } catch (error) {
    console.error("Error creating announcement:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get announcement by ID
const getAnnouncementById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find announcement by ID
    const announcement = await Announcement.findById(id);
    
    if (!announcement) {
      return res.status(404).json({ error: "Announcement not found" });
    }
    
    res.json(announcement);
  } catch (error) {
    console.error("Error retrieving announcement:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete announcement by ID
const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find and delete announcement by ID
    const deletedAnnouncement = await Announcement.findByIdAndDelete(id);
    
    if (!deletedAnnouncement) {
      return res.status(404).json({ error: "Announcement not found" });
    }
    
    res.json({ message: "Announcement deleted successfully" });
  } catch (error) {
    console.error("Error deleting announcement:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Export the functions for use in other modules
module.exports = { 
  getAllAnnouncements, 
  getAnnouncementById, 
  createAnnouncement, 
  deleteAnnouncement 
};
