const express = require('express');
const router = express.Router();
const spaceController = require('../controllers/spaceController');

// Ruta para obtener usuarios
router.get('/space/:id', spaceController.getUsersSpace);

module.exports = router;