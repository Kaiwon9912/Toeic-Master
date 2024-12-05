const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.get('', userController.getUser);
router.post('', userController.createUser);
router.post('/reset-password/:userId', userController.resetpassword);
router.get('/:username', userController.getUserByName);
router.delete('/:username', userController.deleteUser);

//chua check
router.put('/:username', userController.updateUser);

module.exports = router;