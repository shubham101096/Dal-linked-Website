/* MADE BY ADRIANA SANCHEZ GOMEZ */

const mongoose = require("mongoose");

const studentRegSchema = new mongoose.Schema({
    firstName: {
        required: true,
        type: String
    },
    lastName: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String
    }
});

module.exports = mongoose.model('StudentReg', studentRegSchema);
