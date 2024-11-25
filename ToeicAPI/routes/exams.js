const express = require('express');
const router = express.Router();
const examsController = require('../controllers/examsController');

router.get('/:partID', examsController.getExamsByPart);

module.exports = router;
