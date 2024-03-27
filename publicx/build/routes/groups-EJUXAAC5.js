import {
  form_errors_default
} from "/build/_shared/chunk-HVH5HPFK.js";
import {
  require_browser_umd
} from "/build/_shared/chunk-FN7THW23.js";
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
  __commonJS,
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// node_modules/react-fast-compare/index.js
var require_react_fast_compare = __commonJS({
  "node_modules/react-fast-compare/index.js"(exports, module) {
    var hasElementType = typeof Element !== "undefined";
    var hasMap = typeof Map === "function";
    var hasSet = typeof Set === "function";
    var hasArrayBuffer = typeof ArrayBuffer === "function" && !!ArrayBuffer.isView;
    function equal(a, b) {
      if (a === b)
        return true;
      if (a && b && typeof a == "object" && typeof b == "object") {
        if (a.constructor !== b.constructor)
          return false;
        var length, i, keys;
        if (Array.isArray(a)) {
          length = a.length;
          if (length != b.length)
            return false;
          for (i = length; i-- !== 0; )
            if (!equal(a[i], b[i]))
              return false;
          return true;
        }
        var it;
        if (hasMap && a instanceof Map && b instanceof Map) {
          if (a.size !== b.size)
            return false;
          it = a.entries();
          while (!(i = it.next()).done)
            if (!b.has(i.value[0]))
              return false;
          it = a.entries();
          while (!(i = it.next()).done)
            if (!equal(i.value[1], b.get(i.value[0])))
              return false;
          return true;
        }
        if (hasSet && a instanceof Set && b instanceof Set) {
          if (a.size !== b.size)
            return false;
          it = a.entries();
          while (!(i = it.next()).done)
            if (!b.has(i.value[0]))
              return false;
          return true;
        }
        if (hasArrayBuffer && ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
          length = a.length;
          if (length != b.length)
            return false;
          for (i = length; i-- !== 0; )
            if (a[i] !== b[i])
              return false;
          return true;
        }
        if (a.constructor === RegExp)
          return a.source === b.source && a.flags === b.flags;
        if (a.valueOf !== Object.prototype.valueOf && typeof a.valueOf === "function" && typeof b.valueOf === "function")
          return a.valueOf() === b.valueOf();
        if (a.toString !== Object.prototype.toString && typeof a.toString === "function" && typeof b.toString === "function")
          return a.toString() === b.toString();
        keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length)
          return false;
        for (i = length; i-- !== 0; )
          if (!Object.prototype.hasOwnProperty.call(b, keys[i]))
            return false;
        if (hasElementType && a instanceof Element)
          return false;
        for (i = length; i-- !== 0; ) {
          if ((keys[i] === "_owner" || keys[i] === "__v" || keys[i] === "__o") && a.$$typeof) {
            continue;
          }
          if (!equal(a[keys[i]], b[keys[i]]))
            return false;
        }
        return true;
      }
      return a !== a && b !== b;
    }
    module.exports = function isEqual2(a, b) {
      try {
        return equal(a, b);
      } catch (error) {
        if ((error.message || "").match(/stack|recursion/i)) {
          console.warn("react-fast-compare cannot handle circular refs");
          return false;
        }
        throw error;
      }
    };
  }
});

// app/routes/groups/route.jsx
var import_react6 = __toESM(require_react(), 1);

// app/Components/groups/group-list.jsx
var import_react4 = __toESM(require_react(), 1);

// app/Components/groups/group-form.jsx
var import_react2 = __toESM(require_react(), 1);

