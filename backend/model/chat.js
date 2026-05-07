const mongoose = require('mongoose');

const replySchema = new mongoose.Schema(
  {
    authorId: { type: mongoose.Schema.Types.ObjectId, required: true },
    authorName: { type: String, required: true },
    authorType: { type: String, enum: ['user', 'farmer'], required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

const chatSchema = new mongoose.Schema(
  {
    authorId: { type: mongoose.Schema.Types.ObjectId, required: true },
    authorName: { type: String, required: true },
    authorType: { type: String, enum: ['user', 'farmer'], required: true },
    text: { type: String, required: true },
    replies: [replySchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('ChatMessage', chatSchema);
