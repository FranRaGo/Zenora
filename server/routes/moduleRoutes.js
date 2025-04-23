const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/moduleController');

router.get('/modules',moduleController.getModules);
router.get('/modules/:spaceId',moduleController.getSpaceModules);

router.post('/modSpace',moduleController.addModuleSpace);

module.exports = router;