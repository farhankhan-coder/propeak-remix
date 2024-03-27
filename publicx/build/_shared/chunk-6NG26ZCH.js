import {
  require_browser_umd
} from "/build/_shared/chunk-FN7THW23.js";
import {
  createHotContext
} from "/build/_shared/chunk-7LE2OC7F.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/models/project/project-model.ts
var import_mongoose6 = __toESM(require_browser_umd(), 1);

// app/models/user/user-group-model.ts
var import_mongoose2 = __toESM(require_browser_umd(), 1);

// app/models/group-members/group-members-model.ts
var import_mongoose = __toESM(require_browser_umd(), 1);
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/models/group-members/group-members-model.ts"
  );
  import.meta.hot.lastModified = "1709470693593.7751";
}
var GroupMembersSchema = new import_mongoose.default.Schema({
  id: {
    type: String
  },
  name: {
    type: String
  }
}, { versionKey: false });
var GroupMembers = import_mongoose.default.model("groupmember", GroupMembersSchema);

// app/models/user/user-group-model.ts
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/models/user/user-group-model.ts"
  );
  import.meta.hot.lastModified = "1709470693613.7693";
}
var UserGroupSchema = new import_mongoose2.default.Schema({
  groupId: {
    type: String
  },
  groupName: {
    type: String
  },
  groupMembers: [GroupMembersSchema]
}, { versionKey: false });
var UserGroups = import_mongoose2.default.model("userGroup", UserGroupSchema);

// app/models/user/notify-user-model.ts
var import_mongoose3 = __toESM(require_browser_umd(), 1);
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/models/user/notify-user-model.ts"
  );
  import.meta.hot.lastModified = "1709470693613.7693";
}
var NotifyUserSchema = new import_mongoose3.default.Schema({
  name: {
    type: String
  },
  userId: {
    type: String
  },
  emailId: {
    type: String
  }
}, { versionKey: false });
var NotifyUsers = import_mongoose3.default.model("notifyUser", NotifyUserSchema);

// app/models/project/project-user-model.ts
var import_mongoose4 = __toESM(require_browser_umd(), 1);
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/models/project/project-user-model.ts"
  );
  import.meta.hot.lastModified = "1709470693605.7717";
}
var ProjectUserSchema = new import_mongoose4.default.Schema({
  name: {
    type: String
  },
  userId: {
    type: String
  }
}, { versionKey: false });
var ProjectUser = import_mongoose4.default.model("ProjectUser", ProjectUserSchema);

// app/models/upload-file/upload-file-model.ts
var import_mongoose5 = __toESM(require_browser_umd(), 1);
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/models/upload-file/upload-file-model.ts"
  );
  import.meta.hot.lastModified = "1709470693609.7705";
}
var UploadFileSchema = new import_mongoose5.default.Schema({
  isDeleted: {
    type: Boolean
  },
  filename: {
    type: String
  },
  createdOn: {
    type: Date
  },
  createdBy: {
    type: String
  }
}, { versionKey: false });
var UploadFiles = import_mongoose5.default.model("uploadFile", UploadFileSchema);

// app/models/project/project-model.ts
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/models/project/project-model.ts"
  );
  import.meta.hot.lastModified = "1709470693605.7717";
}
var ProjectSchema = new import_mongoose6.Schema({
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
  messages: [{ type: import_mongoose6.Schema.Types.ObjectId, ref: "Message" }],
  // Referencing Message model
  uploadFiles: { type: [UploadFileSchema] },
  tasks: [{ type: import_mongoose6.Schema.Types.ObjectId, ref: "Task" }]
  // Referencing Task model
}, { versionKey: false });
var Project = import_mongoose6.default.model("project", ProjectSchema);
var project_model_default = Project;

// app/models/project/favorite-project-model.ts
var import_mongoose7 = __toESM(require_browser_umd(), 1);
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/models/project/favorite-project-model.ts"
  );
  import.meta.hot.lastModified = "1709470693605.7717";
}
var FavoriteProjectSchema = new import_mongoose7.default.Schema({
  userId: {
    type: String
  },
  projectId: {
    type: String
  }
}, {
  versionKey: false
});
var FavoriteProject = import_mongoose7.default.model("favoriteproject", FavoriteProjectSchema);
var favorite_project_model_default = FavoriteProject;

// app/check-entitlements.jsx
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/check-entitlements.jsx"
  );
  import.meta.hot.lastModified = "1709475089536.302";
}
var checkEntitlements = (userRole) => {
  if (!userRole) {
    return false;
  } else if (userRole !== "admin" && userRole !== "owner") {
    return false;
  } else {
    return true;
  }
};
var checkEntitlementsForUserRole = (userRole) => {
  if (!userRole) {
    return false;
  } else {
    return true;
  }
};
var check_entitlements_default = {
  checkEntitlements,
  checkEntitlementsForUserRole
};

// app/Services/project/project-service.jsx
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/Services/project/project-service.jsx"
  );
  import.meta.hot.lastModified = "1709550911712.1267";
}
var errors = {
  PROJECT_DOESNT_EXIST: "Project does not exist",
  ADD_PROJECT_ERROR: "Error occurred while adding the project",
  EDIT_PROJECT_ERROR: "Error occurred while updating the project",
  DELETE_PROJECT_ERROR: "Error occurred while deleting the project",
  SEARCH_PARAM_MISSING: "Please input required parameters for search",
  SERVER_ERROR: "Opps, something went wrong. Please try again.",
  NOT_AUTHORIZED: "Your are not authorized"
};
async function deleteProject(projectId, userInfo) {
  try {
    const userAccess = userInfo.userAccess;
    const userRole = userInfo.userRole;
    let deleteProject2 = check_entitlements_default.validateEntitlements(
      userAccess,
      projectId,
      "Projects",
      "delete",
      userRole
    );
    if (userRole === "user" && !deleteProject2) {
      throw new Error(errors.NOT_AUTHORIZED);
    }
    const result = await project_model_default.findOneAndUpdate(
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
    await favorite_project_model_default.remove({ projectId });
    return { msg: "Project deleted successfully!" };
  } catch (error) {
    (void 0)("deleteProject error", error);
    throw error;
  }
}

export {
  project_model_default,
  deleteProject
};
//# sourceMappingURL=/build/_shared/chunk-6NG26ZCH.js.map
