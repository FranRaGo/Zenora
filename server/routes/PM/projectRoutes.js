const express = require('express');
const router = express.Router();
const projectController = require('../../controllers/PM/projectController');

router.get('/userProjects/:id',projectController.getUserProjects);
router.get('/projectUsers/:id',projectController.getProjectUsers);

module.exports = router;