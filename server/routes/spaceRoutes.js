const express = require('express');
const router = express.Router();
const spaceController = require('../controllers/spaceController');

router.get('/space/:id', spaceController.getUsersSpace);

module.exports = router;