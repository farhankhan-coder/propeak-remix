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

// app/routes/category/route.jsx
var import_react5 = __toESM(require_react(), 1);

// app/Components/category/category-list.jsx
var import_react3 = __toESM(require_react(), 1);

// app/Components/category/category-form.jsx
var import_react = __toESM(require_react(), 1);

// app/Components/category/category.css
var category_default = "/build/_assets/category-RCD7C4WE.css";

// app/Components/category/category-form.jsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/Components/category/category-form.jsx"
  );
}
var labelStyle = {
  fontSize: "small"
};
var CategoryForm = class extends import_react.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.state = {
      category: {
        _id: "",
        displayName: "",
        sequence: "",
        title: ""
      },
      msg: "",
      sequence: "",
      title: ""
    };
  }
  componentDidMount() {
    this.setState({ category: this.props.category });
  }
  handleCheckbox(e) {
    const name = e.target.name;
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    this.setState({
      category: {
        ...this.state.category,
        [name]: value
      }
    });
  }
  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    let title = this.state.category.title;
    let sequence = this.state.category.sequence;
    if (name === "sequence") {
      sequence = event.target.value;
    }
    if (name === "displayName") {
      if (title === "todo" || title === "inprogress" || title === "completed") {
        title = title;
      } else {
        title = value.toLowerCase().split(" ").join("");
      }
    }
    this.setState({
      category: {
        ...this.state.category,
        [name]: value,
        title,
        sequence
      },
      msg: ""
    });
  }
  render() {
    const { displayName, sequence, show } = this.state.category;
    const { isEditMode } = this.props;
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: { marginTop: "10px" }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { onClick: this.props.closeCategory, className: "float-right mr-3", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("i", { className: "fas fa-times close" }, void 0, false, {
          fileName: "app/Components/category/category-form.jsx",
          lineNumber: 95,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { children: "close" }, void 0, false, {
          fileName: "app/Components/category/category-form.jsx",
          lineNumber: 96,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/Components/category/category-form.jsx",
        lineNumber: 94,
        columnNumber: 10
      }, this),
      this.state.category._id ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "sub-title ml-3", children: " Edit Category" }, void 0, false, {
        fileName: "app/Components/category/category-form.jsx",
        lineNumber: 99,
        columnNumber: 9
      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { className: "sub-title ml-3", children: " Add Category" }, void 0, false, {
        fileName: "app/Components/category/category-form.jsx",
        lineNumber: 101,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("hr", {}, void 0, false, {
        fileName: "app/Components/category/category-form.jsx",
        lineNumber: 103,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "container", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-group", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        Form,
        {
          method: isEditMode ? "PUT" : "POST",
          action: isEditMode ? `/category/${this.state.category._id}` : "/category",
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-12", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-group", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { style: labelStyle, children: "Title" }, void 0, false, {
                fileName: "app/Components/category/category-form.jsx",
                lineNumber: 117,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "input",
                {
                  className: "form-control",
                  type: "text",
                  placeholder: " ",
                  id: "txtTitle",
                  name: "title",
                  onChange: this.handleInputChange,
                  value: this.state.category.title,
                  autoComplete: "off"
                },
                void 0,
                false,
                {
                  fileName: "app/Components/category/category-form.jsx",
                  lineNumber: 118,
                  columnNumber: 21
                },
                this
              ),
              this.state.msg ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: this.state.msg }, void 0, false, {
                fileName: "app/Components/category/category-form.jsx",
                lineNumber: 128,
                columnNumber: 39
              }, this) : ""
            ] }, void 0, true, {
              fileName: "app/Components/category/category-form.jsx",
              lineNumber: 116,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "app/Components/category/category-form.jsx",
              lineNumber: 115,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "app/Components/category/category-form.jsx",
              lineNumber: 114,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-12", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-group", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { style: labelStyle, children: "Category" }, void 0, false, {
                fileName: "app/Components/category/category-form.jsx",
                lineNumber: 136,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { style: { color: "red" }, children: "*" }, void 0, false, {
                fileName: "app/Components/category/category-form.jsx",
                lineNumber: 137,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "input",
                {
                  className: "form-control",
                  type: "text",
                  placeholder: " ",
                  id: "txtDisplayName",
                  name: "displayName",
                  onChange: this.handleInputChange,
                  value: displayName,
                  autoComplete: "off"
                },
                void 0,
                false,
                {
                  fileName: "app/Components/category/category-form.jsx",
                  lineNumber: 139,
                  columnNumber: 21
                },
                this
              ),
              this.state.msg ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: this.state.msg }, void 0, false, {
                fileName: "app/Components/category/category-form.jsx",
                lineNumber: 149,
                columnNumber: 39
              }, this) : ""
            ] }, void 0, true, {
              fileName: "app/Components/category/category-form.jsx",
              lineNumber: 135,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "app/Components/category/category-form.jsx",
              lineNumber: 134,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "app/Components/category/category-form.jsx",
              lineNumber: 133,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-group", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { style: labelStyle, children: "Sequence" }, void 0, false, {
                fileName: "app/Components/category/category-form.jsx",
                lineNumber: 157,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { style: { color: "red" }, children: "*" }, void 0, false, {
                fileName: "app/Components/category/category-form.jsx",
                lineNumber: 158,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "input",
                {
                  className: "form-control",
                  type: "text",
                  placeholder: " ",
                  id: "txtSequence",
                  name: "sequence",
                  onChange: this.handleInputChange,
                  value: sequence,
                  autoComplete: "off"
                },
                void 0,
                false,
                {
                  fileName: "app/Components/category/category-form.jsx",
                  lineNumber: 160,
                  columnNumber: 21
                },
                this
              ),
              this.state.msg ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: this.state.msg }, void 0, false, {
                fileName: "app/Components/category/category-form.jsx",
                lineNumber: 170,
                columnNumber: 39
              }, this) : ""
            ] }, void 0, true, {
              fileName: "app/Components/category/category-form.jsx",
              lineNumber: 156,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "app/Components/category/category-form.jsx",
              lineNumber: 155,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "app/Components/category/category-form.jsx",
              lineNumber: 154,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-group", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { style: labelStyle, children: "Show" }, void 0, false, {
                fileName: "app/Components/category/category-form.jsx",
                lineNumber: 178,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { style: { color: "red" }, children: "*" }, void 0, false, {
                fileName: "app/Components/category/category-form.jsx",
                lineNumber: 179,
                columnNumber: 21
              }, this),
              " \xA0",
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "input",
                {
                  type: "checkbox",
                  placeholder: " ",
                  id: "txtShow",
                  onChange: this.handleCheckbox,
                  name: "show",
                  value: show,
                  checked: show
                },
                void 0,
                false,
                {
                  fileName: "app/Components/category/category-form.jsx",
                  lineNumber: 180,
                  columnNumber: 21
                },
                this
              )
            ] }, void 0, true, {
              fileName: "app/Components/category/category-form.jsx",
              lineNumber: 177,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "app/Components/category/category-form.jsx",
              lineNumber: 176,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "app/Components/category/category-form.jsx",
              lineNumber: 175,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-12", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
              "input",
              {
                type: "submit",
                value: "Submit",
                className: "btn btn-info btn-block"
              },
              void 0,
              false,
              {
                fileName: "app/Components/category/category-form.jsx",
                lineNumber: 194,
                columnNumber: 19
              },
              this
            ) }, void 0, false, {
              fileName: "app/Components/category/category-form.jsx",
              lineNumber: 193,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "app/Components/category/category-form.jsx",
              lineNumber: 192,
              columnNumber: 15
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "app/Components/category/category-form.jsx",
          lineNumber: 106,
          columnNumber: 13
        },
        this
      ) }, void 0, false, {
        fileName: "app/Components/category/category-form.jsx",
        lineNumber: 105,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/Components/category/category-form.jsx",
        lineNumber: 104,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/Components/category/category-form.jsx",
      lineNumber: 93,
      columnNumber: 7
    }, this);
  }
};

