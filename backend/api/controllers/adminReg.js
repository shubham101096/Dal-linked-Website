/* MADE BY ADRIANA SANCHEZ GOMEZ */

const bcrypt = require('bcrypt');
const validator = require('validator')
const AdminReg = require('../models/adminReg');
const jwt = require("jsonwebtoken");

const createToken = (_id, email, userType) => {
    return jwt.sign({_id: _id, email: email, userType: userType},
        process.env.SECRET,
        {expiresIn: '30d'} // User is logged in for 30 days
    )
}


const getAllAdmins = async (req, res) => {
    try {
        const admins = await AdminReg.find({});
        res.status(200).json({ admins });
    } catch (error) {
        console.log('Error getting all admins', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAdminById = async (req, res) => {
    try {
        const admin = await AdminReg.findById(req.params.id);
        if (admin) {
            res.status(200).json({ admin });
        } else {
            res.status(404).json({ error: 'Admin not found' });
        }
    } catch (error) {
        console.log('Error getting admin by ID', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAdminByEmail = async (req, res) => {
    const email = req.params.email;
    try {
        const admin = await AdminReg.findOne({ email });
        if (admin) {
            res.status(200).json({ admin });
        } else {
            res.status(404).json({ error: 'Admin not found' });
        }
    } catch (error) {
        console.log('Error getting admin by email', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const registerAdmin = async (req, res) => {
    const { email, password } = req.body;
    // Validate input data
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    // Validate if its valid email
    if (!validator.isEmail(email)){
        return res.status(400).json({ error: 'Invalid email.' });
    }
    try {
        // Check if admin already exists with the same email
        const existingAdmin = await AdminReg.findOne({ email });
        if (existingAdmin) {
            return res.status(409).json({ error: 'Email already exists' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create and save the admin
        const admin = new AdminReg({
            email,
            password: hashedPassword
        });

        const savedAdmin = await admin.save();
        res.status(200).json({ email: email, _id: savedAdmin._id });
    } catch (error) {
        console.log('Error registering admin', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteAdminByEmail = async (req, res) => {
    const email = req.params.email;
    try {
        const deletedAdmin = await AdminReg.findOneAndDelete({ email });
        if (deletedAdmin) {
            res.status(200).json({ message: 'Admin deleted successfully' });
        } else {
            res.status(404).json({ error: 'Admin not found' });
        }
    } catch (error) {
        console.log('Error deleting admin', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const loginAdmin = async (req, res)=>{
    const { email, password } = req.body;
    // Validate input data
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    try {
        // Check if admin exists with the provided email
        const admin = await AdminReg.findOne({ email });
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, admin.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = createToken(admin._id, email, 'admin');

        res.status(200).json({ email: email, token: token, userType: 'admin' });
    } catch (error) {
        console.log('Error logging in admin', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getAllAdmins,
    getAdminById,
    getAdminByEmail,
    registerAdmin,
    deleteAdminByEmail,
    loginAdmin
};
