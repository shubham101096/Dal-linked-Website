/* MADE BY ADRIANA SANCHEZ GOMEZ */

const jwt = require('jsonwebtoken')

const Student = require('../api/models/studentReg')
const Employer = require('../api/models/employerReg')
const Admin = require('../api/models/adminReg')

const requireAuth = async (req, res, next) => {
    // Verify that the user is authenticated

    // Verify authentication
    const { authorization } = req.headers

    if(!authorization){
        return res.status(401).json({error: 'Authorization token required'})
    }

    const token = authorization.split(' ')[1]
    try{
        // verify the token and the signature
        const {_id, email, userType} =  jwt.verify(token, process.env.SECRET)

        // Find the user trying to login
        switch(userType){
            case 'student':
                req.user = await Student.findOne({ _id }).select('_id email')
                break;
            case 'employer':
                req.user = await Employer.findOne({ _id }).select('_id email status')
                break;
            case 'admin':
                req.user = await Admin.findOne({ _id }).select('_id email')
                break;
            default:
                res.status(401).json({error: 'Invalid user type'})
        }
        next()

    }catch (error){
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }
}

module.exports = requireAuth