// app/Components/tasks/tag.jsx
var import_react = __toESM(require_react(), 1);
var import_react_fast_compare = __toESM(require_react_fast_compare(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/Components/tasks/tag.jsx"
  );
  import.meta.hot.lastModified = "1709384153105.1106";
}
var Tag = class extends import_react.default.Component {
  onDeleteTag(value, e) {
    this.props.onDeleteTag(value);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !(0, import_react_fast_compare.default)(this.props, nextProps);
  }
  render() {
    var tag = /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "user-tags", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
        "span",
        {
          onClick: this.onDeleteTag.bind(this, this.props.value),
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("i", { className: "fas fa-times" }, void 0, false, {
              fileName: "app/Components/tasks/tag.jsx",
              lineNumber: 28,
              columnNumber: 16
            }, this),
            " \xA0"
          ]
        },
        void 0,
        true,
        {
          fileName: "app/Components/tasks/tag.jsx",
          lineNumber: 26,
          columnNumber: 13
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: this.props.value }, void 0, false, {
        fileName: "app/Components/tasks/tag.jsx",
        lineNumber: 30,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/Components/tasks/tag.jsx",
      lineNumber: 25,
      columnNumber: 13
    }, this);
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react.default.Fragment, { children: tag }, void 0, false, {
      fileName: "app/Components/tasks/tag.jsx",
      lineNumber: 34,
      columnNumber: 13
    }, this);
  }
};

