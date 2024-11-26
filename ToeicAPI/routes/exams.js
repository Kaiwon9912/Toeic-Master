const express = require('express');
const router = express.Router();
const examsController = require('../controllers/examsController');

router.get('/level/:level', examsController.getExamsByLevel);
router.get('/',examsController.getAllExams)
router.get('/:examId', examsController.getExamById);
module.exports = router;
