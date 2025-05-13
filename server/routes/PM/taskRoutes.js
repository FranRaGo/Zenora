const express = require('express');
const router = express.Router();
const taskController = require('../../controllers/PM/taskController');

router.get('/task/:taskId',taskController.getTask);
router.get('/subtask/:subtaskId',taskController.getSubtask);
router.get('/usersTask/:taskId',taskController.getUsersTask);

router.get('/userTask/:userId/:projectId',taskController.getUserTask);
router.get('/userSubtask/:userId/:taskId',taskController.getUserSubtask);

router.get('/taskSubtask/:taskId',taskController.getTaskSubtask);
router.get('/projectTask/:projectId',taskController.getProjectTask);

router.post('/task/:projectId',taskController.createTask);
router.post('/assigTask/:taskId',taskController.assigTask);
router.post('/subtask/:taskId',taskController.createSubtask);
router.post('/assigSubask/:subtaskId',taskController.assigSubtask);

router.put('/task/:taskId',taskController.updateTask);
router.put('/subtask/:subtaskId',taskController.updateSubtask);

router.delete('/task/:taskId',taskController.deleteTask);
router.delete('/assigTask/:assigId',taskController.deleteAssigTask);
router.delete('/subtask/:subtaskId',taskController.deleteSubtask);
router.delete('/assigSubtask/:assigId',taskController.deleteAssigSubtask);


module.exports = router;