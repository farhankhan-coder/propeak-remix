import mongoose, { Document } from 'mongoose';

const chatMessageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String,
    required: true,
  },
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ChatMessage',
    },
  ],
});

export const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);
