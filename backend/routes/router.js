const express = require('express');
const router = express.Router();
const userController = require('../controller/farmController');
const verifyToken = require('../auth/verify');
const videoController = require('../controller/videoController');
const chatController = require('../controller/chatController');

router.post('/user/signup', userController.signupUser);
router.post('/farmer/signup', userController.signupFarmer);
router.post('/user/login', userController.loginUser);
router.post('/farmer/login', userController.loginFarmer);
router.post(
  '/videos',
  verifyToken,
  videoController.uploadMiddleware,
  videoController.uploadVideo
);
router.get('/videos/my', verifyToken, videoController.getMyVideos);
router.get('/videos', verifyToken, videoController.getAllVideos);
router.post('/videos/:id/comments', verifyToken, videoController.addComment);
router.get('/videos/:id/comments', verifyToken, videoController.getComments);
router.post('/videos/:id/comments/:commentId/replies', verifyToken, videoController.addReply);
router.delete('/videos/:id', verifyToken, videoController.deleteVideo);
router.get('/chat', verifyToken, chatController.getMessages);
router.post('/chat', verifyToken, chatController.postMessage);
router.post('/chat/:id/replies', verifyToken, chatController.postReply);

module.exports = router;