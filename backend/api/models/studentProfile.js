/* MADE BY ADRIANA SANCHEZ GOMEZ */

const mongoose = require("mongoose");

const studentProfileSchema = new mongoose.Schema({
    studentId: {
        required: true,
        type: String
    },
    contact: {
        type: String,
    },
    about: {
        type: String,
    },
    education: {
        type: String,
    },
    skills: {
        type: String,
    },
    jobSector: {
        type: String,
    },
    profileImage: {
        type: String,
    },
    resume: {
        type: String,
    },
    workExperience: {
        type: String,
    },
    workStyle:{
        type: String,
    }
});

module.exports = mongoose.model('StudentProfile', studentProfileSchema);
