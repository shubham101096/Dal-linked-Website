/* MADE BY SHUBHAM MISHRA AND MAYANK PANDEY */

// Import the required nodemailer and express libraries
var nodemailer = require("nodemailer");
var express = require("express");
var router = express.Router();

// Fetch environment variables for admin email and password
const adminEmailId = process.env.EMAIL_ID;
const emailPass = process.env.EMAIL_PASSWORD;

// Create a transporter using nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: adminEmailId,
    pass: emailPass,
  },
});

// Define a route to handle POST requests for sending emails
router.post("/", function (req, res, next) {
  // Extract user information from the request body
  const { name: userName, email: userEmailId, message: userMessage } = req.body;

  // Compose the email to be sent to the admin
  const mailAdmin = {
    from: adminEmailId,
    to: adminEmailId,
    subject: `DalLinked Helpdesk: Name: ${userName}, Email: ${userEmailId}`,
    text: `Name: ${userName}\nEmail: ${userEmailId}\nMessage:\n${userMessage}`,
  };

  // Send the email to the admin
  transporter.sendMail(mailAdmin, (error, info) => {
    if (error) {
      res.status(500).send("Error sending email");
    } else {
      res.status(200).send("Email sent");
    }
  });

  // Compose an auto-reply email to the user
  const mailUser = {
    from: adminEmailId,
    to: userEmailId,
    subject: `[Auto-Reply] DalLinked Helpdesk: Query Received`,
    text: `Thanks for getting in touch with DalLinked. We have received your following query:\n
    "${userMessage}" \n

    It will be process within 10 business days.\n Regards \nHelpdesk\nDalLinked`,
  };

  // Send the auto-reply email to the user
  transporter.sendMail(mailUser, (error, info) => {
    if (error) {
      res.status(500).send("Error sending email");
    } else {
      res.status(200).send("Email sent");
    }
  });
});

// Export the router for use in other parts of the application
module.exports = router;
