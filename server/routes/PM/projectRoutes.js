const express = require('express');
const router = express.Router();
const projectController = require('../../controllers/PM/projectController');

router.get('/userProjects/:id',projectController.getUserProjects);
router.get('/projectUsers/:projectId',projectController.getProjectUsers);
router.get('/projects/:spaceId',projectController.getProjects);
router.get('/project/:projectId',projectController.getProject);

module.exports = router;