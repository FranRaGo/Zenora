const express = require('express');
const router = express.Router();
const documentController = require('../../controllers/PM/documentController');

router.get('/PmDocument/:param/:id',documentController.getPmDocument);

router.post('/PmDocument/:param/:id',documentController.pushPmDocument);

router.delete('/PmDocument/:documentId',documentController.deletePmDocument);

module.exports = router;