/* MADE BY ADRIANA SANCHEZ GOMEZ */

const bcrypt = require('bcrypt');
const validator = require('validator')
const StudentReg = require('../models/studentReg');
const jwt = require('jsonwebtoken')

const createToken = (_id, email, userType) => {
    return jwt.sign({_id: _id, email: email, userType: userType },
        process.env.SECRET,
        {expiresIn: '30d'} // User is logged in for 30 days
    )
}

const getAllStudents = async (req, res) => {
    try {
        const students = await StudentReg.find({});
        res.status(200).json({ students });
    } catch (error) {
        console.log('Error getting all students', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getStudentById = async (req, res) => {
    try {
        const student = await StudentReg.findById(req.params.id);
        if (student) {
            res.status(200).json({ student });
        } else {
            res.status(404).json({ error: 'Student not found' });
        }
    } catch (error) {
        console.log('Error getting student by ID', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getStudentByEmail = async (req, res) => {
    const email = req.params.email;
    try {
        const student = await StudentReg.findOne({ email });
        if (student) {
            res.status(200).json({ student });
        } else {
            res.status(404).json({ error: 'Student not found' });
        }
    } catch (error) {
        console.log('Error getting student by email', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const registerStudent = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    // Validate input data
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    // Validate if its valid email
    if (!validator.isEmail(email)){
        return res.status(400).json({ error: 'Invalid email.' });
    }

    // Validate Dalhousie email format
    const emailRegex = /^[a-zA-Z0-9_.+-]+@dal\.ca$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format. Only dal.ca emails are allowed' });
    }

    try {
        // Check if student already exists with the same email
        const existingStudent = await StudentReg.findOne({ email });
        if (existingStudent) {
            return res.status(409).json({ error: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the student
        const student = new StudentReg({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        const savedStudent = await student.save();

        const token = createToken(savedStudent._id, email)

       // res.status(200).json({ message: 'Student registered successfully', student: savedStudent, token: token });
        res.status(200).json({email: email, token: token });
    } catch (error) {
        console.log('Error registering student', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteStudentByEmail = async (req, res) => {
    const email = req.params.email;
    try {
        const deletedStudent = await StudentReg.findOneAndDelete({ email });
        if (deletedStudent) {
            res.status(200).json({ message: 'Student deleted successfully' });
        } else {
            res.status(404).json({ error: 'Student not found' });
        }
    } catch (error) {
        console.log('Error deleting student', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteStudentById = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedStudent = await StudentReg.findByIdAndDelete(id);
        if (deletedStudent) {
            res.status(200).json({ message: "Student deleted successfully" });
        } else {
            res.status(404).json({ error: "Student not found" });
        }
    } catch (error) {
        console.log("Error deleting student", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const loginStudent = async (req, res)=>{
    const { email, password } = req.body;
    // Validate input data
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    try {
        // Check if student exists with the provided email
        const student = await StudentReg.findOne({ email });
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, student.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        const token = createToken(student._id, email, 'student');
        res.status(200).json({ email: email, token: token, userType: 'student'  });
    } catch (error) {
        console.log('Error logging in student', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getAllStudents,
    getStudentById,
    getStudentByEmail,
    registerStudent,
    deleteStudentByEmail,
    deleteStudentById,
    loginStudent
};
