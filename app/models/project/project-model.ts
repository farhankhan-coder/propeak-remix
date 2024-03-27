import mongoose, { Document, Schema } from "mongoose";
import { UserGroupSchema } from "../user/user-group-model";
import { NotifyUserSchema } from "../user/notify-user-model";
import { ProjectUserSchema } from "./project-user-model";
import { UploadFileSchema } from "../upload-file/upload-file-model";
import { Task } from "../task/task-model";

interface IProject extends Document {
  title: string;
  description: string;
  startdate: string;
  enddate: string;
  status: string;
  category: string;
  userid: string;
  createdBy: string;
  createdOn: string;
  modifiedBy: string;
  modifiedOn: string;
  sendnotification: string;
  companyId: string;
  userGroups: UserGroupSchema[];
  group: string;
  isDeleted: boolean;
  miscellaneous: boolean;
  archive: boolean;
  projectUsers: ProjectUserSchema[];
  notifyUsers: NotifyUserSchema[];
  messages: mongoose.Types.ObjectId[]; // Corrected type for messages
  uploadFiles: UploadFileSchema[];
  tasks: mongoose.Types.ObjectId[]; // Corrected type for tasks
}

const ProjectSchema = new Schema<IProject>({
  title: { type: String },
  description: { type: String },
  startdate: { type: String },
  enddate: { type: String },
  status: { type: String },
  category: { type: String },
  userid: { type: String },
  createdBy: { type: String },
  createdOn: { type: String },
  modifiedBy: { type: String },
  modifiedOn: { type: String },
  sendnotification: { type: String },
  companyId: { type: String },
  userGroups: { type: [UserGroupSchema] },
  group: { type: String },
  isDeleted: { type: Boolean },
  miscellaneous: { type: Boolean },
  archive: { type: Boolean },
  projectUsers: { type: [ProjectUserSchema] },
  notifyUsers: { type: [NotifyUserSchema] },
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }], // Referencing Message model
  uploadFiles: { type: [UploadFileSchema] },
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }], // Referencing Task model
}, { versionKey: false });

const Project = mongoose.model<IProject>('project', ProjectSchema);

export default Project;
