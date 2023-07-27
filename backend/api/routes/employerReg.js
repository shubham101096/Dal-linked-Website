/* MADE BY ADRIANA SANCHEZ GOMEZ */

const express = require('express');
const router = express.Router();

const employerController = require('../controllers/employerReg');

router.get('/', employerController.getAllEmployers);

router.get('/:id', employerController.getEmployerById);

router.get('/email/:email', employerController.getEmployerByEmail);

router.post('/register', employerController.registerEmployer);

router.delete('/email/:email', employerController.deleteEmployerByEmail);

router.get('/status/:status', employerController.getEmployerByStatus);

router.put('/status/:id', employerController.updateEmployerStatus);

module.exports = router;
