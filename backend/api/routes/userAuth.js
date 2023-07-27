/* MADE BY ADRIANA SANCHEZ GOMEZ */

const express = require('express')
const router = express.Router()

const { registerStudent, loginStudent } = require('../controllers/studentReg')
const { registerEmployer, loginEmployer } = require('../controllers/employerReg')
const { loginAdmin } = require('../controllers/adminReg')

const multer = require('multer');
const upload = multer();


// LOGIN ROUTES

router.post('/loginStudent', loginStudent)

router.post('/loginEmployer', loginEmployer)

router.post('/loginAdmin', loginAdmin)


// REGISTER ROUTES

router.post('/registerStudent', registerStudent)

router.post('/registerEmployer', upload.single('companyLogo'),registerEmployer)

module.exports =  router