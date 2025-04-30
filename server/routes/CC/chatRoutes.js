const express = require('express');
const router = express.Router();
const chatController = require('../../controllers/CC/chatController');

router.get('/chats/:userId',chatController.getChats);
router.get('/chatMembers/:userId/:chatId',chatController.getChatMembers);

router.post('/chat',chatController.createChat);
router.post('/userChat',chatController.userChat);

router.put('/chat',chatController.editChat);

router.delete('/chat/:chatId',chatController.deleteChat);
router.delete('/userChat',chatController.deleteUserChat);

module.exports = router;