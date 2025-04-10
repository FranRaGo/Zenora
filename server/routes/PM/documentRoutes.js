const express = require('express');
const router = express.Router();
const documentController = require('../../controllers/PM/documentController');

router.get('/PmDocument/:param/:id',documentController.getPmDocument);

module.exports = router;