// app/Components/groups/group-form.jsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/Components/groups/group-form.jsx"
  );
  import.meta.hot.lastModified = "1709384153077.1106";
}
var labelStyle = {
  fontSize: "small"
};
var GroupForm = class extends import_react2.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      group: props.group || {
        groupName: "",
        groupMembers: []
      },
      formValid: props.groupId ? true : false,
      titleCheck: false,
      checkMsg: false,
      message: "",
      groupId: props.groupId,
      formErrors: {},
      groupNameValid: "",
      dropdownHidden: true,
      labelsuccessvalue: props.labelsuccessvalue,
      users: props.users,
      allUserDropdowns: [],
      user: props.user,
      selectGroupMembers: Array.isArray(props.group.groupMembers) ? props.group.groupMembers.join(", ") : "",
      userNameToId: props.userNameToId
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      group: nextProps.group,
      groupId: nextProps.groupId,
      users: nextProps.users,
      user: nextProps.user,
      userNameToId: nextProps.userNameToId,
      labelsuccessvalue: nextProps.labelsuccessvalue
    });
  }
  // handleInputChange(event) {
  //   const value = event.target.value;
  //   const name = event.target.name;
  //   if (name === "selectGroupMembers") {
  //     console.log("selectGroupMembers:", value);
  //     this.onSelectDropdown(event.target.value);
  //     this.setState(
  //       {
  //         [name]: value,
  //         checkMsg: false,
  //         labelsuccessvalue: "",
  //       },
  //       this.validateField.bind(this, name, value)
  //     );
  //   } else {
  //     this.setState(
  //       {
  //         group: {
  //           ...this.state.group,
  //           [name]: value,
  //         },
  //         checkMsg: false,
  //         labelsuccessvalue: "",
  //       },
  //       this.validateField.bind(this, name, value)
  //     );
  //   }
  // }
  // onSelectDropdown(userSelected) {
  //   if (userSelected === "") {
  //     this.setState({
  //       dropdownHidden: true,
  //     });
  //   } else {
  //     let name1 = userSelected.toLowerCase();
  //     var allUserD = [];
  //     var userAssigned = "";
  //     let users =
  //       this.state.users.length > 0 &&
  //       this.state.users.filter((u) => {
  //         if (this.state.group && this.state.group.groupMembers.length > 0) {
  //           for (let i = 0; i < this.state.group.groupMembers.length; i++) {
  //             if (u._id === this.state.group.groupMembers[i]) {
  //               userAssigned = u._id;
  //             }
  //           }
  //         }
  //         return u._id !== userAssigned;
  //       });
  //     for (let j = 0; j < users.length; j++) {
  //       if (users[j].name !== undefined && users[j].name !== null) {
  //         if (users[j].name.toLowerCase().indexOf(name1) > -1) {
  //           allUserD.push(
  //             <li
  //               onClick={this.addAssignUser.bind(this, users[j]._id)}
  //               value={users[j]._id}
  //               key={users[j]._id}
  //               id={users[j]._id}
  //               style={{ cursor: "pointer", marginLeft: "-20px" }}
  //             >
  //               {users[j].name}
  //             </li>
  //           );
  //         }
  //       }
  //     }
  //     this.setState({
  //       dropdownHidden: false,
  //       allUserDropdowns: allUserD,
  //     });
  //   }
  // }
  handleInputChange(event) {
    const { name, value } = event.target;
    const { users } = this.state;
    if (name === "selectGroupMembers") {
      const selectedUserIds = value.split(",");
      const selectedUserNames = selectedUserIds.map((id) => {
        const user = users.find((user2) => user2._id === id);
        return user ? user.name : "";
      });
      this.setState({
        [name]: selectedUserIds.join(", "),
        selectGroupMemberNames: selectedUserNames.join(", "),
        // Optional: Store selected user names for display
        checkMsg: false,
        labelsuccessvalue: ""
      });
    } else {
      this.setState(
        {
          group: {
            ...this.state.group,
            [name]: value
          },
          checkMsg: false,
          labelsuccessvalue: ""
        },
        () => this.validateField(name, value)
      );
    }
  }
  //   handleInputChange(event) {
  //     const value = event.target.value;
  //     const name = event.target.name;
  //     const { users } = this.state;
  //     if (name === "selectGroupMembers") {
  //         const selectedUserNames = value
  //             .split(",")
  //             .map(id => users.find(user => user._id === id)?.name || ""); 
  //         this.setState({
  //             [name]: selectedUserNames.join(", "), 
  //             checkMsg: false,
  //             labelsuccessvalue: "",
  //         });
  //     } else {
  //         this.setState(
  //             {
  //                 group: {
  //                     ...this.state.group,
  //                     [name]: value,
  //                 },
  //                 checkMsg: false,
  //                 labelsuccessvalue: "",
  //             },
  //             () => this.validateField(name, value)
  //         );
  //     }
  // }
  onSelectDropdown(userSelected) {
    if (userSelected === "") {
      this.setState({
        dropdownHidden: true
      });
    } else {
      const { groupMembers, users } = this.state;
      const filteredUsers = users.filter((user) => !groupMembers.includes(user._id));
      const filteredUserNames = filteredUsers.filter((user) => user.name.toLowerCase().includes(userSelected.toLowerCase())).map((user) => /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
        "li",
        {
          onClick: () => this.addAssignUser(user._id),
          style: { cursor: "pointer", marginLeft: "-20px" },
          children: user.name
        },
        user._id,
        false,
        {
          fileName: "app/Components/groups/group-form.jsx",
          lineNumber: 208,
          columnNumber: 15
        },
        this
      ));
      this.setState({
        dropdownHidden: false,
        allUserDropdowns: filteredUserNames
      });
    }
  }
  //   onSelectDropdown(userSelected) {
  //     if (userSelected === "") {
  //         this.setState({
  //             dropdownHidden: true,
  //         });
  //     } else {
  //         const { groupMembers, users } = this.state;
  //         const filteredUsers = users.filter(user => !groupMembers.includes(user._id)); // Filter out already selected group members
  //         const filteredUserNames = filteredUsers
  //             .filter(user => user.name.toLowerCase().includes(userSelected.toLowerCase()))
  //             .map(user => (
  //                 <li
  //                     onClick={() => this.addAssignUser(user._id)}
  //                     key={user._id}
  //                     style={{ cursor: "pointer", marginLeft: "-20px" }}
  //                 >
  //                     {user.name}
  //                 </li>
  //             ));
  //         this.setState({
  //             dropdownHidden: false,
  //             allUserDropdowns: filteredUserNames,
  //         });
  //     }
  // }
  addAssignUser(id) {
    let input2 = id;
    var allUserDropdowns2 = this.state.allUserDropdowns.filter((u) => {
      return u.props.value !== id;
    });
    if (input2.length === 0 || input2[0] === "")
      return;
    let assignU = this.state.group.groupMembers.filter((aUser) => {
      return aUser === input2;
    });
    let assUser = assignU.length > 0 ? assignU[0] : "";
    if (assUser) {
      input2 = "";
    } else {
      this.setState({
        group: {
          ...this.state.group,
          groupMembers: [...this.state.group.groupMembers, input2]
        },
        allUserDropdowns: allUserDropdowns2,
        selectGroupMembers: "",
        dropdownHidden: true
      });
    }
  }
  onDeleteGroupMembers(tag) {
    let userId = this.state.userNameToId && this.state.userNameToId[tag.toLowerCase().replace(/ +/g, "")];
    var groupMembers = this.state.group && this.state.group.groupMembers.filter((t) => {
      return t !== userId;
    });
    this.setState({
      group: {
        ...this.state.group,
        groupMembers: [...this.state.group.groupMembers, input]
      },
      allUserDropdowns,
      selectGroupMembers: "",
      dropdownHidden: true
    });
  }
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let groupNameValid = this.state.groupNameValid;
    switch (fieldName) {
      case "groupName":
        groupNameValid = value.length !== 0;
        fieldValidationErrors.groupName = groupNameValid ? "" : " Please fill the";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        groupNameValid
      },
      this.validateForm(this.state.groupId)
    );
  }
  validateForm(groupId) {
    if (groupId) {
      this.setState({ formValid: true });
    }
  }
  onGroupKeyPress(e) {
    var nodes = document.getElementById("search_groups").childNodes;
    if (nodes.length > 0) {
      if (e.keyCode === 40) {
        if (this.downCount < nodes.length - 1) {
          this.downCount++;
        }
        for (var i = 0; i < nodes.length; i++) {
          if (this.downCount === i) {
            nodes[i].style.background = "lightblue";
          } else {
            nodes[i].style.background = "";
          }
        }
      } else if (e.keyCode === 38) {
        if (this.downCount > 0) {
          this.downCount--;
        }
        for (let i2 = 0; i2 < nodes.length; i2++) {
          if (this.downCount === i2) {
            nodes[i2].style.background = "lightblue";
          } else {
            nodes[i2].style.background = "";
          }
        }
      } else if (e.keyCode === 13) {
        e.preventDefault();
        this.addAssignUser(nodes[this.downCount].id);
      }
    }
  }
  render() {
    const { group } = this.state;
    console.log(group, "group data aa raha hai kya ");
    const { checkMsg, selectGroupMembers } = this.state;
    const { groupName, groupMembers } = group;
    const groupmembers = groupMembers.length > 0 && groupMembers.map((tag) => {
      let userName = this.state.user && this.state.user[tag];
      return userName ? /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
        Tag,
        {
          value: userName,
          onDeleteTag: this.onDeleteGroupMembers
        },
        tag,
        false,
        {
          fileName: "app/Components/groups/group-form.jsx",
          lineNumber: 383,
          columnNumber: 11
        },
        this
      ) : "";
    });
    return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { style: { marginTop: "10px" }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { onClick: this.props.closeGroup, className: "float-right mr-3", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("i", { className: "fas fa-times close" }, void 0, false, {
          fileName: "app/Components/groups/group-form.jsx",
          lineNumber: 396,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("button", { children: "close" }, void 0, false, {
          fileName: "app/Components/groups/group-form.jsx",
          lineNumber: 397,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/Components/groups/group-form.jsx",
        lineNumber: 395,
        columnNumber: 9
      }, this),
      this.state.group._id ? /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h4", { className: "sub-title ml-3", children: [
        " ",
        "Edit Group : ",
        this.state.group.groupName
      ] }, void 0, true, {
        fileName: "app/Components/groups/group-form.jsx",
        lineNumber: 401,
        columnNumber: 11
      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("h4", { className: "sub-title ml-3", children: " Add Group" }, void 0, false, {
        fileName: "app/Components/groups/group-form.jsx",
        lineNumber: 406,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "container", children: [
        this.state.labelsuccessvalue || this.state.message || this.state.formErrors ? /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "row", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "col-sm-12", children: [
          checkMsg ? /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { className: "alert alert-danger", children: this.state.message }, void 0, false, {
            fileName: "app/Components/groups/group-form.jsx",
            lineNumber: 417,
            columnNumber: 21
          }, this) }, void 0, false, {
            fileName: "app/Components/groups/group-form.jsx",
            lineNumber: 416,
            columnNumber: 19
          }, this) : "",
          this.state.formErrors ? /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(form_errors_default, { formErrors: this.state.formErrors }, void 0, false, {
            fileName: "app/Components/groups/group-form.jsx",
            lineNumber: 425,
            columnNumber: 19
          }, this) : "",
          this.state.labelsuccessvalue ? /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "alert alert-success", children: this.state.labelsuccessvalue }, void 0, false, {
            fileName: "app/Components/groups/group-form.jsx",
            lineNumber: 430,
            columnNumber: 19
          }, this) : ""
        ] }, void 0, true, {
          fileName: "app/Components/groups/group-form.jsx",
          lineNumber: 414,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/Components/groups/group-form.jsx",
          lineNumber: 413,
          columnNumber: 13
        }, this) : "",
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "form-group", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
          Form,
          {
            method: this.state.group._id ? "PUT" : "POST",
            action: this.state.group._id ? `/groups/${this.state.group._id}` : "/groups",
            children: [
              " ",
              /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "row", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "col-sm-12", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "form-group", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { htmlFor: "Group Name", style: labelStyle, children: "Group Name" }, void 0, false, {
                  fileName: "app/Components/groups/group-form.jsx",
                  lineNumber: 454,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("span", { style: { color: "red" }, children: "*" }, void 0, false, {
                  fileName: "app/Components/groups/group-form.jsx",
                  lineNumber: 457,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
                  "input",
                  {
                    type: "text",
                    name: "groupName",
                    className: "form-control",
                    placeholder: "Group Name",
                    value: groupName,
                    onChange: this.handleInputChange
                  },
                  void 0,
                  false,
                  {
                    fileName: "app/Components/groups/group-form.jsx",
                    lineNumber: 458,
                    columnNumber: 21
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "app/Components/groups/group-form.jsx",
                lineNumber: 453,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "app/Components/groups/group-form.jsx",
                lineNumber: 452,
                columnNumber: 17
              }, this) }, void 0, false, {
                fileName: "app/Components/groups/group-form.jsx",
                lineNumber: 451,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "row", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "col-sm-12", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "form-group", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { htmlFor: "Select Group Members", style: labelStyle, children: "Select Group Members" }, void 0, false, {
                  fileName: "app/Components/groups/group-form.jsx",
                  lineNumber: 472,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
                  "input",
                  {
                    type: "text",
                    className: "form-control",
                    onKeyDown: this.onGroupKeyPress.bind(this),
                    onChange: this.handleInputChange,
                    placeholder: "Select Group Members",
                    name: "selectGroupMembers",
                    autoComplete: "off",
                    style: { position: "relative" },
                    value: selectGroupMembers
                  },
                  void 0,
                  false,
                  {
                    fileName: "app/Components/groups/group-form.jsx",
                    lineNumber: 475,
                    columnNumber: 21
                  },
                  this
                ),
                /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
                  "div",
                  {
                    style: {
                      position: "absolute",
                      left: "15px",
                      top: "69px",
                      width: "94%",
                      border: "1px solid #ccc4c4",
                      height: "100px",
                      overflowY: "auto",
                      background: "#fff",
                      zIndex: 50
                    },
                    hidden: this.state.dropdownHidden,
                    children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
                      "ul",
                      {
                        type: "none",
                        style: { paddingLeft: "30px" },
                        id: "search_groups",
                        children: this.state.allUserDropdowns
                      },
                      void 0,
                      false,
                      {
                        fileName: "app/Components/groups/group-form.jsx",
                        lineNumber: 500,
                        columnNumber: 23
                      },
                      this
                    )
                  },
                  void 0,
                  false,
                  {
                    fileName: "app/Components/groups/group-form.jsx",
                    lineNumber: 486,
                    columnNumber: 21
                  },
                  this
                ),
                groupmembers
              ] }, void 0, true, {
                fileName: "app/Components/groups/group-form.jsx",
                lineNumber: 471,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "app/Components/groups/group-form.jsx",
                lineNumber: 470,
                columnNumber: 17
              }, this) }, void 0, false, {
                fileName: "app/Components/groups/group-form.jsx",
                lineNumber: 469,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "row", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "col-sm-12", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
                "input",
                {
                  type: "submit",
                  className: "btn btn-info btn-block",
                  value: "Submit",
                  disabled: !groupName
                },
                void 0,
                false,
                {
                  fileName: "app/Components/groups/group-form.jsx",
                  lineNumber: 514,
                  columnNumber: 19
                },
                this
              ) }, void 0, false, {
                fileName: "app/Components/groups/group-form.jsx",
                lineNumber: 513,
                columnNumber: 17
              }, this) }, void 0, false, {
                fileName: "app/Components/groups/group-form.jsx",
                lineNumber: 512,
                columnNumber: 15
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "app/Components/groups/group-form.jsx",
            lineNumber: 442,
            columnNumber: 13
          },
          this
        ) }, void 0, false, {
          fileName: "app/Components/groups/group-form.jsx",
          lineNumber: 441,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/Components/groups/group-form.jsx",
        lineNumber: 409,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/Components/groups/group-form.jsx",
      lineNumber: 394,
      columnNumber: 7
    }, this);
  }
};

