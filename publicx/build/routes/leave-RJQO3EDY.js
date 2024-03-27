import {
  DateToString
} from "/build/_shared/chunk-HUF2CQ7I.js";
import {
  DataTable
} from "/build/_shared/chunk-NUU62HHF.js";
import "/build/_shared/chunk-YU2GXVM7.js";
import "/build/_shared/chunk-YRVGMHYS.js";
import {
  require_browser_umd
} from "/build/_shared/chunk-FN7THW23.js";
import {
  config_default
} from "/build/_shared/chunk-CGPR7F7J.js";
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

// app/models/leave/leave-model.ts
var import_mongoose = __toESM(require_browser_umd(), 1);
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/models/leave/leave-model.ts"
  );
  import.meta.hot.lastModified = "1709470693601.773";
}
var LeaveApplicationSchema = new import_mongoose.default.Schema({
  userId: { type: String },
  userName: { type: String },
  fromEmail: { type: String },
  fromDate: { type: String },
  toDate: { type: String },
  workingDays: { type: String },
  reason: { type: String },
  leaveTypeId: { type: String },
  leaveType: { type: String },
  status: { type: String },
  rejectionReason: { type: String },
  leaveCategory: { type: String },
  createdBy: { type: String },
  createdOn: { type: String },
  modifiedBy: { type: String },
  modifiedOn: { type: String },
  isDeleted: { type: Boolean },
  leaveWithoutApproval: { type: Boolean }
}, { collection: "leaveapplications", versionKey: false });
var LeaveApplication = import_mongoose.default.model("LeaveApplication", LeaveApplicationSchema);
var leave_model_default = LeaveApplication;

// app/Services/leave-service/leave-service.jsx
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/Services/leave-service/leave-service.jsx"
  );
  import.meta.hot.lastModified = "1709622331890.3914";
}
var getAllLeavesForCalendar = async () => {
  try {
    const result = await leave_model_default.find(
      {
        isDeleted: false,
        status: "approved"
      },
      {
        _id: 1,
        leaveType: 1,
        status: 1,
        userName: 1,
        fromDate: 1,
        toDate: 1,
        workingDays: 1
      }
    );
    const userReportsData = result.map((d) => {
      let d1 = new Date(d.toDate);
      d1.setDate(d1.getDate() + 1);
      let endDate = DateToString(d1);
      let info = {
        id: d._id,
        start: d.fromDate,
        end: endDate,
        title: d.leaveType + " - " + d.userName,
        leaveType: d.leaveType
      };
      return info;
    });
    console.log("Formatted leaves for calendar:", userReportsData);
    return { response: userReportsData, err: null };
  } catch (err) {
    console.error("Error retrieving leaves for calendar:", err);
    return { response: null, err };
  }
};
var deleteLeave = async (leaveId) => {
  try {
    const leave = await leave_model_default.findByIdAndDelete(leaveId);
    return { response: leave, err: null };
  } catch (err) {
    console.error("Error deleting leave:", err);
    return { response: null, err };
  }
};
var getDetails = async (leaveId) => {
  try {
    const leave = await leave_model_default.findById(leaveId);
    console.log(leave, " leaves ");
    return { response: leaveDetails, err: null };
  } catch (err) {
    return { response: null, err };
  }
};
var approveReject = async (request, response) => {
  try {
    let loggedInUser = request.userInfo;
    let leaveApplication = {
      status: request.body.approvedRejected,
      rejectionReason: request.body.reasonRejection,
      modifiedBy: request.body.modifiedBy,
      modifiedOn: request.body.modifiedOn,
      leaveWithoutApproval: request.body.leaveWithoutApproval
    };
    let mailOptions = {
      from: 1,
      to: request.body.toEmail,
      cc: config.emails,
      subject: 1,
      html: 1
    };
    const result = await leave_model_default.findOneAndUpdate(
      { _id: request.body.leaveId },
      leaveApplication,
      { context: "query" }
    );
    let bodyHtml = config.approveRejectEmailContent;
    let subject = config.approveRejectSubject;
    bodyHtml = bodyHtml.replace("{leaveStatus}", leaveApplication.status);
    bodyHtml = bodyHtml.replace("{loggedInUser}", loggedInUser.userName);
    bodyHtml = bodyHtml.replace(
      "{reasonOfRejection}",
      leaveApplication.rejectionReason
    );
    subject = subject.replace("{status}", leaveApplication.status).replace("{fromDate}", result.fromDate).replace("{toDate}", result.toDate);
    mailOptions.subject = subject;
    mailOptions.html = bodyHtml;
    let emailResponse = 1;
    if (config.prodMode == "ON") {
      emailResponse = await sendEmail(mailOptions);
    } else {
      mailOptions.to = config.defaultEmail;
      emailResponse = await sendEmail(mailOptions);
    }
    if (emailResponse.response) {
      logInfo(
        response,
        "leaveController.approveReject - Error occurred while sending email " + mailOptions.to
      );
      response.json({
        success: false,
        err: "Something went wrong: Email Id is wrong for sending to."
      });
    } else {
      logInfo(
        "leaveController.approveReject - An e-mail has been sent to " + mailOptions.to + " with further instructions."
      );
    }
    response.json({
      success: true,
      message: `Leave has been ${leaveApplication.status}`
    });
  } catch (error) {
    console.error("Error in approveReject function:", error);
    response.json({ success: false, err: "Internal Server Error" });
  }
};
console.log(approveReject);
var getAllAppliedLeaves = async () => {
  try {
    const leaves = await leave_model_default.find({});
    return { response: leaves, err: null };
  } catch (err) {
    console.error("Error retrieving applied leaves:", err);
    return { response: null, err };
  }
};
var getAllAppliedLeavesforAdmin = async () => {
  try {
    const leaves = await leave_model_default.find({});
    return { response: leaves, err: null };
  } catch (err) {
    console.error("Error retrieving applied leaves:", err);
    return { response: null, err };
  }
};

