const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/moduleController');

router.get('/modules',moduleController.getModules);

module.exports = router;