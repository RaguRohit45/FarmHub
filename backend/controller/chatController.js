const ChatMessage = require('../model/chat');
const User = require('../model/user');
const Farmer = require('../model/farmer');

const getMessages = async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit || '200', 10), 500);
    const docs = await ChatMessage.find({})
      .sort({ createdAt: -1 })
      .limit(limit);
    res.json({ messages: docs.reverse() });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch messages', error: err.message });
  }
};

const postMessage = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) return res.status(400).json({ message: 'Message text is required' });

    const id = req.user?.id;
    let authorName = 'Anonymous';
    let authorType = 'user';

    const farmer = await Farmer.findById(id);
    if (farmer) {
      authorName = farmer.fname;
      authorType = 'farmer';
    } else {
      const user = await User.findById(id);
      if (user) {
        authorName = user.name;
        authorType = 'user';
      }
    }

    const doc = await ChatMessage.create({ authorId: id, authorName, authorType, text: text.trim() });
    res.status(201).json({ message: 'Posted', doc });
  } catch (err) {
    res.status(500).json({ message: 'Failed to post message', error: err.message });
  }
};

const postReply = async (req, res) => {
  try {
    const { id } = req.params;
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

    const msg = await ChatMessage.findById(id);
    if (!msg) return res.status(404).json({ message: 'Message not found' });
    msg.replies.push({ authorId: userId, authorName, authorType, text: text.trim() });
    await msg.save();

    res.status(201).json({ message: 'Reply posted', doc: msg });
  } catch (err) {
    res.status(500).json({ message: 'Failed to post reply', error: err.message });
  }
};

module.exports = { getMessages, postMessage, postReply };
