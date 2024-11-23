const express = require('express');
const router = express.Router();
const questionsController = require('../controllers/questionsController');

// Route lấy câu hỏi theo part
router.get('/part/:part', questionsController.getQuestionsByPart);

// Route lấy câu hỏi ngẫu nhiên theo part
router.get('/part/:part/random', questionsController.getRandomQuestionByPart);

// Route lấy câu hỏi ngẫu nhiên theo phần thi
router.get('/part/:part/random-group', questionsController.getRandomGroupByPart);

module.exports = router;