// app/Components/leave/components/leave-list.jsx
var import_react = __toESM(require_react(), 1);
init_dist();
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/Components/leave/components/leave-list.jsx"
  );
}
var LeaveList = class extends import_react.Component {
  constructor(props) {
    super(props);
    this.onSelectViewChange = this.onSelectViewChange.bind(this);
    this.state = {
      leaveApplication: {},
      isLoaded: false,
      leaveDetails: {},
      leaveId: this.props.leaveId,
      errorMessage: "",
      successMessage: "",
      checked: "",
      appliedLeaveheaders: [
        { title: "Leave Title", accessor: "leaveType", index: 1 },
        { title: "From Date", accessor: "fromDate", index: 2 },
        { title: "To Date", accessor: "toDate", index: 3 },
        { title: "Duration", accessor: "workingDays", index: 4 },
        { title: "Application Date", accessor: "createdOn", index: 5 },
        { title: "Status", accessor: "status", index: 6 },
        {
          title: "Action",
          index: 7,
          cell: (row) => {
            if (row.status === "pending" || row.status === "rejected") {
              let url = "/leave-edit/" + row.leaveId;
              return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { className: "btn btn-xs btn-outline-info", to: url, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("i", { className: "fas fa-pencil-alt" }, void 0, false, {
                  fileName: "app/Components/leave/components/leave-list.jsx",
                  lineNumber: 54,
                  columnNumber: 21
                }, this) }, void 0, false, {
                  fileName: "app/Components/leave/components/leave-list.jsx",
                  lineNumber: 53,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "\xA0" }, void 0, false, {
                  fileName: "app/Components/leave/components/leave-list.jsx",
                  lineNumber: 56,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                  "span",
                  {
                    className: "btn btn-xs btn-outline-danger mr-1",
                    title: "Delete",
                    onClick: () => {
                      if (window.confirm(
                        "Are you sure you wish to delete this entry?"
                      ))
                        this.onDeleteListId(row.leaveId);
                    },
                    children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("i", { className: "far fa-trash-alt" }, void 0, false, {
                      fileName: "app/Components/leave/components/leave-list.jsx",
                      lineNumber: 69,
                      columnNumber: 21
                    }, this)
                  },
                  void 0,
                  false,
                  {
                    fileName: "app/Components/leave/components/leave-list.jsx",
                    lineNumber: 57,
                    columnNumber: 19
                  },
                  this
                ),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "\xA0" }, void 0, false, {
                  fileName: "app/Components/leave/components/leave-list.jsx",
                  lineNumber: 72,
                  columnNumber: 19
                }, this),
                auth_default.get("userRole") === "admin" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                  "span",
                  {
                    className: "btn btn-xs btn-outline-success mr-1",
                    title: "Approve",
                    onClick: () => {
                      if (window.confirm(
                        "Are you sure you wish to Approve this entry?"
                      ))
                        this.onApproveListId(row.leaveId);
                    },
                    children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("i", { className: "far fa-trash-alt" }, void 0, false, {
                      fileName: "app/Components/leave/components/leave-list.jsx",
                      lineNumber: 86,
                      columnNumber: 23
                    }, this)
                  },
                  void 0,
                  false,
                  {
                    fileName: "app/Components/leave/components/leave-list.jsx",
                    lineNumber: 74,
                    columnNumber: 17
                  },
                  this
                ) : "",
                auth_default.get("userRole") === "admin" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                  "span",
                  {
                    className: "btn btn-xs btn-outline-dark mr-1",
                    title: "Reject",
                    onClick: () => {
                      if (window.confirm(
                        "Are you sure you wish to reject this entry?"
                      ))
                        this.onRejectListId(row.leaveId);
                    },
                    children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("i", { className: "far fa-trash-alt" }, void 0, false, {
                      fileName: "app/Components/leave/components/leave-list.jsx",
                      lineNumber: 105,
                      columnNumber: 23
                    }, this)
                  },
                  void 0,
                  false,
                  {
                    fileName: "app/Components/leave/components/leave-list.jsx",
                    lineNumber: 93,
                    columnNumber: 17
                  },
                  this
                ) : ""
              ] }, void 0, true, {
                fileName: "app/Components/leave/components/leave-list.jsx",
                lineNumber: 52,
                columnNumber: 15
              }, this);
            } else {
              let url = "/leave-details/" + row.leaveId;
              return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
                auth_default.get("userRole") !== "support" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { title: "Details", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { className: "btn btn-xs btn-outline-warning", to: url, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                  "i",
                  {
                    className: "far fa-file",
                    style: { fontSize: "10px" }
                  },
                  void 0,
                  false,
                  {
                    fileName: "app/Components/leave/components/leave-list.jsx",
                    lineNumber: 119,
                    columnNumber: 25
                  },
                  this
                ) }, void 0, false, {
                  fileName: "app/Components/leave/components/leave-list.jsx",
                  lineNumber: 118,
                  columnNumber: 23
                }, this) }, void 0, false, {
                  fileName: "app/Components/leave/components/leave-list.jsx",
                  lineNumber: 117,
                  columnNumber: 17
                }, this) : "",
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "\xA0" }, void 0, false, {
                  fileName: "app/Components/leave/components/leave-list.jsx",
                  lineNumber: 128,
                  columnNumber: 19
                }, this),
                auth_default.get("userRole") !== "support" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                  "span",
                  {
                    className: "btn btn-xs btn-outline-danger",
                    title: "Delete",
                    onClick: () => {
                      if (window.confirm(
                        "Are you sure you wish to delete this entry?"
                      ))
                        this.onDeleteListId(row.leaveId);
                    },
                    children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("i", { className: "far fa-trash-alt" }, void 0, false, {
                      fileName: "app/Components/leave/components/leave-list.jsx",
                      lineNumber: 142,
                      columnNumber: 23
                    }, this)
                  },
                  void 0,
                  false,
                  {
                    fileName: "app/Components/leave/components/leave-list.jsx",
                    lineNumber: 130,
                    columnNumber: 17
                  },
                  this
                ) : "",
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "\xA0" }, void 0, false, {
                  fileName: "app/Components/leave/components/leave-list.jsx",
                  lineNumber: 148,
                  columnNumber: 19
                }, this),
                auth_default.get("userRole") === "admin" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                  "span",
                  {
                    className: "btn btn-xs btn-outline-success mr-1",
                    title: "Approve",
                    onClick: () => {
                      if (window.confirm(
                        "Are you sure you wish to Approve this entry?"
                      ))
                        this.onApproveListId(row.leaveId);
                    },
                    children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("i", { className: "far fa-check-square" }, void 0, false, {
                      fileName: "app/Components/leave/components/leave-list.jsx",
                      lineNumber: 162,
                      columnNumber: 23
                    }, this)
                  },
                  void 0,
                  false,
                  {
                    fileName: "app/Components/leave/components/leave-list.jsx",
                    lineNumber: 150,
                    columnNumber: 17
                  },
                  this
                ) : "",
                auth_default.get("userRole") === "admin" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                  "span",
                  {
                    className: "btn btn-xs btn-outline-dark mr-1",
                    title: "Reject",
                    onClick: () => {
                      if (window.confirm(
                        "Are you sure you wish to Reject this entry?"
                      ))
                        this.onRejectListId(row.leaveId);
                    },
                    children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("i", { className: "far fa-ban" }, void 0, false, {
                      fileName: "app/Components/leave/components/leave-list.jsx",
                      lineNumber: 180,
                      columnNumber: 23
                    }, this)
                  },
                  void 0,
                  false,
                  {
                    fileName: "app/Components/leave/components/leave-list.jsx",
                    lineNumber: 168,
                    columnNumber: 17
                  },
                  this
                ) : ""
              ] }, void 0, true, {
                fileName: "app/Components/leave/components/leave-list.jsx",
                lineNumber: 115,
                columnNumber: 15
              }, this);
            }
          }
        }
      ],
      userAppliedLeaveheaders: [
        { title: "Leaves Applied Reportees", accessor: "userName", index: 1 },
        { title: "Leave Title", accessor: "leaveType", index: 2 },
        { title: "From Date", accessor: "fromDate", index: 3 },
        { title: "To Date", accessor: "toDate", index: 4 },
        { title: "Duration", accessor: "workingDays", index: 5 },
        { title: "Application Date", accessor: "createdOn", index: 6 },
        { title: "Status", accessor: "status", index: 7 },
        {
          title: "Actions",
          index: 8,
          cell: (row) => {
            let url = "/leave-details/" + row.leaveId;
            return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              auth_default.get("userRole") !== "support" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { className: "btn btn-xs btn-outline-warning", to: url, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("i", { className: "far fa-file" }, void 0, false, {
                fileName: "app/Components/leave/components/leave-list.jsx",
                lineNumber: 208,
                columnNumber: 21
              }, this) }, void 0, false, {
                fileName: "app/Components/leave/components/leave-list.jsx",
                lineNumber: 207,
                columnNumber: 15
              }, this) : "",
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "\xA0" }, void 0, false, {
                fileName: "app/Components/leave/components/leave-list.jsx",
                lineNumber: 213,
                columnNumber: 17
              }, this),
              auth_default.get("userRole") !== "support" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "a",
                {
                  className: "btn btn-xs btn-outline-danger",
                  title: "Delete",
                  onClick: () => {
                    if (window.confirm(
                      "Are you sure you wish to delete this entry?"
                    ))
                      this.onDeleteListId(row.leaveId);
                  },
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("i", { className: "far fa-trash-alt " }, void 0, false, {
                    fileName: "app/Components/leave/components/leave-list.jsx",
                    lineNumber: 227,
                    columnNumber: 21
                  }, this)
                },
                void 0,
                false,
                {
                  fileName: "app/Components/leave/components/leave-list.jsx",
                  lineNumber: 215,
                  columnNumber: 15
                },
                this
              ) : "",
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "\xA0" }, void 0, false, {
                fileName: "app/Components/leave/components/leave-list.jsx",
                lineNumber: 233,
                columnNumber: 17
              }, this),
              auth_default.get("userRole") === "admin" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "a",
                {
                  className: "btn btn-xs btn-outline-success mr-1",
                  title: "Approve",
                  onClick: () => {
                    if (window.confirm(
                      "Are you sure you wish to Approve this entry?"
                    ))
                      this.onApproveListId(row.leaveId);
                  },
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("i", { className: "far fa-trash-alt" }, void 0, false, {
                    fileName: "app/Components/leave/components/leave-list.jsx",
                    lineNumber: 247,
                    columnNumber: 21
                  }, this)
                },
                void 0,
                false,
                {
                  fileName: "app/Components/leave/components/leave-list.jsx",
                  lineNumber: 235,
                  columnNumber: 15
                },
                this
              ) : "",
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "\xA0" }, void 0, false, {
                fileName: "app/Components/leave/components/leave-list.jsx",
                lineNumber: 253,
                columnNumber: 17
              }, this),
              auth_default.get("userRole") === "admin" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "a",
                {
                  className: "btn btn-xs btn-outline-dark mr-1",
                  title: "Reject",
                  onClick: () => {
                    if (window.confirm(
                      "Are you sure you wish to Reject this entry?"
                    ))
                      this.onRejectListId(row.leaveId);
                  },
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("i", { className: "far fa-trash-alt" }, void 0, false, {
                    fileName: "app/Components/leave/components/leave-list.jsx",
                    lineNumber: 267,
                    columnNumber: 21
                  }, this)
                },
                void 0,
                false,
                {
                  fileName: "app/Components/leave/components/leave-list.jsx",
                  lineNumber: 255,
                  columnNumber: 15
                },
                this
              ) : ""
            ] }, void 0, true, {
              fileName: "app/Components/leave/components/leave-list.jsx",
              lineNumber: 205,
              columnNumber: 13
            }, this);
          }
        }
      ],
      appliedLeave: [],
      appliedLeaveByUsers: [],
      allappliedleave: [],
      calendarData: [],
      selectedView: "DatatableView"
    };
  }
  async onDeleteListId(leaveId) {
    await deleteLeave(leaveId);
    let appliedLeave = this.state.appliedLeave.length > 0 && this.state.appliedLeave.filter((al) => {
      return al.leaveId !== leaveId;
    });
    let appliedLeaveByUsers = this.state.appliedLeaveByUsers.length > 0 && this.state.appliedLeaveByUsers.filter((al) => {
      return al.leaveId !== leaveId;
    });
    this.setState({
      appliedLeave,
      appliedLeaveByUsers
    });
  }
  async onRejectListId(leaveId) {
    await this.getDetails(leaveId, "rejected");
    let leaveApprovedReject = {
      approvedRejected: this.state.acceptReject,
      leaveId,
      reasonRejection: this.state.reason,
      modifiedBy: auth_default.get("userId"),
      modifiedOn: /* @__PURE__ */ new Date(),
      toEmail: this.state.leaveDetails.fromEmail,
      leaveWithoutApproval: this.state.leaveDetails.leaveWithoutApproval
    };
    await this.postApproveReject(leaveApprovedReject);
    for (let i = 0; i < this.state.appliedLeave.length; i++) {
      if (this.state.appliedLeave[i].leaveId == leaveId) {
        this.state.appliedLeave[i].status = "Rejected";
      }
    }
    for (let i = 0; i < this.state.appliedLeaveByUsers.length; i++) {
      if (this.state.appliedLeaveByUsers[i].leaveId == leaveId) {
        this.state.appliedLeaveByUsers[i].status = "Rejected";
      }
    }
    this.setState({
      appliedLeave: this.state.appliedLeave,
      appliedLeaveByUsers: this.state.appliedLeaveByUsers
    });
  }
  async onApproveListId(leaveId) {
    await this.getDetails(leaveId, "approved");
    let leaveApprovedReject = {
      approvedRejected: this.state.acceptReject,
      leaveId,
      reasonRejection: this.state.reason,
      modifiedBy: auth_default.get("userId"),
      modifiedOn: /* @__PURE__ */ new Date(),
      toEmail: this.state.leaveDetails.fromEmail,
      leaveWithoutApproval: this.state.leaveDetails.leaveWithoutApproval
    };
    await this.postApproveReject(leaveApprovedReject);
    for (let i = 0; i < this.state.appliedLeave.length; i++) {
      if (this.state.appliedLeave[i].leaveId == leaveId) {
        this.state.appliedLeave[i].status = "Approved";
      }
    }
    for (let i = 0; i < this.state.appliedLeaveByUsers.length; i++) {
      if (this.state.appliedLeaveByUsers[i].leaveId == leaveId) {
        this.state.appliedLeaveByUsers[i].status = "Approved";
      }
    }
    this.setState({
      appliedLeave: this.state.appliedLeave,
      appliedLeaveByUsers: this.state.appliedLeaveByUsers
    });
  }
  async getDetails(leaveId, approverejected) {
    let { response, err } = await getDetails(leaveId);
    this.setState({
      isLoaded: true
    });
    if (err) {
      this.setState({
        isLoaded: false
      });
    } else if (response && response.data.err) {
      this.setState({
        isLoaded: false
      });
    } else {
      if (approverejected === "rejected") {
        response.data.leaveDetails.status = "rejected";
      } else {
        response.data.leaveDetails.status = "approved";
      }
      this.setState({
        isLoaded: false,
        leaveDetails: response.data.leaveDetails,
        acceptReject: response.data.leaveDetails.status,
        reason: response.data.leaveDetails.rejectionReason
      });
    }
  }
  async postApproveReject(leaveApprovedReject) {
    let { response, err } = await (void 0)(
      leaveApprovedReject
    );
    if (err) {
      this.setState({
        ...this.state,
        errorMessage: err
      });
    } else if (response && response.data.err) {
      this.setState({
        ...this.state,
        errorMessage: response.data.err
      });
    } else {
      this.setState({
        successMessage: response.data.message
      });
    }
  }
  componentDidMount() {
    this.setAppliedLeaves("applied");
    if (this.state.calendarData.length === 0) {
      this.getAllLeavesForCalendar();
    }
    if (!this.state.appliedLeave) {
      this.setState({ appliedLeave: [] });
    }
    if (!this.state.appliedLeaveByUsers) {
      this.setState({ appliedLeaveByUsers: [] });
    }
  }
  async getAllLeavesForCalendar() {
    let { response, err } = await getAllLeavesForCalendar();
    this.setState({
      isLoaded: true
    });
    if (err) {
      this.setState({
        isLoaded: false
      });
    } else if (response && response.data.err) {
      this.setState({
        isLoaded: false
      });
    } else {
      if (response.data.result.length > 0) {
        this.setState({
          isLoaded: false,
          calendarData: response.data.result
        });
      }
    }
  }
  async setAppliedLeaves(flag) {
    let { response, err } = await getAllAppliedLeaves(
      flag
    );
    if (err) {
      this.setState({
        isLoaded: false
      });
    } else if (response && response.data.err) {
      this.setState({
        isLoaded: false
      });
    } else {
      let role = auth_default.get("userRole");
      if (role === "user") {
        if (response.data && response.data.appliedLeaves.length > 0) {
          this.setState({
            appliedLeave: response.data.appliedLeaves,
            isLoaded: false
          });
        }
      } else {
        if (response.data) {
          this.setState({
            appliedLeave: response.data.appliedLeaves,
            appliedLeaveByUsers: response.data.userAppliedLeaves,
            isLoaded: false
          });
        }
      }
    }
  }
  async getAllAppliedLeavesforAdmin() {
    let { response, err } = await getAllAppliedLeavesforAdmin();
    if (err) {
      this.setState({
        isLoaded: false
      });
    } else if (response && response.data.err) {
      this.setState({
        isLoaded: false
      });
    } else {
      if (response.data) {
        this.setState({
          appliedLeaveByUsers: response.data,
          appliedLeave: [],
          isLoaded: false
        });
      }
    }
  }
  onSelectViewChange(e) {
    let selectedView = e.target.value;
    this.setState({
      selectedView
    });
  }
  render() {
    const { appliedLeavesResponseForAdmin } = this.props;
    const { allLeavesForCalander } = this.props;
    const { leaves } = this.props;
    console.log(
      appliedLeavesResponseForAdmin,
      allLeavesForCalander,
      leaves,
      "applied for Admin "
    );
    let viewList = [];
    if (typeof window !== "undefined" && window.propeakConfigData && window.propeakConfigData.calenderViews) {
      viewList = window.propeakConfigData?.calenderViews?.map((module, i) => {
        return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: module.id, children: module.desc }, module.id, false, {
          fileName: "app/Components/leave/components/leave-list.jsx",
          lineNumber: 536,
          columnNumber: 11
        }, this);
      });
    }
    const dataTable = /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
      DataTable,
      {
        className: "data-table",
        title: "",
        keyField: "_id",
        pagination: {
          enabled: true,
          pageLength: 50,
          type: "long"
        },
        width: "100%",
        headers: this.state.appliedLeave.length > 0 ? this.state.appliedLeaveheaders : this.state.userAppliedLeaveheaders,
        data: this.state.appliedLeave.length > 0 ? this.state.appliedLeave : this.state.appliedLeaveByUsers.length > 0 ? this.state.appliedLeaveByUsers : [],
        hightlightRow: this.state.hightlightRow,
        noData: "No records!",
        show: config_default.Export
      },
      void 0,
      false,
      {
        fileName: "app/Components/leave/components/leave-list.jsx",
        lineNumber: 553,
        columnNumber: 5
      },
      this
    );
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react.default.Fragment, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "container bg-white", children: this.state.isLoaded ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "logo", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: "/images/loading.svg", alt: "loading" }, void 0, false, {
      fileName: "app/Components/leave/components/leave-list.jsx",
      lineNumber: 586,
      columnNumber: 15
    }, this) }, void 0, false, {
      fileName: "app/Components/leave/components/leave-list.jsx",
      lineNumber: 585,
      columnNumber: 11
    }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "project-total mt-2", children: [
        "Leaves \xA0",
        auth_default.get("userRole") !== "support" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { title: "apply leave", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          Link,
          {
            to: "/leave-create",
            className: "links ",
            style: {
              lineHeight: "1.3em",
              color: "rgb(255, 152, 0)",
              fontSize: "20px"
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("i", { className: "fas fa-plus" }, void 0, false, {
                fileName: "app/Components/leave/components/leave-list.jsx",
                lineNumber: 605,
                columnNumber: 27
              }, this),
              "\u2795"
            ]
          },
          void 0,
          true,
          {
            fileName: "app/Components/leave/components/leave-list.jsx",
            lineNumber: 596,
            columnNumber: 25
          },
          this
        ) }, void 0, false, {
          fileName: "app/Components/leave/components/leave-list.jsx",
          lineNumber: 595,
          columnNumber: 19
        }, this) : ""
      ] }, void 0, true, {
        fileName: "app/Components/leave/components/leave-list.jsx",
        lineNumber: 592,
        columnNumber: 19
      }, this) }, void 0, false, {
        fileName: "app/Components/leave/components/leave-list.jsx",
        lineNumber: 591,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/Components/leave/components/leave-list.jsx",
        lineNumber: 590,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row", children: [
        this.state.selectedView === "calendarView" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-10" }, void 0, false, {
          fileName: "app/Components/leave/components/leave-list.jsx",
          lineNumber: 617,
          columnNumber: 15
        }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-10", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          "div",
          {
            className: "nav nav-tabs nav-fill",
            id: "pills-tab",
            role: "tablist",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "a",
                {
                  onClick: this.setAppliedLeaves.bind(this, "applied"),
                  className: "nav-link active",
                  id: "applied-tab",
                  "data-toggle": "pill",
                  href: "#applied",
                  role: "tab",
                  "aria-controls": "applied",
                  "aria-selected": "true",
                  children: "Applied Leaves"
                },
                void 0,
                false,
                {
                  fileName: "app/Components/leave/components/leave-list.jsx",
                  lineNumber: 626,
                  columnNumber: 25
                },
                this
              ),
              auth_default.get("userRole") !== "user" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "a",
                {
                  onClick: this.setAppliedLeaves.bind(
                    this,
                    "pending"
                  ),
                  className: "nav-link",
                  id: "pending-tab",
                  "data-toggle": "pill",
                  href: "#pending",
                  role: "tab",
                  "aria-controls": "pending",
                  "aria-selected": "false",
                  children: "Pending Leaves"
                },
                void 0,
                false,
                {
                  fileName: "app/Components/leave/components/leave-list.jsx",
                  lineNumber: 639,
                  columnNumber: 21
                },
                this
              ) : "",
              auth_default.get("userRole") !== "user" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "a",
                {
                  onClick: this.setAppliedLeaves.bind(this, "all"),
                  className: "nav-link",
                  id: "all-leaves-tab",
                  "data-toggle": "pill",
                  href: "#all-leaves",
                  role: "tab",
                  "aria-controls": "all-leaves",
                  "aria-selected": "false",
                  children: "Leaves Applied By Users"
                },
                void 0,
                false,
                {
                  fileName: "app/Components/leave/components/leave-list.jsx",
                  lineNumber: 658,
                  columnNumber: 21
                },
                this
              ) : "",
              auth_default.get("userRole") === "admin" || auth_default.get("userRole") === "support" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "a",
                {
                  onClick: this.getAllAppliedLeavesforAdmin.bind(
                    this
                  ),
                  className: "nav-link",
                  id: "all-user-leaves-tab",
                  "data-toggle": "pill",
                  href: "#all-user-leaves",
                  role: "tab",
                  "aria-controls": "all-leaves",
                  "aria-selected": "false",
                  children: "All Leaves Applied By Users"
                },
                void 0,
                false,
                {
                  fileName: "app/Components/leave/components/leave-list.jsx",
                  lineNumber: 675,
                  columnNumber: 21
                },
                this
              ) : ""
            ]
          },
          void 0,
          true,
          {
            fileName: "app/Components/leave/components/leave-list.jsx",
            lineNumber: 621,
            columnNumber: 23
          },
          this
        ) }, void 0, false, {
          fileName: "app/Components/leave/components/leave-list.jsx",
          lineNumber: 620,
          columnNumber: 21
        }, this) }, void 0, false, {
          fileName: "app/Components/leave/components/leave-list.jsx",
          lineNumber: 619,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "float-right", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "input-group input-group-sm ", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "input-group-prepend", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            "span",
            {
              className: "input-group-text rounded-0",
              id: "inputGroup-sizing-sm",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("i", { className: "far fa-eye" }, void 0, false, {
                  fileName: "app/Components/leave/components/leave-list.jsx",
                  lineNumber: 704,
                  columnNumber: 27
                }, this),
                "\u{1F441}"
              ]
            },
            void 0,
            true,
            {
              fileName: "app/Components/leave/components/leave-list.jsx",
              lineNumber: 700,
              columnNumber: 25
            },
            this
          ) }, void 0, false, {
            fileName: "app/Components/leave/components/leave-list.jsx",
            lineNumber: 699,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            "select",
            {
              style: { fontSize: "11px" },
              className: "form-control",
              onChange: this.onSelectViewChange,
              value: this.state.selectedView,
              placeholder: "Select View",
              children: viewList
            },
            void 0,
            false,
            {
              fileName: "app/Components/leave/components/leave-list.jsx",
              lineNumber: 708,
              columnNumber: 23
            },
            this
          )
        ] }, void 0, true, {
          fileName: "app/Components/leave/components/leave-list.jsx",
          lineNumber: 698,
          columnNumber: 21
        }, this) }, void 0, false, {
          fileName: "app/Components/leave/components/leave-list.jsx",
          lineNumber: 697,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "app/Components/leave/components/leave-list.jsx",
          lineNumber: 696,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "app/Components/leave/components/leave-list.jsx",
        lineNumber: 615,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { id: "largeCalendar", children: this.state.selectedView === "calendarView" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        FullCalendar,
        {
          header: {
            left: "prev,next today myCustomButton",
            center: "title",
            right: "month,basicWeek,basicDay"
          },
          defaultDate: /* @__PURE__ */ new Date(),
          navLinks: true,
          editable: true,
          eventLimit: true,
          events: this.state.calendarData ? this.state.calendarData : []
        },
        void 0,
        false,
        {
          fileName: "app/Components/leave/components/leave-list.jsx",
          lineNumber: 725,
          columnNumber: 17
        },
        this
      ) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "leave-div", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "project-title d.inline-block mt-3", children: "Leave Status" }, void 0, false, {
          fileName: "app/Components/leave/components/leave-list.jsx",
          lineNumber: 741,
          columnNumber: 23
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          "div",
          {
            className: "tab-content leave-table",
            id: "pills-tabContent",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "div",
                {
                  className: "tab-pane fade show active",
                  id: "applied",
                  role: "tabpanel",
                  "aria-labelledby": "applied-tab",
                  children: [
                    " ",
                    dataTable
                  ]
                },
                void 0,
                true,
                {
                  fileName: "app/Components/leave/components/leave-list.jsx",
                  lineNumber: 748,
                  columnNumber: 25
                },
                this
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "div",
                {
                  className: "tab-pane fade",
                  id: "pending",
                  role: "tabpanel",
                  "aria-labelledby": "pending-tab",
                  children: dataTable
                },
                void 0,
                false,
                {
                  fileName: "app/Components/leave/components/leave-list.jsx",
                  lineNumber: 757,
                  columnNumber: 25
                },
                this
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "div",
                {
                  className: "tab-pane fade",
                  id: "all-leaves",
                  role: "tabpanel",
                  "aria-labelledby": "all-leaves-tab",
                  children: dataTable
                },
                void 0,
                false,
                {
                  fileName: "app/Components/leave/components/leave-list.jsx",
                  lineNumber: 765,
                  columnNumber: 25
                },
                this
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "div",
                {
                  className: "tab-pane fade",
                  id: "all-user-leaves",
                  role: "tabpanel",
                  "aria-labelledby": "all-user-leaves-tab",
                  children: dataTable
                },
                void 0,
                false,
                {
                  fileName: "app/Components/leave/components/leave-list.jsx",
                  lineNumber: 773,
                  columnNumber: 25
                },
                this
              )
            ]
          },
          void 0,
          true,
          {
            fileName: "app/Components/leave/components/leave-list.jsx",
            lineNumber: 744,
            columnNumber: 23
          },
          this
        )
      ] }, void 0, true, {
        fileName: "app/Components/leave/components/leave-list.jsx",
        lineNumber: 740,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/Components/leave/components/leave-list.jsx",
        lineNumber: 723,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/Components/leave/components/leave-list.jsx",
        lineNumber: 722,
        columnNumber: 15
      }, this)
    ] }, void 0, true, {
      fileName: "app/Components/leave/components/leave-list.jsx",
      lineNumber: 589,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/Components/leave/components/leave-list.jsx",
      lineNumber: 583,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/Components/leave/components/leave-list.jsx",
      lineNumber: 582,
      columnNumber: 7
    }, this);
  }
};
var leave_list_default = LeaveList;

// app/routes/leave/route.jsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/leave/route.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/leave/route.jsx"
  );
  import.meta.hot.lastModified = "1709621791747.181";
}
function LeaveListComponent() {
  _s();
  const {
    allLeavesForCalander,
    leaves,
    appliedLeavesResponseForAdmin
  } = useLoaderData();
  console.log(appliedLeavesResponseForAdmin, " data in route ");
  console.log(allLeavesForCalander, "allLeavesForCalander ,,,,,,,");
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(leave_list_default, { appliedLeavesResponseForAdmin, leaves, allLeavesForCalander }, void 0, false, {
    fileName: "app/routes/leave/route.jsx",
    lineNumber: 87,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/leave/route.jsx",
    lineNumber: 86,
    columnNumber: 10
  }, this);
}
_s(LeaveListComponent, "4tQ1zJEGmsNElQDUiaw/hFwj5lo=", false, function() {
  return [useLoaderData];
});
_c = LeaveListComponent;
var _c;
$RefreshReg$(_c, "LeaveListComponent");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  LeaveListComponent as default
};
//# sourceMappingURL=/build/routes/leave-RJQO3EDY.js.map
