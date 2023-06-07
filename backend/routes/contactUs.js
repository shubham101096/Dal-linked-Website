var nodemailer = require("nodemailer");
var express = require("express");
var router = express.Router();

const emailId = process.env.EMAIL_ID;
const emailPass = process.env.EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailId,
    pass: emailPass,
  },
});

router.post("/", function (req, res, next) {
  const { from, text } = req.body;

  const mailOptions = {
    from: emailId,
    to: emailId,
    subject: "Hi",
    text: "text",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).send("Error sending email");
    } else {
      res.status(200).send("Email sent");
    }
  });
});

module.exports = router;
