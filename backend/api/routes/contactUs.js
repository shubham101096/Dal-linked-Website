/* MADE BY SHUBHAM MISHRA AND MAYANK PANDEY */

var nodemailer = require("nodemailer");
var express = require("express");
var router = express.Router();

const adminEmailId = process.env.EMAIL_ID;
const emailPass = process.env.EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: adminEmailId,
    pass: emailPass,
  },
});

router.post("/", function (req, res, next) {
  const { name: userName, email: userEmailId, message: userMessage } = req.body;

  const mailAdmin = {
    from: adminEmailId,
    to: adminEmailId,
    subject: `DalLinked Helpdesk: Name: ${userName}, Email: ${userEmailId}`,
    text: `Name: ${userName}\nEmail: ${userEmailId}\nMessage:\n${userMessage}`,
  };

  transporter.sendMail(mailAdmin, (error, info) => {
    if (error) {
      res.status(500).send("Error sending email");
    } else {
      res.status(200).send("Email sent");
    }
  });

  const mailUser = {
    from: adminEmailId,
    to: userEmailId,
    subject: `[Auto-Reply] DalLinked Helpdesk: Query Received`,
    text: `Thanks for getting in touch with DalLinked. We have received your following query:\n
    "${userMessage}" \n

    It will be process within 10 business days.\n Regards \nHelpdesk\nDalLinked`,
  };

  transporter.sendMail(mailUser, (error, info) => {
    if (error) {
      res.status(500).send("Error sending email");
    } else {
      res.status(200).send("Email sent");
    }
  });
});

module.exports = router;
