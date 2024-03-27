import {
  form_errors_default
} from "/build/_shared/chunk-HVH5HPFK.js";
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

// app/routes/company/route.jsx
var import_react5 = __toESM(require_react(), 1);

// app/Components/company/company-form.jsx
var import_react = __toESM(require_react(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/Components/company/company-form.jsx"
  );
  import.meta.hot.lastModified = "1709384153069.1104";
}
var labelStyle = {
  fontSize: "small"
};
var CompanyForm = class extends import_react.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      company: props.company || {
        companyName: "",
        companyCode: "",
        country: "",
        address: "",
        contact: ""
      },
      formValid: props.companyId ? true : false,
      titleCheck: false,
      checkMsg: false,
      message: "",
      companyId: props.companyId,
      formErrors: {},
      companyNameValid: "",
      contactValid: "",
      labelsuccessvalue: props.labelsuccessvalue
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      company: nextProps.company,
      companyId: nextProps.companyId,
      labelsuccessvalue: nextProps.labelsuccessvalue
    });
  }
  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState(
      {
        company: {
          ...this.state.company,
          [name]: value
        },
        checkMsg: false,
        labelsuccessvalue: ""
      },
      () => this.validateField(name, value)
    );
  }
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let companyNameValid = this.state.companyNameValid;
    let contactValid = this.state.contactValid;
    switch (fieldName) {
      case "companyName":
        companyNameValid = value.length !== 0;
        fieldValidationErrors["Company Name"] = companyNameValid ? "" : " Please fill the";
        break;
      case "contact":
        contactValid = value.match(/^[0-9]{10}$/);
        fieldValidationErrors["Contact"] = contactValid ? "" : " Please fill the 10 digits number only in";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        companyNameValid
      },
      () => this.validateForm(this.state.companyId)
    );
  }
  validateForm(companyId) {
    if (companyId) {
      this.setState({ formValid: true });
    }
  }
  render() {
    const { companyName, companyCode, country, address, contact } = this.state.company;
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: { marginTop: "10px" }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { onClick: this.props.closeCompany, className: "float-right mr-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { children: "close" }, void 0, false, {
        fileName: "app/Components/company/company-form.jsx",
        lineNumber: 112,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/Components/company/company-form.jsx",
        lineNumber: 110,
        columnNumber: 9
      }, this),
      this.state.company._id ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "sub-title ml-3", children: " Edit Company" }, void 0, false, {
        fileName: "app/Components/company/company-form.jsx",
        lineNumber: 115,
        columnNumber: 11
      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "sub-title ml-3", children: " Add Company" }, void 0, false, {
        fileName: "app/Components/company/company-form.jsx",
        lineNumber: 117,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("hr", {}, void 0, false, {
        fileName: "app/Components/company/company-form.jsx",
        lineNumber: 119,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "container", children: [
        this.state.errUserMessage || this.state.errMessage || this.state.formErrors ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-12 ", children: [
          this.state.checkMsg ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "alert alert-success", children: this.state.message }, void 0, false, {
            fileName: "app/Components/company/company-form.jsx",
            lineNumber: 127,
            columnNumber: 19
          }, this) : null,
          Object.keys(this.state.formErrors).length ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(form_errors_default, { formErrors: this.state.formErrors }, void 0, false, {
            fileName: "app/Components/company/company-form.jsx",
            lineNumber: 133,
            columnNumber: 19
          }, this) : null,
          this.state.labelsuccessvalue ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "alert alert-success", children: this.state.labelsuccessvalue }, void 0, false, {
            fileName: "app/Components/company/company-form.jsx",
            lineNumber: 137,
            columnNumber: 19
          }, this) : null
        ] }, void 0, true, {
          fileName: "app/Components/company/company-form.jsx",
          lineNumber: 125,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/Components/company/company-form.jsx",
          lineNumber: 124,
          columnNumber: 13
        }, this) : null,
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-group", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-group", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          Form,
          {
            method: this.state.company._id ? "PUT" : "POST",
            action: this.state.company._id ? `/company/${this.state.company._id}` : "/company",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-12", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-group", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "companyName", style: labelStyle, children: "Company Name" }, void 0, false, {
                  fileName: "app/Components/company/company-form.jsx",
                  lineNumber: 156,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { style: { color: "red" }, children: "*" }, void 0, false, {
                  fileName: "app/Components/company/company-form.jsx",
                  lineNumber: 159,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                  "input",
                  {
                    type: "text",
                    name: "companyName",
                    className: "form-control",
                    placeholder: "Company Name",
                    value: companyName,
                    onChange: this.handleInputChange,
                    autoComplete: "off"
                  },
                  void 0,
                  false,
                  {
                    fileName: "app/Components/company/company-form.jsx",
                    lineNumber: 160,
                    columnNumber: 23
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "app/Components/company/company-form.jsx",
                lineNumber: 155,
                columnNumber: 21
              }, this) }, void 0, false, {
                fileName: "app/Components/company/company-form.jsx",
                lineNumber: 154,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "app/Components/company/company-form.jsx",
                lineNumber: 153,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-group", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "companyCode", style: labelStyle, children: "Company Code" }, void 0, false, {
                    fileName: "app/Components/company/company-form.jsx",
                    lineNumber: 176,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                    "input",
                    {
                      type: "text",
                      name: "companyCode",
                      className: "form-control",
                      placeholder: "Company Code",
                      value: companyCode,
                      onChange: this.handleInputChange,
                      autoComplete: "off"
                    },
                    void 0,
                    false,
                    {
                      fileName: "app/Components/company/company-form.jsx",
                      lineNumber: 179,
                      columnNumber: 23
                    },
                    this
                  )
                ] }, void 0, true, {
                  fileName: "app/Components/company/company-form.jsx",
                  lineNumber: 175,
                  columnNumber: 21
                }, this) }, void 0, false, {
                  fileName: "app/Components/company/company-form.jsx",
                  lineNumber: 174,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-group", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "country", style: labelStyle, children: "Country" }, void 0, false, {
                    fileName: "app/Components/company/company-form.jsx",
                    lineNumber: 192,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                    "select",
                    {
                      value: country,
                      onChange: this.handleInputChange,
                      name: "country",
                      className: "form-control",
                      children: [
                        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "", disabled: true, children: "Select Country" }, void 0, false, {
                          fileName: "app/Components/company/company-form.jsx",
                          lineNumber: 201,
                          columnNumber: 25
                        }, this),
                        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "India", children: "India" }, void 0, false, {
                          fileName: "app/Components/company/company-form.jsx",
                          lineNumber: 204,
                          columnNumber: 25
                        }, this),
                        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "America", children: "America" }, void 0, false, {
                          fileName: "app/Components/company/company-form.jsx",
                          lineNumber: 205,
                          columnNumber: 25
                        }, this),
                        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "China", children: "China" }, void 0, false, {
                          fileName: "app/Components/company/company-form.jsx",
                          lineNumber: 206,
                          columnNumber: 25
                        }, this)
                      ]
                    },
                    void 0,
                    true,
                    {
                      fileName: "app/Components/company/company-form.jsx",
                      lineNumber: 195,
                      columnNumber: 23
                    },
                    this
                  )
                ] }, void 0, true, {
                  fileName: "app/Components/company/company-form.jsx",
                  lineNumber: 191,
                  columnNumber: 21
                }, this) }, void 0, false, {
                  fileName: "app/Components/company/company-form.jsx",
                  lineNumber: 190,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "app/Components/company/company-form.jsx",
                lineNumber: 173,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-group", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "address", style: labelStyle, children: "Company Address" }, void 0, false, {
                    fileName: "app/Components/company/company-form.jsx",
                    lineNumber: 214,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                    "input",
                    {
                      type: "text",
                      name: "address",
                      className: "form-control",
                      placeholder: "Company Address",
                      value: address,
                      onChange: this.handleInputChange
                    },
                    void 0,
                    false,
                    {
                      fileName: "app/Components/company/company-form.jsx",
                      lineNumber: 217,
                      columnNumber: 23
                    },
                    this
                  )
                ] }, void 0, true, {
                  fileName: "app/Components/company/company-form.jsx",
                  lineNumber: 213,
                  columnNumber: 21
                }, this) }, void 0, false, {
                  fileName: "app/Components/company/company-form.jsx",
                  lineNumber: 212,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-group", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "contact", style: labelStyle, children: "Contact" }, void 0, false, {
                    fileName: "app/Components/company/company-form.jsx",
                    lineNumber: 230,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                    "input",
                    {
                      type: "text",
                      name: "contact",
                      className: "form-control",
                      placeholder: "Contact",
                      value: contact,
                      onChange: this.handleInputChange,
                      autoComplete: "off"
                    },
                    void 0,
                    false,
                    {
                      fileName: "app/Components/company/company-form.jsx",
                      lineNumber: 233,
                      columnNumber: 23
                    },
                    this
                  )
                ] }, void 0, true, {
                  fileName: "app/Components/company/company-form.jsx",
                  lineNumber: 229,
                  columnNumber: 21
                }, this) }, void 0, false, {
                  fileName: "app/Components/company/company-form.jsx",
                  lineNumber: 228,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "app/Components/company/company-form.jsx",
                lineNumber: 211,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-12", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "input",
                {
                  type: "submit",
                  className: "btn btn-info btn-block",
                  value: "Submit",
                  disabled: !companyName
                },
                void 0,
                false,
                {
                  fileName: "app/Components/company/company-form.jsx",
                  lineNumber: 248,
                  columnNumber: 21
                },
                this
              ) }, void 0, false, {
                fileName: "app/Components/company/company-form.jsx",
                lineNumber: 247,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "app/Components/company/company-form.jsx",
                lineNumber: 246,
                columnNumber: 17
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "app/Components/company/company-form.jsx",
            lineNumber: 147,
            columnNumber: 15
          },
          this
        ) }, void 0, false, {
          fileName: "app/Components/company/company-form.jsx",
          lineNumber: 146,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "app/Components/company/company-form.jsx",
          lineNumber: 145,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/Components/company/company-form.jsx",
        lineNumber: 120,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/Components/company/company-form.jsx",
      lineNumber: 109,
      columnNumber: 7
    }, this);
  }
};

