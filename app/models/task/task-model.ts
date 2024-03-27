import mongoose, { Document, Schema } from 'mongoose';

interface IMessage {
  content: string;
}

interface IUploadFile {
  fileUrl: string;
}

interface ISubTask {
  title: string;
  completed: boolean;
}

interface ITask extends Document {
  userId: string;
  title: string;
  description: string;
  completed: boolean;
  category: string;
  tag: string;
  status: string;
  storyPoint: number;
  startDate: Date;
  endDate: Date;
  depId: string;
  taskType: string;
  priority: string;
  createdOn: string;
  modifiedOn: string;
  createdBy: string;
  modifiedBy: string;
  isDeleted: boolean;
  sequence: string;
  messages: IMessage[];
  uploadFiles: IUploadFile[];
  subtasks: ISubTask[];
  dateOfCompletion: string;
  subtaskId: string;
}

const MessageSchema = new Schema<IMessage>({
  content: String,
});

const UploadFileSchema = new Schema<IUploadFile>({
  fileUrl: String,
});

const SubTaskSchema = new Schema<ISubTask>({
  title: String,
  completed: Boolean,
});

const TaskSchema = new Schema<ITask>({
  userId: String,
  title: String,
  description: String,
  completed: Boolean,
  category: String,
  tag: String,
  status: String,
  storyPoint: Number,
  startDate: Date,
  endDate: Date,
  depId: String,
  taskType: String,
  priority: String,
  createdOn: String,
  modifiedOn: String,
  createdBy: String,
  modifiedBy: String,
  isDeleted: Boolean,
  sequence: String,
  messages: [MessageSchema],
  uploadFiles: [UploadFileSchema],
  subtasks: [SubTaskSchema],
  dateOfCompletion: String,
  subtaskId: String,
}, { versionKey: false });

const Task = mongoose.model<ITask>('task', TaskSchema);

export default Task;
