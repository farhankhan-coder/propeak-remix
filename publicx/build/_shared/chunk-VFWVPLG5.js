import {
  auth_default
} from "/build/_shared/chunk-ZNTOAH5I.js";
import {
  Link,
  init_dist2 as init_dist
} from "/build/_shared/chunk-7K4UV4CH.js";
import {
  createHotContext
} from "/build/_shared/chunk-7LE2OC7F.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XU7DNSPJ.js";
import {
  require_react
} from "/build/_shared/chunk-BOXFZXVX.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/menu.jsx
var import_react = __toESM(require_react(), 1);
init_dist();
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/menu.jsx"
  );
}
var Menu = class extends import_react.default.Component {
  constructor(props) {
    super(props);
    this.toggleHide = this.toggleHide.bind(this);
    this.toggle_report_menu = this.toggle_report_menu.bind(this);
    this.toggle_admin_menu = this.toggle_admin_menu.bind(this);
    this.toggle_more_menu = this.toggle_more_menu.bind(this);
  }
  state = {
    menu: [
      {
        title: "Dashboard",
        code: "Dashboard",
        url: "/",
        active: true,
        role: "",
        display: true
      },
      {
        title: "Projects",
        code: "Projects",
        url: "/projects",
        location: "dashboard",
        active: false,
        role: "",
        display: true
      },
      {
        title: "Reports",
        code: "Task Report",
        url: "/reports",
        active: false,
        role: "admin,owner,support",
        display: true,
        submenu: [
          {
            title: "Task Report",
            code: "Task Report",
            url: "/taskReports",
            active: false,
            role: "admin,owner,support",
            display: true
          },
          {
            title: "User Report",
            url: "/userReports",
            active: false,
            role: "admin,owner,support",
            display: true
          },
          {
            title: "Active User Report",
            url: "/activeUsers",
            active: false,
            role: "admin,owner,support",
            display: true
          },
          {
            title: "StoryPoint Statistics",
            url: "/userTaskReports",
            active: false,
            role: "admin,owner,support",
            display: true
          },
          {
            title: "Incompelete task Reports",
            url: "/incompeleteTaskReports",
            active: false,
            role: "admin,owner,support",
            display: true
          },
          {
            title: "Project Progress Reports",
            url: "/projectProgressReports",
            active: false,
            role: "admin,owner,support",
            display: true
          },
          {
            title: "User Performance Reports",
            url: "/userPerformanceReports",
            active: false,
            role: "admin,owner,support",
            display: true
          }
        ]
      },
      {
        title: "Leave Application",
        code: "Leave Application",
        url: "/leave",
        active: false,
        role: "",
        display: true
      },
      {
        title: "Access Rights",
        code: "Access Rights",
        url: "/applevelaccessright",
        active: false,
        role: "admin,owner",
        display: true
      },
      {
        title: "Document Repository",
        code: "Global Document Repository",
        url: "/globalrepository",
        active: false,
        role: "",
        display: true
      },
      {
        title: "Chat",
        code: "Chat",
        url: "/chat",
        active: false,
        role: "",
        display: true
      },
      {
        title: "Company Setup",
        code: "Company",
        url: "/company",
        active: false,
        role: "admin,owner,support",
        display: true
      },
      {
        title: "Member Setup",
        code: "Users",
        url: "/users",
        active: false,
        role: "admin,owner,support",
        display: true
      },
      {
        title: "Member Groups",
        code: "User Groups",
        url: "/groups",
        active: false,
        role: "admin,owner,support",
        display: true
      },
      {
        title: "Categories",
        code: "Category",
        url: "/category",
        active: false,
        role: "admin,support",
        display: true
      },
      {
        title: "Broadcast",
        code: "Notification",
        url: "/notification/000",
        active: false,
        role: "admin,support",
        display: true
      },
      {
        title: "Admin",
        code: "",
        url: "/admin",
        active: false,
        role: "admin,owner,support",
        display: true,
        submenu: []
      },
      {
        title: "More",
        code: "",
        url: "/more",
        active: false,
        role: "admin,owner,support,user",
        display: true,
        submenu: []
      }
    ],
    rFlag: false,
    aFlag: false,
    mFlag: false,
    appLevelAccess: [],
    menuList: []
  };
  // { title: "Favorite Projects", url: "/favoriteProjects", active: false, role: "", display: true }, // { title:"Discussion Board", url: "/discussionBoard", active: false, role:"",display:true }, //Leave Application
  toggleHide() {
    this.setState({
      rFlag: false,
      aFlag: false,
      mFlag: false
    });
  }
  toggle_report_menu(e) {
    e.preventDefault();
    if (this.state.aFlag === true) {
      this.setState({
        rFlag: !this.state.rFlag,
        aFlag: false
      });
    } else if (this.state.mFlag === true) {
      this.setState({
        rFlag: !this.state.rFlag,
        mFlag: false
      });
    } else {
      this.setState({ rFlag: !this.state.rFlag });
    }
  }
  toggle_admin_menu(e) {
    e.preventDefault();
    if (this.state.rFlag === true) {
      this.setState({
        aFlag: !this.state.aFlag,
        rFlag: false
      });
    } else if (this.state.mFlag === true) {
      this.setState({
        aFlag: !this.state.aFlag,
        mFlag: false
      });
    } else {
      this.setState({ aFlag: !this.state.aFlag });
    }
  }
  toggle_more_menu(e) {
    e.preventDefault();
    if (this.state.rFlag === true) {
      this.setState({
        mFlag: !this.state.mFlag,
        rFlag: false
      });
    } else if (this.state.aFlag === true) {
      this.setState({
        aFlag: false,
        mFlag: !this.state.mFlag
      });
    } else {
      this.setState({ mFlag: !this.state.mFlag });
    }
  }
  render() {
    const elements = this.state.menu;
    const items = [];
    const adminitems = [];
    for (var i = 0; i < elements.length; i++) {
      const menuItem = elements[i];
      const { title, url, code, submenu } = menuItem;
      const menuLink = /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: url, children: [
        submenu ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("i", { className: "fas fa-angle-down", style: { marginRight: "5px" } }, void 0, false, {
          fileName: "app/routes/menu.jsx",
          lineNumber: 277,
          columnNumber: 24
        }, this) : null,
        title
      ] }, void 0, true, {
        fileName: "app/routes/menu.jsx",
        lineNumber: 276,
        columnNumber: 11
      }, this) }, i, false, {
        fileName: "app/routes/menu.jsx",
        lineNumber: 275,
        columnNumber: 7
      }, this);
      if (submenu) {
        const subMenuItems = submenu.map(
          (subItem, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: subItem.url, children: subItem.title }, void 0, false, {
            fileName: "app/routes/menu.jsx",
            lineNumber: 286,
            columnNumber: 13
          }, this) }, index, false, {
            fileName: "app/routes/menu.jsx",
            lineNumber: 285,
            columnNumber: 9
          }, this)
        );
        adminitems.push(
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "menu-with-submenu", onClick: () => this.toggleSubMenu(i), children: [
              title,
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("i", { className: "fas fa-angle-down" }, void 0, false, {
                fileName: "app/routes/menu.jsx",
                lineNumber: 294,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/menu.jsx",
              lineNumber: 292,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "submenu", children: subMenuItems }, void 0, false, {
              fileName: "app/routes/menu.jsx",
              lineNumber: 296,
              columnNumber: 13
            }, this)
          ] }, i, true, {
            fileName: "app/routes/menu.jsx",
            lineNumber: 291,
            columnNumber: 11
          }, this)
        );
      } else {
        items.push(menuLink);
      }
    }
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", { id: "side-navbar", className: "side-navbar  _mCS_1", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { id: "mCSB_1", className: "mCustomScrollBox mCS-light mCSB_vertical mCSB_inside", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { id: "mCSB_1_container", className: "mCSB_container", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "side-navbar-wrapper", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "main-menu", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h5", { className: "sidenav-heading", children: "Main Menu" }, void 0, false, {
            fileName: "app/routes/menu.jsx",
            lineNumber: 310,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { id: "side-main-menu", className: "side-menu list-unstyled", children: items }, void 0, false, {
            fileName: "app/routes/menu.jsx",
            lineNumber: 311,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/menu.jsx",
          lineNumber: 309,
          columnNumber: 15
        }, this),
        auth_default.get("userRole") !== "user" && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "main-menu mt-2", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h5", { className: "sidenav-heading", children: "Admin Menu" }, void 0, false, {
            fileName: "app/routes/menu.jsx",
            lineNumber: 317,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { id: "side-admin-menu", className: "side-menu list-unstyled", children: adminitems }, void 0, false, {
            fileName: "app/routes/menu.jsx",
            lineNumber: 318,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/menu.jsx",
          lineNumber: 316,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/menu.jsx",
        lineNumber: 308,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/menu.jsx",
        lineNumber: 307,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { id: "mCSB_1_scrollbar_vertical", className: "mCSB_scrollTools mCSB_1_scrollbar mCS-light mCSB_scrollTools_vertical", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mCSB_draggerContainer", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { id: "mCSB_1_dragger_vertical", className: "mCSB_dragger", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mCSB_dragger_bar" }, void 0, false, {
          fileName: "app/routes/menu.jsx",
          lineNumber: 328,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/menu.jsx",
          lineNumber: 327,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mCSB_draggerRail" }, void 0, false, {
          fileName: "app/routes/menu.jsx",
          lineNumber: 330,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/menu.jsx",
        lineNumber: 326,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/menu.jsx",
        lineNumber: 325,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/menu.jsx",
      lineNumber: 306,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/menu.jsx",
      lineNumber: 305,
      columnNumber: 7
    }, this);
  }
};

export {
  Menu
};
//# sourceMappingURL=/build/_shared/chunk-VFWVPLG5.js.map
