/* MADE BY ADRIANA SANCHEZ GOMEZ */

const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminReg');

router.get('/', adminController.getAllAdmins);

router.get('/:id', adminController.getAdminById);

router.get('/email/:email', adminController.getAdminByEmail);

router.post('/register', adminController.registerAdmin);

router.delete('/email/:email', adminController.deleteAdminByEmail);

module.exports = router;
