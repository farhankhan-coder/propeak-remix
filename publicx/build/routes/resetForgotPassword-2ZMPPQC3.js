import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
import "/build/_shared/chunk-IX3CRINA.js";
import {
  Form,
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

// app/routes/resetForgotPassword/route.jsx
var import_node = __toESM(require_node(), 1);

// app/Components/login/components/reset-forgot-password.jsx
var import_react = __toESM(require_react(), 1);
init_dist();
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/Components/login/components/reset-forgot-password.jsx"
  );
  import.meta.hot.lastModified = "1709483265550.0664";
}
var ResetForgotPassword = class extends import_react.Component {
  constructor(props) {
    super(props);
    this.state = {
      useremail: "",
      messageModal: "",
      emailError: false
    };
  }
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      messageModal: "",
      emailError: false
    });
  };
  validateEmail = (value) => {
    const emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    return !!emailValid;
  };
  render() {
    const { useremail, messageModal, emailError } = this.state;
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "container-fluid", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-6 offset-sm-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "logo-wrapper d-flex justify-content-center mt-5", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: "/images/proPeakNewLogo.svg", alt: "proPeak PMS", style: { width: "450px" } }, void 0, false, {
        fileName: "app/Components/login/components/reset-forgot-password.jsx",
        lineNumber: 48,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/Components/login/components/reset-forgot-password.jsx",
        lineNumber: 47,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/Components/login/components/reset-forgot-password.jsx",
        lineNumber: 46,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/Components/login/components/reset-forgot-password.jsx",
        lineNumber: 45,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-8 offset-sm-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "reset-wrapper box-shadow justify-content-center align-items-center", children: [
        messageModal && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "alertposition reset-alert alert-danger text-center", children: messageModal }, void 0, false, {
          fileName: "app/Components/login/components/reset-forgot-password.jsx",
          lineNumber: 56,
          columnNumber: 17
        }, this),
        emailError && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "alertposition reset-alert alert-danger text-center", style: { height: "50px" }, children: "Please enter a valid email address." }, void 0, false, {
          fileName: "app/Components/login/components/reset-forgot-password.jsx",
          lineNumber: 59,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "login-title", children: "Forgot Password" }, void 0, false, {
          fileName: "app/Components/login/components/reset-forgot-password.jsx",
          lineNumber: 63,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("hr", {}, void 0, false, {
          fileName: "app/Components/login/components/reset-forgot-password.jsx",
          lineNumber: 64,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "POST", action: "/resetForgotPassword", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-12", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            "input",
            {
              className: "form-control",
              type: "email",
              onChange: this.handleInputChange,
              value: useremail,
              name: "useremail",
              placeholder: "Enter your registered email id"
            },
            void 0,
            false,
            {
              fileName: "app/Components/login/components/reset-forgot-password.jsx",
              lineNumber: 68,
              columnNumber: 21
            },
            this
          ) }, void 0, false, {
            fileName: "app/Components/login/components/reset-forgot-password.jsx",
            lineNumber: 67,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/Components/login/components/reset-forgot-password.jsx",
            lineNumber: 66,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row mt-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-12", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { className: "btn btn-primary btn-md mt-1 float-right", type: "submit", children: "Go" }, void 0, false, {
            fileName: "app/Components/login/components/reset-forgot-password.jsx",
            lineNumber: 80,
            columnNumber: 21
          }, this) }, void 0, false, {
            fileName: "app/Components/login/components/reset-forgot-password.jsx",
            lineNumber: 79,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "app/Components/login/components/reset-forgot-password.jsx",
            lineNumber: 78,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/Components/login/components/reset-forgot-password.jsx",
          lineNumber: 65,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("hr", {}, void 0, false, {
          fileName: "app/Components/login/components/reset-forgot-password.jsx",
          lineNumber: 86,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-12", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("small", { className: "", children: [
          " ",
          "Login ?",
          " ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            Link,
            {
              to: "/login",
              className: "links",
              style: {
                lineHeight: "1.3em",
                color: "rgb(255, 152, 0)",
                fontSize: "15px"
              },
              children: "Click here"
            },
            void 0,
            false,
            {
              fileName: "app/Components/login/components/reset-forgot-password.jsx",
              lineNumber: 92,
              columnNumber: 21
            },
            this
          )
        ] }, void 0, true, {
          fileName: "app/Components/login/components/reset-forgot-password.jsx",
          lineNumber: 89,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "app/Components/login/components/reset-forgot-password.jsx",
          lineNumber: 88,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/Components/login/components/reset-forgot-password.jsx",
          lineNumber: 87,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/Components/login/components/reset-forgot-password.jsx",
        lineNumber: 54,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/Components/login/components/reset-forgot-password.jsx",
        lineNumber: 53,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/Components/login/components/reset-forgot-password.jsx",
        lineNumber: 52,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/Components/login/components/reset-forgot-password.jsx",
      lineNumber: 44,
      columnNumber: 7
    }, this);
  }
};
var reset_forgot_password_default = ResetForgotPassword;

// app/routes/resetForgotPassword/route.jsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/resetForgotPassword/route.jsx"
  );
  import.meta.hot.lastModified = "1709483501916.7373";
}
function resetPasswordRoute() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(reset_forgot_password_default, {}, void 0, false, {
    fileName: "app/routes/resetForgotPassword/route.jsx",
    lineNumber: 20,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/resetForgotPassword/route.jsx",
    lineNumber: 19,
    columnNumber: 5
  }, this);
}
export {
  resetPasswordRoute as default
};
//# sourceMappingURL=/build/routes/resetForgotPassword-2ZMPPQC3.js.map
