const bcrypt = require('bcrypt');
const validator = require('validator')
const EmployerReg = require('../models/employerReg');
const jwt = require("jsonwebtoken");
const {application} = require("express");

const createToken = (_id, email, userType) => {
    return jwt.sign({_id: _id, email: email, userType:userType},
        process.env.SECRET,
        {expiresIn: '30d'} // User is logged in for 30 days
    )
}

const getAllEmployers = async (req, res) => {
    try {
        const employers = await EmployerReg.find({});
        res.status(200).json({ employers });
    } catch (error) {
        console.log('Error getting all employers', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getEmployerById = async (req, res) => {
    try {
        const employer = await EmployerReg.findById(req.params.id);
        if (employer) {
            res.status(200).json({ employer });
        } else {
            res.status(404).json({ error: 'Employer not found' });
        }
    } catch (error) {
        console.log('Error getting employer by ID', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getEmployerByEmail = async (req, res) => {
    const email = req.params.email;
    try {
        const employer = await EmployerReg.findOne({ email });
        if (employer) {
            res.status(200).json({ employer });
        } else {
            res.status(404).json({ error: 'Employer not found' });
        }
    } catch (error) {
        console.log('Error getting employer by email', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const registerEmployer = async (req, res) => {
    const { employerName, companyName, email, contactNumber, password, companyLogo, websiteURL } = req.body;

    // Validate input data
    if (!employerName || !companyName || !email || !contactNumber || !password || !companyLogo || !websiteURL) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    // Validate if its valid email
    if (!validator.isEmail(email)){
        return res.status(400).json({ error: 'Invalid email.' });
    }

    // Set status as "pending"
    const status = "pending";

    try {
        // Check if employer already exists with the same email
        const existingEmployer = await EmployerReg.findOne({ email });
        if (existingEmployer) {
            return res.status(409).json({ error: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the employer
        const employer = new EmployerReg({
            employerName,
            companyName,
            email,
            contactNumber,
            password: hashedPassword,
            status,
            companyLogo,
            websiteURL
        });

        const savedEmployer = await employer.save();
        res.status(200).json({ email: email, _id: savedEmployer._id});
    } catch (error) {
        console.log('Error registering employer', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteEmployerByEmail = async (req, res) => {
    const email = req.params.email;
    try {
        const deletedEmployer = await EmployerReg.findOneAndDelete({ email });
        if (deletedEmployer) {
            res.status(200).json({ message: 'Employer deleted successfully' });
        } else {
            res.status(404).json({ error: 'Employer not found' });
        }
    } catch (error) {
        console.log('Error deleting employer', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const loginEmployer = async (req, res)=>{
    const { email, password } = req.body;
    // Validate input data
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    try {
        // Check if employer exists with the provided email
        const employer = await EmployerReg.findOne({ email });
        if (!employer) {
            return res.status(404).json({ error: 'Employer not found' });
        }
        if(employer.status === 'pending'){
            return res.status(400).json({ error: 'Employer registration request has not been accepted yet.' });
        }
        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, employer.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = createToken(employer._id, email, 'employer');
        res.status(200).json({ email: email, token: token, userType: 'employer', status: employer.status });
    } catch (error) {
        console.log('Error logging in employer', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getAllEmployers,
    getEmployerById,
    getEmployerByEmail,
    registerEmployer,
    deleteEmployerByEmail,
    loginEmployer
};
