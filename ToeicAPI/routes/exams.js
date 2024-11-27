const express = require('express');
const router = express.Router();
const examsController = require('../controllers/examsController');

router.get('/level/:level', examsController.getExamsByLevel);
router.get('/',examsController.getAllExams)
router.get('/:examId', examsController.getExamById);
router.post('/create', examsController.createExam);


// Lấy thông tin đề thi cùng danh sách câu hỏi
router.get('/:examId', examsController.getExamDetails);

// Xóa đề thi
router.delete('/:examId', examsController.deleteExam);
router.post('/add-questions', examsController.addQuestionToExam);

module.exports = router;
