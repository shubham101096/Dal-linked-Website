/* MADE BY ADRIANA SANCHEZ GOMEZ */

const mongoose = require("mongoose");

const adminRegSchema = new mongoose.Schema({
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

module.exports = mongoose.model('AdminReg', adminRegSchema);
