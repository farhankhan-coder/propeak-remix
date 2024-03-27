import {
  DateToLongString
} from "/build/_shared/chunk-HUF2CQ7I.js";
import {
  DataTable
} from "/build/_shared/chunk-NUU62HHF.js";
import "/build/_shared/chunk-YU2GXVM7.js";
import "/build/_shared/chunk-YRVGMHYS.js";
import "/build/_shared/chunk-6NG26ZCH.js";
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

// app/Components/audit-log/audit-log.jsx
var import_react = __toESM(require_react(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/Components/audit-log/audit-log.jsx"
  );
  import.meta.hot.lastModified = "1709384153057.1104";
}
var AuditLog = class extends import_react.Component {
  state = {
    data: [],
    isLoaded: true,
    headers: [
      { title: "Entity Type", accessor: "tableName", index: 0 },
      { title: "Entity Name", accessor: "name", index: 1 },
      { title: "Field Name", accessor: "fieldName", index: 2 },
      { title: "Old Value", accessor: "oldValue", index: 3 },
      { title: "New Value", accessor: "newValue", index: 4 },
      { title: "Updated By", accessor: "updatedBy", index: 5 },
      { title: "Updated On", accessor: "updatedOn", index: 6 }
    ],
    projectId: this.props.projectId,
    projectName: "",
    message: "",
    excelHeaders: [
      { label: "Entity Type", key: "tableName" },
      { label: "Entity Name", key: "name" },
      { label: "Field Name", key: "fieldName" },
      { label: "Old Value", key: "oldValue" },
      { label: "New Value", key: "newValue" },
      { label: "Updated By", key: "updatedBy" },
      { label: "Updated On", key: "updatedOn" }
    ]
  };
  formatData(data) {
    if (data.result && data.result.length > 0) {
      let dataCopy = [...data.result];
      var oldValueDate = "";
      var newValueDate = "";
      let format = dataCopy.map((d) => {
        let updatedDate = DateToLongString(d.updatedOn);
        if (d.fieldName === "startDate" || d.fieldName === "endDate" || d.fieldName === "dateOfCompletion") {
          if (d.oldValue === "" || d.oldValue === null) {
            oldValueDate = d.oldValue;
            newValueDate = DateToLongString(d.newValue);
          } else {
            oldValueDate = DateToLongString(d.oldValue);
            newValueDate = DateToLongString(d.newValue);
          }
        } else {
          oldValueDate = d.oldValue;
          newValueDate = d.newValue;
        }
        let objectData = {
          tableName: d.tableName,
          name: d.name,
          fieldName: d.fieldName,
          oldValue: oldValueDate,
          newValue: newValueDate,
          updatedBy: d.updatedBy,
          updatedOn: updatedDate
        };
        return objectData;
      });
      this.setState({
        data: format,
        projectName: data.msg
      });
    }
  }
  async componentDidMount() {
    if (this.props.auditLog) {
      this.formatData(this.props.auditLog);
      this.setState({
        isLoaded: false
      });
    } else {
      let { response, err } = await (void 0)(
        this.state.projectId
      );
      if (err) {
        this.setState({
          message: err,
          isLoaded: false
        });
      } else if (response && response.data.err) {
        this.setState({
          message: response.data.err,
          isLoaded: false
        });
      } else {
        this.formatData(response.data);
        this.setState({
          isLoaded: false
        });
      }
    }
  }
  // async componentDidMount() {
  //   let { response, err } = await projectservice.getProjectAuditLog(
  //     this.state.projectId
  //   );
  //   if (err) {
  //     this.setState({
  //       message: err,
  //     });
  //   } else if (response && response.data.err) {
  //     this.setState({ message: response.data.err });
  //   } else {
  //     this.formatData(response.data);
  //   }
  //   this.setState({
  //     isLoaded: false,
  //   });
  // }
  render() {
    const dataTable = /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
      DataTable,
      {
        className: "data-table",
        title: "Audit Report",
        keyField: "_id",
        pagination: {
          enabled: true,
          pageLength: 50,
          type: "long"
        },
        width: "100%",
        headers: this.state.headers,
        data: this.state.data ? this.state.data : [],
        projectName: this.state.projectName,
        excelHeaders: this.state.excelHeaders,
        filename: "auditReport_" + this.state.projectName + "_.csv",
        noData: "No records!"
      },
      void 0,
      false,
      {
        fileName: "app/Components/audit-log/audit-log.jsx",
        lineNumber: 138,
        columnNumber: 7
      },
      this
    );
    const { auditLog } = this.props;
    console.log(auditLog, " data is coming ");
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react.default.Fragment, { children: this.state.isLoaded ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "logo", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: "/images/loading.svg", alt: "loading" }, void 0, false, {
      fileName: "app/Components/audit-log/audit-log.jsx",
      lineNumber: 163,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "app/Components/audit-log/audit-log.jsx",
      lineNumber: 162,
      columnNumber: 11
    }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react.default.Fragment, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-12 bg-white", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "project-title d.inline-block mt-3 mb-3", children: [
        this.state.projectName,
        " - Audit Report",
        " "
      ] }, void 0, true, {
        fileName: "app/Components/audit-log/audit-log.jsx",
        lineNumber: 168,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("hr", {}, void 0, false, {
        fileName: "app/Components/audit-log/audit-log.jsx",
        lineNumber: 172,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row mt-3 mb-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-12" }, void 0, false, {
        fileName: "app/Components/audit-log/audit-log.jsx",
        lineNumber: 174,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/Components/audit-log/audit-log.jsx",
        lineNumber: 173,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-12", children: dataTable }, void 0, false, {
        fileName: "app/Components/audit-log/audit-log.jsx",
        lineNumber: 180,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/Components/audit-log/audit-log.jsx",
        lineNumber: 179,
        columnNumber: 15
      }, this)
    ] }, void 0, true, {
      fileName: "app/Components/audit-log/audit-log.jsx",
      lineNumber: 167,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "app/Components/audit-log/audit-log.jsx",
      lineNumber: 166,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/Components/audit-log/audit-log.jsx",
      lineNumber: 160,
      columnNumber: 7
    }, this);
  }
};

// app/routes/audit-log/route.jsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/audit-log/route.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/audit-log/route.jsx"
  );
  import.meta.hot.lastModified = "1709722272421.2231";
}
function AuditLogComponent() {
  _s();
  const {
    auditLog
  } = useLoaderData();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: [
    'import Header from "../header"; import Footer from "../footer"; import Menu from "../menu";',
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Header, {}, void 0, false, {
      fileName: "app/routes/audit-log/route.jsx",
      lineNumber: 69,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Menu, {}, void 0, false, {
      fileName: "app/routes/audit-log/route.jsx",
      lineNumber: 70,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Footer, {}, void 0, false, {
      fileName: "app/routes/audit-log/route.jsx",
      lineNumber: 72,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(AuditLog, { auditLog }, void 0, false, {
      fileName: "app/routes/audit-log/route.jsx",
      lineNumber: 73,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/audit-log/route.jsx",
    lineNumber: 65,
    columnNumber: 10
  }, this);
}
_s(AuditLogComponent, "xk3OJdMkADETOpcQIUP9+QFFWVQ=", false, function() {
  return [useLoaderData];
});
_c = AuditLogComponent;
var _c;
$RefreshReg$(_c, "AuditLogComponent");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  AuditLogComponent as default
};
//# sourceMappingURL=/build/routes/audit-log-KZEC5D5V.js.map
