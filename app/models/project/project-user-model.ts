import mongoose, { Document, Schema } from "mongoose";

export interface IProjectUser extends Document {
  name: string;
  userId: string;
}

const ProjectUserSchema = new mongoose.Schema<IProjectUser>({
  name: {
    type: String,
  },
  userId: {
    type: String,
  },
}, { versionKey: false });

const ProjectUser = mongoose.model<IProjectUser>('ProjectUser', ProjectUserSchema);

export { ProjectUser, ProjectUserSchema };
