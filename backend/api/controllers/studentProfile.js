/* MADE BY ADRIANA SANCHEZ GOMEZ */

const StudentProfile = require("../models/studentProfile");
const studentRegController = require("./studentReg");
const Student = require("../models/studentReg");

const {S3Client, PutObjectCommand} = require("@aws-sdk/client-s3");
const StudentReg = require("../models/studentReg");

const BUCKET_URL = 'https://web-project-files.s3.amazonaws.com/'



const getStudentProfileByStudentId = async (req, res) => {
    const studentId = req.user._id; // Use the authenticated user's _id
    try {
        // Find the student in the studentReg collection to get firstName, lastName, and email
        const studentData = await Student.findById(studentId).select('firstName lastName email');

        // Find the student profile in the studentProfile collection
        let profile = await StudentProfile.findOne({ studentId });

        // If the profile does not exist, create one with the studentId and default empty string values
        if (!profile) {
            const defaultProfileValues = {
                contact: "",
                about: "",
                education: "",
                skills: "",
                jobSector: "",
                profileImage: "",
                resume: "",
                workExperience: "",
                workStyle: ""
            };

            profile = await StudentProfile.create({
                studentId,
                ...defaultProfileValues
            });
        }

        // Combine the data from both collections
        const combinedData = {
            firstName: studentData.firstName,
            lastName: studentData.lastName,
            email: studentData.email,
            ...profile.toObject() // Spread the profile object to include its fields
        };

        console.log(combinedData);
        // Return the combined data in the response
        res.json(combinedData);

    } catch (error) {
        console.log("Error getting student profile", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


const deleteStudentProfileByStudentId = async (req, res) => {
    const studentId = req.user._id; // Use the authenticated user's _id
    try {
        await StudentProfile.deleteOne({ studentId });

        await StudentReg.findByIdAndDelete(studentId);

        res.json({ message: "Student profile deleted successfully" });
    } catch (error) {
        console.log("Error deleting student profile", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const updateStudentProfileByStudentId = async (req, res) => {
    const studentId = req.user._id; // Use the authenticated user's _id
    const {  ...data } = req.body;

    try {

        // Find and update the student profile
        const profile = await StudentProfile.findOneAndUpdate({ studentId }, data, {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
        });

        res.json(profile);
    } catch (error) {
        console.log("Error updating student profile", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const updateStudentProfilePicture = async (req, res) => {
    const studentId = req.user._id;
    const profileImage = req.file;

    try {
        if (profileImage) {
            const timestamp = Date.now();
            const key = `${studentId}-profile-${timestamp}.png`;
            const profileImageUrl = await uploadProfileImageToS3(profileImage.buffer, key);
            await StudentProfile.findOneAndUpdate({ studentId }, { profileImage: profileImageUrl });
            res.status(200).json({ profileImageUrl });
        } else {
            res.status(400).json({ error: "No profile image provided" });
        }
    } catch (error) {
        console.log("Error updating profile picture", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


const updateStudentResume = async (req, res) => {
    const studentId = req.user._id;
    const resume = req.file;

    try {
        if (resume) {
            const timestamp = Date.now();
            const key = `${studentId}-resume-${timestamp}.pdf`;
            const resumeUrl = await uploadResumeToS3(resume.buffer, key);
            await StudentProfile.findOneAndUpdate({ studentId }, { resume: resumeUrl });
            res.status(200).json({ resumeUrl });
        } else {
            res.status(400).json({ error: "No resume provided" });
        }
    } catch (error) {
        console.log("Error updating resume", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const uploadProfileImageToS3 = async (file, key) => {
    const client = new S3Client({
        region: "us-east-1",
        credentials: {
            accessKeyId: process.env.ACCESS_KEY_ID,
            secretAccessKey: process.env.SECRET_ACCESS_KEY,
        },
    });
    const params = {
        Bucket: "web-project-files",
        Key: key,
        Body: file.buffer,
        ContentType: 'image/png',
        ACL: "public-read",
    };
    try {
        const command = new PutObjectCommand(params);
        await client.send(command);
        console.log("File uploaded successfully to S3.");
        return BUCKET_URL + key;
    } catch (error) {
        console.log("Error uploading file:", error);
        throw error;
    }
};


const uploadResumeToS3 = async (file, key) => {
    const client = new S3Client({
        region: "us-east-1",
        credentials: {
            accessKeyId: process.env.ACCESS_KEY_ID,
            secretAccessKey: process.env.SECRET_ACCESS_KEY,
        },
    });
    const params = {
        Bucket: "web-project-files",
        Key: key,
        Body: file.buffer,
        ContentType: "application/pdf", // PDF for resume files
        ACL: "public-read",
    };
    try {
        const command = new PutObjectCommand(params);
        await client.send(command);
        console.log("File uploaded successfully to S3.");
        return BUCKET_URL + key;
    } catch (error) {
        console.log("Error uploading file:", error);
        throw error;
    }
};




module.exports = {
    getStudentProfileByStudentId,
    updateStudentProfileByStudentId,
    deleteStudentProfileByStudentId,
    updateStudentResume,
    updateStudentProfilePicture
};
