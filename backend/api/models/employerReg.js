/* MADE BY ADRIANA SANCHEZ GOMEZ */

const mongoose = require("mongoose");

const employerRegSchema = new mongoose.Schema({
  employerName: {
    required: true,
    type: String,
  },
  companyName: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  contactNumber: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  status: {
    required: true,
    type: String,
    enum: ["pending", "inactive", "active"],
  },
  companyLogo: {
    type: String,
  },
  websiteURL: {
    type: String,
  },
});

module.exports = mongoose.model("EmployerReg", employerRegSchema);
