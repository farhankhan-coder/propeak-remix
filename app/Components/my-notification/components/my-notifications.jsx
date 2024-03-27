import React from "react";
// import {markNotificationRead} from "../services/my-notification-service";
import { Link } from "react-router-dom";

export default class MyNotifications extends React.Component {
  componentWillReceiveProps(nextProps) {
    this.setState({
      myNotifications: nextProps.myNotifications,
    });
  }

  async setNotificationRead(id) {
    let { response, err } = await markNotificationRead(
      id
    );
    if (err) {
      this.setState({
        message: "Error: " + err,
        // updatedTime:dateUtil.getTime()
      });
    } else if (response && response.data.err) {
      this.setState({
        message: "Error: " + response.data.err,
        // updatedTime:dateUtil.getTime()
      });
    } else {
      this.props.updateNotifications(response.data.data);
    }
  }

  render() {
    const myNotifications = this.props;
    var links = this.state.myNotifications.map((m) => {
      return (
        <li className="list-group-item" key={m._id}>
          <span className="float-left" style={{ width: "90%" }}>
            {m.url !== "" ? (
              <Link
                to={m.url}
                onClick={this.setNotificationRead.bind(this, m._id)}
                style={{ fontSize: "11px" }}
              >
                {m.subject}
              </Link>
            ) : (
              <span style={{ fontSize: "11px" }}>{m.subject}</span>
            )}
          </span>
          <span className="float-right">
            <span onClick={this.setNotificationRead.bind(this, m._id)}>
              <i className="fas fa-times" style={{ fontSize: "10px" }}></i>
            </span>
          </span>
        </li>
      );
    });

    return (
      <React.Fragment>
        <div style={{ position: "relative" }}>
          <div className="notification-triangle-up"></div>

          <div
            className="myNotificationDisplay scroll"
            id="userDetails"
            style={{
              width: "310px",
              height: "300px",
              overflowY: "scroll",
              paddingRight: "15px",
            }}
          >
            <ul className="list-group">
              <h3 style={{ height: "20px", marginLeft: "10px" }}>
                <strong> Notifications</strong>{" "}
              </h3>
              {links}
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
