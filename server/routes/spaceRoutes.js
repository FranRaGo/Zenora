const express = require('express');
const router = express.Router();
const spaceController = require('../controllers/spaceController');

router.get('/usersSpace/:id', spaceController.getUserSpace);
router.get('/space/:id', spaceController.getSpace);

router.post('/space', spaceController.createSpace);

router.put('/upadateSpaceName/:spaceId', spaceController.updateSpaceName);
router.put('/upadateSpacePlan/:spaceId', spaceController.updateSpacePlan);
router.put('/upadateSpaceLogo/:spaceId', spaceController.updateSpaceLogo);

router.delete('/deleteSpace/:spaceId', spaceController.deleteSpace);

module.exports = router;