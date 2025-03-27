const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Ruta para obtener usuarios
router.get('/users', userController.getUsers);
router.get('/usersFilter/:param/:value', userController.getUsersFilter);
router.get('/usersSpace/:id', userController.getUsersSpace);


module.exports = router;