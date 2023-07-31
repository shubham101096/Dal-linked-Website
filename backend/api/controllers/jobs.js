/* MADE BY MAYANKKUMAR PATEL & MAYANK PANDEY */

const Job = require("../models/jobs");
const StudentProfile = require("../models/studentProfile");
const StudentReg = require("../models/studentReg");
const nodeMailer = require("nodemailer");

const emailId = process.env.EMAIL_ID;
const emailPass = process.env.EMAIL_PASSWORD;

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({});
    res.status(200).json({
        jobs: jobs
    });
}

const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        res.status(200).json({
            job: job
        });
    } catch (error) {
        console.log("Error getting job by given id", error);
        res.status(200).json({
            message: "Job with given id does not exist."
        });
    }
}

const postJob = async (req, res) => {
    const job = new Job(req.body);
    try {
        const interestedStudent = await StudentProfile.find({ jobSector: req.body.jobSector });
        if(interestedStudent.length !== 0) {
            for(const student of interestedStudent) {
                const currentStudentEmail = await StudentReg.findById(student.studentId);
                sendEmailAlert(currentStudentEmail.email);
            }
        }
        const savedJob = await job.save();
        res.status(200).json({
            message: "Job saved",
            job: savedJob
        });
    } catch (error) {
        console.log("Error saving job", error);
    }
}

const getJobByEmployerId = async (req, res) => {
    try {
        const job = await Job.find({ employeeId: req.params.id });
        res.status(200).json({
            job: job
        });
    } catch (error) {
        console.log("Error getting job by given employee id", error);
        res.status(200).json({
            message: "Job with given employee id does not exist."
        });
    }
}

const sendEmailAlert = (studentEmail) => {
    const transporter = nodeMailer.createTransport({
        service: "gmail",
        auth: {
          user: emailId,
          pass: emailPass,
        },
    });

    const message = `
        <!DOCTYPE html>
        <html>
            <head>
                <title>New Job Posted!</title>
            </head>
            <body>
                <h5>
                    Hello,
                    There is a new job posted in a job sector that you are interested in.
                    Please login to our website to check the new job posting.
                </h5>
            </body>
        </html>
    `;
    
    const mailStudent = {
        from: emailId,
        to: studentEmail,
        subject: "DalLinked: New Job Posted",
        html: message
    };

    transporter.sendMail(mailStudent, (error, info) => {
        if (error) {
          console.log("Error sending email");
        } else {
          console.log("Email sent");
        }
    });
    
}

module.exports = { getAllJobs, getJobById, postJob, getJobByEmployerId };