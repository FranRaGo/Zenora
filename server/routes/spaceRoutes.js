const express = require('express');
const router = express.Router();
const spaceController = require('../controllers/spaceController');

router.get('/spaceUser/:id', spaceController.getUserSpace);
router.get('/space/:param/:value', spaceController.getSpace);
router.get('/invitations/:param/:value', spaceController.getInvitationsFilter);
router.get('/userSpaceRole/:userId/:spaceId', spaceController.getUserRole);


router.post('/space', spaceController.createSpace);
router.post('/addUserSpace', spaceController.addUserSpace);
router.post('/invitation', spaceController.createInvitation);

router.put('/updateSpaceName/:spaceId', spaceController.updateSpaceName);
router.put('/updateSpacePlan/:spaceId', spaceController.updateSpacePlan);
router.put('/updateSpaceLogo/:spaceId', spaceController.updateSpaceLogo);
router.put('/updateSpaceUserRole/:userId/:spaceId', spaceController.updateUserRole);


router.delete('/deleteSpace/:spaceId', spaceController.deleteSpace);
router.delete('/deleteUserSpace/:userId/:spaceId', spaceController.deleteUserSpace);
router.delete('/deleteInvitation/:invitationId', spaceController.deleteInvitation);

module.exports = router;