// app/Components/category/category-list.jsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/Components/category/category-list.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/Components/category/category-list.jsx"
  );
  import.meta.hot.lastModified = "1709384153065.1104";
}
var CategoryList = ({
  categories = [],
  editCategoryWindow,
  closeCategory
}) => {
  _s();
  const [selectedCategory, setSelectedCategory] = (0, import_react3.useState)(null);
  const handleEditClick = (category) => {
    setSelectedCategory(category);
    editCategoryWindow(category);
  };
  const handleCloseCategory = () => {
    setSelectedCategory(null);
    closeCategory();
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("ul", { className: "list-group list-group-flush", children: categories.map((category, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("li", { className: "list-group-item d-flex justify-content-between align-items-center", id: index, children: [
    category.displayName,
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { children: [
      category.sequence,
      "\xA0\xA0\xA0",
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { className: "btn btn-xs btn-outline-info", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("button", { onClick: () => handleEditClick(category), children: "Edit" }, void 0, false, {
        fileName: "app/Components/category/category-list.jsx",
        lineNumber: 46,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/Components/category/category-list.jsx",
        lineNumber: 45,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { title: "Delete Category", className: "btn btn-xs btn-outline-danger", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Form, { method: "DELETE", action: `/category/${category._id}`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("button", { type: "submit", children: "Delete" }, void 0, false, {
          fileName: "app/Components/category/category-list.jsx",
          lineNumber: 50,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/Components/category/category-list.jsx",
          lineNumber: 49,
          columnNumber: 15
        }, this),
        " "
      ] }, void 0, true, {
        fileName: "app/Components/category/category-list.jsx",
        lineNumber: 48,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/Components/category/category-list.jsx",
      lineNumber: 43,
      columnNumber: 11
    }, this),
    selectedCategory && selectedCategory._id === category._id && /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(CategoryForm, { category: selectedCategory, isEditMode: true, handleCloseCategory }, void 0, false, {
      fileName: "app/Components/category/category-list.jsx",
      lineNumber: 55,
      columnNumber: 73
    }, this)
  ] }, category._id, true, {
    fileName: "app/Components/category/category-list.jsx",
    lineNumber: 41,
    columnNumber: 44
  }, this)) }, void 0, false, {
    fileName: "app/Components/category/category-list.jsx",
    lineNumber: 40,
    columnNumber: 10
  }, this);
};
_s(CategoryList, "RgHDLEuJ1Ja2GayX64Y/niiK+6s=");
_c = CategoryList;
var category_list_default = CategoryList;
var _c;
$RefreshReg$(_c, "CategoryList");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/routes/category/route.jsx
var import_jsx_dev_runtime3 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/category/route.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s2 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/category/route.jsx"
  );
}
var links = () => [{
  rel: "stylesheet",
  href: category_default
}];
function CategoryComponent() {
  _s2();
  const {
    categories
  } = useLoaderData();
  const [showNewCategory, setShowNewCategory] = (0, import_react5.useState)(false);
  const [showEditCategory, setShowEditCategory] = (0, import_react5.useState)(false);
  const [category, setCategory] = (0, import_react5.useState)({
    title: "",
    displayName: "",
    custom: "",
    show: true,
    sequence: ""
  });
  const [labelsuccessvalue, setLabelSuccessValue] = (0, import_react5.useState)("");
  const [labelvalue, setLabelValue] = (0, import_react5.useState)("");
  const addNewCategoryWindow = () => {
    setShowNewCategory(true);
    setCategory({
      title: "",
      displayName: "",
      custom: "",
      show: true,
      sequence: ""
    });
    setLabelSuccessValue("");
    setLabelValue("");
  };
  const editCategoryWindow = (selectedCategory) => {
    setShowEditCategory(true);
    setCategory({
      _id: selectedCategory._id,
      title: selectedCategory.title,
      displayName: selectedCategory.displayName,
      custom: selectedCategory.custom,
      show: selectedCategory.show,
      sequence: selectedCategory.sequence
    });
    setLabelSuccessValue("");
    setLabelValue("");
  };
  const closeCategory = () => {
    setShowNewCategory(false);
    setShowEditCategory(false);
    setCategory({
      _id: "",
      title: "",
      displayName: "",
      custom: "",
      show: true,
      sequence: ""
    });
    setLabelSuccessValue("");
    setLabelValue("");
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "container bg-white", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Header, {}, void 0, false, {
      fileName: "app/routes/category/route.jsx",
      lineNumber: 154,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Menu, {}, void 0, false, {
      fileName: "app/routes/category/route.jsx",
      lineNumber: 155,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Footer, {}, void 0, false, {
      fileName: "app/routes/category/route.jsx",
      lineNumber: 157,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "row", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "col-sm-7", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "row", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "col-sm-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("h4", { className: "sub-title ml-3 mt-3", children: [
        "Category (",
        categories.length,
        ")"
      ] }, void 0, true, {
        fileName: "app/routes/category/route.jsx",
        lineNumber: 162,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/routes/category/route.jsx",
        lineNumber: 161,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "col-sm-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("h4", { className: "mt-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("span", { className: "btn btn-xs btn-info float-right", title: "New Category", onClick: addNewCategoryWindow, children: [
        "Add Category \xA0",
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("button", { children: "Add new " }, void 0, false, {
          fileName: "app/routes/category/route.jsx",
          lineNumber: 171,
          columnNumber: 19
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/category/route.jsx",
        lineNumber: 168,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/routes/category/route.jsx",
        lineNumber: 167,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/routes/category/route.jsx",
        lineNumber: 166,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/category/route.jsx",
      lineNumber: 160,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/category/route.jsx",
      lineNumber: 159,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/category/route.jsx",
      lineNumber: 158,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("hr", {}, void 0, false, {
      fileName: "app/routes/category/route.jsx",
      lineNumber: 179,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "row", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "col-sm-12 col-md-5 col-lg-5 order-lg-1 order-md-1 form-wrapper", children: showEditCategory || showNewCategory && // categories.map((category) => (
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
        CategoryForm,
        {
          category,
          categories,
          labelsuccessvalue,
          labelvalue,
          closeCategory
        },
        category._id,
        false,
        {
          fileName: "app/routes/category/route.jsx",
          lineNumber: 185,
          columnNumber: 9
        },
        this
      ) }, void 0, false, {
        fileName: "app/routes/category/route.jsx",
        lineNumber: 182,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: `col-sm-12 col-md-7 col-lg-7 contentWrapper`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "scroll", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(category_list_default, { categories, editCategoryWindow, closeCategory }, void 0, false, {
        fileName: "app/routes/category/route.jsx",
        lineNumber: 193,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/category/route.jsx",
        lineNumber: 192,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/category/route.jsx",
        lineNumber: 191,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/category/route.jsx",
      lineNumber: 181,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/category/route.jsx",
    lineNumber: 152,
    columnNumber: 10
  }, this);
}
_s2(CategoryComponent, "koNXRajr4Tw4ctIasPCE1MPpRI4=", false, function() {
  return [useLoaderData];
});
_c2 = CategoryComponent;
var _c2;
$RefreshReg$(_c2, "CategoryComponent");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  CategoryComponent as default,
  links
};
//# sourceMappingURL=/build/routes/category-IV5IFJ5F.js.map
