// routes/emailRoutes.js
const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

// debe ser POST porque envías data por body
router.post('/send-code', emailController.sendCode);

module.exports = router;
