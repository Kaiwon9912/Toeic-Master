const express = require('express');
const router = express.Router();
const topicsController = require('../controllers/topicsController');

// Route lấy danh sách tất cả các chủ đề
router.get('/', topicsController.getAllTopics);

// Route thêm một chủ đề mới
router.post('/', topicsController.addTopic);

module.exports = router;
