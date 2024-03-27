import {
  deleteProject as deleteProject2,
  project_model_default
} from "/build/_shared/chunk-6NG26ZCH.js";
import "/build/_shared/chunk-TIVFM4AG.js";
import "/build/_shared/chunk-FN7THW23.js";
import {
  Menu
} from "/build/_shared/chunk-VFWVPLG5.js";
import {
  Footer
} from "/build/_shared/chunk-KUE2LJET.js";
import {
  Header
} from "/build/_shared/chunk-TDYRR7WO.js";
import "/build/_shared/chunk-WSROVG5I.js";
import "/build/_shared/chunk-BFH63P63.js";
import "/build/_shared/chunk-CGPR7F7J.js";
import {
  auth_default
} from "/build/_shared/chunk-ZNTOAH5I.js";
import {
  useLoaderData
} from "/build/_shared/chunk-IX3CRINA.js";
import {
  Link,
  init_dist2 as init_dist
} from "/build/_shared/chunk-7K4UV4CH.js";
import "/build/_shared/chunk-GIAAE3CH.js";
import {
  createHotContext
} from "/build/_shared/chunk-7LE2OC7F.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XU7DNSPJ.js";
import {
  require_react
} from "/build/_shared/chunk-BOXFZXVX.js";
import "/build/_shared/chunk-UWV35TSL.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/favorite-projects/favorite-projectlist.jsx
var import_react = __toESM(require_react(), 1);

// app/Services/project/project-clone-service.jsx
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/Services/project/project-clone-service.jsx"
  );
  import.meta.hot.lastModified = "1709550079792.4883";
}
var addCloneProject = async (projectId) => {
  try {
    const projectToClone = await project_model_default.findById(projectId);
    if (!projectToClone) {
      throw new Error("Project not found");
    }
    const clonedProject = await ClonedProject.create({
      title: projectToClone.title,
      description: projectToClone.description
    });
    console.log(clonedProject, "Cloned project created successfully");
    return { response: clonedProject, err: null };
  } catch (err) {
    console.error("Error cloning project:", err);
    return { response: null, err };
  }
};

// app/routes/favorite-projects/favorite-projectlist.jsx
init_dist();

// app/common/validate-entitlements.jsx
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/common/validate-entitlements.jsx"
  );
  import.meta.hot.lastModified = "1709382069643.5525";
}
var validateEntitlements = (accessRights, projectId, group, entitlementId) => {
  let value = false;
  if (accessRights !== null && accessRights !== void 0 && accessRights.length > 0) {
    let projectAccessRights = accessRights.filter((a) => {
      return a.projectId === projectId;
    });
    if (projectAccessRights.length > 0) {
      for (let i = 0; i < projectAccessRights.length; i++) {
        if (projectAccessRights[i].group === group && projectAccessRights[i].entitlementId === entitlementId) {
          value = true;
          break;
        }
      }
    }
  }
  return value;
};
var validateAppLevelEntitlements = (accessRights, group, entitlementId) => {
  let value = false;
  if (accessRights !== null && accessRights !== void 0 && accessRights.length > 0) {
    for (let i = 0; i < accessRights.length; i++) {
      if (accessRights[i].group === group && accessRights[i].entitlementId === entitlementId) {
        value = true;
        break;
      }
    }
  }
  return value;
};

