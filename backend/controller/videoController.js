const path = require('path');
const multer = require('multer');
const Video = require('../model/video');
const Farmer = require('../model/farmer');
const User = require('../model/user');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `video-${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('video/')) {
    cb(null, true);
  } else {
    cb(new Error('Only video files are allowed'));
  }
};

const upload = multer({ storage, fileFilter });

const uploadVideo = async (req, res) => {
  try {
    const farmerId = req.user?.id;
    const { title, description } = req.body;
    if (!req.file) return res.status(400).json({ message: 'Video file is required' });

    const filePath = `/uploads/${req.file.filename}`;

    const video = await Video.create({
      title,
      description,
      filePath,
      farmer: farmerId,
      comments: [],
    });
    res.status(201).json({ message: 'Video uploaded', video });
  } catch (err) {
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
};

const getMyVideos = async (req, res) => {
  try {
    const farmerId = req.user?.id;
    const videos = await Video.find({ farmer: farmerId }).sort({ createdAt: -1 });
    res.json({ videos });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch videos', error: err.message });
  }
};

const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find()
      .populate({ path: 'farmer', select: 'fname' })
      .sort({ createdAt: -1 });
    const shaped = videos.map(v => ({
      _id: v._id,
      title: v.title,
      description: v.description,
      filePath: v.filePath,
      comments: v.comments,
      createdAt: v.createdAt,
      updatedAt: v.updatedAt,
      farmerName: v.farmer?.fname || 'Unknown Farmer',
    }));
    res.json({ videos: shaped });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch videos', error: err.message });
  }
};

const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    if (!text || !text.trim()) return res.status(400).json({ message: 'Comment text is required' });

    const userId = req.user?.id;

    let authorName = 'Anonymous';
    let authorType = 'user';

    const farmer = await Farmer.findById(userId);
    if (farmer) {
      authorName = farmer.fname;
      authorType = 'farmer';
    } else {
      const user = await User.findById(userId);
      if (user) {
        authorName = user.name;
        authorType = 'user';
      }
    }

    const video = await Video.findById(id);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    video.comments.push({ authorId: userId, authorName, authorType, text });
    await video.save();

    res.status(201).json({ message: 'Comment added', comments: video.comments });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add comment', error: err.message });
  }
};

const getComments = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) return res.status(404).json({ message: 'Video not found' });
    res.json({ comments: video.comments });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch comments', error: err.message });
  }
};

module.exports = {
  uploadMiddleware: upload.single('video'),
  uploadVideo,
  getMyVideos,
  addComment,
  getComments,
  addReply: async (req, res) => {
    try {
      const { id, commentId } = req.params;
      const { text } = req.body;
      if (!text || !text.trim()) return res.status(400).json({ message: 'Reply text is required' });

      const userId = req.user?.id;

      let authorName = 'Anonymous';
      let authorType = 'user';

      const farmer = await Farmer.findById(userId);
      if (farmer) {
        authorName = farmer.fname;
        authorType = 'farmer';
      } else {
        const user = await User.findById(userId);
        if (user) {
          authorName = user.name;
          authorType = 'user';
        }
      }

      const video = await Video.findById(id);
      if (!video) return res.status(404).json({ message: 'Video not found' });
      const comment = video.comments.id(commentId);
      if (!comment) return res.status(404).json({ message: 'Comment not found' });

      comment.replies.push({ authorId: userId, authorName, authorType, text: text.trim() });
      await video.save();

      res.status(201).json({ message: 'Reply added', comments: video.comments });
    } catch (err) {
      res.status(500).json({ message: 'Failed to add reply', error: err.message });
    }
  },
  deleteVideo: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user?.id;
      const video = await Video.findById(id);
      if (!video) return res.status(404).json({ message: 'Video not found' });
      if (String(video.farmer) !== String(userId)) {
        return res.status(403).json({ message: 'Not allowed to delete this video' });
      }
      try {
        const filename = path.basename(video.filePath);
        const fileDiskPath = path.join(__dirname, '..', 'uploads', filename);
        if (fs.existsSync(fileDiskPath)) {
          fs.unlinkSync(fileDiskPath);
        }
      } catch (e) {
        console.error('Failed to delete file from disk:', e.message);
      }
      await Video.deleteOne({ _id: id });
      res.json({ message: 'Video deleted' });
    } catch (err) {
      res.status(500).json({ message: 'Failed to delete video', error: err.message });
    }
  },
  getAllVideos,
};
