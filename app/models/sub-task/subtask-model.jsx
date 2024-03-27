import mongoose from 'mongoose';

const SubTaskSchema = new mongoose.Schema({
  taskId: String,
  title: String,
  completed: Boolean,
  edit: Boolean,
  dateOfCompletion: Date,
  isDeleted: Boolean,
  hiddenUsrId: String,
  storyPoint: Number,
  subtaskHiddenDepId: String,
  sequence: Number
}, { versionKey: false });

const SubTask = mongoose.model('SubTask', SubTaskSchema);

export { SubTask, SubTaskSchema }; // Exporting both SubTask and SubTaskSchema
