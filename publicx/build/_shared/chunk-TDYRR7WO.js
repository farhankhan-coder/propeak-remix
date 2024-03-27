import {
  lookup
} from "/build/_shared/chunk-WSROVG5I.js";
import {
  MyNotifications
} from "/build/_shared/chunk-BFH63P63.js";
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

// app/routes/header.jsx
var import_react = __toESM(require_react(), 1);

// app/common/add_message.jsx
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/common/add_message.jsx"
  );
  import.meta.hot.lastModified = "1709382069643.5525";
}
var addMessage = (data, that) => {
  let userName = auth_default.get("userName");
  let userId = auth_default.get("userId");
  let chatWindows = Object.assign([], that.state.chatWindows);
  let messages = Object.assign([], that.state.messages);
  let fromUser = that.state.users && that.state.users.filter((u) => {
    return u._id === data.toUser;
  });
  let fromUserName = fromUser.length > 0 ? fromUser[0].name : "";
  let id = that.state.users && that.state.users.filter((u) => {
    return u.name === data.author;
  });
  let uId = id.length > 0 ? id[0]._id : "";
  let userCondition = data.groupName === "" ? userName !== data.author && userId === data.toUser : userName !== data.author;
  if (userCondition) {
    let chatWindow = null, chatWindowsCount = chatWindows.length;
    let isWindowExists = false;
    if (chatWindowsCount > 0) {
      for (let i = 0; i < chatWindowsCount; ++i) {
        if (data.groupName === chatWindows[i].name || data.author === chatWindows[i].name) {
          isWindowExists = true;
          if (!chatWindows[i].messages || chatWindows[i].messages.length <= 0) {
            chatWindows[i].messages = [];
          }
          for (let j = 0; j < chatWindows[i].messages.length; j++) {
            let userMsgCondition = data.groupName === "" ? chatWindows[i].messages[j].chatId === userId + "-" + uId || chatWindows[i].messages[j].chatId === uId + "-" + userId : chatWindows[i].messages[j].chatId === that.state.groupId;
            if (userMsgCondition) {
              let msgObj = {
                userName: data.groupName !== "" ? data.author : data.author,
                msgText: data.message
              };
              chatWindows[i].messages[j].msgList.push(msgObj);
            }
          }
          if (chatWindows[i].messages.length === 0) {
            let chatObj = {
              chatId: data.groupName === "" ? userId + "-" + that.state.toSendMessages : data.toUser + "-" + data.groupName,
              msgList: []
            };
            let msgObj = {
              userName: data.groupName !== "" ? data.author : fromUserName,
              msgText: data.message
            };
            chatObj.msgList.push(msgObj);
            chatWindows[i].messages.push(chatObj);
          }
          messages = chatWindows[i].messages;
        }
      }
    }
    if (!isWindowExists) {
      let messagesToAdd = [];
      let chatObj = {
        chatId: data.groupName === "" ? userId + "-" + uId : data.toUser + "-" + data.groupName,
        msgList: []
      };
      let msgObj = {
        userName: data.groupName !== "" ? data.author : data.author,
        msgText: data.message
      };
      chatObj.msgList.push(msgObj);
      messagesToAdd.push(chatObj);
      chatWindow = {
        name: data.groupName !== "" ? data.groupName : data.author,
        id: uId,
        messages: messagesToAdd
      };
      messages = messagesToAdd;
      chatWindows.push(chatWindow);
    }
  } else {
    let chatWindowsCount = chatWindows.length;
    if (chatWindowsCount > 0) {
      let fromUser2 = that.state.users && that.state.users.filter((u) => {
        return u._id === data.toUser;
      });
      let fromUserName2 = fromUser2.length > 0 ? fromUser2[0].name : "";
      for (let i = 0; i < chatWindowsCount; ++i) {
        if (data.groupName === chatWindows[i].name || fromUserName2 === chatWindows[i].name) {
          if (!chatWindows[i].messages || chatWindows[i].messages.length <= 0) {
            chatWindows[i].messages = [];
          }
          for (let j = 0; j < chatWindows[i].messages.length; j++) {
            let userMsgCondition = data.groupName === "" ? chatWindows[i].messages[j].chatId === userId + "-" + data.toUser || chatWindows[i].messages[j].chatId === data.toUser + "-" + userId : chatWindows[i].messages[j].chatId === that.state.groupId;
            if (userMsgCondition) {
              let msgObj = {
                userName: data.groupName !== "" ? data.author : data.author,
                msgText: data.message
              };
              chatWindows[i].messages[j].msgList.push(msgObj);
            }
          }
          if (chatWindows[i].messages.length === 0) {
            let chatObj = {
              chatId: data.groupName === "" ? userId + "-" + that.state.toSendMessages : data.toUser + "-" + data.groupName,
              msgList: []
            };
            let msgObj = {
              userName: data.groupName !== "" ? data.author : data.author,
              msgText: data.message
            };
            chatObj.msgList.push(msgObj);
            chatWindows[i].messages.push(chatObj);
          }
          messages = chatWindows[i].messages;
        }
      }
    }
  }
  that.props.context.actions.updateState("chatWindows", chatWindows);
  that.setState({
    messages,
    chatWindows
  });
};

