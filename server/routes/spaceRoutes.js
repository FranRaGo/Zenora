const express = require('express');
const router = express.Router();
const spaceController = require('../controllers/spaceController');

router.get('/usersSpace/:id', spaceController.getUserSpace);
router.get('/space/:id', spaceController.getSpace);

router.post('/space', spaceController.createSpace);
router.post('/addUserSpace', spaceController.addUserSpace);

router.put('/updateSpaceName/:spaceId', spaceController.updateSpaceName);
router.put('/updateSpacePlan/:spaceId', spaceController.updateSpacePlan);
router.put('/updateSpaceLogo/:spaceId', spaceController.updateSpaceLogo);
router.put('/updateSpaceUserRole/:userId/:spaceId', spaceController.updateUserRole);


router.delete('/deleteSpace/:spaceId', spaceController.deleteSpace);
router.delete('/deleteUserSpace/:userId/:spaceId', spaceController.deleteUserSpace);

module.exports = router;