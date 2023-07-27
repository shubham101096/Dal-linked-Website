/* MADE BY ADRIANA SANCHEZ GOMEZ */

const express = require('express');
const router = express.Router();

const studentController = require('../controllers/studentReg');
const requireAuth = require('../../middleware/requireAuth')
// This ensures that all these routes are authenticated
router.use(requireAuth)

router.get('/', studentController.getAllStudents);

router.get('/:id', studentController.getStudentById);

router.get('/email/:email', studentController.getStudentByEmail);

router.post('/register', studentController.registerStudent);

router.delete('/email/:email', studentController.deleteStudentByEmail);

module.exports = router;