// app/Components/groups/group-list.jsx
var import_jsx_dev_runtime3 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/Components/groups/group-list.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/Components/groups/group-list.jsx"
  );
  import.meta.hot.lastModified = "1709384153077.1106";
}
var GroupList = ({
  groups = [],
  editGroupWindow,
  closeGroup
}) => {
  _s();
  const [selectedGroup, setSelectedGroup] = (0, import_react4.useState)(null);
  const handleEditClick = (group) => {
    setSelectedGroup(group);
    editGroupWindow(group);
  };
  const handleCloseGroup = () => {
    setSelectedGroup(null);
    closeGroup();
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("ul", { className: "list-group list-group-flush", children: groups.map((group, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("li", { className: "list-group-item d-flex justify-content-between align-items-center", id: index, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("span", { children: [
      group.groupName,
      "\xA0\xA0\xA0",
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("span", { className: "btn btn-xs btn-outline-info", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("button", { onClick: () => handleEditClick(group), children: "Edit" }, void 0, false, {
        fileName: "app/Components/groups/group-list.jsx",
        lineNumber: 46,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/Components/groups/group-list.jsx",
        lineNumber: 45,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("span", { title: "Delete group", className: "btn btn-xs btn-outline-danger", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Form, { method: "DELETE", action: `/groups/${group._id}`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("button", { type: "submit", children: "Delete" }, void 0, false, {
          fileName: "app/Components/groups/group-list.jsx",
          lineNumber: 50,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/Components/groups/group-list.jsx",
          lineNumber: 49,
          columnNumber: 15
        }, this),
        " "
      ] }, void 0, true, {
        fileName: "app/Components/groups/group-list.jsx",
        lineNumber: 48,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/Components/groups/group-list.jsx",
      lineNumber: 43,
      columnNumber: 11
    }, this),
    selectedGroup && selectedGroup._id === group._id && /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(GroupForm, { group: selectedGroup, isEditMode: true, handleCloseGroup }, void 0, false, {
      fileName: "app/Components/groups/group-list.jsx",
      lineNumber: 55,
      columnNumber: 64
    }, this)
  ] }, group._id, true, {
    fileName: "app/Components/groups/group-list.jsx",
    lineNumber: 41,
    columnNumber: 37
  }, this)) }, void 0, false, {
    fileName: "app/Components/groups/group-list.jsx",
    lineNumber: 40,
    columnNumber: 10
  }, this);
};
_s(GroupList, "CxODVKyj/GJShqzF2ixom0/j2hk=");
_c = GroupList;
var group_list_default = GroupList;
var _c;
$RefreshReg$(_c, "GroupList");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/models/group/group-model.ts
var import_mongoose = __toESM(require_browser_umd(), 1);
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/models/group/group-model.ts"
  );
  import.meta.hot.lastModified = "1709470693593.7751";
}
var GroupSchema = new import_mongoose.default.Schema({
  groupName: {
    type: String,
    required: true
  },
  groupMembers: {
    type: [import_mongoose.default.Schema.Types.Mixed],
    // Update the type as needed
    default: []
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  versionKey: false
});
var Group = import_mongoose.default.model("group", GroupSchema);
var group_model_default = Group;

// app/Services/group/group-service.jsx
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/Services/group/group-service.jsx"
  );
  import.meta.hot.lastModified = "1709622331946.3904";
}
async function addGroup(groupName, groupMembers, isDeleted) {
  try {
    const newGroup = await group_model_default.create({
      groupName,
      groupMembers,
      isDeleted
    });
    return { response: newGroup, err: null };
  } catch (error) {
    console.error("Error saving group:", error);
    return { response: null, err: error };
  }
}

// app/Components/groups/group.css
var group_default = "/build/_assets/group-34YTPBT2.css";

// app/routes/groups/route.jsx
var import_jsx_dev_runtime4 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/groups/route.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s2 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/groups/route.jsx"
  );
}
var links = () => [{
  rel: "stylesheet",
  href: group_default
}];
function GroupComponent() {
  _s2();
  const {
    groups
  } = useLoaderData();
  const [showNewGroup, setShowNewGroup] = (0, import_react6.useState)(false);
  const [group, setGroup] = (0, import_react6.useState)({
    groupName: "",
    groupMembers: [],
    isDeleted: false
  });
  const [labelsuccessvalue, setLabelSuccessValue] = (0, import_react6.useState)("");
  const [labelvalue, setLabelValue] = (0, import_react6.useState)("");
  const addNewGroupWindow = () => {
    setShowNewGroup(true);
    setGroup({
      groupName: "",
      groupMembers: "",
      isDeleted: false
    });
    setLabelSuccessValue("");
    setLabelValue("");
  };
  const closeGroup = () => {
    setShowNewGroup(false);
    setGroup({
      groupName: "",
      groupMembers: "",
      isDeleted: false
    });
    setLabelSuccessValue("");
    setLabelValue("");
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "container bg-white", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "row", children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "col-sm-7", children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "row", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "col-sm-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("h4", { className: "sub-title ml-3 mt-3", children: [
        "Group (",
        groups.length,
        ")"
      ] }, void 0, true, {
        fileName: "app/routes/groups/route.jsx",
        lineNumber: 89,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/routes/groups/route.jsx",
        lineNumber: 88,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "col-sm-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("h4", { className: "mt-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("span", { className: "btn btn-xs btn-info float-right", title: "New Group", onClick: addNewGroupWindow, children: [
        "Add Group \xA0",
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("button", { children: "Add new " }, void 0, false, {
          fileName: "app/routes/groups/route.jsx",
          lineNumber: 98,
          columnNumber: 19
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/groups/route.jsx",
        lineNumber: 95,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "app/routes/groups/route.jsx",
        lineNumber: 94,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "app/routes/groups/route.jsx",
        lineNumber: 93,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/groups/route.jsx",
      lineNumber: 87,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/groups/route.jsx",
      lineNumber: 86,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/groups/route.jsx",
      lineNumber: 85,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("hr", {}, void 0, false, {
      fileName: "app/routes/groups/route.jsx",
      lineNumber: 105,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "row", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "col-sm-12 col-md-5 col-lg-5 order-lg-1 order-md-1 form-wrapper", children: showNewGroup && /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(GroupForm, { group, onSubmit: async (formData) => {
        try {
          const {
            response,
            err
          } = await addGroup(formData);
          if (err || response && response.data && response.data.err) {
            console.error("Error adding group:", err || response.data.err);
            return {
              error: "Error adding group"
            };
          }
          window.location.reload();
        } catch (error) {
          console.error("Error adding group:", error);
          return {
            error: "Error adding group"
          };
        }
      }, onClose: closeGroup }, void 0, false, {
        fileName: "app/routes/groups/route.jsx",
        lineNumber: 109,
        columnNumber: 28
      }, this) }, void 0, false, {
        fileName: "app/routes/groups/route.jsx",
        lineNumber: 108,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: `col-sm-12 col-md-7 col-lg-7 contentWrapper`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "scroll", children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(group_list_default, { groups }, void 0, false, {
        fileName: "app/routes/groups/route.jsx",
        lineNumber: 134,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/groups/route.jsx",
        lineNumber: 133,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "app/routes/groups/route.jsx",
        lineNumber: 132,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/groups/route.jsx",
      lineNumber: 107,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/groups/route.jsx",
    lineNumber: 84,
    columnNumber: 10
  }, this);
}
_s2(GroupComponent, "Pq6qkSl/tjVXKWshZU54lagjLJU=", false, function() {
  return [useLoaderData];
});
_c2 = GroupComponent;
var _c2;
$RefreshReg$(_c2, "GroupComponent");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  GroupComponent as default,
  links
};
//# sourceMappingURL=/build/routes/groups-EJUXAAC5.js.map
