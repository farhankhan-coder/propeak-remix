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
import "/build/_shared/chunk-IX3CRINA.js";
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

// app/Components/chat/chat-form.jsx
var import_react = __toESM(require_react(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/Components/chat/chat-form.jsx"
  );
  import.meta.hot.lastModified = "1709384153069.1104";
}
var ChatForm = class extends import_react.Component {
  state = {
    title: "",
    message: ""
  };
  handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value,
      message: ""
    });
  };
  // addNewDiscussionMessage = async() => {
  //     // console.log("this.props.messageId",this.props.messageId);
  //     if(this.state.title === ""){
  //         this.setState({
  //             message: "Please enter a message"
  //         })
  //     } else {
  //         let { response, err } = await chatservice.addDiscussionMessage(this.state.title,this.props.subjectId,this.props.messageId);
  //         if (err) {
  //             this.setState({
  //                 message: 'Error : ' + err,
  //             });
  //         } else if (response && response.data.err) {
  //             this.setState({
  //                 message: 'Error : ' + response.data.err,
  //             });
  //         } else {
  //             // console.log("response.data",response.data);
  //             this.setState({
  //                 title: ''
  //             });
  //             if(!this.props.messageId){
  //                 this.props.addDiscussionMsg(response.data);
  //             } else {
  //                 this.props.addReplyMessage(response.data, this.props.messageId);
  //                 this.props.updateState(false,this.props.messageId );
  //             }
  //         }
  //     }
  // }
  render() {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { children: this.props.subjectTitle }, void 0, false, {
        fileName: "app/Components/chat/chat-form.jsx",
        lineNumber: 68,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/Components/chat/chat-form.jsx",
        lineNumber: 67,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "POST", action: "/chat", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { style: { color: "red" }, children: this.state.message }, void 0, false, {
          fileName: "app/Components/chat/chat-form.jsx",
          lineNumber: 72,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-8", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-group", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          "textarea",
          {
            className: "form-control",
            placeholder: "Enter your message",
            name: "title",
            value: this.state.title,
            onChange: this.handleChange
          },
          void 0,
          false,
          {
            fileName: "app/Components/chat/chat-form.jsx",
            lineNumber: 75,
            columnNumber: 17
          },
          this
        ) }, void 0, false, {
          fileName: "app/Components/chat/chat-form.jsx",
          lineNumber: 74,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/Components/chat/chat-form.jsx",
          lineNumber: 73,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-offset-11", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          "button",
          {
            className: "btn btn-primary btn-block",
            onClick: this.addNewDiscussionMessage,
            children: "Save"
          },
          void 0,
          false,
          {
            fileName: "app/Components/chat/chat-form.jsx",
            lineNumber: 85,
            columnNumber: 15
          },
          this
        ) }, void 0, false, {
          fileName: "app/Components/chat/chat-form.jsx",
          lineNumber: 84,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/Components/chat/chat-form.jsx",
        lineNumber: 71,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/Components/chat/chat-form.jsx",
        lineNumber: 70,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/Components/chat/chat-form.jsx",
      lineNumber: 66,
      columnNumber: 7
    }, this);
  }
};

// app/routes/chat/route.jsx
var import_node = __toESM(require_node(), 1);
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/chat/route.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/chat/route.jsx"
  );
  import.meta.hot.lastModified = "1709725796738.469";
}
function ChatMain() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Header, {}, void 0, false, {
      fileName: "app/routes/chat/route.jsx",
      lineNumber: 66,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Menu, {}, void 0, false, {
      fileName: "app/routes/chat/route.jsx",
      lineNumber: 67,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Footer, {}, void 0, false, {
      fileName: "app/routes/chat/route.jsx",
      lineNumber: 69,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(ChatForm, {}, void 0, false, {
      fileName: "app/routes/chat/route.jsx",
      lineNumber: 70,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/chat/route.jsx",
    lineNumber: 64,
    columnNumber: 10
  }, this);
}
_c = ChatMain;
var _c;
$RefreshReg$(_c, "ChatMain");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  ChatMain as default
};
//# sourceMappingURL=/build/routes/chat-GUWOESR3.js.map
