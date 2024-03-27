import {
  getUserAppLevelAccessRights
} from "/build/_shared/chunk-TIVFM4AG.js";
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
import {
  Form
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

// app/Components/Entitlement/components/applevelaccessrights.jsx
var import_react = __toESM(require_react(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/Components/Entitlement/components/applevelaccessrights.jsx"
  );
  import.meta.hot.lastModified = "1709384153053.1104";
}
var AppLevelAccessRight = class extends import_react.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      entitlements: this.props.accessRightData || [],
      userName: "",
      label: "",
      message: "",
      userNameToId: {}
      // Initialize userNameToId
    };
  }
  componentDidMount() {
    this.props.actions.setUsers();
  }
  componentDidUpdate(prevProps) {
    if (this.props.users !== prevProps.users) {
      this.setState({ users: this.props.users });
    }
  }
  handleInputChange = (e) => {
    let userName = e.target.value;
    if (userName === "") {
      let entitlementsCopy = [...this.state.entitlements];
      let entitlements = entitlementsCopy.map((e2) => {
        e2.Value = false;
        return e2;
      });
      this.setState({
        entitlements,
        userName,
        label: ""
      });
    } else {
      let userId = this.props.context && // Add null check for context
      this.props.context.state && // Add null check for context state
      this.props.context.state.userNameToId && this.props.context.state.userNameToId[userName.toLowerCase().replace(/ +/g, "")];
      this.getUserAppLevelAccessRights(userId);
      this.setState({
        userName,
        label: ""
      });
    }
  };
  handleCheck = (id, e) => {
    const target = e.target;
    const value = target.checked;
    let rights = [...this.state.entitlements];
    let userEntitlements = rights.map((r) => {
      if (r.id === id) {
        r.Value = value;
      }
      return r;
    });
    this.setState({
      entitlements: userEntitlements
    });
  };
  async getUserAppLevelAccessRights(userId) {
    let { response, err } = await getUserAppLevelAccessRights(userId);
    if (err) {
      this.setState({
        message: "Error: " + err
      });
    } else if (response && response.data.err) {
      this.setState({
        message: "Error: " + response.data.err
      });
    } else {
      if (response.data.length > 0) {
        let getEntitlements = [];
        for (let i = 0; i < response.data.length; i++) {
          getEntitlements = this.state.entitlements.map((e) => {
            if (response.data[i].entitlementId === e.EntitlementId && response.data[i].group === e.Group) {
              e.Value = true;
            }
            return e;
          });
        }
        this.setState({
          entitlements: getEntitlements
        });
      } else {
        let entitlementsCopy = [...this.state.entitlements];
        let entitlements = entitlementsCopy.map((e) => {
          e.Value = false;
          return e;
        });
        this.setState({
          entitlements
        });
      }
    }
  }
  reset = () => {
    let entitlementsCopy = [...this.state.entitlements];
    let entitlements = entitlementsCopy.map((e) => {
      e.Value = false;
      return e;
    });
    this.setState({
      entitlements,
      userName: ""
    });
  };
  render() {
    let { entitlements, users } = this.state;
    let entitlementObject = {};
    let tableHeaderObject = {};
    if (entitlements.length > 0) {
      for (let i = 0; i < entitlements.length; i++) {
        if (entitlementObject[entitlements[i].Group]) {
          entitlementObject[entitlements[i].Group].push(entitlements[i]);
        } else {
          entitlementObject[entitlements[i].Group] = [entitlements[i]];
        }
        if (tableHeaderObject[entitlements[i].EntitlementId]) {
          tableHeaderObject[entitlements[i].EntitlementId].push(
            entitlements[i]
          );
        } else {
          tableHeaderObject[entitlements[i].EntitlementId] = [entitlements[i]];
        }
      }
    }
    var keys = Object.keys(entitlementObject);
    var tableHeaders = Object.keys(tableHeaderObject);
    var a = {};
    let tableHeader = [];
    for (let i = 0; i < tableHeaders.length; i++) {
      if (Object.keys(a).indexOf(tableHeaders[i]) === -1) {
        a[tableHeaders[i]] = [];
        tableHeader.push(/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { children: tableHeaders[i] }, tableHeaders[i], false, {
          fileName: "app/Components/Entitlement/components/applevelaccessrights.jsx",
          lineNumber: 173,
          columnNumber: 26
        }, this));
      }
    }
    let checkBoxes = keys.map((k, index) => {
      var arrOfIndx = [];
      for (var n = 0; n < entitlementObject[k].length; n++) {
        arrOfIndx.push(
          Object.keys(a).indexOf(entitlementObject[k][n].EntitlementId)
        );
      }
      for (var l = 0; l < Object.keys(a).length; l++) {
        if (arrOfIndx.indexOf(l) === -1) {
          let obj = {
            id: +/* @__PURE__ */ new Date() + l,
            Group: k,
            EntitlementId: "",
            Value: false
          };
          entitlementObject[k].splice(l, 0, obj);
        }
      }
      let values = entitlementObject[k].map((b, indx) => {
        if (Object.keys(a)[indx] === b.EntitlementId) {
          return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            "input",
            {
              type: "checkbox",
              className: "access-check",
              placeholder: " ",
              onChange: this.handleCheck.bind(this, b.id),
              checked: b.Value
            },
            void 0,
            false,
            {
              fileName: "app/Components/Entitlement/components/applevelaccessrights.jsx",
              lineNumber: 202,
              columnNumber: 15
            },
            this
          ) }, b.id, false, {
            fileName: "app/Components/Entitlement/components/applevelaccessrights.jsx",
            lineNumber: 201,
            columnNumber: 13
          }, this);
        } else {
          return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {}, b.id, false, {
            fileName: "app/Components/Entitlement/components/applevelaccessrights.jsx",
            lineNumber: 212,
            columnNumber: 18
          }, this);
        }
      });
      return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { children: k }, void 0, false, {
          fileName: "app/Components/Entitlement/components/applevelaccessrights.jsx",
          lineNumber: 218,
          columnNumber: 11
        }, this),
        values
      ] }, k, true, {
        fileName: "app/Components/Entitlement/components/applevelaccessrights.jsx",
        lineNumber: 217,
        columnNumber: 9
      }, this);
    });
    let Users = null;
    if (users !== null && users.length > 0) {
      Users = users.map((u) => {
        return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { "data-value": u.userId, children: u.name }, void 0, false, {
          fileName: "app/Components/Entitlement/components/applevelaccessrights.jsx",
          lineNumber: 229,
          columnNumber: 13
        }, this) }, u._id, false, {
          fileName: "app/Components/Entitlement/components/applevelaccessrights.jsx",
          lineNumber: 228,
          columnNumber: 11
        }, this);
      });
    }
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "container bg-white", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "POST", action: "/applevelaccessrights", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { style: { color: "green" }, children: this.state.label }, void 0, false, {
        fileName: "app/Components/Entitlement/components/applevelaccessrights.jsx",
        lineNumber: 238,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row", style: { marginTop: "10px" }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-5", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "Assigned Users", style: { fontSize: "small" }, children: [
          "Users :",
          " "
        ] }, void 0, true, {
          fileName: "app/Components/Entitlement/components/applevelaccessrights.jsx",
          lineNumber: 241,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { style: { position: "relative", display: "flex" }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            "input",
            {
              type: "text",
              value: this.state.userName,
              list: "assignedUsers",
              onChange: this.handleInputChange,
              name: "userName",
              className: "form-control rounded-0",
              autoComplete: "off",
              placeholder: "Select User"
            },
            void 0,
            false,
            {
              fileName: "app/Components/Entitlement/components/applevelaccessrights.jsx",
              lineNumber: 245,
              columnNumber: 17
            },
            this
          ),
          this.state.userName && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            "span",
            {
              onClick: this.reset,
              className: "fa fa-times-circle rounded-0 close-circle",
              style: {
                position: "absolute",
                top: "11px",
                right: "50px",
                cursor: "pointer"
              }
            },
            void 0,
            false,
            {
              fileName: "app/Components/Entitlement/components/applevelaccessrights.jsx",
              lineNumber: 256,
              columnNumber: 19
            },
            this
          )
        ] }, void 0, true, {
          fileName: "app/Components/Entitlement/components/applevelaccessrights.jsx",
          lineNumber: 244,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("datalist", { id: "assignedUsers", children: Users }, void 0, false, {
          fileName: "app/Components/Entitlement/components/applevelaccessrights.jsx",
          lineNumber: 269,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/Components/Entitlement/components/applevelaccessrights.jsx",
        lineNumber: 240,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/Components/Entitlement/components/applevelaccessrights.jsx",
        lineNumber: 239,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
        fileName: "app/Components/Entitlement/components/applevelaccessrights.jsx",
        lineNumber: 272,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "table", id: "app-access", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", { className: "scroll", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { children: "Group" }, void 0, false, {
            fileName: "app/Components/Entitlement/components/applevelaccessrights.jsx",
            lineNumber: 277,
            columnNumber: 19
          }, this),
          tableHeader
        ] }, void 0, true, {
          fileName: "app/Components/Entitlement/components/applevelaccessrights.jsx",
          lineNumber: 276,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/Components/Entitlement/components/applevelaccessrights.jsx",
          lineNumber: 275,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", { children: checkBoxes }, void 0, false, {
          fileName: "app/Components/Entitlement/components/applevelaccessrights.jsx",
          lineNumber: 281,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/Components/Entitlement/components/applevelaccessrights.jsx",
        lineNumber: 274,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/Components/Entitlement/components/applevelaccessrights.jsx",
        lineNumber: 273,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row", style: { marginTop: "10px" }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-2 float-right", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        "input",
        {
          type: "submit",
          className: "btn btn-primary btn-block",
          value: "Save",
          disabled: !this.state.userName
        },
        void 0,
        false,
        {
          fileName: "app/Components/Entitlement/components/applevelaccessrights.jsx",
          lineNumber: 286,
          columnNumber: 15
        },
        this
      ) }, void 0, false, {
        fileName: "app/Components/Entitlement/components/applevelaccessrights.jsx",
        lineNumber: 285,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/Components/Entitlement/components/applevelaccessrights.jsx",
        lineNumber: 284,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/Components/Entitlement/components/applevelaccessrights.jsx",
      lineNumber: 237,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/Components/Entitlement/components/applevelaccessrights.jsx",
      lineNumber: 236,
      columnNumber: 7
    }, this);
  }
};

