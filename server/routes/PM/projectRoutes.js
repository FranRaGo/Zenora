const express = require('express');
const router = express.Router();
const projectController = require('../../controllers/PM/projectController');

router.get('/userProjects/:id',projectController.getUserProjects);
router.get('/projectUsers/:projectId',projectController.getProjectUsers);
router.get('/projects/:spaceId',projectController.getProjects);
router.get('/project/:projectId',projectController.getProject);

router.post('/project',projectController.createProject);
router.post('/assigProject',projectController.assigProject);

router.put('/project/:projectId',projectController.updateProject);
router.put('/bannerProject/:projectId',projectController.updateBannerProject);
router.put('/userManager/:assigId',projectController.updateManageProject);

router.delete('/project/:projectId',projectController.deleteProject);
router.delete('/assigProject/:assigId',projectController.deleteAssigProject);


module.exports = router;