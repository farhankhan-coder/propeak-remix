import {
  lookup
} from "/build/_shared/chunk-WSROVG5I.js";
import {
  auth_default
} from "/build/_shared/chunk-ZNTOAH5I.js";
import "/build/_shared/chunk-IX3CRINA.js";
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

// app/Components/login/components/logout.jsx
var import_react = __toESM(require_react(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/Components/login/components/logout.jsx"
  );
}
var Logout = class extends import_react.Component {
  constructor(props) {
    super(props);
    try {
      this.socket = lookup.connect("/", {
        secure: true,
        path: "/chat/socket.io"
      });
    } catch (error) {
      console.error("Error initializing socket:", error);
    }
  }
  logout() {
    (void 0)();
    this.socket.emit("forceDisconnect", auth_default.get("userId"));
    auth_default.clearAppStorage();
  }
  componentDidMount() {
    this.logout();
  }
  render() {
    this.logout();
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "container-fluid ", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-6 offset-sm-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "logo-wrapper d-flex justify-content-center mt-5", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        "img",
        {
          src: "/images/proPeakNewLogo.svg",
          alt: "proPeak PMS",
          style: { height: "70px", marginBottom: "57px" }
        },
        void 0,
        false,
        {
          fileName: "app/Components/login/components/logout.jsx",
          lineNumber: 51,
          columnNumber: 15
        },
        this
      ) }, void 0, false, {
        fileName: "app/Components/login/components/logout.jsx",
        lineNumber: 50,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/Components/login/components/logout.jsx",
        lineNumber: 49,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/Components/login/components/logout.jsx",
        lineNumber: 48,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-8 offset-sm-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "reset-wrapper box-shadow  justify-content-center align-items-center", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-8 offset-sm-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { style: { textAlign: "center" }, children: "You have successfully logged out!" }, void 0, false, {
          fileName: "app/Components/login/components/logout.jsx",
          lineNumber: 64,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "app/Components/login/components/logout.jsx",
          lineNumber: 63,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/Components/login/components/logout.jsx",
          lineNumber: 62,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          "div",
          {
            className: "col-sm-6 offset-sm-3",
            style: { textAlign: "center" },
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("small", { children: " Click here to \xA0" }, void 0, false, {
                fileName: "app/Components/login/components/logout.jsx",
                lineNumber: 75,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "a",
                {
                  href: "/login",
                  style: {
                    lineHeight: "1.3em",
                    color: "rgb(255, 152, 0)",
                    fontSize: "15px"
                  },
                  children: "Login"
                },
                void 0,
                false,
                {
                  fileName: "app/Components/login/components/logout.jsx",
                  lineNumber: 76,
                  columnNumber: 19
                },
                this
              )
            ]
          },
          void 0,
          true,
          {
            fileName: "app/Components/login/components/logout.jsx",
            lineNumber: 71,
            columnNumber: 17
          },
          this
        ) }, void 0, false, {
          fileName: "app/Components/login/components/logout.jsx",
          lineNumber: 70,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/Components/login/components/logout.jsx",
        lineNumber: 61,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/Components/login/components/logout.jsx",
        lineNumber: 60,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/Components/login/components/logout.jsx",
        lineNumber: 59,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/Components/login/components/logout.jsx",
      lineNumber: 47,
      columnNumber: 7
    }, this);
  }
};

// app/routes/logout/route.jsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/logout/route.jsx"
  );
  import.meta.hot.lastModified = "1709528178240.5205";
}
function logoutRoute() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Logout, {}, void 0, false, {
    fileName: "app/routes/logout/route.jsx",
    lineNumber: 20,
    columnNumber: 13
  }, this) }, void 0, false, {
    fileName: "app/routes/logout/route.jsx",
    lineNumber: 19,
    columnNumber: 9
  }, this);
}
export {
  logoutRoute as default
};
//# sourceMappingURL=/build/routes/logout-NT4WWSEC.js.map
