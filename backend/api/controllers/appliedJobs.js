/* MADE BY MAYANKKUMAR PATEL */

const AppliedJob = require("../models/appliedJobs");
const StudentProfile = require("../models/studentProfile");
const Studentreg = require("../models/studentReg");
const nodeMailer = require("nodemailer");

const emailId = process.env.EMAIL_ID;
const emailPass = process.env.EMAIL_PASSWORD;

const saveJob = async (req, res) => {
  req.body["studentId"] = req.user._id;
  const studentDetail = await StudentProfile.findOne({ studentId: req.user._id });
  const student = await Studentreg.findById(req.user._id);
  req.body["student"] = studentDetail;
  req.body["firstName"] = student.firstName;
  req.body["lastName"] = student.lastName;
  req.body["email"] = student.email;
  const newSaveJob = new AppliedJob(req.body);
  try {
    await newSaveJob.save();
    res.status(200).json({
      message: "Job saved",
      job: newSaveJob,
    });
  } catch (err) {
    console.log("Error in saving job.", err);
    res.status(500).json({
      message: "Error in saving job.",
    });
  }
};

const getByStudent = async (req, res) => {
  try {
    const studentJobs = await AppliedJob.find({ studentId: req.user._id });
    res.status(200).json({
      jobs: studentJobs,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error in getting jobs for given student id.",
    });
  }
};

const getByJobId = async (req, res) => {
  try {
    const jobs = await AppliedJob.find({ jobId: req.user._id });
    res.status(200).json({
      jobs: jobs,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error in getting jobs for given student id.",
    });
  }
};

const updateStatusById = async (req, res) => {
  const { id, status, studentEmail } = req.body;
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: emailId,
      pass: emailPass,
    },
  });

  const mailStudent = {
    from: emailId,
    to: studentEmail,
    subject: "DalLinked: Application Status Updated",
    text: "Hello, your application status has been updated. Please login to our website to check your status.",
  };

  try {
    await AppliedJob.updateOne({ _id: id }, { $set: { status: status } });

    transporter.sendMail(mailStudent, (error, info) => {
      if (error) {
        res.status(500).send("Error sending email");
      } else {
        res.status(200).send("Email sent");
      }
    });

    res.status(200).json({
      message: "Status updated Successfully!",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error in updating job status.",
    });
  }
}

module.exports = { saveJob, getByStudent, getByJobId, updateStatusById };
