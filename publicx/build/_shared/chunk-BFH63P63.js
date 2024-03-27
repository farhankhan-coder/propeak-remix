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

// app/Components/my-notification/components/my-notifications.jsx
var import_react = __toESM(require_react(), 1);
init_dist();
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/Components/my-notification/components/my-notifications.jsx"
  );
  import.meta.hot.lastModified = "1709612799420.3376";
}
var MyNotifications = class extends import_react.default.Component {
  componentWillReceiveProps(nextProps) {
    this.setState({
      myNotifications: nextProps.myNotifications
    });
  }
  async setNotificationRead(id) {
    let { response, err } = await markNotificationRead(
      id
    );
    if (err) {
      this.setState({
        message: "Error: " + err
        // updatedTime:dateUtil.getTime()
      });
    } else if (response && response.data.err) {
      this.setState({
        message: "Error: " + response.data.err
        // updatedTime:dateUtil.getTime()
      });
    } else {
      this.props.updateNotifications(response.data.data);
    }
  }
  render() {
    const myNotifications = this.props;
    var links = this.state.myNotifications.map((m) => {
      return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { className: "list-group-item", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "float-left", style: { width: "90%" }, children: m.url !== "" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          Link,
          {
            to: m.url,
            onClick: this.setNotificationRead.bind(this, m._id),
            style: { fontSize: "11px" },
            children: m.subject
          },
          void 0,
          false,
          {
            fileName: "app/Components/my-notification/components/my-notifications.jsx",
            lineNumber: 49,
            columnNumber: 15
          },
          this
        ) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { style: { fontSize: "11px" }, children: m.subject }, void 0, false, {
          fileName: "app/Components/my-notification/components/my-notifications.jsx",
          lineNumber: 57,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/Components/my-notification/components/my-notifications.jsx",
          lineNumber: 47,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "float-right", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { onClick: this.setNotificationRead.bind(this, m._id), children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("i", { className: "fas fa-times", style: { fontSize: "10px" } }, void 0, false, {
          fileName: "app/Components/my-notification/components/my-notifications.jsx",
          lineNumber: 62,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/Components/my-notification/components/my-notifications.jsx",
          lineNumber: 61,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "app/Components/my-notification/components/my-notifications.jsx",
          lineNumber: 60,
          columnNumber: 11
        }, this)
      ] }, m._id, true, {
        fileName: "app/Components/my-notification/components/my-notifications.jsx",
        lineNumber: 46,
        columnNumber: 9
      }, this);
    });
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react.default.Fragment, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: { position: "relative" }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "notification-triangle-up" }, void 0, false, {
        fileName: "app/Components/my-notification/components/my-notifications.jsx",
        lineNumber: 72,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        "div",
        {
          className: "myNotificationDisplay scroll",
          id: "userDetails",
          style: {
            width: "310px",
            height: "300px",
            overflowY: "scroll",
            paddingRight: "15px"
          },
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "list-group", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { style: { height: "20px", marginLeft: "10px" }, children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: " Notifications" }, void 0, false, {
                fileName: "app/Components/my-notification/components/my-notifications.jsx",
                lineNumber: 86,
                columnNumber: 17
              }, this),
              " "
            ] }, void 0, true, {
              fileName: "app/Components/my-notification/components/my-notifications.jsx",
              lineNumber: 85,
              columnNumber: 15
            }, this),
            links
          ] }, void 0, true, {
            fileName: "app/Components/my-notification/components/my-notifications.jsx",
            lineNumber: 84,
            columnNumber: 13
          }, this)
        },
        void 0,
        false,
        {
          fileName: "app/Components/my-notification/components/my-notifications.jsx",
          lineNumber: 74,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, true, {
      fileName: "app/Components/my-notification/components/my-notifications.jsx",
      lineNumber: 71,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/Components/my-notification/components/my-notifications.jsx",
      lineNumber: 70,
      columnNumber: 7
    }, this);
  }
};

export {
  MyNotifications
};
//# sourceMappingURL=/build/_shared/chunk-BFH63P63.js.map
