import Project from "../../models/project/project-model";
import User from "../../models/user/user-model";
import { v4 as uuidv4 } from "uuid";
import secret from "../../config/secret";
import AuditLogs from "../../models/auditlog/audit-log-model";
import { Jwt } from "jsonwebtoken";
import { insertAuditLog } from "../audit-log/audit-log-service";
import ProjectStatus from "../../models/project/project-status-model";
import { logInfo, logError } from "../../common/logger";
// import { fromPromise } from "rxjs/observable/fromPromise";
// import { forkJoin } from "rxjs/observable/forkJoin";
import FavoriteProject from "../../models/project/favorite-project-model";
import access from "../../check-entitlements";
// import sortData from "../../common/common";
const errors = {
  PROJECT_DOESNT_EXIST: "Project does not exist",
  ADD_PROJECT_ERROR: "Error occurred while adding the project",
  EDIT_PROJECT_ERROR: "Error occurred while updating the project",
  DELETE_PROJECT_ERROR: "Error occurred while deleting the project",
  SEARCH_PARAM_MISSING: "Please input required parameters for search",
  SERVER_ERROR: "Opps, something went wrong. Please try again.",
  NOT_AUTHORIZED: "Your are not authorized",
};

export async function getAuditLog(projectId, userInfo) {
  const userRole = userInfo.userRole.toLowerCase();
  const accessCheck = access.checkEntitlements(userRole);
  const userAccess = userInfo.userAccess;
  const viewAuditLog = validateEntitlements(
    userAccess,
    projectId,
    "Audit Report",
    "view",
    userRole
  );

  if (accessCheck === false && !viewAuditLog) {
    throw new Error(errors.NOT_AUTHORIZED);
  }

  try {
    const auditLogsPromise = AuditLogs.find({ projectId }).exec();
    const projectPromise = Project.findOne({ _id: projectId }).exec();

    const [auditLogs, project] = await Promise.all([
      auditLogsPromise,
      projectPromise,
    ]);

    const projectName = project ? project.title : "";
    return { result: auditLogs, msg: projectName };
  } catch (error) {
    console.error("Error in getAuditLog:", error);
    throw new Error("Something went wrong while fetching audit logs.");
  }
}

export async function getStatusOptions() {
  try {
    const projectStatusOptions = await ProjectStatus.find({}).exec();
    sort(projectStatusOptions, "displayName");
    return projectStatusOptions;
  } catch (error) {
    logError("Error in getStatusOptions:", error);
    throw new Error(
      "Something went wrong while fetching project status options."
    );
  }
}

export async function getProjectByProjectId(projectId) {
  try {
    const project = await Project.findById(projectId).exec();
    const messages = project.messages.filter((r) => !r.isDeleted);
    const uploadFiles = project.uploadFiles.filter((r) => !r.isDeleted);
    const data = {
      _id: project._id,
      title: project.title,
      description: project.description,
      startdate: project.startdate,
      enddate: project.enddate,
      status: project.status,
      group: project.group,
      category: project.category,
      userid: project.userid,
      companyId: project.companyId,
      userGroups: project.userGroups,
      sendnotification: project.sendnotification,
      createdBy: project.createdBy,
      createdOn: project.createdOn,
      modifiedBy: project.modifiedBy,
      modifiedOn: project.modifiedOn,
      isDeleted: project.isDeleted,
      projectUsers: project.projectUsers,
      notifyUsers: project.notifyUsers,
      miscellaneous: project.miscellaneous,
      archive: project.archive,
    };
    logInfo("getProjectByProjectId: Returning project data.");
    return { data, messages, uploadFiles };
  } catch (error) {
    logError("Error in getProjectByProjectId:", error);
    throw new Error("Something went wrong while fetching project data.");
  }
}

export async function getProjectDataByProjectId(projectId) {
  try {
    const project = await Project.findById(projectId).exec();
    const tasks = project.tasks.filter((r) => !r.isDeleted);
    const data = {
      _id: project._id,
      title: project.title,
      description: project.description,
      startdate: project.startdate,
      enddate: project.enddate,
      status: project.status,
      category: project.category,
      group: project.group,
      userid: project.userid,
      companyId: project.companyId,
      userGroups: project.userGroups,
      sendnotification: project.sendnotification,
      createdBy: project.createdBy,
      createdOn: project.createdOn,
      modifiedBy: project.modifiedBy,
      modifiedOn: project.modifiedOn,
      isDeleted: project.isDeleted,
      projectUsers: project.projectUsers,
      notifyUsers: project.notifyUsers,
      miscellaneous: project.miscellaneous,
      archive: project.archive,
    };
    logInfo("getProjectDataByProjectId: Returning project data.");
    return { data, tasks };
  } catch (error) {
    logError("Error in getProjectDataByProjectId:", error);
    throw new Error("Something went wrong while fetching project data.");
  }
}

