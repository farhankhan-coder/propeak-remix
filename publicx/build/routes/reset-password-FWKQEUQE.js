import {
  require_react_recaptcha
} from "/build/_shared/chunk-QY6SUO3M.js";
import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
import {
  config_default
} from "/build/_shared/chunk-CGPR7F7J.js";
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

// app/Components/login/components/reset-password.jsx
var import_react = __toESM(require_react(), 1);
var import_react_recaptcha = __toESM(require_react_recaptcha(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/Components/login/components/reset-password.jsx"
  );
}
var ResetPassword = class extends import_react.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.setNewPassword = this.setNewPassword.bind(this);
    this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
  }
  getToken() {
    if (typeof window !== "undefined") {
      let loc = window.location.pathname.split("/");
      let token = loc[loc.length - 1];
      return token;
    } else {
      return null;
    }
  }
  state = {
    password: "",
    confirmPassword: "",
    passChanged: false,
    message: "",
    passwordValid: false,
    formErrors: { password: "" },
    // token: this.getToken(),
    isVerified: false,
    isDisableField: ""
  };
  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState(
      {
        [name]: value,
        message: ""
      },
      this.validateField.bind(this, name, value)
    );
  }
  async setNewPassword() {
    if (!this.state.isVerified) {
      this.setState({
        message: "Please verify that you are a human"
      });
    } else {
      var reset = {
        password: this.state.password,
        confirmPassword: this.state.confirmPassword,
        token: this.state.token
      };
      let { response, err } = await (void 0)(reset);
      if (err) {
        this.setState({
          message: "Error: " + err
        });
      } else {
        if (response.data.err) {
          this.recaptchaInstance.reset();
          this.setState({
            message: response.data.err,
            isVerified: false
          });
        } else {
          this.setState({
            passChanged: true,
            reset: response.data
          });
        }
      }
      this.recaptchaInstance.reset();
      this.setState({
        password: "",
        confirmPassword: "",
        isDisableField: "ok"
      });
    }
  }
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let passwordValid = this.state.passwordValid;
    switch (fieldName) {
      case "password":
        passwordValid = value.length >= 4;
        fieldValidationErrors.password = passwordValid ? "" : " is too short";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        passwordValid
      },
      this.validateForm
    );
  }
  validateForm() {
    this.setState({ formValid: this.state.passwordValid });
  }
  recaptchaLoaded() {
  }
  verifyCallback(response) {
    if (response) {
      this.setState({
        isVerified: true,
        message: ""
      });
    }
  }
  render() {
    const token = this.props;
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react.default.Fragment, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "container-fluid", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-6 offset-sm-3 text-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        "img",
        {
          src: "/images/proPeak.png",
          alt: "proPeak PMS",
          style: {
            width: "200px",
            display: "inline-block",
            textAlign: "center",
            marginTop: "30px",
            marginBottom: "30px"
          }
        },
        void 0,
        false,
        {
          fileName: "app/Components/login/components/reset-password.jsx",
          lineNumber: 152,
          columnNumber: 15
        },
        this
      ) }, void 0, false, {
        fileName: "app/Components/login/components/reset-password.jsx",
        lineNumber: 151,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/Components/login/components/reset-password.jsx",
        lineNumber: 150,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-6 offset-sm-3", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "reset-wrapper reset-box-shadow  justify-content-center align-items-center", children: [
          this.state.message ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "resetpass-alert alert-danger", children: this.state.message }, void 0, false, {
            fileName: "app/Components/login/components/reset-password.jsx",
            lineNumber: 170,
            columnNumber: 17
          }, this) : "",
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "login-title", children: "Reset Password" }, void 0, false, {
            fileName: "app/Components/login/components/reset-password.jsx",
            lineNumber: 176,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("hr", {}, void 0, false, {
            fileName: "app/Components/login/components/reset-password.jsx",
            lineNumber: 177,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "POST", action: "/reset-password", children: this.state.isDisableField !== "ok" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-group ", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "Enter Password", children: "Enter Password" }, void 0, false, {
                fileName: "app/Components/login/components/reset-password.jsx",
                lineNumber: 182,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "input",
                {
                  className: "form-control",
                  type: "password",
                  placeholder: "Enter Password",
                  name: "password",
                  value: this.state.password,
                  onChange: this.handleInputChange
                },
                void 0,
                false,
                {
                  fileName: "app/Components/login/components/reset-password.jsx",
                  lineNumber: 183,
                  columnNumber: 25
                },
                this
              )
            ] }, void 0, true, {
              fileName: "app/Components/login/components/reset-password.jsx",
              lineNumber: 181,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-group ", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "Confirm Password", children: "Confirm Password" }, void 0, false, {
                fileName: "app/Components/login/components/reset-password.jsx",
                lineNumber: 193,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "input",
                {
                  className: "form-control",
                  type: "password",
                  placeholder: "Confirm Password",
                  name: "confirmPassword",
                  value: this.state.confirmPassword,
                  onChange: this.handleInputChange
                },
                void 0,
                false,
                {
                  fileName: "app/Components/login/components/reset-password.jsx",
                  lineNumber: 194,
                  columnNumber: 25
                },
                this
              )
            ] }, void 0, true, {
              fileName: "app/Components/login/components/reset-password.jsx",
              lineNumber: 192,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-group", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
              import_react_recaptcha.default,
              {
                sitekey: config_default.sitekey,
                render: "explicit",
                onloadCallback: this.recaptchaLoaded,
                verifyCallback: this.verifyCallback,
                ref: (e) => this.recaptchaInstance = e
              },
              void 0,
              false,
              {
                fileName: "app/Components/login/components/reset-password.jsx",
                lineNumber: 204,
                columnNumber: 25
              },
              this
            ) }, void 0, false, {
              fileName: "app/Components/login/components/reset-password.jsx",
              lineNumber: 203,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-group", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-12", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
              "input",
              {
                type: "submit",
                value: "Submit",
                className: "btn btn-primary btn-block"
              },
              void 0,
              false,
              {
                fileName: "app/Components/login/components/reset-password.jsx",
                lineNumber: 215,
                columnNumber: 29
              },
              this
            ) }, void 0, false, {
              fileName: "app/Components/login/components/reset-password.jsx",
              lineNumber: 214,
              columnNumber: 27
            }, this) }, void 0, false, {
              fileName: "app/Components/login/components/reset-password.jsx",
              lineNumber: 213,
              columnNumber: 25
            }, this) }, void 0, false, {
              fileName: "app/Components/login/components/reset-password.jsx",
              lineNumber: 212,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "app/Components/login/components/reset-password.jsx",
            lineNumber: 180,
            columnNumber: 19
          }, this) : "" }, void 0, false, {
            fileName: "app/Components/login/components/reset-password.jsx",
            lineNumber: 178,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/Components/login/components/reset-password.jsx",
          lineNumber: 168,
          columnNumber: 15
        }, this),
        " "
      ] }, void 0, true, {
        fileName: "app/Components/login/components/reset-password.jsx",
        lineNumber: 167,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/Components/login/components/reset-password.jsx",
        lineNumber: 166,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/Components/login/components/reset-password.jsx",
      lineNumber: 149,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/Components/login/components/reset-password.jsx",
      lineNumber: 148,
      columnNumber: 7
    }, this);
  }
};

// app/routes/reset-password/route.jsx
var import_node = __toESM(require_node(), 1);
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/reset-password/route.jsx"
  );
  import.meta.hot.lastModified = "1709489093623.7546";
}
function resetPasswordRoute() {
  const { token, auth } = useLoaderData();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(ResetPassword, { token, auth }, void 0, false, {
    fileName: "app/routes/reset-password/route.jsx",
    lineNumber: 38,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/reset-password/route.jsx",
    lineNumber: 37,
    columnNumber: 5
  }, this);
}
export {
  resetPasswordRoute as default
};
//# sourceMappingURL=/build/routes/reset-password-FWKQEUQE.js.map
