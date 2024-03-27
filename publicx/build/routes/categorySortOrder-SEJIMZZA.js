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

// app/Components/categorySortOrder/categorySortOrder.jsx
var import_react = __toESM(require_react(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/Components/categorySortOrder/categorySortOrder.jsx"
  );
  import.meta.hot.lastModified = "1709384153069.1104";
}
var CategorySortOrder = class extends import_react.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.cat = [];
  }
  state = {
    labelvalue: "",
    labelsuccessvalue: "",
    projectName: "",
    project: null,
    users: [],
    categorySequency: []
  };
  async componentDidMount() {
    await this.props.context.actions.getProjectData(this.props.projectId);
    if (this.state.users.length === 0)
      this.props.context.actions.setUsers();
    if (this.state.project && this.state.project.category) {
      this.setState({
        categorySequency: this.state.project.category.split(",")
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      project: nextProps.context.state.project,
      users: nextProps.context.state.users
    });
  }
  handleInputChange(e, index) {
    const value = e.target.value;
    const name = e.target.name;
    const new_index = value;
    const old_index = this.state.categorySequency.indexOf(name);
    let orderlist = array_move(
      this.state.categorySequency,
      old_index,
      new_index
    );
    this.setState({
      labelvalue: "",
      labelsuccessvalue: "",
      categorySequency: orderlist
    });
    function array_move(arr, old_index2, new_index2) {
      if (new_index2 >= arr.length) {
        new_index2 = old_index2;
      }
      arr.splice(new_index2, 0, arr.splice(old_index2, 1)[0]);
      return arr;
    }
  }
  render() {
    const { categories } = this.props;
    console.log(categories, "category value from component ");
    let category;
    if (this.state.categorySequency) {
      category = this.state.categorySequency;
    }
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react.default.Fragment, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "container content-wrapper", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { className: "project-title d.inline-block mt-3 mb-3", children: [
        this.state.projectName,
        "-Change Frequency"
      ] }, void 0, true, {
        fileName: "app/Components/categorySortOrder/categorySortOrder.jsx",
        lineNumber: 90,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("hr", {}, void 0, false, {
        fileName: "app/Components/categorySortOrder/categorySortOrder.jsx",
        lineNumber: 93,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "PUT", action: "/categorySortOrder/${category._id}", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-12", children: this.state.labelvalue ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          "span",
          {
            htmlFor: "project",
            className: "alert alert-danger",
            value: this.state.labelvalue,
            children: this.state.labelvalue
          },
          void 0,
          false,
          {
            fileName: "app/Components/categorySortOrder/categorySortOrder.jsx",
            lineNumber: 99,
            columnNumber: 19
          },
          this
        ) : this.state.labelsuccessvalue ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          "span",
          {
            htmlFor: "project",
            className: "alert alert-success",
            value: this.state.labelsuccessvalue,
            children: this.state.labelsuccessvalue
          },
          void 0,
          false,
          {
            fileName: "app/Components/categorySortOrder/categorySortOrder.jsx",
            lineNumber: 107,
            columnNumber: 19
          },
          this
        ) : "" }, void 0, false, {
          fileName: "app/Components/categorySortOrder/categorySortOrder.jsx",
          lineNumber: 97,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/Components/categorySortOrder/categorySortOrder.jsx",
          lineNumber: 96,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-12", children: " " }, void 0, false, {
          fileName: "app/Components/categorySortOrder/categorySortOrder.jsx",
          lineNumber: 120,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/Components/categorySortOrder/categorySortOrder.jsx",
          lineNumber: 119,
          columnNumber: 13
        }, this),
        categories && categories.map((category2, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { children: category2.title }, void 0, false, {
            fileName: "app/Components/categorySortOrder/categorySortOrder.jsx",
            lineNumber: 126,
            columnNumber: 21
          }, this) }, void 0, false, {
            fileName: "app/Components/categorySortOrder/categorySortOrder.jsx",
            lineNumber: 125,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            "input",
            {
              type: "text",
              onChange: (e) => this.handleInputChange(e, category2.title),
              value: category2.sequence || ""
            },
            void 0,
            false,
            {
              fileName: "app/Components/categorySortOrder/categorySortOrder.jsx",
              lineNumber: 129,
              columnNumber: 21
            },
            this
          ) }, void 0, false, {
            fileName: "app/Components/categorySortOrder/categorySortOrder.jsx",
            lineNumber: 128,
            columnNumber: 19
          }, this)
        ] }, index, true, {
          fileName: "app/Components/categorySortOrder/categorySortOrder.jsx",
          lineNumber: 124,
          columnNumber: 17
        }, this)),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-3" }, void 0, false, {
            fileName: "app/Components/categorySortOrder/categorySortOrder.jsx",
            lineNumber: 138,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            "input",
            {
              type: "submit",
              value: "Submit",
              className: "btn btn-info btn-block"
            },
            void 0,
            false,
            {
              fileName: "app/Components/categorySortOrder/categorySortOrder.jsx",
              lineNumber: 140,
              columnNumber: 17
            },
            this
          ) }, void 0, false, {
            fileName: "app/Components/categorySortOrder/categorySortOrder.jsx",
            lineNumber: 139,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/Components/categorySortOrder/categorySortOrder.jsx",
          lineNumber: 137,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/Components/categorySortOrder/categorySortOrder.jsx",
        lineNumber: 95,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/Components/categorySortOrder/categorySortOrder.jsx",
      lineNumber: 89,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/Components/categorySortOrder/categorySortOrder.jsx",
      lineNumber: 88,
      columnNumber: 7
    }, this);
  }
};

// app/routes/categorySortOrder/route.jsx
var import_node = __toESM(require_node(), 1);
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/categorySortOrder/route.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/categorySortOrder/route.jsx"
  );
  import.meta.hot.lastModified = "1709725745212.425";
}
function CategorySort() {
  _s();
  const {
    categories
  } = useLoaderData();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Header, {}, void 0, false, {
      fileName: "app/routes/categorySortOrder/route.jsx",
      lineNumber: 48,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Menu, {}, void 0, false, {
      fileName: "app/routes/categorySortOrder/route.jsx",
      lineNumber: 49,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Footer, {}, void 0, false, {
      fileName: "app/routes/categorySortOrder/route.jsx",
      lineNumber: 51,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(CategorySortOrder, { categories }, void 0, false, {
      fileName: "app/routes/categorySortOrder/route.jsx",
      lineNumber: 52,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/categorySortOrder/route.jsx",
    lineNumber: 46,
    columnNumber: 10
  }, this);
}
_s(CategorySort, "J32au3ktFbFwnSn6gfgGrJMoP+o=", false, function() {
  return [useLoaderData];
});
_c = CategorySort;
var _c;
$RefreshReg$(_c, "CategorySort");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  CategorySort as default
};
//# sourceMappingURL=/build/routes/categorySortOrder-SEJIMZZA.js.map
