import {
  DateToString
} from "/build/_shared/chunk-HUF2CQ7I.js";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "/build/_shared/chunk-VFRTC5XU.js";
import {
  DataTable
} from "/build/_shared/chunk-NUU62HHF.js";
import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
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
  Link,
  init_dist2 as init_dist
} from "/build/_shared/chunk-7K4UV4CH.js";
import {
  createHotContext
} from "/build/_shared/chunk-7LE2OC7F.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XU7DNSPJ.js";
import {
  require_react
} from "/build/_shared/chunk-BOXFZXVX.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/Components/summary/summary.jsx
var import_react = __toESM(require_react(), 1);
init_dist();

// app/models/task/task-model.ts
var import_mongoose = __toESM(require_browser_umd(), 1);
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/models/task/task-model.ts"
  );
  import.meta.hot.lastModified = "1709470693609.7705";
}
var MessageSchema = new import_mongoose.Schema({
  content: String
});
var UploadFileSchema = new import_mongoose.Schema({
  fileUrl: String
});
var SubTaskSchema = new import_mongoose.Schema({
  title: String,
  completed: Boolean
});
var TaskSchema = new import_mongoose.Schema({
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
  subtaskId: String
}, { versionKey: false });
var Task = import_mongoose.default.model("task", TaskSchema);
var task_model_default = Task;

// app/Services/task/task-service.jsx
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/Services/task/task-service.jsx"
  );
  import.meta.hot.lastModified = "1709883510300.0022";
}
var getDashboardData = async (projectId, flag, showArchive) => {
  try {
    const tasks = await task_model_default.find({ projectId, flag, showArchive });
    return { tasks, tasksErr: null };
  } catch (err) {
    console.error("Error getting dashboard data:", err);
    return { tasks: null, tasksErr: err };
  }
};

