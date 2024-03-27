import "/build/_shared/chunk-HYFOUMWR.js";
import {
  config_default
} from "/build/_shared/chunk-CGPR7F7J.js";
import {
  auth_default
} from "/build/_shared/chunk-ZNTOAH5I.js";
import {
  Link
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

// app/routes/user/user-menu.jsx
var import_react = __toESM(require_react(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/user/user-menu.jsx"
  );
}
var UserMenu = class extends import_react.Component {
  render() {
    const { context } = this.props;
    const profilePicture = context && context.state && context.state.profilePicture;
    const userId = auth_default.get("userId");
    const userMenu = [
      { title: "Change Password", url: "/reset-password", active: false },
      { title: "Profile Picture", url: "/profilePicture", active: false },
      { title: "Log Out", url: "/logout", active: false }
    ];
    const UserPicUrl = profilePicture ? `${config_default.profileUrl}${userId}/${profilePicture}` : "";
    const links = userMenu.map((m) => {
      let loc = typeof window !== "undefined" ? window.location.pathname : "";
      let isActive = false;
      if (m.url !== "/" && loc.indexOf(m.url) > -1) {
        isActive = true;
      }
      m.active = isActive;
      var activeClass = m.active ? "menu-active" : "";
      return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { className: "list-group-item", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: m.url, className: m.url == "/logout" ? "text-danger mt-2" : "", children: m.title }, void 0, false, {
        fileName: "app/routes/user/user-menu.jsx",
        lineNumber: 53,
        columnNumber: 11
      }, this) }, m.title, false, {
        fileName: "app/routes/user/user-menu.jsx",
        lineNumber: 52,
        columnNumber: 9
      }, this);
    });
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react.default.Fragment, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "card userDetails", id: "userDetails", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "user-triangle-up" }, void 0, false, {
        fileName: "app/routes/user/user-menu.jsx",
        lineNumber: 63,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mt-2 mb-1 user-avatar", children: profilePicture ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: UserPicUrl, alt: "User Profile", className: "user-profile-img" }, void 0, false, {
        fileName: "app/routes/user/user-menu.jsx",
        lineNumber: 67,
        columnNumber: 13
      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("i", { className: "fa fa-user" }, void 0, false, {
        fileName: "app/routes/user/user-menu.jsx",
        lineNumber: 69,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/user/user-menu.jsx",
        lineNumber: 65,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "username", children: this.props.user }, void 0, false, {
        fileName: "app/routes/user/user-menu.jsx",
        lineNumber: 72,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "dropdown-divider" }, void 0, false, {
        fileName: "app/routes/user/user-menu.jsx",
        lineNumber: 73,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "list-group list-group-flush", children: links }, void 0, false, {
        fileName: "app/routes/user/user-menu.jsx",
        lineNumber: 74,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/user/user-menu.jsx",
      lineNumber: 62,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/user/user-menu.jsx",
      lineNumber: 61,
      columnNumber: 7
    }, this);
  }
};

// app/routes/user-menu/route.jsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/user-menu/route.jsx"
  );
  import.meta.hot.lastModified = "1709553688772.6973";
}
function userMenuRoute() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(UserMenu, {}, void 0, false, {
    fileName: "app/routes/user-menu/route.jsx",
    lineNumber: 17,
    columnNumber: 13
  }, this) }, void 0, false, {
    fileName: "app/routes/user-menu/route.jsx",
    lineNumber: 16,
    columnNumber: 9
  }, this);
}
export {
  userMenuRoute as default
};
//# sourceMappingURL=/build/routes/user-menu-T2PCCNWX.js.map
