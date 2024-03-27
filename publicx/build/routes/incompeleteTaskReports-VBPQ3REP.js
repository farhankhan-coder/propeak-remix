import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "/build/_shared/chunk-VFRTC5XU.js";
import {
  require_react_csv
} from "/build/_shared/chunk-YRVGMHYS.js";
import "/build/_shared/chunk-HYFOUMWR.js";
import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
import {
  useLoaderData
} from "/build/_shared/chunk-IX3CRINA.js";
import "/build/_shared/chunk-7K4UV4CH.js";
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

// app/Components/reports/incompelete_task_count-report.jsx
var import_react = __toESM(require_react(), 1);
var import_react_csv = __toESM(require_react_csv(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/Components/reports/incompelete_task_count-report.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/Components/reports/incompelete_task_count-report.jsx"
  );
}
var TiltedAxisTick = (props) => {
  const {
    x,
    y,
    stroke,
    payload
  } = props;
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("g", { transform: `translate(${x},${y})`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { x: 0, y: 0, dy: 10, textAnchor: "middle", width: 20, scaleToFit: true, fontSize: 12, fill: "#666", transform: "rotate(-15)", children: payload.value }, void 0, false, {
    fileName: "app/Components/reports/incompelete_task_count-report.jsx",
    lineNumber: 36,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/Components/reports/incompelete_task_count-report.jsx",
    lineNumber: 35,
    columnNumber: 10
  }, this);
};
_c = TiltedAxisTick;
var IncompeleteTaskCountReport = class extends import_react.default.Component {
  constructor(props) {
    super(props);
    if (this.getReportData) {
      this.getReportData = this.getReportData.bind(this);
    }
  }
  state = {
    users: [],
    data: [],
    isLoaded: false,
    userNameToId: {},
    projectName: ""
  };
  async componentDidMount() {
    if (this.state.users.length === 0) {
      this.props.context.actions.setUsers();
    }
    this.getReportData();
    this.setState({
      isLoaded: false
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      projectName: nextProps.context.state.projectName,
      users: nextProps.context.state.users,
      userNameToId: nextProps.context.state.userNameToId
    });
  }
  render() {
    const {
      incompleteTaskCountReport
    } = this.props;
    console.log(incompleteTaskCountReport, " is data is coming or not ");
    const CustomLabelList = (props) => {
      const {
        x,
        y,
        stroke,
        value,
        payload
      } = props;
      return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("g", { transform: `translate(${x},${y})`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("text", { x: 0, y: 0, width: 20, scaleToFit: true, fontSize: 12, fill: "#666", transform: "rotate(-45)", children: payload.value }, void 0, false, {
        fileName: "app/Components/reports/incompelete_task_count-report.jsx",
        lineNumber: 87,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/Components/reports/incompelete_task_count-report.jsx",
        lineNumber: 86,
        columnNumber: 14
      }, this);
    };
    const dataChart = /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BarChart, { data: this.state.data ? this.state.data : [], margin: {
      top: 5,
      right: 30,
      left: 10,
      bottom: 5
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(XAxis, { dataKey: "userName", tick: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TiltedAxisTick, {}, void 0, false, {
        fileName: "app/Components/reports/incompelete_task_count-report.jsx",
        lineNumber: 101,
        columnNumber: 43
      }, this), minTickGap: 10, interval: 0 }, void 0, false, {
        fileName: "app/Components/reports/incompelete_task_count-report.jsx",
        lineNumber: 101,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(YAxis, {}, void 0, false, {
        fileName: "app/Components/reports/incompelete_task_count-report.jsx",
        lineNumber: 103,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Tooltip, {}, void 0, false, {
        fileName: "app/Components/reports/incompelete_task_count-report.jsx",
        lineNumber: 104,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Legend, { verticalAlign: "top", position: "middle" }, void 0, false, {
        fileName: "app/Components/reports/incompelete_task_count-report.jsx",
        lineNumber: 105,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bar, { name: " New Task Count", dataKey: "newtaskCount", stackId: "a", fill: "#00C49F" }, void 0, false, {
        fileName: "app/Components/reports/incompelete_task_count-report.jsx",
        lineNumber: 106,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bar, { name: " Inprogress Task Count", dataKey: "inprogresstaskCount", stackId: "a", fill: "#FFBB28" }, void 0, false, {
        fileName: "app/Components/reports/incompelete_task_count-report.jsx",
        lineNumber: 108,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/Components/reports/incompelete_task_count-report.jsx",
      lineNumber: 94,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/Components/reports/incompelete_task_count-report.jsx",
      lineNumber: 93,
      columnNumber: 23
    }, this);
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react.default.Fragment, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "project-title", children: "Member Incomplete Task Count Report" }, void 0, false, {
        fileName: "app/Components/reports/incompelete_task_count-report.jsx",
        lineNumber: 114,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("hr", {}, void 0, false, {
        fileName: "app/Components/reports/incompelete_task_count-report.jsx",
        lineNumber: 115,
        columnNumber: 11
      }, this),
      this.state.isLoaded ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "logo", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: "/images/loading.svg", alt: "loading" }, void 0, false, {
        fileName: "app/Components/reports/incompelete_task_count-report.jsx",
        lineNumber: 118,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/Components/reports/incompelete_task_count-report.jsx",
        lineNumber: 117,
        columnNumber: 34
      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row ", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-lg-9 col-sm-12 col-md-12 ", style: {
        height: "350px"
      }, children: dataChart }, void 0, false, {
        fileName: "app/Components/reports/incompelete_task_count-report.jsx",
        lineNumber: 121,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/Components/reports/incompelete_task_count-report.jsx",
        lineNumber: 120,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/Components/reports/incompelete_task_count-report.jsx",
        lineNumber: 119,
        columnNumber: 22
      }, this)
    ] }, void 0, true, {
      fileName: "app/Components/reports/incompelete_task_count-report.jsx",
      lineNumber: 113,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/Components/reports/incompelete_task_count-report.jsx",
      lineNumber: 112,
      columnNumber: 12
    }, this);
  }
};
var _c;
$RefreshReg$(_c, "TiltedAxisTick");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/routes/incompeleteTaskReports/route.jsx
var import_node = __toESM(require_node(), 1);
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/incompeleteTaskReports/route.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/incompeleteTaskReports/route.jsx"
  );
  import.meta.hot.lastModified = "1709621791711.1821";
}
function IncompeleteTaskCountReportComponent() {
  _s();
  const {
    incompleteTaskCountReport
  } = useLoaderData();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(IncompeleteTaskCountReport, { incompleteTaskCountReport }, void 0, false, {
    fileName: "app/routes/incompeleteTaskReports/route.jsx",
    lineNumber: 61,
    columnNumber: 13
  }, this) }, void 0, false, {
    fileName: "app/routes/incompeleteTaskReports/route.jsx",
    lineNumber: 60,
    columnNumber: 10
  }, this);
}
_s(IncompeleteTaskCountReportComponent, "DLv7cMT+sF+c03ym8FEm9rJIPhM=", false, function() {
  return [useLoaderData];
});
_c2 = IncompeleteTaskCountReportComponent;
var _c2;
$RefreshReg$(_c2, "IncompeleteTaskCountReportComponent");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  IncompeleteTaskCountReportComponent as default
};
//# sourceMappingURL=/build/routes/incompeleteTaskReports-VBPQ3REP.js.map