// app/Components/company/company-list.jsx
var import_react3 = __toESM(require_react(), 1);

// app/Components/company/company.css
var company_default = "/build/_assets/company-DDQMZMFI.css";

// app/Components/company/company-list.jsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/Components/company/company-list.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/Components/company/company-list.jsx"
  );
}
var CompanyList = ({
  companies = {
    response: []
  }
}, editCompanyWindow, closeCompany) => {
  _s();
  const {
    response
  } = companies;
  if (!Array.isArray(response) || response.length === 0) {
    console.error("Companies response is not an array or is empty:", response);
    return null;
  }
  const [selectedCompany, setselectedCompany] = (0, import_react3.useState)(null);
  const handleEditClick = (company) => {
    setselectedCompany(company);
    editCompanyWindow(company);
  };
  const handlecloseCompany = () => {
    setselectedCompany(null);
    closeCompany();
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("ul", { className: "list-group list-group-flush", children: response.map((company, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("li", { className: "list-group-item d-flex justify-content-between align-items-center", id: index, children: [
    company.companyName,
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { children: [
      company.sequence,
      "\xA0\xA0\xA0",
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { className: "btn btn-xs btn-outline-info", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("button", { onClick: () => handleEditClick(company), children: "Edit" }, void 0, false, {
        fileName: "app/Components/company/company-list.jsx",
        lineNumber: 58,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/Components/company/company-list.jsx",
        lineNumber: 57,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { title: "Delete company", className: "btn btn-xs btn-outline-danger", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Form, { method: "DELETE", action: `/company/${company._id}`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("button", { type: "submit", children: "Delete" }, void 0, false, {
          fileName: "app/Components/company/company-list.jsx",
          lineNumber: 63,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/Components/company/company-list.jsx",
          lineNumber: 62,
          columnNumber: 15
        }, this),
        " "
      ] }, void 0, true, {
        fileName: "app/Components/company/company-list.jsx",
        lineNumber: 60,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/Components/company/company-list.jsx",
      lineNumber: 55,
      columnNumber: 6
    }, this),
    selectedCompany && selectedCompany._id === company._id && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(CompanyForm, { company: selectedCompany, isEditMode: true, handlecloseCompany }, void 0, false, {
      fileName: "app/Components/company/company-list.jsx",
      lineNumber: 68,
      columnNumber: 70
    }, this)
  ] }, company._id, true, {
    fileName: "app/Components/company/company-list.jsx",
    lineNumber: 52,
    columnNumber: 41
  }, this)) }, void 0, false, {
    fileName: "app/Components/company/company-list.jsx",
    lineNumber: 51,
    columnNumber: 10
  }, this);
};
_s(CompanyList, "XmeApVFP9EVpsv/g8UcSInaHGbM=");
_c = CompanyList;
var company_list_default = CompanyList;
var _c;
$RefreshReg$(_c, "CompanyList");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/routes/company/route.jsx
var import_jsx_dev_runtime3 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/company/route.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s2 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/company/route.jsx"
  );
}
var links = () => [{
  rel: "stylesheet",
  href: company_default
}];
function CompanyComponent() {
  _s2();
  const {
    companies
  } = useLoaderData();
  const [showNewCompany, setShowNewCompany] = (0, import_react5.useState)(false);
  const [showEditCompany, setShowEditCompany] = (0, import_react5.useState)(false);
  const [company, setCompany] = (0, import_react5.useState)({
    companyName: "",
    companyCode: "",
    country: "",
    address: "",
    contact: "",
    isDeleted: false
  });
  const [labelSuccessValue, setLabelSuccessValue] = (0, import_react5.useState)("");
  const addNewCompanyWindow = () => {
    setShowNewCompany(true);
    setCompany({
      companyName: "",
      companyCode: "",
      country: "",
      address: "",
      contact: "",
      isDeleted: false
    });
    setLabelSuccessValue("");
  };
  const closeCompany = () => {
    setShowNewCompany(false);
    setShowEditCompany(false);
    setCompany({
      companyName: "",
      companyCode: "",
      country: "",
      address: "",
      contact: "",
      isDeleted: false
    });
    setLabelSuccessValue("");
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "container bg-white", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Header, {}, void 0, false, {
      fileName: "app/routes/company/route.jsx",
      lineNumber: 90,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Menu, {}, void 0, false, {
      fileName: "app/routes/company/route.jsx",
      lineNumber: 91,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Footer, {}, void 0, false, {
      fileName: "app/routes/company/route.jsx",
      lineNumber: 93,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "row", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "col-sm-7", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "row", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "col-sm-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("h4", { className: "sub-title ml-3 mt-3", children: [
        "Company (",
        companies.length,
        ")"
      ] }, void 0, true, {
        fileName: "app/routes/company/route.jsx",
        lineNumber: 98,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/routes/company/route.jsx",
        lineNumber: 97,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "col-sm-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("h4", { className: "mt-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("span", { className: "btn btn-xs btn-info float-right", title: "New Company", onClick: addNewCompanyWindow, children: [
        "Add Company \xA0 ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("i", { className: "fas fa-plus" }, void 0, false, {
          fileName: "app/routes/company/route.jsx",
          lineNumber: 106,
          columnNumber: 38
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/company/route.jsx",
        lineNumber: 104,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/routes/company/route.jsx",
        lineNumber: 103,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/routes/company/route.jsx",
        lineNumber: 102,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/company/route.jsx",
      lineNumber: 96,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/company/route.jsx",
      lineNumber: 95,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/company/route.jsx",
      lineNumber: 94,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("hr", {}, void 0, false, {
      fileName: "app/routes/company/route.jsx",
      lineNumber: 113,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "row", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "col-sm-12 col-md-5 col-lg-5 order-lg-1 order-md-1 form-wrapper", children: showNewCompany || showEditCompany ? /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(CompanyForm, { company, labelSuccessValue, closeCompany }, void 0, false, {
        fileName: "app/routes/company/route.jsx",
        lineNumber: 117,
        columnNumber: 48
      }, this) : null }, void 0, false, {
        fileName: "app/routes/company/route.jsx",
        lineNumber: 116,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "col-sm-12 col-md-7 col-lg-7 contentWrapper", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "scroll", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(company_list_default, { companies }, void 0, false, {
        fileName: "app/routes/company/route.jsx",
        lineNumber: 121,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/company/route.jsx",
        lineNumber: 120,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/company/route.jsx",
        lineNumber: 119,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/company/route.jsx",
      lineNumber: 115,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/company/route.jsx",
    lineNumber: 88,
    columnNumber: 10
  }, this);
}
_s2(CompanyComponent, "Ugt4zp8c4A0WgUmvj6q22kYX+b8=", false, function() {
  return [useLoaderData];
});
_c2 = CompanyComponent;
var _c2;
$RefreshReg$(_c2, "CompanyComponent");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  CompanyComponent as default,
  links
};
//# sourceMappingURL=/build/routes/company-GB6Z4UW6.js.map
