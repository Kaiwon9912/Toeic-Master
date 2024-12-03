const express = require('express');
const router = express.Router();
const questionsController = require('../controllers/questionsController');

// Route lấy câu hỏi theo part
router.get('/part/:part', questionsController.getQuestionsByPart);
router.get('/random/:part/:examQuestion', questionsController.getRandomQuestionByPart);

router.get('/random', questionsController.getRandomQuestions);
// Lấy thống kê câu hỏi của người dùng
router.get('/user-question-stats/:userId', questionsController.getUserQuestionStats);
router.get('/group', questionsController.getRandomQuestionsByPartAndLevel);
// Lấy nhóm câu hỏi ngẫu nhiên bằng Stored Procedure
router.get('/random-group/:partId', questionsController.getRandomGroupByStoredProc);
router.get('/exam/:examId/', questionsController.getQuestionsByExamId);
router.get('/group-question/:questionId/', questionsController.getGroupQuestionById);
// Lấy group câu hỏi
router.get('/question-groups', questionsController.getQuestionsGroups);
router.get('/question-groups/:groupId', questionsController.getQuestionGroupById);



module.exports = router;
