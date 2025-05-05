const express = require('express');
const router = express.Router();
const messageController = require('../../controllers/CC/messageController');

router.get('/messages/:chatId',messageController.getMessages);

router.post('/message',messageController.sendMessage);

router.put('/important', messageController.setImportant);

module.exports = router;