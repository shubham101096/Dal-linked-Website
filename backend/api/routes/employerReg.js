const express = require('express');
const router = express.Router();

const employerController = require('../controllers/employerReg');

router.get('/', employerController.getAllEmployers);

router.get('/:id', employerController.getEmployerById);

router.get('/email/:email', employerController.getEmployerByEmail);

router.post('/register', employerController.registerEmployer);

router.delete('/email/:email', employerController.deleteEmployerByEmail);

module.exports = router;
