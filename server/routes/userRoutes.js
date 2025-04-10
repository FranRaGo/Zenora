const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users', userController.getUsers);
router.get('/usersFilter/:param/:value', userController.getUsersFilter);
router.get('/usersSpace/:id', userController.getUsersSpace);

router.post('/user', userController.createUser);

router.put('/user/:userId', userController.updateUser);
router.put('/userPhoto/:userId', userController.updateUserPhoto);

router.delete('/user/:userId', userController.deleteUser);

module.exports = router;