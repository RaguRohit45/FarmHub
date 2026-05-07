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

const commentSchema = new mongoose.Schema(
  {
    authorId: { type: mongoose.Schema.Types.ObjectId, required: true },
    authorName: { type: String, required: true },
    authorType: { type: String, enum: ['user', 'farmer'], required: true },
    text: { type: String, required: true },
    replies: [replySchema],
  },
  { timestamps: true }
);

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    filePath: { type: String, required: true },
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'Farmer Details', required: true },
    comments: [commentSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Video', videoSchema);
