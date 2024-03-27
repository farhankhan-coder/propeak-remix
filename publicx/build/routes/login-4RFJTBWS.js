import {
  require_react_recaptcha
} from "/build/_shared/chunk-QY6SUO3M.js";
import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
import {
  config_default
} from "/build/_shared/chunk-CGPR7F7J.js";
import {
  auth_default
} from "/build/_shared/chunk-ZNTOAH5I.js";
import {
  Link
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

// app/Components/login/components/login.jsx
var import_react = __toESM(require_react(), 1);
var import_react_recaptcha = __toESM(require_react_recaptcha(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/Components/login/components/login.jsx"
  );
}
var Login = class extends import_react.Component {
  state = {
    login: auth_default.get("userId") ? true : false,
    message: "",
    messageModal: "",
    user: {},
    showForgotPassword: false,
    email: "",
    useremail: "",
    domain: "",
    isVerified: false
  };
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      message: ""
    });
  };
  onkeyEnter = (e) => {
    if (e.which === 13) {
      this.forgotPasswordRequestOnSubmit();
    }
  };
  forgotPasswordRequestOnSubmit = async () => {
    let { useremail } = this.state;
    let { response, err } = await (void 0)(useremail);
    if (err) {
      this.setState({
        messageModal: err
      });
    } else if (response && response.data.err) {
      this.setState({
        messageModal: response.data.err
      });
    } else {
      this.setState({
        messageModal: response.data.msg,
        useremail: ""
      });
    }
  };
  checkKey = (e) => {
    if (e.which === 13) {
      this.onLogin();
    }
  };
  recaptchaLoaded() {
  }
  verifyCallback = (response) => {
    if (response) {
      this.setState({
        isVerified: true,
        message: ""
      });
    }
  };
  render() {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react.default.Fragment, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
      "div",
      {
        className: "container-fluid justify-content-center align-items-center",
        id: "loginpage",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-5 offset-sm-1 logo-container", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "logo-wrapper d-flex flex-column justify-content-center ", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: "/images/proPeakNewLogo.svg", alt: "proPeak PMS" }, void 0, false, {
            fileName: "app/Components/login/components/login.jsx",
            lineNumber: 98,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "app/Components/login/components/login.jsx",
            lineNumber: 97,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "app/Components/login/components/login.jsx",
            lineNumber: 96,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-5 d-flex flex-column justify-content-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "loginWrapper justify-content-center align-items-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "loginBox  justify-content-center align-items-center", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "login-title", children: "LOGIN" }, void 0, false, {
              fileName: "app/Components/login/components/login.jsx",
              lineNumber: 105,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("hr", {}, void 0, false, {
              fileName: "app/Components/login/components/login.jsx",
              lineNumber: 106,
              columnNumber: 19
            }, this),
            this.state.message ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "login-alert alert-danger", children: this.state.message }, void 0, false, {
              fileName: "app/Components/login/components/login.jsx",
              lineNumber: 108,
              columnNumber: 19
            }, this) : "",
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "POST", action: "/login", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-group ", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { children: "Username" }, void 0, false, {
                  fileName: "app/Components/login/components/login.jsx",
                  lineNumber: 117,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-12", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                  "input",
                  {
                    type: "text",
                    className: " form-control username",
                    placeholder: "email",
                    name: "email",
                    onChange: this.handleInputChange,
                    onKeyPress: this.checkKey
                  },
                  void 0,
                  false,
                  {
                    fileName: "app/Components/login/components/login.jsx",
                    lineNumber: 120,
                    columnNumber: 27
                  },
                  this
                ) }, void 0, false, {
                  fileName: "app/Components/login/components/login.jsx",
                  lineNumber: 119,
                  columnNumber: 25
                }, this) }, void 0, false, {
                  fileName: "app/Components/login/components/login.jsx",
                  lineNumber: 118,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "app/Components/login/components/login.jsx",
                lineNumber: 116,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-group", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { children: "Password" }, void 0, false, {
                  fileName: "app/Components/login/components/login.jsx",
                  lineNumber: 132,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                  "input",
                  {
                    className: "form-control password text-muted",
                    placeholder: "password",
                    name: "password",
                    type: "password",
                    onChange: this.handleInputChange,
                    onKeyPress: this.checkKey
                  },
                  void 0,
                  false,
                  {
                    fileName: "app/Components/login/components/login.jsx",
                    lineNumber: 133,
                    columnNumber: 23
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "app/Components/login/components/login.jsx",
                lineNumber: 131,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-group", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                import_react_recaptcha.default,
                {
                  sitekey: config_default.sitekey,
                  render: "explicit",
                  onloadCallback: this.recaptchaLoaded,
                  verifyCallback: this.verifyCallback
                },
                void 0,
                false,
                {
                  fileName: "app/Components/login/components/login.jsx",
                  lineNumber: 143,
                  columnNumber: 23
                },
                this
              ) }, void 0, false, {
                fileName: "app/Components/login/components/login.jsx",
                lineNumber: 142,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-group", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-12", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                  "button",
                  {
                    type: "submit",
                    className: "btn btn-primary btn-block",
                    children: "Login"
                  },
                  void 0,
                  false,
                  {
                    fileName: "app/Components/login/components/login.jsx",
                    lineNumber: 153,
                    columnNumber: 27
                  },
                  this
                ) }, void 0, false, {
                  fileName: "app/Components/login/components/login.jsx",
                  lineNumber: 152,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-12 reset-link", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("small", { className: "text-muted", children: [
                  "Forgot Password?",
                  " ",
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                    Link,
                    {
                      to: "/resetForgotPassword",
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
                      fileName: "app/Components/login/components/login.jsx",
                      lineNumber: 163,
                      columnNumber: 29
                    },
                    this
                  )
                ] }, void 0, true, {
                  fileName: "app/Components/login/components/login.jsx",
                  lineNumber: 161,
                  columnNumber: 27
                }, this) }, void 0, false, {
                  fileName: "app/Components/login/components/login.jsx",
                  lineNumber: 160,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "app/Components/login/components/login.jsx",
                lineNumber: 151,
                columnNumber: 23
              }, this) }, void 0, false, {
                fileName: "app/Components/login/components/login.jsx",
                lineNumber: 150,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "app/Components/login/components/login.jsx",
              lineNumber: 115,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "app/Components/login/components/login.jsx",
            lineNumber: 104,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "app/Components/login/components/login.jsx",
            lineNumber: 103,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "app/Components/login/components/login.jsx",
            lineNumber: 102,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/Components/login/components/login.jsx",
          lineNumber: 95,
          columnNumber: 11
        }, this)
      },
      void 0,
      false,
      {
        fileName: "app/Components/login/components/login.jsx",
        lineNumber: 91,
        columnNumber: 9
      },
      this
    ) }, void 0, false, {
      fileName: "app/Components/login/components/login.jsx",
      lineNumber: 90,
      columnNumber: 7
    }, this);
  }
};
var login_default = Login;

// app/routes/login/route.jsx
var import_node = __toESM(require_node(), 1);
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/login/route.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/login/route.jsx"
  );
  import.meta.hot.lastModified = "1710324001528.0728";
}
function LoginForm() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(login_default, {}, void 0, false, {
    fileName: "app/routes/login/route.jsx",
    lineNumber: 29,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/login/route.jsx",
    lineNumber: 28,
    columnNumber: 10
  }, this);
}
_c = LoginForm;
var _c;
$RefreshReg$(_c, "LoginForm");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  LoginForm as default
};
//# sourceMappingURL=/build/routes/login-4RFJTBWS.js.map
