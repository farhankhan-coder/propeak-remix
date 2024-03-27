// app/models/subject/subject-model.ts
import mongoose, { Document, Schema } from "mongoose";
import { DiscussionSchema } from "../discussion/discussion-model";

interface ISubject extends Document {
  title: string;
  projectId: string;
  edit: boolean;
  isDeleted: boolean;
  createdOn: Date;
  createdBy: string;
  discussion: any; 
}

const SubjectSchema = new mongoose.Schema<ISubject>({
  title: {
    type: String,
    required: true,
  },
  projectId: {
    type: String,
    required: true,
  },
  edit: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: String,
    required: true,
  },
  discussion: [DiscussionSchema], // Update the type as needed based on your actual discussion schema
}, {
  versionKey: false,
});

const Subject = mongoose.model<ISubject>('subject', SubjectSchema);

export default Subject;
