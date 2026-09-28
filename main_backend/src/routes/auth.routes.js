const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Định nghĩa API POST /register
router.post('/register', authController.register);

module.exports = router;