const express = require('express');
const router = express.Router();
const topicsController = require('../controllers/topicsController');


router.get('', topicsController.getAllTopics);// Route lấy danh sách tất cả các chủ đề
router.post('', topicsController.addTopic);// Route thêm một chủ đề mới
router.put('/:topicID',topicsController.updateTopic);
router.delete('/:topicID',topicsController.deleteTopic);

module.exports = router;
