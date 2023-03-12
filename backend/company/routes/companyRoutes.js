const express = require('express');
const router = express.Router();
const registerCompany = require('../controllers/registerController');
const loginCompany = require('../controllers/loginController');
const { getAllCompanies } = require('../controllers/companyController');

router.post('/register', registerCompany);
router.post('/login', loginCompany);
router.get('/', getAllCompanies);

module.exports = router;