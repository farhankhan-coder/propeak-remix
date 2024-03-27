import {
  DataTable
} from "/build/_shared/chunk-NUU62HHF.js";
import "/build/_shared/chunk-YU2GXVM7.js";
import {
  require_react_csv
} from "/build/_shared/chunk-YRVGMHYS.js";
import "/build/_shared/chunk-HYFOUMWR.js";
import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
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
import "/build/_shared/chunk-ZNTOAH5I.js";
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

// app/Components/reports/active-users-report.jsx
var import_react = __toESM(require_react(), 1);
var import_react_csv = __toESM(require_react_csv(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/Components/reports/active-users-report.jsx"
  );
}
var ActiveUserReport = class extends import_react.default.Component {
  state = {
    headers: [
      { title: "Name", accessor: "name", index: 1 },
      { title: "Email ", accessor: "email", index: 2 },
      { title: "Company Name", accessor: "companyName", index: 3 }
    ],
    data: []
  };
  componentDidMount() {
    const { activeUsersReport } = this.props;
    console.log(activeUsersReport, "activeUsers.....");
    if (activeUsersReport) {
      this.setState({ data: activeUsersReport });
    }
  }
  render() {
    const { headers, data } = this.state;
    const dataTable = /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
      DataTable,
      {
        className: "data-table",
        title: "Active User Report",
        keyField: "id",
        pagination: {
          enabled: true,
          pageLength: 50,
          type: "long"
        },
        width: "100%",
        headers,
        data,
        noData: "No records!"
      },
      void 0,
      false,
      {
        fileName: "app/Components/reports/active-users-report.jsx",
        lineNumber: 40,
        columnNumber: 5
      },
      this
    );
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react.default.Fragment, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "container bg-white", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-12", children: dataTable }, void 0, false, {
      fileName: "app/Components/reports/active-users-report.jsx",
      lineNumber: 60,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "app/Components/reports/active-users-report.jsx",
      lineNumber: 59,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/Components/reports/active-users-report.jsx",
      lineNumber: 58,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/Components/reports/active-users-report.jsx",
      lineNumber: 57,
      columnNumber: 7
    }, this);
  }
};

// app/routes/active-users-report/route.jsx
var import_node = __toESM(require_node(), 1);
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/active-users-report/route.jsx"
  );
  import.meta.hot.lastModified = "1709722214676.908";
}
function activeUserComponent() {
  const { activeUsersReport } = useLoaderData();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Header, {}, void 0, false, {
      fileName: "app/routes/active-users-report/route.jsx",
      lineNumber: 44,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Menu, {}, void 0, false, {
      fileName: "app/routes/active-users-report/route.jsx",
      lineNumber: 45,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(ActiveUserReport, { activeUsersReport }, void 0, false, {
      fileName: "app/routes/active-users-report/route.jsx",
      lineNumber: 47,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Footer, {}, void 0, false, {
      fileName: "app/routes/active-users-report/route.jsx",
      lineNumber: 48,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/active-users-report/route.jsx",
    lineNumber: 43,
    columnNumber: 5
  }, this);
}
export {
  activeUserComponent as default
};
//# sourceMappingURL=/build/routes/active-users-report-KNBSIPRF.js.map
