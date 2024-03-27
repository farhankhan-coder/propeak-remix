import React, { Component } from "react";
import { Link } from "@remix-run/react";
import app from "../../styles/app.css";
import config from "../../common/config.jsx";
import Auth from "../../utils/auth.jsx";

export const links = () => [
  { rel: "stylesheet", href: app },
];

export default class UserMenu extends Component {
  render() {
    const { context } = this.props; // Destructure context from props

    // Check if context and state are defined
    const profilePicture = context && context.state && context.state.profilePicture;
    const userId = Auth.get("userId");

    const userMenu = [
      { title: "Change Password", url: "/reset-password", active: false },
      { title: "Profile Picture", url: "/profilePicture", active: false },
      { title: "Log Out", url: "/logout", active: false },
    ];

    // Ensure context and state are defined before accessing properties
    const UserPicUrl = profilePicture ? `${config.profileUrl}${userId}/${profilePicture}` : "";

    const links = userMenu.map((m) => {
      // Access window.location.pathname here
      let loc = typeof window !== 'undefined' ? window.location.pathname : "";
      let isActive = false;

      if (m.url !== "/" && loc.indexOf(m.url) > -1) {
        isActive = true;
      }

      m.active = isActive;
      var activeClass = m.active ? "menu-active" : "";

      return (
        <li className="list-group-item" key={m.title}>
          <Link to={m.url} className={m.url == "/logout" ? "text-danger mt-2" : ""}>
            {m.title}
          </Link>
        </li>
      );
    });

    return (
      <React.Fragment>
        <div className="card userDetails" id="userDetails">
          <div className="user-triangle-up"></div>

          <div className="mt-2 mb-1 user-avatar">
            {profilePicture ? (
              <img src={UserPicUrl} alt="User Profile" className="user-profile-img" />
            ) : (
              <i className="fa fa-user"></i>
            )}
          </div>
          <div className="username">{this.props.user}</div>
          <div className="dropdown-divider"></div>
          <ul className="list-group list-group-flush">{links}</ul>
        </div>
      </React.Fragment>
    );
  }
}
