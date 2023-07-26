const StudentProfile = require("../models/studentProfile");
const studentRegController = require("./studentReg");
const Student = require("../models/studentReg");

const {S3Client, PutObjectCommand} = require("@aws-sdk/client-s3");

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

        // Also delete the student from StudentReg collection
        await studentRegController.deleteStudentById(req, res);

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
    const studentId = req.user._id; // Use the authenticated user's _id
    const profileImage = req.file;

    var imageURL;

    try {
        // Handle profile image upload to S3
        if (profileImage) {
            const profileImageUrl = await uploadFileToS3(profileImage.buffer, studentId + "-profile-picture",
                profileImage.buffer.mimeType);
            // Update the profileImage field in the student profile
            await StudentProfile.findOneAndUpdate({ studentId }, { profileImage: profileImageUrl });
            imageURL = profileImageUrl;
        }

        res.json({ profileImageUrl: imageURL });
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
            const resumeUrl = await uploadFileToS3(resume.buffer, studentId + "-resume", "application/pdf");
            await StudentProfile.findOneAndUpdate({ studentId }, { resume: resumeUrl });
        }

        res.json({ message: "Resume updated successfully" });
    } catch (error) {
        console.log("Error updating resume", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


const uploadFileToS3 = async (file, key, contentType) => {
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
        ContentType: contentType,
        ACL: "public-read",
    };
    // file.mimetype

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
