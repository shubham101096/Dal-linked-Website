const express = require('express')
const router = express.Router()

const { registerStudent, loginStudent } = require('../controllers/studentReg')
const { registerEmployer, loginEmployer } = require('../controllers/employerReg')
const { loginAdmin } = require('../controllers/adminReg')


// LOGIN ROUTES

router.post('/loginStudent', loginStudent)

router.post('/loginEmployer', loginEmployer)

router.post('/loginAdmin', loginAdmin)


// REGISTER ROUTES

router.post('/registerStudent', registerStudent)

router.post('/registerEmployer', registerEmployer)

module.exports =  router