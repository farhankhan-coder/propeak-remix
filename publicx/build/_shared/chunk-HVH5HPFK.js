import {
  createHotContext
} from "/build/_shared/chunk-7LE2OC7F.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XU7DNSPJ.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/Components/tasks/form-errors.jsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/Components/tasks/form-errors.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/Components/tasks/form-errors.jsx"
  );
  import.meta.hot.lastModified = "1709384153105.1106";
}
var FormErrors = ({
  formErrors
}) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "formErrors", children: Object.keys(formErrors).map((fieldName, i) => {
  if (formErrors[fieldName].length > 0) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "alert alert-danger", children: [
      formErrors[fieldName],
      " ",
      fieldName
    ] }, i, true, {
      fileName: "app/Components/tasks/form-errors.jsx",
      lineNumber: 27,
      columnNumber: 14
    }, this);
  } else {
    return "";
  }
}) }, void 0, false, {
  fileName: "app/Components/tasks/form-errors.jsx",
  lineNumber: 24,
  columnNumber: 7
}, this);
_c = FormErrors;
var form_errors_default = FormErrors;
var _c;
$RefreshReg$(_c, "FormErrors");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

export {
  form_errors_default
};
//# sourceMappingURL=/build/_shared/chunk-HVH5HPFK.js.map
