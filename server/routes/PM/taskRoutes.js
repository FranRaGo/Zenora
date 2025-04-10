const express = require('express');
const router = express.Router();
const taskController = require('../../controllers/PM/taskController');

router.get('/task/:taskId',taskController.getTask);
router.get('/subtask/:subtaskId',taskController.getSubtask);

router.get('/userTask/:userId/:projectId',taskController.getUserTask);
router.get('/userSubtask/:userId/:taskId',taskController.getUserSubtask);

router.get('/taskSubtask/:taskId',taskController.getTaskSubtask);
router.get('/projectTask/:projectId',taskController.getProjectTask);

module.exports = router;