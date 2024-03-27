import React, { Component } from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
// import "../../app.css";
import * as dateUtil from "../../utils/date-util";
import * as applevelaccessrightservice from "../../Components/Entitlement/services/applevelaccessright-service";
import  index from "../../styles/index.css";
import  app from "../../styles/app.css";
import  theme from "../../styles/theme.css";
export const links = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  {rel :"stylesheet", href:index},
  {rel :"stylesheet", href:app},
  {rel :"stylesheet", href:theme},

];
export default class TaskMenu extends Component {
  state = {
    taskMenu: [
      {
        title: "Task List",
        url: "/project/tasks/" + this.props.projectId,
        active: false,
      },
      {
        title: "Audit Report",
        url: "/auditReport/" + this.props.projectId,
        active: false,
      },
      {
        title: "Project Users",
        url: "/projectUsers/" + this.props.projectId,
        active: false,
      },
      {
        title: "Upload Tasks",
        url: "/uploadTasks/" + this.props.projectId,
        active: false,
      },
      {
        title: "Task Report",
        url: "/project/taskReport/" + this.props.projectId,
        active: false,
      },
      {
        title: "User Report",
        url: "/project/userReport/" + this.props.projectId,
        active: false,
      },
      {
        title: "Notification",
        url: "/notification/" + this.props.projectId,
        active: false,
      },
      {
        title: "Access Rights",
        url: "/project/accessRights/" + this.props.projectId,
        active: false,
      },
      {
        title: "Category Order",
        url: "/project/categorySortOrder/" + this.props.projectId,
        active: false,
      },
    ],
    appLevelAccessRight: "",
    updatedTime: dateUtil.getTime(),
  };

  shouldComponentUpdate(nextProps, nextState) {
    return !(this.state.updatedTime === nextState.updatedTime);
  }

  async componentDidMount() {
    let userId = Auth.get("userId");
    let appLevelAccessRightResponse =
      await applevelaccessrightservice.getUserAppLevelAccessRights(userId);

    this.setState({
      appLevelAccessRight: appLevelAccessRightResponse.response.data,
      updatedTime: dateUtil.getTime(),
    });
  }
  render() {
    let userId = Auth.get("userId");
    let userRole = Auth.get("userRole");
    if (this.props.ownerId) {
      if (userRole === "admin") {
        userRole = "admin";
      } else if (this.props.ownerId === userId) {
        userRole = "owner";
      } else {
        userRole = "user";
      }
    }
    let accessRights = Auth.get("access");
    let updatedMenu = [];
    if (userRole === "user") {
      if (
        accessRights !== null &&
        accessRights !== undefined &&
        accessRights.length > 0
      ) {
        for (let i = 0; i < accessRights.length; i++) {
          if (accessRights[i].projectId === this.props.projectId) {
            for (let j = 0; j < this.state.taskMenu.length; j++) {
              if (
                this.state.taskMenu[j].title.trim() ===
                  accessRights[i].group.trim() &&
                accessRights[i].entitlementId === "view"
              ) {
                updatedMenu.push(this.state.taskMenu[j]);
              }
            }
          }
        }
      } else if (this.state.appLevelAccessRight.length > 0) {
        let arr = [];
        for (let n = 0; n < this.state.appLevelAccessRight.length; n++) {
          arr.push(this.state.appLevelAccessRight[n].group);
        }
        for (let a = 0; a < this.state.taskMenu.length; a++) {
          if (
            arr.indexOf(this.state.taskMenu[a].title) > -1 ||
            this.state.taskMenu[a].title === "Task List"
          ) {
            updatedMenu.push(this.state.taskMenu[a]);
          }
        }
      }
    } else {
      if (userRole === "superAdmin") {
        updatedMenu = this.state.taskMenu;
      } else {
        if (this.state.appLevelAccessRight.length > 0) {
          let arr = [];
          for (let n = 0; n < this.state.appLevelAccessRight.length; n++) {
            arr.push(this.state.appLevelAccessRight[n].group);
          }

          for (let a = 0; a < this.state.taskMenu.length; a++) {
            if (
              arr.indexOf(this.state.taskMenu[a].title) > -1 ||
              this.state.taskMenu[a].title === "Task List"
            ) {
              updatedMenu.push(this.state.taskMenu[a]);
            }
          }
        }
      }
    }

    var links = updatedMenu.map((m) => {
      let loc = window.location.pathname;
      let isActive = false;
      if (m.url !== "/" && loc.indexOf(m.url) > -1) {
        isActive = true;
      }
      m.active = isActive;
      var activeClass = m.active ? "active" : "";
      return (
        <li key={m.title}>
          <Link to={m.url} className={`nav-item nav-link ${activeClass} `}>
            {m.title}{" "}
          </Link>
        </li>
      );
    });

    return (
      <React.Fragment>
        <div className="col-sm-12">
          <div className="nav nav-tabs nav-fill ">{links}</div>
        </div>
      </React.Fragment>
    );
  }
}