// app/routes/applevelaccessright/route.jsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/applevelaccessright/route.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/applevelaccessright/route.jsx"
  );
  import.meta.hot.lastModified = "1709722236365.8904";
}
function AppLevelAccessRightsComponent() {
  _s();
  const {
    accessRightData,
    appLevelAccessRight
  } = useLoaderData();
  const context = {};
  const actions = {
    setUsers: () => {
    }
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Header, {}, void 0, false, {
      fileName: "app/routes/applevelaccessright/route.jsx",
      lineNumber: 92,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Menu, {}, void 0, false, {
      fileName: "app/routes/applevelaccessright/route.jsx",
      lineNumber: 93,
      columnNumber: 7
    }, this),
    " ",
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(AppLevelAccessRight, { accessRightData, context, actions }, void 0, false, {
      fileName: "app/routes/applevelaccessright/route.jsx",
      lineNumber: 94,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Footer, {}, void 0, false, {
      fileName: "app/routes/applevelaccessright/route.jsx",
      lineNumber: 95,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/applevelaccessright/route.jsx",
    lineNumber: 91,
    columnNumber: 10
  }, this);
}
_s(AppLevelAccessRightsComponent, "ApJhUugqIpnWV7PG9MkhkfB+Obk=", false, function() {
  return [useLoaderData];
});
_c = AppLevelAccessRightsComponent;
var _c;
$RefreshReg$(_c, "AppLevelAccessRightsComponent");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  AppLevelAccessRightsComponent as default
};
//# sourceMappingURL=/build/routes/applevelaccessright-KYPNBEKC.js.map
