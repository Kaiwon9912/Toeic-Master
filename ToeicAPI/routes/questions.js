const express = require('express');
const router = express.Router();
const questionsController = require('../controllers/questionsController');

// Route lấy câu hỏi theo part
router.get('/part/:part', questionsController.getQuestionsByPart);
router.get('/part/:part/random', questionsController.getRandomQuestionByPart);


// Lấy thống kê câu hỏi của người dùng
router.get('/user-question-stats/:userId', questionsController.getUserQuestionStats);

// Lấy nhóm câu hỏi ngẫu nhiên bằng Stored Procedure
router.get('/random-group/:partId', questionsController.getRandomGroupByStoredProc);

module.exports = router;
