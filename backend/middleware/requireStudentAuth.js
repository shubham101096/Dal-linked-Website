/* MADE BY ADRIANA SANCHEZ GOMEZ */

const jwt = require('jsonwebtoken')

const Student = require('../api/models/studentReg')


const requireStudentAuth = async (req, res, next) => {
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

        // Find the student trying to login
        req.user = await Student.findOne({ _id }).select('_id email')
        next()

    }catch (error){
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }
}

module.exports = requireStudentAuth