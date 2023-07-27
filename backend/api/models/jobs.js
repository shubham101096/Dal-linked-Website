/* MADE BY MAYANKKUMAR PATEL & MAYANK PANDEY */

const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    companyName: {
        required: true,
        type: String
    },
    noOfPositions: {
        required: true,
        type: Number
    },
    jobSector: {
        required: true,
        type: String
    },
    title: {
        required: true,
        type: String
    },
    location: {
        required: true,
        type: String
    },
    type: {
        required: true,
        type: String
    },
    startDate: {
        required: true,
        type: Date
    },
    salary: {
        required: true,
        type: Number
    },
    requirement: {
        required: true,
        type: String
    },
    skills: {
        required: true,
        type: [
            {
                skillName: {
                    type: String
                }
            }
        ]
    },
    hrEmail: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    benefits: {
        required: true,
        type: String
    },
    postedDate: {
        required: true,
        type: Date
    },
    endDate: {
        required: true,
        type: Date
    },
    employeeId: {
        required: true,
        type: String
    },
    imageUrl: {
        required: true,
        type: String
    }
});

module.exports = mongoose.model('Job', jobSchema);  