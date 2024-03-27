import React, { Component } from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import app from "../../styles/app.css";
import reports from "./reports.css";
export const links = () => [
  { rel: "stylesheet", href: app },
  { rel: "stylesheet", href: reports },
];
export default class ReportMenu extends Component {
  state = {
    reportMenu: [
      {
        title: "Task Report",
        displayName: "Task Report",
        url: "/task-report",
        active: false,
        role: "admin,owner,support",
        display: true,
      },
      {
        title: "User Report",
        displayName: "Member Report",
        url: "/userReports",
        active: false,
        role: "admin,owner,support",
        display: true,
      },
      {
        title: "Active User Report",
        displayName: "Active Member Report",
        url: "/active-users-report",
        active: false,
        role: "admin,owner,support",
        display: true,
      },
      {
        title: "StoryPoint Statistics",
        displayName: "StoryPoint Statistics",
        url: "/userTaskReports",
        active: false,
        role: "admin,owner,support",
        display: true,
      },
      {
        title: "Incompelete task Reports",
        displayName: "Incomplete Task Report",
        url: "/incompelete_task_count-report",
        active: false,
        role: "admin,owner,support",
        display: true,
      },
      {
        title: "Project Progress Reports",
        displayName: "Project progress Report",
        url: "/project-progress-report",
        active: false,
        role: "admin,owner,support",
        display: true,
      },
      {
        title: "User Performance Reports",
        displayName: "Member Performance Report",
        url: "/userPerformanceReports",
        active: false,
        role: "admin,owner,support",
        display: true,
      },
    ],
  };

  componentDidMount() {
    this.setActiveMenu();
  }

  setActiveMenu = () => {
    const { reportMenu } = this.state;
    const loc = window && window.location.pathname;

    if (loc) {
      const updatedMenu = reportMenu.map((m) => ({
        ...m,
        active: loc.indexOf(m.url) > -1,
      }));

      this.setState({ reportMenu: updatedMenu });
    }
  };

  render() {
    const { reportMenu } = this.state;

    const links = reportMenu.map((m) => (
      <li key={m.title}>
        <Link
          to={m.url}
          className={`nav-item nav-link ${m.active ? "active" : ""}`}
        >
          {m.displayName}{" "}
        </Link>
      </li>
    ));

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-sm-12">
            <div className="nav nav-tabs nav-fill ">{links}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
