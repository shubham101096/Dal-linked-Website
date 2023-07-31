/* MADE BY ADRIANA SANCHEZ GOMEZ */

const bcrypt = require('bcrypt');
const validator = require('validator')
const EmployerReg = require('../models/employerReg');
const jwt = require("jsonwebtoken");
const {application} = require("express");

const {S3Client, PutObjectCommand} = require("@aws-sdk/client-s3");

const BUCKET_URL = 'https://web-project-files.s3.amazonaws.com/'


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
    const { employerName, companyName, email, contactNumber, password, websiteURL } = req.body;
    const companyLogo = req.file;

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
            websiteURL
        });

        const savedEmployer = await employer.save();

        const s3ImageUrl = await uploadLogoToS3(companyLogo, savedEmployer._id);
        savedEmployer.companyLogo = s3ImageUrl;
        await savedEmployer.save();

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

const uploadLogo = async (logo,employerId) => {
    const client = new S3Client({
        region: "us-east-1",
        credentials: {
            accessKeyId: process.env.ACCESS_KEY_ID,
            secretAccessKey: process.env.SECRET_ACCESS_KEY
        }
    });

    const key = employerId+'-employer-logo';

    const params = {
        Bucket: "web-project-files",
        Key: key,
        Body: logo.buffer,
        ContentType: logo.mimetype,
        ACL: 'public-read',
    };

    try {
        const command = new PutObjectCommand(params);
        await client.send(command);
        console.log("Employer Logo uploaded successfully to S3.");
        return BUCKET_URL+key;
    } catch (error) {
        console.log("Error uploading file:", error);
        throw error;
    }
};

const uploadLogoToS3 = async (logo, employerId) => {
    try {
        const s3ImageUrl = await uploadLogo(logo, employerId);
        return s3ImageUrl;
    } catch (error) {
        console.error('Error uploading logo to S3:', error);
        throw error;
    }
};

async function getEmployerByStatus(req, res) {
    const { status } = req.params;

    try {
        const employers = await EmployerReg.find({ status: status });
        res.status(200).json({employers});
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
}

const updateEmployerStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    try {
      // Check if employer exists with the provided ID
      const employer = await EmployerReg.findById(id);
      if (!employer) {
        return res.status(404).json({ error: 'Employer not found' });
      }
  
      // Update the employer's status
      employer.status = status;
      await employer.save();
  
      res.status(200).json({ message: 'Employer status updated successfully', employer });
    } catch (error) {
      console.log('Error updating employer status', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = {
    getAllEmployers,
    getEmployerById,
    getEmployerByEmail,
    registerEmployer,
    deleteEmployerByEmail,
    loginEmployer,
    getEmployerByStatus,
    updateEmployerStatus
};
