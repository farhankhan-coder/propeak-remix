
import React from "react";
import FormErrors from "../tasks/form-errors";
import Tag from "../tasks/tag";
import { Form } from "@remix-run/react";

const labelStyle = {
  fontSize: "small",
};

export default class GroupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      group: props.group || {
        groupName: "",
        groupMembers: [],
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
      userNameToId: props.userNameToId,
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
      labelsuccessvalue: nextProps.labelsuccessvalue,
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
        const selectedUserNames = selectedUserIds.map(id => {
            const user = users.find(user => user._id === id);
            return user ? user.name : "";
        });
        
        this.setState({
            [name]: selectedUserIds.join(", "),
            selectGroupMemberNames: selectedUserNames.join(", "), // Optional: Store selected user names for display
            checkMsg: false,
            labelsuccessvalue: "",
        });
    } else {
        this.setState(
            {
                group: {
                    ...this.state.group,
                    [name]: value,
                },
                checkMsg: false,
                labelsuccessvalue: "",
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
          dropdownHidden: true,
      });
  } else {
      const { groupMembers, users } = this.state;
      const filteredUsers = users.filter(user => !groupMembers.includes(user._id)); // Filter out already selected group members
      const filteredUserNames = filteredUsers
          .filter(user => user.name.toLowerCase().includes(userSelected.toLowerCase()))
          .map(user => (
              <li
                  onClick={() => this.addAssignUser(user._id)}
                  key={user._id}
                  style={{ cursor: "pointer", marginLeft: "-20px" }}
              >
                  {user.name}
              </li>
          ));

      this.setState({
          dropdownHidden: false,
          allUserDropdowns: filteredUserNames,
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
    let input = id;
    var allUserDropdowns = this.state.allUserDropdowns.filter((u) => {
      return u.props.value !== id;
    });
    if (input.length === 0 || input[0] === "") return;

    let assignU = this.state.group.groupMembers.filter((aUser) => {
      return aUser === input;
    });

    let assUser = assignU.length > 0 ? assignU[0] : "";
    if (assUser) {
      input = "";
    } else {
      this.setState({
        group: {
          ...this.state.group,
          groupMembers: [...this.state.group.groupMembers, input],
        },
        allUserDropdowns: allUserDropdowns,
        selectGroupMembers: "",
        dropdownHidden: true,
      });
    }
  }

  onDeleteGroupMembers(tag) {
    let userId =
      this.state.userNameToId &&
      this.state.userNameToId[tag.toLowerCase().replace(/ +/g, "")];

    var groupMembers =
      this.state.group &&
      this.state.group.groupMembers.filter((t) => {
        return t !== userId;
      });

    // this.setState({
    //   group: {
    //     ...this.state.group,
    //     groupMembers: groupMembers,
    //   },
    // });
    this.setState({
      group: {
        ...this.state.group,
        groupMembers: [...this.state.group.groupMembers, input],
      },
      allUserDropdowns: allUserDropdowns,
      selectGroupMembers: "",
      dropdownHidden: true,
    });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let groupNameValid = this.state.groupNameValid;

    switch (fieldName) {
      case "groupName":
        groupNameValid = value.length !== 0;
        fieldValidationErrors.groupName = groupNameValid
          ? ""
          : " Please fill the";
        break;
      default:
        break;
    }

    this.setState(
      {
        formErrors: fieldValidationErrors,
        groupNameValid: groupNameValid,
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

        for (let i = 0; i < nodes.length; i++) {
          if (this.downCount === i) {
            nodes[i].style.background = "lightblue";
          } else {
            nodes[i].style.background = "";
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
    console.log(group,"group data aa raha hai kya ")
    const { checkMsg, selectGroupMembers } = this.state;
    const { groupName, groupMembers } = group;

    const groupmembers =
      groupMembers.length > 0 &&
      groupMembers.map((tag) => {
        let userName = this.state.user && this.state.user[tag];

        return userName ? (
          <Tag
            key={tag}
            value={userName}
            onDeleteTag={this.onDeleteGroupMembers}
          />
        ) : (
          ""
        );
      });

    return (
      <div style={{ marginTop: "10px" }}>
        <span onClick={this.props.closeGroup} className="float-right mr-3">
          <i className="fas fa-times close"></i>
          <button>close</button>
        </span>

        {this.state.group._id ? (
          <h4 className="sub-title ml-3">
            {" "}
            Edit Group : {this.state.group.groupName}
          </h4>
        ) : (
          <h4 className="sub-title ml-3"> Add Group</h4>
        )}

        <div className="container">
          {this.state.labelsuccessvalue ||
          this.state.message ||
          this.state.formErrors ? (
            <div className="row">
              <div className="col-sm-12">
                {checkMsg ? (
                  <div>
                    <span className="alert alert-danger">
                      {this.state.message}
                    </span>
                  </div>
                ) : (
                  ""
                )}
                {this.state.formErrors ? (
                  <FormErrors formErrors={this.state.formErrors} />
                ) : (
                  ""
                )}
                {this.state.labelsuccessvalue ? (
                  <div className="alert alert-success">
                    {this.state.labelsuccessvalue}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="form-group">
            <Form
              method={this.state.group._id ? "PUT" : "POST"}
              action={
                this.state.group._id
                  ? `/groups/${this.state.group._id}`
                  : "/groups"
              }
            >
              {" "}
              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">
                    <label htmlFor="Group Name" style={labelStyle}>
                      Group Name
                    </label>
                    <span style={{ color: "red" }}>*</span>
                    <input
                      type="text"
                      name="groupName"
                      className="form-control"
                      placeholder="Group Name"
                      value={groupName}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">
                    <label htmlFor="Select Group Members" style={labelStyle}>
                      Select Group Members
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      onKeyDown={this.onGroupKeyPress.bind(this)}
                      onChange={this.handleInputChange}
                      placeholder="Select Group Members"
                      name="selectGroupMembers"
                      autoComplete="off"
                      style={{ position: "relative" }}
                      value={selectGroupMembers}
                    />
                    <div
                      style={{
                        position: "absolute",
                        left: "15px",
                        top: "69px",
                        width: "94%",
                        border: "1px solid #ccc4c4",
                        height: "100px",
                        overflowY: "auto",
                        background: "#fff",
                        zIndex: 50,
                      }}
                      hidden={this.state.dropdownHidden}
                    >
                      <ul
                        type="none"
                        style={{ paddingLeft: "30px" }}
                        id="search_groups"
                      >
                        {this.state.allUserDropdowns}
                      </ul>
                    </div>
                    {groupmembers}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <input
                    type="submit"
                    className="btn btn-info btn-block"
                    value="Submit"
                    disabled={!groupName}
                  />
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}





