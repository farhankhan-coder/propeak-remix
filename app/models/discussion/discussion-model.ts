import mongoose, { Document, Schema, Types } from 'mongoose';

interface IReplyMessage {
  content: string;
  userId: string;
  createdAt: Date;
}

interface IDiscussion extends Document {
  title: string;
  projectId: string;
  createdOn: Date;
  createdBy: string;
  isDeleted: boolean;
  replyMessages: Types.Array<IReplyMessage>;
}

const ReplyMessageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { _id: false });

const DiscussionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,  
  },
  projectId: {
    type: String,
    required: true,  
  },
  createdOn: {
    type: Date,
    required: true,  
  },
  createdBy: {
    type: String,
    required: true,  
  },
  isDeleted: {
    type: Boolean,
    required: true,  
  },
  replyMessages: {
    type: [ReplyMessageSchema],
    default: [],
  },
}, { versionKey: false });

const Discussion = mongoose.model<IDiscussion>('discussion', DiscussionSchema);

export default Discussion; // Export the Discussion model as the default export

export { DiscussionSchema }; // Export the DiscussionSchema if needed elsewhere
