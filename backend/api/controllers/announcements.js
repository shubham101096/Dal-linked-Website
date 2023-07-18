const Announcement = require("../models/announcement");

function formatDateString(dateStr) {
  const date = new Date(dateStr);

  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  return date.toLocaleString('en-US', options);
}

const getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find({});
    const formattedAnnouncements = announcements.map((announcement) => ({
      ...announcement.toObject(),
      datePosted: formatDateString(announcement.datePosted),
    }));
    res.json(formattedAnnouncements);
  } catch (error) {
    console.error("Error retrieving announcements:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createAnnouncement = async (req, res) => {
  try {
    const { title, body } = req.body;
    const newAnnouncement = new Announcement({ title, body });
    const createdAnnouncement = await newAnnouncement.save();
    res.json(createdAnnouncement);
  } catch (error) {
    console.error("Error creating announcement:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAnnouncementById = async (req, res) => {
  try {
    const { id } = req.params;
    const announcement = await Announcement.findById(id);
    if (!announcement) {
      return res.status(404).json({ error: "Announcement not found" });
    }
    const formattedAnnouncement = {
      ...announcement.toObject(),
      datePosted: formatDateString(announcement.datePosted),
    };
    res.json(formattedAnnouncement);
  } catch (error) {
    console.error("Error retrieving announcement:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
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

module.exports = { 
  getAllAnnouncements, 
  getAnnouncementById, 
  createAnnouncement, 
  deleteAnnouncement 
};