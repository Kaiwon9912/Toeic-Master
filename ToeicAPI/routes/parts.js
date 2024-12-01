const express = require('express');
const partsController = require('../controllers/partsController');
const router = express.Router();

// Route lấy danh sách Parts
router.get('', partsController.getAllParts);

module.exports = router;