export async function getTasksAndUsers(projectId, userInfo) {
  try {
    let userRole = userInfo.userRole.toLowerCase();
    let accessCheck = access.checkEntitlementsForUserRole(userRole);
    if (!accessCheck) {
      throw new Error(errors.NOT_AUTHORIZED);
    }

    logInfo("getTasksAndUsers");
    logInfo(projectId, "req.params.projectId");

    const result = await Project.findById(projectId);

    logInfo("result getTasksAndUsers users");
    logInfo("result getTasksAndUsers tasks");

    let tasks = result.tasks.filter((t) => t.isDeleted === false);
    let projectUsers =
      result.projectUsers &&
      result.projectUsers.filter(
        (u) => u.name !== undefined && u.name !== null && u.name !== ""
      );

    return {
      users: projectUsers,
      tasks: tasks,
      title: result.title,
    };
  } catch (error) {
    logError("getTasksAndUsers error", error);
    throw error;
  }
}

export async function getAllProjectsSummary(requestBody, userInfo) {
  try {
    console.log("Request body:", requestBody);

    let selectedUserId = requestBody.userId;
    let selectedUserRole = requestBody.userRole;
    let selectedProjectId = requestBody.projectId;
    let showArchive = requestBody.showArchive;

    logInfo("getAllProjectsSummary");
    logInfo(userInfo, "getAllProjectsSummary userInfo");

    let userRole = userInfo.userRole.toLowerCase();
    let userId = userInfo.userId;

    if (!userRole) {
      throw new Error(errors.NOT_AUTHORIZED);
    }

    let projects = [];
    let condition = {};
    let projectFields = {
      /* Define your project fields object */
    };
    let projectCondition = "";
    let taskFilterCondition = {
      /* Define your task filter condition object */
    };
    let userCondition = {
      /* Define your user condition object */
    };

    // Rewrite the logic for project aggregation and filtering

    return {
      success: true,
      data: projects,
      count: userRole === "user" ? 1 : totalProjectUser,
    };
  } catch (error) {
    logError("getAllProjectsSummary error", error);
    throw error;
  }
}

export async function getProjectData() {
  try {
    const result = await Project.find(
      { isDeleted: false, status: "inprogress" },
      { _id: 1, title: 1 }
    );
    return result;
  } catch (error) {
    logError("getProjectData error", error);
    throw error;
  }
}

export async function createProject(projectData) {
  try {
    const { userInfo, body } = projectData;
    console.log("Incoming request body:", body);

    const userRole = userInfo.userRole.toLowerCase();
    const accessCheck = access.checkEntitlements(userRole);

    if (!accessCheck) {
      console.log("User not authorized");
      return { success: false, err: errors.NOT_AUTHORIZED };
    }

    const userId = userInfo.userId;
    const userName = body.userName;

    const projectUsers = body.newprojects.projectUsers.map((puser) => puser);
    const notifyUsers = body.newprojects.notifyUsers.map((nuser) => nuser);

    const category = body.newprojects.category;
    const formattedCategory = Array.isArray(category)
      ? category.join(", ")
      : category;

    const newProject = new Project({
      ...body.newprojects,
      category: formattedCategory,
      projectUsers,
      notifyUsers,
    });

    const result = await newProject.create();
    return { success: true, msg: `Successfully added!`, result };
  } catch (error) {
    logError("Error occurred in createProject:", error);
    return { success: false, err: "Unexpected error occurred" };
  }
}

export const addProject = async (
  title,
  description,
  startdate,
  enddate,
  status,
  category,
  userid,
  createdBy,
  createdOn,
  modifiedBy,
  modifiedOn,
  sendnotification,
  companyId,
  userGroups,
  group,
  isDeleted,
  miscellaneous,
  archive,
  projectUsers,
  notifyUsers,
  messages,
  uploadFiles,
  tasks,
  userName
) => {
  try {
    const project = await Project.create({
      title,
      description,
      startdate,
      enddate,
      status,
      category,
      userid,
      createdBy,
      createdOn,
      modifiedBy,
      modifiedOn,
      sendnotification,
      companyId,
      userGroups,
      group,
      isDeleted,
      miscellaneous,
      archive,
      projectUsers,
      notifyUsers,
      messages,
      uploadFiles,
      tasks,
      userName,
    });
    return { response: project, err: null };
  } catch (err) {
    console.error("Error adding project:", err);
    return { response: null, err };
  }
};