// app/routes/favorite-projects/favorite-projectlist.jsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/favorite-projects/favorite-projectlist.jsx"
  );
}
var FavoriteProjectList = class extends import_react.Component {
  state = {
    favoriteProjects: this.props.context.state.favoriteProjects,
    projects: [],
    categories: this.props.context.state.categories,
    users: this.props.context.state.users,
    appLevelAccess: this.props.context.state.appLevelAccess
  };
  componentWillReceiveProps(nextProps) {
    this.setState({
      favoriteProjects: nextProps.context.state.favoriteProjects,
      categories: nextProps.context.state.categories,
      users: nextProps.context.state.users,
      appLevelAccess: nextProps.context.state.appLevelAccess
    });
  }
  onMenuIconClick = (id) => {
    var obj = document.getElementById(id);
    obj.className = obj.className === "hide-project-menu" ? "project-icon-container  proj-icons-wrapper  justify-content-between show-project-menu" : "hide-project-menu";
  };
  async getAllProjects() {
    let userId = auth_default.get("userId");
    let { projects, projectErr } = await (void 0)(
      userId
    );
    if (projectErr) {
      this.setState({
        message: projectErr
      });
    } else if (projects && projects.data.err) {
      this.setState({ message: projects.data.err });
    } else {
      this.setState({
        projects: projects.data.data
      });
    }
  }
  async componentDidMount() {
    if (this.state.categories.length === 0) {
      this.props.context.actions.setCategories();
    }
    if (this.state.users.length === 0) {
      this.props.context.actions.setUsers();
    }
    if (this.state.appLevelAccess.length === 0) {
      this.props.context.actions.getAppLevelAccessRights();
    }
    this.getAllProjects();
  }
  async onCloneProject(projectId) {
    if (window.confirm("Are you sure you want to clone this project?")) {
      let { response, err } = await addCloneProject(
        projectId
      );
      if (err) {
        this.setState({
          message: "Error : " + err,
          labelvalue: "Error : " + err
        });
      } else if (response && response.data.err) {
        this.setState({
          message: "Error : " + response.data.err,
          labelvalue: "Error : " + response.data.err
        });
      } else {
      }
    }
  }
  async onDeleteProjectById(id) {
    if (window.confirm("Are you sure you wish to delete this project?")) {
      let { response, err } = await deleteProject2(id);
      if (err) {
        this.setState({
          message: "Error : " + err,
          labelvalue: "Error : " + err
        });
      } else if (response && response.data.err) {
        this.setState({
          message: "Error : " + response.data.err,
          labelvalue: "Error : " + response.data.err
        });
      } else {
        let projects = this.state.projects.filter((f) => {
          return id !== f._id;
        });
        this.setState({
          projects
        });
      }
    }
  }
  async onClickRemoveFavoriteProject(projectId) {
    let { response, err } = await (void 0)(
      projectId
    );
    if (err) {
      this.setState({
        message: "Error : " + err,
        labelvalue: "Error : " + err
      });
    } else if (response && response.data.err) {
      this.setState({
        message: "Error : " + response.data.err,
        labelvalue: "Error : " + response.data.err,
        isFavorite: false
      });
    } else {
      let favoriteProject = this.state.projects.filter((f) => {
        return projectId !== f._id;
      });
      this.setState({
        projects: favoriteProject
      });
    }
  }
  render() {
    const ON_HOLD = "onHold";
    var projectView = this.state.projects && this.state.projects.map((project) => {
      var users = project.projectUsers;
      let totalTasks = project.totalTasks;
      var taskCompleted = project.completedTasks;
      var taskInProgress = project.inProgressTasks;
      var proTitle = this.state.categories === void 0 && this.state.categories.filter((category) => {
        if (project.status !== void 0 && project.status !== null && project.status !== "") {
          return project.status === category._id;
        }
        return category;
      })[0].title;
      var dateToday = /* @__PURE__ */ new Date();
      var projectEnddate = new Date(project.enddate);
      var utc1 = Date.UTC(
        dateToday.getFullYear(),
        dateToday.getMonth(),
        dateToday.getDate()
      );
      var utc2 = Date.UTC(
        projectEnddate.getFullYear(),
        projectEnddate.getMonth(),
        projectEnddate.getDate()
      );
      var diffDays = parseInt((utc2 - utc1) / (1e3 * 60 * 60 * 24), 10);
      var percentageProject = (taskCompleted / project.totalTasks * 100).toString().match(/^-?\d+(?:\.\d{0,2})?/);
      let status = project.status;
      let attachments = project.attachments;
      let accessRights = auth_default.get("access");
      let editProject2 = validateAppLevelEntitlements(
        this.state.appLevelAccess,
        "Projects",
        "Edit"
      );
      let deleteProject3 = validateAppLevelEntitlements(
        this.state.appLevelAccess,
        "Projects",
        "Delete"
      );
      let showClone = validateAppLevelEntitlements(
        this.state.appLevelAccess,
        "Projects",
        "Clone"
      );
      let auditReportShow = validateAppLevelEntitlements(
        this.state.appLevelAccess,
        "Audit Report",
        "View"
      );
      let favouritesShow = validateAppLevelEntitlements(
        this.state.appLevelAccess,
        "Favorite Projects",
        "View"
      );
      if (accessRights !== null && accessRights !== void 0 && accessRights.length > 0) {
        deleteProject3 = validateEntitlements(
          accessRights,
          project._id,
          "Projects",
          "delete"
        );
        auditReportShow = validateEntitlements(
          accessRights,
          project._id,
          "Audit Report",
          "view"
        );
        showClone = validateEntitlements(
          accessRights,
          project._id,
          "Projects",
          "clone"
        );
      }
      return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { className: "project-nogroup", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "project-border", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "project-body", style: { position: "relative" }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          "div",
          {
            className: "project-menu-box",
            onClick: this.onMenuIconClick.bind(this, project._id),
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("i", { className: "fas fa-bars mt-2" }, void 0, false, {
                fileName: "app/routes/favorite-projects/favorite-projectlist.jsx",
                lineNumber: 254,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "div",
                {
                  id: project._id,
                  className: "project-icon-container  proj-icons-wrapper  justify-content-between hide-project-menu",
                  children: [
                    editProject2 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                      Link,
                      {
                        to: "/project/edit/" + project._id,
                        className: "",
                        title: "Edit project",
                        children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("i", { className: "fas fa-pencil-alt text-success" }, void 0, false, {
                          fileName: "app/routes/favorite-projects/favorite-projectlist.jsx",
                          lineNumber: 265,
                          columnNumber: 25
                        }, this)
                      },
                      void 0,
                      false,
                      {
                        fileName: "app/routes/favorite-projects/favorite-projectlist.jsx",
                        lineNumber: 260,
                        columnNumber: 19
                      },
                      this
                    ) : "",
                    deleteProject3 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                      "a",
                      {
                        className: "mr-1",
                        title: "Delete project",
                        onClick: () => {
                          if (window.confirm(
                            "Are you sure you wish to delete this project?"
                          ))
                            this.onDeleteProjectById(project._id);
                        },
                        children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("i", { className: "far fa-trash-alt text-danger" }, void 0, false, {
                          fileName: "app/routes/favorite-projects/favorite-projectlist.jsx",
                          lineNumber: 284,
                          columnNumber: 25
                        }, this)
                      },
                      void 0,
                      false,
                      {
                        fileName: "app/routes/favorite-projects/favorite-projectlist.jsx",
                        lineNumber: 272,
                        columnNumber: 19
                      },
                      this
                    ) : "",
                    auditReportShow ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                      Link,
                      {
                        to: "/auditReport/" + project._id,
                        title: "Audit Report",
                        className: "mr-1",
                        children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("i", { className: "fas fa-clipboard-list" }, void 0, false, {
                          fileName: "app/routes/favorite-projects/favorite-projectlist.jsx",
                          lineNumber: 296,
                          columnNumber: 25
                        }, this)
                      },
                      void 0,
                      false,
                      {
                        fileName: "app/routes/favorite-projects/favorite-projectlist.jsx",
                        lineNumber: 291,
                        columnNumber: 19
                      },
                      this
                    ) : "",
                    showClone ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                      "a",
                      {
                        className: "",
                        title: "Clone project",
                        onClick: this.onCloneProject.bind(this, project._id),
                        children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("i", { className: "far fa-copy" }, void 0, false, {
                          fileName: "app/routes/favorite-projects/favorite-projectlist.jsx",
                          lineNumber: 308,
                          columnNumber: 25
                        }, this)
                      },
                      void 0,
                      false,
                      {
                        fileName: "app/routes/favorite-projects/favorite-projectlist.jsx",
                        lineNumber: 303,
                        columnNumber: 19
                      },
                      this
                    ) : "",
                    attachments > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { className: "", title: attachments, children: [
                      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("i", { className: "fas fa-paperclip" }, void 0, false, {
                        fileName: "app/routes/favorite-projects/favorite-projectlist.jsx",
                        lineNumber: 316,
                        columnNumber: 25
                      }, this),
                      " "
                    ] }, void 0, true, {
                      fileName: "app/routes/favorite-projects/favorite-projectlist.jsx",
                      lineNumber: 315,
                      columnNumber: 19
                    }, this) : "",
                    favouritesShow ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                      "a",
                      {
                        className: "",
                        title: "Favorite project",
                        onClick: this.onClickRemoveFavoriteProject.bind(
                          this,
                          project._id
                        ),
                        children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("i", { className: "fas fa-star text-warning" }, void 0, false, {
                          fileName: "app/routes/favorite-projects/favorite-projectlist.jsx",
                          lineNumber: 331,
                          columnNumber: 25
                        }, this)
                      },
                      void 0,
                      false,
                      {
                        fileName: "app/routes/favorite-projects/favorite-projectlist.jsx",
                        lineNumber: 323,
                        columnNumber: 19
                      },
                      this
                    ) : ""
                  ]
                },
                void 0,
                true,
                {
                  fileName: "app/routes/favorite-projects/favorite-projectlist.jsx",
                  lineNumber: 255,
                  columnNumber: 19
                },
                this
              )
            ]
          },
          void 0,
          true,
          {
            fileName: "app/routes/favorite-projects/favorite-projectlist.jsx",
            lineNumber: 250,
            columnNumber: 17
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "image-wrapper d-flex", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "d-flex flex-column left mt-3", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "d-flex flex-column align-content-start pr-2", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
              Link,
              {
                to: "/project/tasks/" + project._id,
                className: "project-title",
                children: project.title
              },
              void 0,
              false,
              {
                fileName: "app/routes/favorite-projects/favorite-projectlist.jsx",
                lineNumber: 342,
                columnNumber: 23
              },
              this
            ),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "proj-desc show__overflow_dots", children: project.description }, void 0, false, {
              fileName: "app/routes/favorite-projects/favorite-projectlist.jsx",
              lineNumber: 348,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/favorite-projects/favorite-projectlist.jsx",
            lineNumber: 341,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            Link,
            {
              to: "/projectUsers/" + project._id,
              className: "userlinks",
              children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "assignees", title: "users", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "user-no", children: [
                  users.length,
                  " "
                ] }, void 0, true, {
                  fileName: "app/routes/favorite-projects/favorite-projectlist.jsx",
                  lineNumber: 358,
                  columnNumber: 27
                }, this),
                users.length > 0 && users.length > 1 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                  "i",
                  {
                    className: "fas fa-users",
                    style: { color: "#CDDC39" }
                  },
                  void 0,
                  false,
                  {
                    fileName: "app/routes/favorite-projects/favorite-projectlist.jsx",
                    lineNumber: 360,
                    columnNumber: 25
                  },
                  this
                ) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                  "i",
                  {
                    className: "fas fa-user",
                    style: { color: "#CDDC39" }
                  },
                  void 0,
                  false,
                  {
                    fileName: "app/routes/favorite-projects/favorite-projectlist.jsx",
                    lineNumber: 365,
                    columnNumber: 25
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "app/routes/favorite-projects/favorite-projectlist.jsx",
                lineNumber: 357,
                columnNumber: 25
              }, this)
            },
            void 0,
            false,
            {
              fileName: "app/routes/favorite-projects/favorite-projectlist.jsx",
              lineNumber: 353,
              columnNumber: 23
            },
            this
          ) }, void 0, false, {
            fileName: "app/routes/favorite-projects/favorite-projectlist.jsx",
            lineNumber: 352,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/favorite-projects/favorite-projectlist.jsx",
          lineNumber: 340,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "app/routes/favorite-projects/favorite-projectlist.jsx",
          lineNumber: 339,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "progress mt-3 mb-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          "div",
          {
            className: "progress-bar bg-warning progress-bar-striped progress-bar-animated",
            role: "progressbar",
            "aria-valuenow": "50",
            "aria-valuemin": "0",
            "aria-valuemax": "100",
            style: { width: `${percentageProject}%` },
            children: [
              percentageProject,
              "% Complete"
            ]
          },
          void 0,
          true,
          {
            fileName: "app/routes/favorite-projects/favorite-projectlist.jsx",
            lineNumber: 376,
            columnNumber: 19
          },
          this
        ) }, void 0, false, {
          fileName: "app/routes/favorite-projects/favorite-projectlist.jsx",
          lineNumber: 375,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: " d-flex justify-content-around bottom-box", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "d-flex flex-column align-self-left align-items-center bottom-box-boxes", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "valueno", children: [
              totalTasks,
              " "
            ] }, void 0, true, {
              fileName: "app/routes/favorite-projects/favorite-projectlist.jsx",
              lineNumber: 390,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "fas fa-tasks" }, void 0, false, {
              fileName: "app/routes/favorite-projects/favorite-projectlist.jsx",
              lineNumber: 391,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/favorite-projects/favorite-projectlist.jsx",
            lineNumber: 389,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            "div",
            {
              className: "d-flex flex-column  align-self-left align-items-center bottom-box-boxes",
              title: "Task Completed",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "valueno", children: [
                  taskCompleted,
                  " "
                ] }, void 0, true, {
                  fileName: "app/routes/favorite-projects/favorite-projectlist.jsx",
                  lineNumber: 398,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "far fa-check-circle text-success" }, void 0, false, {
                  fileName: "app/routes/favorite-projects/favorite-projectlist.jsx",
                  lineNumber: 399,
                  columnNumber: 21
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "app/routes/favorite-projects/favorite-projectlist.jsx",
              lineNumber: 394,
              columnNumber: 19
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            "div",
            {
              className: "d-flex flex-column align-self-left align-items-center bottom-box-boxes",
              title: "In Progress",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "valueno", children: [
                  taskInProgress,
                  " "
                ] }, void 0, true, {
                  fileName: "app/routes/favorite-projects/favorite-projectlist.jsx",
                  lineNumber: 406,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "fas fa-spinner text-warning" }, void 0, false, {
                  fileName: "app/routes/favorite-projects/favorite-projectlist.jsx",
                  lineNumber: 407,
                  columnNumber: 21
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "app/routes/favorite-projects/favorite-projectlist.jsx",
              lineNumber: 402,
              columnNumber: 19
            },
            this
          ),
          status === ON_HOLD ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            "div",
            {
              className: "d-flex align-self-left align-items-center",
              title: "Days left",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "On" }, void 0, false, {
                  fileName: "app/routes/favorite-projects/favorite-projectlist.jsx",
                  lineNumber: 415,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Hold" }, void 0, false, {
                  fileName: "app/routes/favorite-projects/favorite-projectlist.jsx",
                  lineNumber: 416,
                  columnNumber: 23
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "app/routes/favorite-projects/favorite-projectlist.jsx",
              lineNumber: 411,
              columnNumber: 17
            },
            this
          ) : proTitle !== "completed" && project.enddate !== "" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            "div",
            {
              className: "d-flex flex-column align-self-left align-items-center bottom-box-boxes",
              title: "Days left",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "valueno", children: [
                  diffDays,
                  " "
                ] }, void 0, true, {
                  fileName: "app/routes/favorite-projects/favorite-projectlist.jsx",
                  lineNumber: 423,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "far fa-clock text-danger", children: " " }, void 0, false, {
                  fileName: "app/routes/favorite-projects/favorite-projectlist.jsx",
                  lineNumber: 424,
                  columnNumber: 23
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "app/routes/favorite-projects/favorite-projectlist.jsx",
              lineNumber: 419,
              columnNumber: 17
            },
            this
          ) : ""
        ] }, void 0, true, {
          fileName: "app/routes/favorite-projects/favorite-projectlist.jsx",
          lineNumber: 388,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/favorite-projects/favorite-projectlist.jsx",
        lineNumber: 249,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/routes/favorite-projects/favorite-projectlist.jsx",
        lineNumber: 248,
        columnNumber: 13
      }, this) }, project._id, false, {
        fileName: "app/routes/favorite-projects/favorite-projectlist.jsx",
        lineNumber: 247,
        columnNumber: 9
      }, this);
    });
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "project-list-scroll p-2", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "project-total mt-2 pb-3", children: "Favourite Projects" }, void 0, false, {
        fileName: "app/routes/favorite-projects/favorite-projectlist.jsx",
        lineNumber: 438,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "project-List-scroll d-flex flex-wrap justify-content-start", children: projectView }, void 0, false, {
        fileName: "app/routes/favorite-projects/favorite-projectlist.jsx",
        lineNumber: 439,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/favorite-projects/favorite-projectlist.jsx",
      lineNumber: 437,
      columnNumber: 7
    }, this);
  }
};

// app/routes/favorite-projects/route.jsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/favorite-projects/route.jsx"
  );
  import.meta.hot.lastModified = "1709727718900.5598";
}
function favoriteProjectRoute() {
  const { projectsSummary } = useLoaderData();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Header, {}, void 0, false, {
      fileName: "app/routes/favorite-projects/route.jsx",
      lineNumber: 52,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Menu, {}, void 0, false, {
      fileName: "app/routes/favorite-projects/route.jsx",
      lineNumber: 53,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Footer, {}, void 0, false, {
      fileName: "app/routes/favorite-projects/route.jsx",
      lineNumber: 55,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(FavoriteProjectList, { projectsSummary }, void 0, false, {
      fileName: "app/routes/favorite-projects/route.jsx",
      lineNumber: 57,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/favorite-projects/route.jsx",
      lineNumber: 56,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/favorite-projects/route.jsx",
    lineNumber: 50,
    columnNumber: 5
  }, this);
}
export {
  favoriteProjectRoute as default
};
//# sourceMappingURL=/build/routes/favorite-projects-ERDDOQNE.js.map