// app/Components/summary/summary.jsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/Components/summary/summary.jsx"
  );
}
var RADIAN = Math.PI / 180;
var renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
    "text",
    {
      x,
      y,
      fill: "white",
      textAnchor: x > cx ? "start" : "end",
      dominantBaseline: "central",
      children: `${(percent * 100).toFixed(0)}%`
    },
    void 0,
    false,
    {
      fileName: "app/Components/summary/summary.jsx",
      lineNumber: 37,
      columnNumber: 5
    },
    this
  );
};
var Summary = class extends import_react.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.reset = this.reset.bind(this);
    this.submit = this.submit.bind(this);
    this.headerwidth;
    this.state = {
      data: [],
      chartData: [],
      userProductivityData: [],
      overDueData: [],
      todayData: 0,
      colors: {
        New: "#5feae4",
        Running: "#ffff00",
        Completed: "#4bef41",
        OnHold: "#adafa7fc",
        Overdue: "#ea2b2b",
        FutureTask: "#136ec8"
      },
      projectData: props.context && props.context.state ? props.context.state.projectData : [],
      isLoaded: true,
      headers: [
        {
          title: "Project Title",
          accessor: "projectTitle",
          index: 0,
          cell: (row) => {
            let url = "/project/tasks/" + row.projectId;
            return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: url, children: [
              row.projectTitle,
              " "
            ] }, void 0, true, {
              fileName: "app/Components/summary/summary.jsx",
              lineNumber: 82,
              columnNumber: 18
            }, this);
          }
        },
        {
          title: "User Name",
          accessor: "userName",
          index: 1,
          cell: (row) => {
            let url = "/userPerformanceReports/" + row.userId;
            return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: url, children: [
              row.userName,
              " "
            ] }, void 0, true, {
              fileName: "app/Components/summary/summary.jsx",
              lineNumber: 91,
              columnNumber: 18
            }, this);
          }
        },
        { title: "Task Title", accessor: "title", index: 2 },
        { title: "Start Date", accessor: "startDate", index: 3 },
        { title: "End Date", accessor: "endDate", index: 4 }
      ],
      hightlightRow: {
        accessor: "status",
        className: "errorRow"
      },
      hiddenProjectId: "",
      totalProjects: props.context && props.context.state ? props.context.state.totalProjects : 0,
      flag: "duetoday",
      projectStatus: props.context && props.context.state ? props.context.state.projectStatus : [],
      totalProjectUsers: props.context && props.context.state ? props.context.state.totalProjectUsers : 0,
      showArchive: props.context && props.context.state ? props.context.state.showArchive : false
    };
  }
  async handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      ...this.state,
      [name]: value
    });
    if (e.target.value === "") {
      await this.setState({
        hiddenProjectId: ""
      });
      this.getDashboardData(this.state.flag, this.state.showArchive);
      this.props.context.actions.getAllProjectsSummary();
    }
  }
  async reset(e) {
    if (e) {
      e.preventDefault();
    }
    await this.setState({
      hiddenProjectId: ""
    });
    this.getDashboardData(this.state.flag, this.state.showArchive);
    this.props.context.actions.getAllProjectsSummary();
  }
  async submit(e) {
    if (e) {
      e.preventDefault();
    }
    await this.getDashboardData(this.state.flag, this.state.showArchive);
    let project = this.state.projectData.filter((p) => {
      return p.title === this.state.hiddenProjectId;
    });
    let projectId = project.length > 0 ? project[0]._id : "";
    this.props.context.actions.getAllProjectsSummary(projectId);
  }
  async componentDidMount() {
    this.setState({
      isLoaded: false
    });
    await this.getDashboardData(this.state.flag, this.state.showArchive);
    this.props.context.actions.getAllProjectsSummary();
    if (this.state.projectData.length === 0) {
      this.props.context.actions.getUserProject();
    }
  }
  async getDashboardData(flag, showArchive, e) {
    if (e) {
      e.preventDefault();
    }
    let project = this.state.projectData.filter((p) => {
      return p.title === this.state.hiddenProjectId;
    });
    let projectId = project.length > 0 ? project[0]._id : "";
    let { tasks, tasksErr } = await getDashboardData(
      projectId,
      flag,
      showArchive
    );
    if (tasksErr) {
      this.setState({
        message: tasksErr
      });
    } else if (tasks && tasks.data.err) {
      this.setState({ message: tasks.data.err });
    } else {
      let chartData = [];
      let todayData = 0;
      if (tasks.data.data.todaysTasksChartData && tasks.data.data.todaysTasksChartData.length > 0) {
        for (let i = 0; i < tasks.data.data.todaysTasksChartData.length; i++) {
          if (tasks.data.data.todaysTasksChartData[i].name !== "TodaysTask") {
            chartData.push(tasks.data.data.todaysTasksChartData[i]);
          } else {
            todayData = tasks.data.data.todaysTasksChartData[i].value;
          }
        }
      }
      let UserProductivityData = tasks.data.data.userProductivityData && tasks.data.data.userProductivityData.length > 0 ? tasks.data.data.userProductivityData[0] : [];
      let date = DateToString((/* @__PURE__ */ new Date()).toISOString());
      if (tasks.data.data.UsersTodaysTasks.length > 0) {
        let data = tasks.data.data.UsersTodaysTasks.map((task) => {
          task.startDate = task.startDate !== void 0 && task.startDate !== "" && task.startDate !== null ? DateToString(task.startDate) : "";
          task.endDate = task.endDate !== void 0 && task.endDate !== "" && task.endDate !== null ? DateToString(task.endDate) : "";
          if (tasks.status === "new") {
            task.status = "New ";
          } else if (tasks.status === "inprogress") {
            task.status = "Inprogress ";
          } else if (task.startDate < date && task.endDate > date && !task.completed) {
            task.status = "Ongoing ";
          } else if (task.startDate === date && task.completed) {
            task.status = "Todays task completed";
          } else if (task.startDate === date && !task.completed) {
            task.status = "Todays task";
          }
          if (this.state.flag === "overdue") {
            task.status = "Incomplete ";
          }
          return task;
        });
        let oneDay = 0;
        let twoDay = 0;
        let threeDay = 0;
        let fourDay = 0;
        let fiveDay = 0;
        let moreThanFiveDay = 0;
        let overDueArray = [];
        let overDue = "";
        let obj1 = {};
        let obj2 = {};
        let obj3 = {};
        let obj4 = {};
        let obj5 = {};
        let obj6 = {};
        for (let i = 0; i < tasks.data.data.UsersTodaysTasks.length; i++) {
          overDue = parseInt(
            (/* @__PURE__ */ new Date() - new Date(tasks.data.data.UsersTodaysTasks[i].endDate)) / (1e3 * 60 * 60 * 24),
            10
          );
          if (overDue === 1) {
            oneDay++;
            obj1 = {
              day: "1 Day",
              count: oneDay
            };
          } else if (overDue === 2) {
            twoDay++;
            obj2 = {
              day: "2 Days",
              count: twoDay
            };
          } else if (overDue === 3) {
            threeDay++;
            obj3 = {
              day: "3 Days",
              count: threeDay
            };
          } else if (overDue === 4) {
            fourDay++;
            obj4 = {
              day: "4 Days",
              count: fourDay
            };
          } else if (overDue === 5) {
            fiveDay++;
            obj5 = {
              day: "5 Days",
              count: fiveDay
            };
          } else if (overDue > 5) {
            moreThanFiveDay++;
            obj6 = {
              day: "5+ Days",
              count: moreThanFiveDay
            };
          } else {
          }
        }
        if (Object.keys(obj1).length > 0) {
          overDueArray.push(obj1);
        }
        if (Object.keys(obj2).length > 0) {
          overDueArray.push(obj2);
        }
        if (Object.keys(obj3).length > 0) {
          overDueArray.push(obj3);
        }
        if (Object.keys(obj4).length > 0) {
          overDueArray.push(obj4);
        }
        if (Object.keys(obj5).length > 0) {
          overDueArray.push(obj5);
        }
        if (Object.keys(obj6).length > 0) {
          overDueArray.push(obj6);
        }
        this.setState({
          isdataLoaded: false,
          data,
          overDueData: overDueArray
        });
      } else {
        this.setState({
          isdataLoaded: false,
          data: [],
          overDueData: []
        });
      }
      this.setState({
        chartData,
        UserProductivityData,
        todayData
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      projectData: nextProps.context.state.userProjectData,
      totalProjects: nextProps.context.state.totalProjects,
      projectStatus: nextProps.context.state.projectStatus,
      totalProjectUsers: nextProps.context.state.totalProjectUsers,
      showArchive: nextProps.context.state.showArchive
    });
  }
  async showTabData(flag) {
    this.setState({
      flag,
      data: [],
      isdataLoaded: true
    });
    this.getDashboardData(flag, this.state.showArchive);
  }
  renderTooltip = (props) => {
    if (props.active) {
      return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: { border: "1px solid #fff" }, children: [
        props.label,
        ":",
        props.payload[0].value
      ] }, void 0, true, {
        fileName: "app/Components/summary/summary.jsx",
        lineNumber: 349,
        columnNumber: 9
      }, this);
    }
    return;
  };
  render() {
    const labelStyle = {
      fontSize: "small"
    };
    let projects = [];
    let totalProjects = [];
    let totalTask = 0;
    let incompeleteTask = 0;
    let overdueTask = 0;
    let onHoldTask = 0;
    let holdProjectCount = 0;
    let projectUserCount = 0;
    let allProjects = this.state.projectData && this.state.projectData;
    for (let i = 0; i < allProjects.length; i++) {
      projects.push(
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { "data-value": allProjects[i]._id, children: allProjects[i].title }, allProjects[i]._id, false, {
          fileName: "app/Components/summary/summary.jsx",
          lineNumber: 375,
          columnNumber: 9
        }, this)
      );
    }
    if (this.state.totalProjects.length > 0) {
      for (let i = 0; i < this.state.totalProjects.length; i++) {
        totalTask = totalTask + this.state.totalProjects[i].totalTasks;
        if (this.state.totalProjects[i].status === "onHold") {
          holdProjectCount++;
        }
        overdueTask = overdueTask + this.state.totalProjects[i].overDueTasks;
        onHoldTask = onHoldTask + this.state.totalProjects[i].onHoldTasks;
        incompeleteTask = incompeleteTask + this.state.totalProjects[i].incompleteTasks;
      }
    }
    let deletedTaskCount = 0, completeTaskCount = 0, inprogressTaskCount = 0, ovedueTaskCount = 0, onHOldTaskCount = 0, openTask = 0, newTask = 0, futureTaskCount = 0;
    if (this.state.chartData.length > 0) {
      for (let i = 0; i < this.state.chartData.length; i++) {
        if (this.state.chartData[i].name === "Completed") {
          completeTaskCount = this.state.chartData[i].value;
        }
        if (this.state.chartData[i].name === "Running") {
          inprogressTaskCount = this.state.chartData[i].value;
        }
        if (this.state.chartData[i].name === "Overdue") {
          ovedueTaskCount = this.state.chartData[i].value;
        }
        if (this.state.chartData[i].name === "OnHold") {
          onHOldTaskCount = this.state.chartData[i].value;
        }
        if (this.state.chartData[i].name === "All") {
          openTask = this.state.chartData[i].value;
        }
        if (this.state.chartData[i].name === "New") {
          newTask = this.state.chartData[i].value;
        }
        if (this.state.chartData[i].name === "FutureTask") {
          futureTaskCount = this.state.chartData[i].value;
        }
      }
    }
    let headers = [];
    for (let i = 0; i < this.state.headers.length; i++) {
      if (this.state.flag === "futureTask") {
        if (this.state.headers[i].accessor !== "startDate" && this.state.headers[i].accessor !== "endDate") {
          headers.push(this.state.headers[i]);
        }
      } else {
        headers.push(this.state.headers[i]);
      }
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
        headers,
        data: this.state.data,
        hightlightRow: this.state.hightlightRow,
        noData: "No records!",
        show: config_default.Export
      },
      void 0,
      false,
      {
        fileName: "app/Components/summary/summary.jsx",
        lineNumber: 439,
        columnNumber: 5
      },
      this
    );
    const dataChart = /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PieChart, { margin: { top: 10, right: 3, left: 5, bottom: 20 }, onMouseEnter: this.onPieEnter, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        Pie,
        {
          data: this.state.chartData,
          labelLine: false,
          label: renderCustomizedLabel,
          innerRadius: 60,
          outerRadius: 90,
          paddingAngle: 0,
          fill: "#8884d8",
          dataKey: "value",
          children: this.state.chartData.map(
            (entry, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
              Cell,
              {
                fill: this.state.colors[entry.name]
              },
              index,
              false,
              {
                fileName: "app/Components/summary/summary.jsx",
                lineNumber: 467,
                columnNumber: 11
              },
              this
            )
          )
        },
        void 0,
        false,
        {
          fileName: "app/Components/summary/summary.jsx",
          lineNumber: 460,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Tooltip, {}, void 0, false, {
        fileName: "app/Components/summary/summary.jsx",
        lineNumber: 473,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/Components/summary/summary.jsx",
      lineNumber: 459,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/Components/summary/summary.jsx",
      lineNumber: 458,
      columnNumber: 5
    }, this);
    const TiltedAxisTick = (props) => {
      const { x, y, stroke, payload } = props;
      return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("g", { transform: `translate(${x},${y})`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        "text",
        {
          x: 0,
          y: 0,
          dy: 10,
          textAnchor: "middle",
          width: 20,
          scaleToFit: true,
          fontSize: 9,
          fill: "#666",
          transform: "rotate(-15)",
          children: payload.value
        },
        void 0,
        false,
        {
          fileName: "app/Components/summary/summary.jsx",
          lineNumber: 480,
          columnNumber: 11
        },
        this
      ) }, void 0, false, {
        fileName: "app/Components/summary/summary.jsx",
        lineNumber: 479,
        columnNumber: 9
      }, this);
    };
    const dataChartBar = this.state.chartData.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BarChart, { margin: { top: 10, right: 3, left: 5, bottom: 20 }, data: this.state.chartData, width: "100%", height: "100%", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CartesianGrid, { strokeDasharray: "3 3" }, void 0, false, {
        fileName: "app/Components/summary/summary.jsx",
        lineNumber: 500,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(XAxis, { dataKey: "name", tick: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TiltedAxisTick, {}, void 0, false, {
        fileName: "app/Components/summary/summary.jsx",
        lineNumber: 501,
        columnNumber: 39
      }, this), minTickGap: 10, interval: 0 }, void 0, false, {
        fileName: "app/Components/summary/summary.jsx",
        lineNumber: 501,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(YAxis, {}, void 0, false, {
        fileName: "app/Components/summary/summary.jsx",
        lineNumber: 502,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Tooltip, {}, void 0, false, {
        fileName: "app/Components/summary/summary.jsx",
        lineNumber: 503,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Legend, { verticalAlign: "bottom", align: "center", layout: "horizontal" }, void 0, false, {
        fileName: "app/Components/summary/summary.jsx",
        lineNumber: 504,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bar, { dataKey: "value", stackId: "a", name: "Task Progress", children: this.state.chartData.length > 0 && this.state.chartData.map(
        (entry, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Cell, { fill: this.state.colors[entry.name] }, "value", false, {
          fileName: "app/Components/summary/summary.jsx",
          lineNumber: 509,
          columnNumber: 11
        }, this)
      ) }, void 0, false, {
        fileName: "app/Components/summary/summary.jsx",
        lineNumber: 506,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        Tooltip,
        {
          content: this.renderTooltip,
          cursor: false,
          wrapperStyle: { backgroundColor: "#f9f7f7" }
        },
        void 0,
        false,
        {
          fileName: "app/Components/summary/summary.jsx",
          lineNumber: 513,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, true, {
      fileName: "app/Components/summary/summary.jsx",
      lineNumber: 498,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/Components/summary/summary.jsx",
      lineNumber: 497,
      columnNumber: 40
    }, this);
    const dataChart1 = this.state.overDueData.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
      BarChart,
      {
        data: this.state.overDueData ? this.state.overDueData : [],
        margin: { top: 5, right: 50, left: 10, bottom: 5 },
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CartesianGrid, { strokeDasharray: "3 3" }, void 0, false, {
            fileName: "app/Components/summary/summary.jsx",
            lineNumber: 525,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(XAxis, { dataKey: "day", padding: { left: 10 }, minTickGap: 10 }, void 0, false, {
            fileName: "app/Components/summary/summary.jsx",
            lineNumber: 526,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(YAxis, {}, void 0, false, {
            fileName: "app/Components/summary/summary.jsx",
            lineNumber: 527,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Tooltip, {}, void 0, false, {
            fileName: "app/Components/summary/summary.jsx",
            lineNumber: 528,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Legend, { verticalAlign: "bottom" }, void 0, false, {
            fileName: "app/Components/summary/summary.jsx",
            lineNumber: 529,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            Bar,
            {
              name: " Overdue Task Count",
              dataKey: "count",
              stackId: "a",
              fill: "#8884d8"
            },
            void 0,
            false,
            {
              fileName: "app/Components/summary/summary.jsx",
              lineNumber: 530,
              columnNumber: 11
            },
            this
          )
        ]
      },
      void 0,
      true,
      {
        fileName: "app/Components/summary/summary.jsx",
        lineNumber: 521,
        columnNumber: 9
      },
      this
    ) }, void 0, false, {
      fileName: "app/Components/summary/summary.jsx",
      lineNumber: 520,
      columnNumber: 42
    }, this);
    var percentageTask = this.state.UserProductivityData && this.state.UserProductivityData.WorkingHours !== 0 ? (this.state.UserProductivityData.Storypoint / this.state.UserProductivityData.WorkingHours * 100).toString().match(/^-?\d+(?:\.\d{0,2})?/) : 0;
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react.default.Fragment, { children: this.state.isLoaded ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "logo", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: "/images/loading.svg", alt: "loading" }, void 0, false, {
      fileName: "app/Components/summary/summary.jsx",
      lineNumber: 553,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/Components/summary/summary.jsx",
      lineNumber: 552,
      columnNumber: 30
    }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react.default.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row page-summary", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-12 col-lg-12 ", children: auth_default.get("userRole") !== "user" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: " mt-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "d-flex justify-content-end", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex-item", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-group", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", value: this.state.hiddenProjectId, list: "data", onChange: this.handleInputChange, name: "hiddenProjectId", className: "form-control select-project rounded-0", autoComplete: "off", placeholder: "Select Project" }, void 0, false, {
            fileName: "app/Components/summary/summary.jsx",
            lineNumber: 565,
            columnNumber: 29
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("datalist", { id: "data", children: projects }, void 0, false, {
            fileName: "app/Components/summary/summary.jsx",
            lineNumber: 566,
            columnNumber: 29
          }, this)
        ] }, void 0, true, {
          fileName: "app/Components/summary/summary.jsx",
          lineNumber: 564,
          columnNumber: 27
        }, this) }, void 0, false, {
          fileName: "app/Components/summary/summary.jsx",
          lineNumber: 563,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex-item", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-group", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: this.submit, type: "submit", className: "btn btn-md btn-default rounded-0 border-0", value: "", disabled: !this.state.hiddenProjectId, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { role: "img", "aria-labelledby": "Search", children: "\u{1F50D}" }, void 0, false, {
          fileName: "app/Components/summary/summary.jsx",
          lineNumber: 574,
          columnNumber: 31
        }, this) }, void 0, false, {
          fileName: "app/Components/summary/summary.jsx",
          lineNumber: 573,
          columnNumber: 29
        }, this) }, void 0, false, {
          fileName: "app/Components/summary/summary.jsx",
          lineNumber: 572,
          columnNumber: 27
        }, this) }, void 0, false, {
          fileName: "app/Components/summary/summary.jsx",
          lineNumber: 571,
          columnNumber: 25
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex-item ml-0", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: this.reset, className: "btn btn-md btn-danger  border-0", children: "X" }, void 0, false, {
          fileName: "app/Components/summary/summary.jsx",
          lineNumber: 580,
          columnNumber: 27
        }, this) }, void 0, false, {
          fileName: "app/Components/summary/summary.jsx",
          lineNumber: 578,
          columnNumber: 25
        }, this)
      ] }, void 0, true, {
        fileName: "app/Components/summary/summary.jsx",
        lineNumber: 562,
        columnNumber: 23
      }, this) }, void 0, false, {
        fileName: "app/Components/summary/summary.jsx",
        lineNumber: 561,
        columnNumber: 21
      }, this) }, void 0, false, {
        fileName: "app/Components/summary/summary.jsx",
        lineNumber: 560,
        columnNumber: 19
      }, this) }, void 0, false, {
        fileName: "app/Components/summary/summary.jsx",
        lineNumber: 559,
        columnNumber: 13
      }, this) : "" }, void 0, false, {
        fileName: "app/Components/summary/summary.jsx",
        lineNumber: 557,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/Components/summary/summary.jsx",
        lineNumber: 556,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "dashboard box-wrapper d-flex justify-content-between align-self-center mb-2", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "summary-box  default-task-border", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "lbl-no", children: this.state.totalProjects.length }, void 0, false, {
              fileName: "app/Components/summary/summary.jsx",
              lineNumber: 596,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("small", { style: { color: "red" }, title: "Hold Project", children: [
              "(",
              holdProjectCount,
              ") "
            ] }, void 0, true, {
              fileName: "app/Components/summary/summary.jsx",
              lineNumber: 598,
              columnNumber: 24
            }, this),
            " "
          ] }, void 0, true, {
            fileName: "app/Components/summary/summary.jsx",
            lineNumber: 595,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "lbl-text", children: "Projects" }, void 0, false, {
            fileName: "app/Components/summary/summary.jsx",
            lineNumber: 600,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/Components/summary/summary.jsx",
          lineNumber: 594,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "summary-box default-task-border", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "lbl-no", children: totalTask }, void 0, false, {
            fileName: "app/Components/summary/summary.jsx",
            lineNumber: 606,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "lbl-text", children: "All Tasks" }, void 0, false, {
            fileName: "app/Components/summary/summary.jsx",
            lineNumber: 609,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/Components/summary/summary.jsx",
          lineNumber: 605,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "summary-box running-task-border", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "lbl-no", children: incompeleteTask }, void 0, false, {
            fileName: "app/Components/summary/summary.jsx",
            lineNumber: 615,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "lbl-text", children: "Running Tasks" }, void 0, false, {
            fileName: "app/Components/summary/summary.jsx",
            lineNumber: 618,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/Components/summary/summary.jsx",
          lineNumber: 614,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "summary-box  overdue-task-border", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "lbl-no", children: overdueTask }, void 0, false, {
            fileName: "app/Components/summary/summary.jsx",
            lineNumber: 624,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "lbl-text", children: "Overdue Tasks" }, void 0, false, {
            fileName: "app/Components/summary/summary.jsx",
            lineNumber: 627,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/Components/summary/summary.jsx",
          lineNumber: 623,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "summary-box onhold-task-border", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "lbl-no", children: onHoldTask }, void 0, false, {
            fileName: "app/Components/summary/summary.jsx",
            lineNumber: 633,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "lbl-text", children: "OnHold Tasks" }, void 0, false, {
            fileName: "app/Components/summary/summary.jsx",
            lineNumber: 636,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/Components/summary/summary.jsx",
          lineNumber: 632,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "summary-box default-task-border", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "lbl-no", children: this.state.totalProjectUsers }, void 0, false, {
            fileName: "app/Components/summary/summary.jsx",
            lineNumber: 642,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "lbl-text", children: "Project Member" }, void 0, false, {
            fileName: "app/Components/summary/summary.jsx",
            lineNumber: 645,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/Components/summary/summary.jsx",
          lineNumber: 641,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/Components/summary/summary.jsx",
        lineNumber: 593,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row equal-height-container", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-12 col-lg-9 first", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h6", { className: "task-title  mb-3 mt-2 bb-dotted ", children: "Tasks Info" }, void 0, false, {
            fileName: "app/Components/summary/summary.jsx",
            lineNumber: 653,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "nav nav-tabs nav-fill", id: "myTab", role: "tablist", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { onClick: this.showTabData.bind(this, "duetoday"), className: "nav-item nav-link active", id: "assigned-tab", "data-toggle": "tab", href: "#todays", role: "tab", "aria-controls": "todays", "aria-selected": "true", children: [
              "Today's  ",
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { style: { color: "rgb(255, 152, 0)" }, className: "task-count", children: [
                "(",
                this.state.flag === "duetoday" && this.state.data ? this.state.data.length : 0,
                ")"
              ] }, void 0, true, {
                fileName: "app/Components/summary/summary.jsx",
                lineNumber: 656,
                columnNumber: 224
              }, this)
            ] }, void 0, true, {
              fileName: "app/Components/summary/summary.jsx",
              lineNumber: 656,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { onClick: this.showTabData.bind(this, "newTask"), className: "nav-item nav-link", id: "profile-tab", "data-toggle": "tab", href: "#newtask", role: "tab", "aria-controls": "newtask", "aria-selected": "false", children: [
              "New  ",
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { style: { color: "rgb(255, 152, 0)" }, children: [
                "(",
                newTask,
                ")"
              ] }, void 0, true, {
                fileName: "app/Components/summary/summary.jsx",
                lineNumber: 657,
                columnNumber: 214
              }, this)
            ] }, void 0, true, {
              fileName: "app/Components/summary/summary.jsx",
              lineNumber: 657,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { onClick: this.showTabData.bind(this, "inprogress"), className: "nav-item nav-link", id: "overdue-tab", "data-toggle": "tab", href: "#runningtask", role: "tab", "aria-controls": "runningtask", "aria-selected": "false", children: [
              "Running ",
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { style: { color: "rgb(255, 152, 0)" }, children: [
                "(",
                inprogressTaskCount,
                ")"
              ] }, void 0, true, {
                fileName: "app/Components/summary/summary.jsx",
                lineNumber: 658,
                columnNumber: 228
              }, this)
            ] }, void 0, true, {
              fileName: "app/Components/summary/summary.jsx",
              lineNumber: 658,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { onClick: this.showTabData.bind(this, "overdue"), className: "nav-item nav-link", id: "overduetask-tab", "data-toggle": "tab", href: "#overduetask", role: "tab", "aria-controls": "overduetask", "aria-selected": "false", children: [
              "Overdue ",
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { style: { color: "rgb(255, 152, 0)" }, children: [
                "(",
                ovedueTaskCount,
                ")"
              ] }, void 0, true, {
                fileName: "app/Components/summary/summary.jsx",
                lineNumber: 659,
                columnNumber: 229
              }, this)
            ] }, void 0, true, {
              fileName: "app/Components/summary/summary.jsx",
              lineNumber: 659,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { onClick: this.showTabData.bind(this, "onhold"), className: "nav-item nav-link", id: "onhold-tab", "data-toggle": "tab", href: "#onhold", role: "tab", "aria-controls": "onhold", "aria-selected": "false", children: [
              "OnHold ",
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { style: { color: "rgb(255, 152, 0)" }, children: [
                "(",
                onHOldTaskCount,
                ")"
              ] }, void 0, true, {
                fileName: "app/Components/summary/summary.jsx",
                lineNumber: 660,
                columnNumber: 212
              }, this)
            ] }, void 0, true, {
              fileName: "app/Components/summary/summary.jsx",
              lineNumber: 660,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { onClick: this.showTabData.bind(this, "futureTask"), className: "nav-item nav-link", id: "futuretask-tab", "data-toggle": "tab", href: "#futureTask", role: "tab", "aria-controls": "futureTask", "aria-selected": "false", children: [
              "Future Task ",
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { style: { color: "rgb(255, 152, 0)" }, children: [
                "(",
                futureTaskCount,
                ")"
              ] }, void 0, true, {
                fileName: "app/Components/summary/summary.jsx",
                lineNumber: 661,
                columnNumber: 233
              }, this)
            ] }, void 0, true, {
              fileName: "app/Components/summary/summary.jsx",
              lineNumber: 661,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/Components/summary/summary.jsx",
            lineNumber: 655,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "app/Components/summary/summary.jsx",
            lineNumber: 654,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "tab-content", id: "myTabContent", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "tab-pane fade show active", id: "todays", role: "tabpanel", "aria-labelledby": "todays-tab", children: this.state.isdataLoaded && this.state.data.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "datalogo", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: "/images/loading.svg", alt: "loading" }, void 0, false, {
              fileName: "app/Components/summary/summary.jsx",
              lineNumber: 669,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/Components/summary/summary.jsx",
              lineNumber: 668,
              columnNumber: 17
            }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              " ",
              dataTable
            ] }, void 0, true, {
              fileName: "app/Components/summary/summary.jsx",
              lineNumber: 670,
              columnNumber: 30
            }, this) }, void 0, false, {
              fileName: "app/Components/summary/summary.jsx",
              lineNumber: 666,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "tab-pane fade", id: "newtask", role: "tabpanel", "aria-labelledby": "newtask-tab", children: this.state.isdataLoaded && this.state.data.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "datalogo", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: "/images/loading.svg", alt: "loading" }, void 0, false, {
              fileName: "app/Components/summary/summary.jsx",
              lineNumber: 675,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/Components/summary/summary.jsx",
              lineNumber: 674,
              columnNumber: 17
            }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              " ",
              dataTable
            ] }, void 0, true, {
              fileName: "app/Components/summary/summary.jsx",
              lineNumber: 676,
              columnNumber: 30
            }, this) }, void 0, false, {
              fileName: "app/Components/summary/summary.jsx",
              lineNumber: 672,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "tab-pane fade", id: "runningtask", role: "tabpanel", "aria-labelledby": "runningtask-tab", children: this.state.isdataLoaded && this.state.data.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "datalogo", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: "/images/loading.svg", alt: "loading" }, void 0, false, {
              fileName: "app/Components/summary/summary.jsx",
              lineNumber: 681,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/Components/summary/summary.jsx",
              lineNumber: 680,
              columnNumber: 17
            }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              " ",
              dataTable
            ] }, void 0, true, {
              fileName: "app/Components/summary/summary.jsx",
              lineNumber: 682,
              columnNumber: 30
            }, this) }, void 0, false, {
              fileName: "app/Components/summary/summary.jsx",
              lineNumber: 678,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "tab-pane fade", id: "overduetask", role: "tabpanel", "aria-labelledby": "overduetask-tab", children: this.state.isdataLoaded && this.state.data.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "datalogo", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: "/images/loading.svg", alt: "loading" }, void 0, false, {
              fileName: "app/Components/summary/summary.jsx",
              lineNumber: 687,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/Components/summary/summary.jsx",
              lineNumber: 686,
              columnNumber: 17
            }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              " ",
              dataTable
            ] }, void 0, true, {
              fileName: "app/Components/summary/summary.jsx",
              lineNumber: 688,
              columnNumber: 30
            }, this) }, void 0, false, {
              fileName: "app/Components/summary/summary.jsx",
              lineNumber: 684,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "tab-pane fade", id: "onhold", role: "tabpanel", "aria-labelledby": "onhold-tab", children: this.state.isdataLoaded && this.state.data.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "datalogo", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: "/images/loading.svg", alt: "loading" }, void 0, false, {
              fileName: "app/Components/summary/summary.jsx",
              lineNumber: 693,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/Components/summary/summary.jsx",
              lineNumber: 692,
              columnNumber: 17
            }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              " ",
              dataTable
            ] }, void 0, true, {
              fileName: "app/Components/summary/summary.jsx",
              lineNumber: 694,
              columnNumber: 30
            }, this) }, void 0, false, {
              fileName: "app/Components/summary/summary.jsx",
              lineNumber: 690,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "tab-pane fade", id: "cancelled", role: "tabpanel", "aria-labelledby": "cancelled-tab", children: this.state.isdataLoaded && this.state.data.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "datalogo", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: "/images/loading.svg", alt: "loading" }, void 0, false, {
              fileName: "app/Components/summary/summary.jsx",
              lineNumber: 699,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "app/Components/summary/summary.jsx",
              lineNumber: 698,
              columnNumber: 17
            }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
              " ",
              dataTable
            ] }, void 0, true, {
              fileName: "app/Components/summary/summary.jsx",
              lineNumber: 700,
              columnNumber: 30
            }, this) }, void 0, false, {
              fileName: "app/Components/summary/summary.jsx",
              lineNumber: 696,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/Components/summary/summary.jsx",
            lineNumber: 665,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/Components/summary/summary.jsx",
          lineNumber: 652,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-12 col-lg-3 second", style: { background: "white" }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h6", { className: "task-title  mb-2 mt-2 bb-dotted", children: "Task Statistics" }, void 0, false, {
            fileName: "app/Components/summary/summary.jsx",
            lineNumber: 706,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: " reportscrollbar", ref: "pieChartData", style: { height: "225px" }, children: dataChartBar }, void 0, false, {
            fileName: "app/Components/summary/summary.jsx",
            lineNumber: 707,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-xs-12 col-sm-6 col-md-6 col-lg-12", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "summary-list list-group list-group-flush task-status-right mb-2 mt-1", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { className: "list-group-item d-flex justify-content-between", style: { borderLeft: "5px solid #5feae4" }, children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "New " }, void 0, false, {
                  fileName: "app/Components/summary/summary.jsx",
                  lineNumber: 715,
                  columnNumber: 134
                }, this) }, void 0, false, {
                  fileName: "app/Components/summary/summary.jsx",
                  lineNumber: 715,
                  columnNumber: 128
                }, this),
                " ",
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: newTask }, void 0, false, {
                  fileName: "app/Components/summary/summary.jsx",
                  lineNumber: 715,
                  columnNumber: 169
                }, this) }, void 0, false, {
                  fileName: "app/Components/summary/summary.jsx",
                  lineNumber: 715,
                  columnNumber: 163
                }, this),
                " "
              ] }, void 0, true, {
                fileName: "app/Components/summary/summary.jsx",
                lineNumber: 715,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { className: "list-group-item d-flex justify-content-between", style: { borderLeft: "5px solid #ffff00" }, children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Running " }, void 0, false, {
                  fileName: "app/Components/summary/summary.jsx",
                  lineNumber: 716,
                  columnNumber: 134
                }, this) }, void 0, false, {
                  fileName: "app/Components/summary/summary.jsx",
                  lineNumber: 716,
                  columnNumber: 128
                }, this),
                " ",
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: inprogressTaskCount }, void 0, false, {
                  fileName: "app/Components/summary/summary.jsx",
                  lineNumber: 716,
                  columnNumber: 167
                }, this),
                " "
              ] }, void 0, true, {
                fileName: "app/Components/summary/summary.jsx",
                lineNumber: 716,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { className: "list-group-item d-flex justify-content-between", style: { borderLeft: "5px solid #ea2b2b" }, children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Overdue" }, void 0, false, {
                  fileName: "app/Components/summary/summary.jsx",
                  lineNumber: 717,
                  columnNumber: 134
                }, this) }, void 0, false, {
                  fileName: "app/Components/summary/summary.jsx",
                  lineNumber: 717,
                  columnNumber: 128
                }, this),
                " ",
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: ovedueTaskCount }, void 0, false, {
                  fileName: "app/Components/summary/summary.jsx",
                  lineNumber: 717,
                  columnNumber: 166
                }, this),
                " "
              ] }, void 0, true, {
                fileName: "app/Components/summary/summary.jsx",
                lineNumber: 717,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { className: "list-group-item d-flex justify-content-between", style: { borderLeft: "5px solid #adafa7fc" }, children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "OnHold" }, void 0, false, {
                  fileName: "app/Components/summary/summary.jsx",
                  lineNumber: 718,
                  columnNumber: 136
                }, this) }, void 0, false, {
                  fileName: "app/Components/summary/summary.jsx",
                  lineNumber: 718,
                  columnNumber: 130
                }, this),
                " ",
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: onHOldTaskCount }, void 0, false, {
                  fileName: "app/Components/summary/summary.jsx",
                  lineNumber: 718,
                  columnNumber: 167
                }, this),
                " "
              ] }, void 0, true, {
                fileName: "app/Components/summary/summary.jsx",
                lineNumber: 718,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { className: "list-group-item d-flex justify-content-between", style: { borderLeft: "5px solid #4bef41" }, children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Completed " }, void 0, false, {
                  fileName: "app/Components/summary/summary.jsx",
                  lineNumber: 720,
                  columnNumber: 134
                }, this) }, void 0, false, {
                  fileName: "app/Components/summary/summary.jsx",
                  lineNumber: 720,
                  columnNumber: 128
                }, this),
                " ",
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: completeTaskCount }, void 0, false, {
                  fileName: "app/Components/summary/summary.jsx",
                  lineNumber: 720,
                  columnNumber: 169
                }, this),
                " "
              ] }, void 0, true, {
                fileName: "app/Components/summary/summary.jsx",
                lineNumber: 720,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { className: "list-group-item d-flex justify-content-between", style: { borderLeft: "5px solid #136ec8" }, children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Future Task " }, void 0, false, {
                  fileName: "app/Components/summary/summary.jsx",
                  lineNumber: 721,
                  columnNumber: 134
                }, this) }, void 0, false, {
                  fileName: "app/Components/summary/summary.jsx",
                  lineNumber: 721,
                  columnNumber: 128
                }, this),
                " ",
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: futureTaskCount }, void 0, false, {
                  fileName: "app/Components/summary/summary.jsx",
                  lineNumber: 721,
                  columnNumber: 171
                }, this),
                " "
              ] }, void 0, true, {
                fileName: "app/Components/summary/summary.jsx",
                lineNumber: 721,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "app/Components/summary/summary.jsx",
              lineNumber: 712,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "app/Components/summary/summary.jsx",
              lineNumber: 711,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-xs-12 col-sm-6 col-md-6 col-lg-12", style: { height: "250px" }, children: dataChart1 }, void 0, false, {
              fileName: "app/Components/summary/summary.jsx",
              lineNumber: 724,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "app/Components/summary/summary.jsx",
            lineNumber: 710,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/Components/summary/summary.jsx",
          lineNumber: 705,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/Components/summary/summary.jsx",
        lineNumber: 651,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/Components/summary/summary.jsx",
      lineNumber: 554,
      columnNumber: 16
    }, this) }, void 0, false, {
      fileName: "app/Components/summary/summary.jsx",
      lineNumber: 551,
      columnNumber: 12
    }, this);
  }
};

// app/routes/dashboard/route.jsx
var import_node = __toESM(require_node(), 1);
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/dashboard/route.jsx"
  );
  import.meta.hot.lastModified = "1709882880141.1003";
}
function summaryRoute() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Summary, {}, void 0, false, {
    fileName: "app/routes/dashboard/route.jsx",
    lineNumber: 52,
    columnNumber: 13
  }, this) }, void 0, false, {
    fileName: "app/routes/dashboard/route.jsx",
    lineNumber: 51,
    columnNumber: 9
  }, this);
}

export {
  summaryRoute
};
//# sourceMappingURL=/build/_shared/chunk-CANGC224.js.map