export async function updateProject(updatedProject, userInfo) {
  try {
    let userAccess = userInfo.userAccess;
    let userRole = userInfo.userRole;
    let editProject = false;
    editProject = access.validateEntitlements(
      userAccess,
      updatedProject._id,
      "Projects",
      "edit",
      userRole
    );

    if (userRole === "user" && !editProject) {
      throw new Error(errors.NOT_AUTHORIZED);
    }

    const result = await Project.findOneAndUpdate(
      { _id: updatedProject._id },
      updatedProject,
      { new: true }
    );
    logInfo(result, "Updated project");

    // Perform audit log insertion here

    return { success: true, msg: "Successfully updated!" };
  } catch (error) {
    logError(errors.EDIT_PROJECT_ERROR, error);
    throw error;
  }
}

export async function updateProjectField(updatedProject, userInfo) {
  try {
    let userRole = userInfo.userRole.toLowerCase();
    let accessCheck = access.checkEntitlements(userRole);
    if (!accessCheck) {
      throw new Error(errors.NOT_AUTHORIZED);
    }

    const result = await Project.findOneAndUpdate(
      { _id: updatedProject._id },
      updatedProject
    );
    logInfo(result, "Updated project field");

    return { msg: "Updated Successfully" };
  } catch (error) {
    logError("updateProjectField error", error);
    throw error;
  }
}

export async function updateProjectCategory(updatedProject, userInfo) {
  try {
    let userRole = userInfo.userRole.toLowerCase();
    let accessCheck = access.checkEntitlements(userRole);
    if (!accessCheck) {
      throw new Error(errors.NOT_AUTHORIZED);
    }

    const result = await Project.findOneAndUpdate(
      { _id: updatedProject._id },
      updatedProject
    );
    logInfo("Updated project category");

    return { msg: "Updated Successfully" };
  } catch (error) {
    logError("updateProjectCategory error", error);
    throw error;
  }
}

export async function deleteProject(projectId, userInfo) {
  try {
    const userAccess = userInfo.userAccess;
    const userRole = userInfo.userRole;

    let deleteProject = access.validateEntitlements(
      userAccess,
      projectId,
      "Projects",
      "delete",
      userRole
    );

    if (userRole === "user" && !deleteProject) {
      throw new Error(errors.NOT_AUTHORIZED);
    }

    const result = await Project.findOneAndUpdate(
      { _id: projectId },
      { $set: { isDeleted: true } },
      { new: true }
    );

    const field = "isDeleted";
    const userIdToken = userInfo.userName;
    audit.insertAuditLog(
      "false",
      result.title,
      "Project",
      field,
      result[field],
      userIdToken,
      result._id
    );

    await FavoriteProject.remove({ projectId });

    return { msg: "Project deleted successfully!" };
  } catch (error) {
    logError("deleteProject error", error);
    throw error;
  }
}

export async function addProjectUsers(projectId, projectUsers) {
  try {
    const result = await Project.findOneAndUpdate(
      { _id: projectId },
      { $set: { projectUsers } }
    );

    return { msg: "Successfully added" };
  } catch (error) {
    logError("addProjectUsers error", error);
    throw error;
  }
}

export async function getUserProjects() {
  try {
    const result = await Project.find(
      {
        isDeleted: false,
        archive: false,
      },
      {
        _id: 1,
        title: 1,
        status: 1,
        projectUsers: 1,
      }
    );

    return result;
  } catch (error) {
    logError("getUserProjects error", error);
    throw error;
  }
}

export async function archiveProject(projectId, archive, userInfo) {
  try {
    const userAccess = userInfo.userAccess;
    const userRole = userInfo.userRole;

    let archiveProject = access.validateEntitlements(
      userAccess,
      projectId,
      "Projects",
      "archive",
      userRole
    );

    if (userRole === "user" && !archiveProject) {
      throw new Error(errors.NOT_AUTHORIZED);
    }

    const result = await Project.findOneAndUpdate(
      { _id: projectId },
      { $set: { archive } },
      { new: true }
    );

    const field = "archive";
    const userIdToken = userInfo.userName;
    audit.insertAuditLog(
      "false",
      result.title,
      "Project",
      field,
      result[field],
      userIdToken,
      result._id
    );

    return result;
  } catch (error) {
    logError("archiveProject error", error);
    throw error;
  }
}