// app/routes/header.jsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/header.jsx"
  );
  import.meta.hot.lastModified = "1709613072358.4138";
}
var Header = class extends import_react.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedOut: false,
      show: false,
      showMyNotifications: false,
      myNotifications: [],
      userId: auth_default.get("userId"),
      profilePicture: "",
      users: [],
      dataMessage: null,
      chatWindows: []
    };
    this.toggleShowMenu = this.toggleShowMenu.bind(this);
    this.toggleShowMyNotifications = this.toggleShowMyNotifications.bind(this);
    this.updateNotifications = this.updateNotifications.bind(this);
    this.socket = lookup.connect("/", {
      secure: true,
      path: "/chat/socket.io"
    });
    this.userId = auth_default.get("userId");
    this.socket.emit("my notification userId", this.userId);
    this.socket.on("notificationList", (myNotification) => {
      this.setState({
        myNotifications: [...this.state.myNotifications, myNotification]
      });
    });
    this.socket.on("RECEIVE_HEADER_MESSAGE", (data) => {
      let userName = auth_default.get("userName");
      let userId = auth_default.get("userId");
      if (data.toUser === userId) {
        this.setState({
          dataMessage: data
        });
        if (data.groupName === "") {
          if (data.toUser === userId || userName === data.author) {
            if (!this.props.context.state.chatWindows.length) {
              addMessage(data, this);
            }
          }
        } else {
          if (!this.props.context.state.chatWindows.length) {
            addMessage(data, this);
          }
        }
      }
      this.props.context.actions.updateState("dataMessage", data);
    });
  }
  toggleShowMenu() {
    this.setState({
      show: !this.state.show
    });
  }
  toggleShowMyNotifications() {
    this.setState({
      showMyNotifications: !this.state.showMyNotifications
    });
  }
  async componentDidMount() {
    this.getMyNotification();
    await this.getProfilePicture();
    if (this.state.users.length === 0) {
      await this.props.context.actions.setUsers();
    }
    this.activeUsers();
  }
  async getMyNotification() {
    try {
      let { response, err } = await mynotificationservice.getMyNotifications();
      if (err) {
        this.setState({
          message: "Error: " + err
        });
      } else if (response && response.data.err) {
        this.setState({
          message: "Error: " + response.data.err
        });
      } else {
        this.setState({
          myNotifications: response.data
        });
      }
    } catch (e) {
      console.error("Error fetching notifications:", e);
    }
  }
  async getProfilePicture() {
    try {
      let { response, err } = await userservice.getProfilePicture(
        this.state.userId
      );
      if (err) {
        this.setState({
          message: "Error: " + err
        });
      } else if (response && response.data.err) {
        this.setState({
          message: "Error: " + response.data.err
        });
      } else {
        this.props.context.actions.updateState(
          "profilePicture",
          response.data.profilePicture
        );
        this.setState({
          profilePicture: response.data.profilePicture
        });
      }
    } catch (e) {
      console.error("Error fetching profile picture:", e);
    }
  }
  updateNotifications(updatedNotification) {
    let filteredNotifications = this.state.myNotifications.filter((f) => {
      return f._id !== updatedNotification._id;
    });
    this.setState({
      myNotifications: filteredNotifications
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      dataMessage: nextProps.context.state.dataMessage,
      users: nextProps.context.state.users,
      chatWindows: nextProps.context.state.chatWindows
    });
  }
  activeUsers() {
    let userId = auth_default.get("userId");
    this.socket.emit("new user", userId);
    this.socket.on("userId", (userId2) => {
    });
    this.socket.on("showUsers", (users) => {
      let userNameArray = [];
      for (let i = 0; i < this.state.users.length; i++) {
        for (let j = 0; j < users.length; j++) {
          if (this.state.users[i]._id === users[j]) {
            userNameArray.push(this.state.users[i].name);
          }
        }
      }
      this.props.context.actions.updateState("activeUsers", userNameArray);
      this.setState({
        activeUsers: userNameArray
      });
    });
  }
  render() {
    let user = auth_default.get("userName");
    let UserPicUrl = "";
    if (this.state.profilePicture) {
      UserPicUrl = `${config_default.profileUrl}${this.state.userId}/${this.state.profilePicture}`;
    }
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", { className: "header", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", { className: "navbar fixed-top", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "navbar-holder d-flex align-items-center justify-content-between", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "navbar-header", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { id: "toggle-menu", href: "#", className: "menu-btn", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("i", { className: "fas fa-bars" }, void 0, false, {
        fileName: "app/routes/header.jsx",
        lineNumber: 198,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/routes/header.jsx",
        lineNumber: 197,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/routes/header.jsx",
        lineNumber: 196,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "nav-menu list-unstyled d-flex flex-md-row align-items-md-center", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "userinfo mr-2", children: [
          " ",
          "Welcome ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: user }, void 0, false, {
            fileName: "app/routes/header.jsx",
            lineNumber: 205,
            columnNumber: 27
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/header.jsx",
          lineNumber: 203,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/header.jsx",
          lineNumber: 202,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { className: "nav-item", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/projects/favorites/Projectlist", className: "nav-link", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("i", { className: "fa fa-star" }, void 0, false, {
          fileName: "app/routes/header.jsx",
          lineNumber: 210,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "app/routes/header.jsx",
          lineNumber: 209,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/header.jsx",
          lineNumber: 208,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { className: "nav-item", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/chat", className: "nav-link", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("i", { className: "fa fa-comment" }, void 0, false, {
          fileName: "app/routes/header.jsx",
          lineNumber: 215,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "app/routes/header.jsx",
          lineNumber: 214,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/header.jsx",
          lineNumber: 213,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { className: "nav-item dropdown", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            "a",
            {
              id: "notifications",
              rel: "nofollow",
              "data-target": "#",
              href: "#",
              "data-toggle": "dropdown",
              "aria-haspopup": "true",
              "aria-expanded": "false",
              className: "nav-link",
              onClick: this.toggleShowMyNotifications,
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("i", { className: "fa fa-bell" }, void 0, false, {
                  fileName: "app/routes/header.jsx",
                  lineNumber: 230,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "badge ", style: { backgorund: "#fff", color: "#000" }, children: this.state.myNotifications.length }, void 0, false, {
                  fileName: "app/routes/header.jsx",
                  lineNumber: 231,
                  columnNumber: 19
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "app/routes/header.jsx",
              lineNumber: 219,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { "aria-labelledby": "notifications", id: "notification-menu", className: "dropdown-menu", children: this.state.showMyNotifications ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            MyNotifications,
            {
              myNotifications: this.state.myNotifications,
              updateNotifications: this.updateNotifications
            },
            void 0,
            false,
            {
              fileName: "app/routes/header.jsx",
              lineNumber: 237,
              columnNumber: 21
            },
            this
          ) : "" }, void 0, false, {
            fileName: "app/routes/header.jsx",
            lineNumber: 235,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/header.jsx",
          lineNumber: 218,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { className: "nav-item", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          "div",
          {
            className: "nav-icons nav-userprofile order-sm-12 navbar-toggler-icons text-white",
            onClick: this.toggleShowMenu,
            children: [
              this.state.profilePicture ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: UserPicUrl, alt: "User Profile", className: "user-profile-img" }, void 0, false, {
                fileName: "app/routes/header.jsx",
                lineNumber: 252,
                columnNumber: 21
              }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("i", { className: "fa fa-user" }, void 0, false, {
                fileName: "app/routes/header.jsx",
                lineNumber: 254,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "toggleMenu", children: this.state.show ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(UserMenu, { user, context: this.props.context }, void 0, false, {
                fileName: "app/routes/header.jsx",
                lineNumber: 256,
                columnNumber: 66
              }, this) : "" }, void 0, false, {
                fileName: "app/routes/header.jsx",
                lineNumber: 256,
                columnNumber: 19
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "app/routes/header.jsx",
            lineNumber: 247,
            columnNumber: 17
          },
          this
        ) }, void 0, false, {
          fileName: "app/routes/header.jsx",
          lineNumber: 246,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/header.jsx",
        lineNumber: 201,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/header.jsx",
      lineNumber: 195,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/header.jsx",
      lineNumber: 194,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/header.jsx",
      lineNumber: 193,
      columnNumber: 7
    }, this);
  }
};

export {
  Header
};
//# sourceMappingURL=/build/_shared/chunk-TDYRR7WO.js.map
