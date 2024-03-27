import { serviceHost } from "../../common/const";
import ServiceRequest from "../../utils/service-request";
import Subject from "../../models/subject/subject-model";

export const addSubject = async (subjectTitle, projectId) => {
  try {
    const newSubject = await Subject.create({
      title: subjectTitle,
      projectId: projectId,
      edit: false,
      isDeleted: false,
      createdBy: "user", 
      discussion: [], 
    });
    return { response: newSubject, err: null };
  } catch (err) {
    console.error("Error adding subject:", err);
    return { response: null, err };
  }
};

export const getAllSubjects = async () => {
  try {
    const subjects = await Subject.find();
    return { response: subjects, err: null };
  } catch (err) {
    console.error("Error retrieving subjects:", err);
    return { response: null, err };
  }
};

export const getProjectSubjects = async (projectId) => {
  try {
    const subjects = await Subject.find({ projectId: projectId });
    return { response: subjects, err: null };
  } catch (err) {
    console.error("Error retrieving subjects for project:", err);
    return { response: null, err };
  }
};

export const deleteSubject = async (subjectId) => {
  try {
    const result = await Subject.deleteOne({ _id: subjectId });
    if (result.deletedCount === 0) {
      throw new Error("Subject not found");
    }
    return { response: result, err: null };
  } catch (err) {
    console.error("Error deleting subject:", err);
    return { response: null, err };
  }
};

export const editSubject = async (subjectId, subjectTitle) => {
  try {
    const updatedSubject = await Subject.findByIdAndUpdate(
      subjectId,
      { title: subjectTitle },
      { new: true }
    );
    if (!updatedSubject) {
      throw new Error("Subject not found");
    }
    return { response: updatedSubject, err: null };
  } catch (err) {
    console.error("Error updating subject:", err);
    return { response: null, err };
  }
};

export const addDiscussionMessage = async (title, subjectId, messageId) => {
  try {
    const updatedSubject = await Subject.findByIdAndUpdate(
      subjectId,
      { $push: { discussion: { title: title, messageId: messageId } } },
      { new: true }
    );
    if (!updatedSubject) {
      throw new Error("Subject not found");
    }
    return { response: updatedSubject, err: null };
  } catch (err) {
    console.error("Error adding discussion message:", err);
    return { response: null, err };
  }
};

export const getAllDiscussionMessages = async (subjectId) => {
  try {
    const subject = await Subject.findById(subjectId);
    if (!subject) {
      throw new Error("Subject not found");
    }
    return { response: subject.discussion, err: null };
  } catch (err) {
    console.error("Error retrieving discussion messages:", err);
    return { response: null, err };
  }
};

export const deleteDiscussionMessage = async (messageId, subjectId) => {
  try {
    const updatedSubject = await Subject.findByIdAndUpdate(
      subjectId,
      { $pull: { discussion: { messageId: messageId } } },
      { new: true }
    );
    if (!updatedSubject) {
      throw new Error("Subject not found");
    }
    return { response: updatedSubject, err: null };
  } catch (err) {
    console.error("Error deleting discussion message:", err);
    return { response: null, err };
  }
};
