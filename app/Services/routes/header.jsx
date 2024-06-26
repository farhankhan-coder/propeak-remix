import React from "react";
import userMenuRoute from "./user-menu/route.jsx";
import io from "socket.io-client";
import Auth from "../utils/auth.jsx";
import MyNotifications from "../Components/my-notification/components/my-notifications.js";
import config from "../common/config.jsx";
import { Link } from "@remix-run/react";
import { addMessage } from "../common/add_message.jsx";

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    // Initialize state with default values
    this.state = {
      isLoggedOut: false,
      show: false,
      showMyNotifications: false,
      myNotifications: [],
      userId: Auth.get("userId"),
      profilePicture: "",
      users: [],
      dataMessage: null,
      chatWindows: []
    };

    // Bind event handlers
    this.toggleShowMenu = this.toggleShowMenu.bind(this);
    this.toggleShowMyNotifications = this.toggleShowMyNotifications.bind(this);
    this.updateNotifications = this.updateNotifications.bind(this);
    // Initialize socket connection
    this.socket = io.connect("/", {
      secure: true,
      path: "/chat/socket.io"
    });
    this.userId = Auth.get("userId");
    this.socket.emit("my notification userId", this.userId);
    this.socket.on("notificationList", myNotification => {
      this.setState({
        myNotifications: [...this.state.myNotifications, myNotification]
      });
    });
    this.socket.on("RECEIVE_HEADER_MESSAGE", data => {
      let userName = Auth.get("userName");
      let userId = Auth.get("userId");
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
    let filteredNotifications = this.state.myNotifications.filter(f => {
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
    let userId = Auth.get("userId");
    this.socket.emit("new user", userId);
    this.socket.on("userId", userId => {
      // console.log("users Acive", userId)
    });

    this.socket.on("showUsers", users => {
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
    let user = Auth.get("userName");
    let UserPicUrl = "";
    if (this.state.profilePicture) {
      UserPicUrl = `${config.profileUrl}${this.state.userId}/${this.state.profilePicture}`;
    }
    return (
      <header className="header">
        <nav className="navbar fixed-top">
          <div className="navbar-holder d-flex align-items-center justify-content-between">
            <div className="navbar-header">
              <a id="toggle-menu" href="#" className="menu-btn">
                <i className="fas fa-bars" />
              </a>
            </div>
            <ul className="nav-menu list-unstyled d-flex flex-md-row align-items-md-center">
              <li>
                <span className="userinfo mr-2">
                  {" "}
                  Welcome <strong>{user}</strong>
                </span>
              </li>
              <li className="nav-item">
                <Link to={"/projects/favorites/Projectlist"} className="nav-link">
                  <i className="fa fa-star" />
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/chat"} className="nav-link">
                  <i className="fa fa-comment" />
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  id="notifications"
                  rel="nofollow"
                  data-target="#"
                  href="#"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  className="nav-link"
                  onClick={this.toggleShowMyNotifications}
                >
                  <i className="fa fa-bell" />
                  <span className="badge " style={{ backgorund: "#fff", color: "#000" }}>
                    {this.state.myNotifications.length}
                  </span>
                </a>
                <ul aria-labelledby="notifications" id="notification-menu" className="dropdown-menu">
                  {this.state.showMyNotifications ? (
                    <MyNotifications
                      myNotifications={this.state.myNotifications}
                      updateNotifications={this.updateNotifications}
                    />
                  ) : (
                    ""
                  )}
                </ul>
              </li>
              <li className="nav-item">
                <div
                  className="nav-icons nav-userprofile order-sm-12 navbar-toggler-icons text-white"
                  onClick={this.toggleShowMenu}
                >
                  {this.state.profilePicture ? (
                    <img src={UserPicUrl} alt="User Profile" className="user-profile-img" />
                  ) : (
                    <i className="fa fa-user" />
                  )}
                  <div className="toggleMenu">{this.state.show ? <UserMenu user={user} context={this.props.context} /> : ""}</div>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}







// import React from "react";
// import userMenuRoute from "../routes/user-menu/route.jsx"
// import io from "socket.io-client";
// import Auth from "../utils/auth.jsx"
// // import Menu from "./menu.js";
// // import $ from '../../public/jquery-3.3.1.slim.min';
// import MyNotifications from "../Components/my-notification/components/my-notifications.jsx";
// import config from '../common/config.jsx';
// // import * as userservice from "../Services/user/user-service";
// import { Link } from "@remix-run/react";
// import { addMessage } from "../common/add_message.jsx";
// // import { from } from 'rxjs';

// export default class Header extends React.Component {
//   constructor(props) {
//     super(props);

//     // Initialize state with default values
//     this.state = {
//       isLoggedOut: false,
//       show: false,
//       showMyNotifications: false,
//       myNotifications: [],
//       userId: Auth.get("userId"),
//       profilePicture: "",
//       users: [],
//       dataMessage: null,
//       chatWindows: []
//     };

//     // Bind event handlers
//     this.toggleShowMenu = this.toggleShowMenu.bind(this);
//     this.toggleShowMyNotifications = this.toggleShowMyNotifications.bind(this);
//     this.updateNotifications = this.updateNotifications.bind(this);
//     // Initialize socket connection
//     this.socket = io.connect("/", {
//       secure: true,
//       path: "/chat/socket.io"
//     });
//     this.userId = Auth.get("userId");
//     this.socket.emit("my notification userId", this.userId);
//     this.socket.on("notificationList", myNotification => {
//       this.setState({
//         myNotifications: [...this.state.myNotifications, myNotification]
//       });
//     });
//     this.socket.on("RECEIVE_HEADER_MESSAGE", data => {
//       let userName = Auth.get("userName");
//       let userId = Auth.get("userId");
//       if (data.toUser === userId) {
//         this.setState({
//           dataMessage: data
//         });
//         if (data.groupName === "") {
//           if (data.toUser === userId || userName === data.author) {
//             if (!this.props.context.state.chatWindows.length) {
//               addMessage(data, this);
//             }
//           }
//         } else {
//           if (!this.props.context.state.chatWindows.length) {
//             addMessage(data, this);
//           }
//         }
//       }
//       this.props.context.actions.updateState("dataMessage", data);
//     });
//   }


//   toggleShowMenu() {
//     this.setState({
//       show: !this.state.show
//     });
//   }





//   toggleShowMyNotifications() {
//     this.setState({
//       showMyNotifications: !this.state.showMyNotifications
//     });
//   }

//   async componentDidMount() {
//     this.getMyNotification();
//     await this.getProfilePicture();
//     if (this.state.users.length === 0) {
//       await this.props.context.actions.setUsers();
//     }
//     this.activeUsers();
//   }
//   async getMyNotification() {
//     let { response, err } = await mynotificationservice.getMyNotifications();
//     if (err) {
//       this.setState({
//         message: "Error: " + err
//       });
//     } else if (response && response.data.err) {
//       this.setState({
//         message: "Error: " + response.data.err
//       });
//     } else {
//       this.setState({
//         myNotifications: response.data
//       });
//     }
//   }

//   async getProfilePicture() {
//     let { response, err } = await userservice.getProfilePicture(
//       this.state.userId
//     );
//     if (err) {
//       this.setState({
//         message: "Error: " + err
//       });
//     } else if (response && response.data.err) {
//       this.setState({
//         message: "Error: " + response.data.err
//       });
//     } else {
//       this.props.context.actions.updateState("profilePicture", response.data.profilePicture);
//       this.setState({
//         profilePicture: response.data.profilePicture
//       });
//     }
//   }

//   updateNotifications(updatedNotification) {
//     let filteredNotifications = this.state.myNotifications.filter(f => {
//       return f._id !== updatedNotification._id;
//     });
//     this.setState({
//       myNotifications: filteredNotifications
//     });
//   }
//   componentWillReceiveProps(nextProps) {
//     this.setState({
//       dataMessage: nextProps.context.state.dataMessage,
//       users: nextProps.context.state.users,
//       chatWindows: nextProps.context.state.chatWindows
//     });
//   }
//   activeUsers() {
//     let userId = Auth.get("userId");
//     this.socket.emit("new user", userId);
//     this.socket.on("userId", userId => {
//       // console.log("users Acive", userId)
//     });

//     this.socket.on("showUsers", users => {
//       let userNameArray = [];
//       for (let i = 0; i < this.state.users.length; i++) {
//         for (let j = 0; j < users.length; j++) {
//           if (this.state.users[i]._id === users[j]) {
//             userNameArray.push(this.state.users[i].name);
//           }
//         }
//       }
//       this.props.context.actions.updateState("activeUsers", userNameArray);
//       this.setState({
//         activeUsers: userNameArray
//       });
//     });
//   }

//   render() {

//     document.onclick = function (e) {
//       var t = e.target;
//       if (
//         t.classList.contains("nav-userprofile")
//       ) {
//         return false;
//       }

//     };


//     let user = Auth.get("userName");
//     let UserPicUrl = "";
//     if (this.state.profilePicture) {
//       UserPicUrl = `${config.profileUrl}${this.state.userId}/${this.state.profilePicture}`;
//     }
//     return (
//       <header className="header">
//         <nav className="navbar fixed-top">
//           <div className="navbar-holder d-flex align-items-center justify-content-between">
//             <div className="navbar-header">
//               <a id="toggle-menu" href="#" className="menu-btn" >
//                 <i className="fas fa-bars" />
//               </a>
//               {/* // <span className="project-title text-white-50">Project Name</span> */}
//             </div>
//             {/* <span className="userinfo mr-2 float-right"> Welcome <strong>{user}</strong></span> */}
//             <ul className="nav-menu list-unstyled d-flex flex-md-row align-items-md-center">
//               <li><span className="userinfo mr-2"> Welcome <strong>{user}</strong></span></li>

//               <li className="nav-item">
//                 <Link to={"/projects/favorites/Projectlist"} className="nav-link">
//                   <i className="fa fa-star" />
//                 </Link>
//               </li>

//               <li className="nav-item">
//                 <Link to={"/chat"} className="nav-link">
//                   <i className="fa fa-comment" />
//                 </Link>
//               </li>

//               <li className="nav-item dropdown">
//                 {" "}
//                 <a
//                   id="notifications"
//                   rel="nofollow"
//                   data-target="#"
//                   href="#"
//                   data-toggle="dropdown"
//                   aria-haspopup="true"
//                   aria-expanded="false"
//                   className="nav-link"
//                   onClick={this.toggleShowMyNotifications}
//                 >
//                   <i className="fa fa-bell" />
//                   <span className="badge " style={{backgorund:"#fff", color: "#000"}}>
//                     {this.state.myNotifications.length}
//                   </span>
//                 </a>
//                 <ul aria-labelledby="notifications" id="notification-menu" className="dropdown-menu">

//                   {this.state.showMyNotifications ? (
//                     <MyNotifications
//                       myNotifications={this.state.myNotifications}
//                       updateNotifications={this.updateNotifications}
//                     />
//                   ) : (
//                       ""
//                     )}

//                 </ul>
//               </li>

              
//               <li className="nav-item">
//                 <div
//                   className="nav-icons nav-userprofile order-sm-12 navbar-toggler-icons text-white"
//                   onClick={this.toggleShowMenu}
//                 >
//                   {this.state.profilePicture ?
//                     <img src={UserPicUrl} alt="User Profile" className="user-profile-img" /> :
//                     <i className="fa fa-user" />}
//                   <div
//                     className="toggleMenu"

//                   >
//                     {this.state.show ? <UserMenu user={user} context={this.props.context} /> : ""}
//                   </div>
//                 </div>
//               </li>

//             </ul>
//             {/* 
//               <div className="nav-icons nav-notifications order-sm-11 notification-header mr-2 navbar-toggler-icons" onClick={this.toggleShowMyNotifications}>
//                 <big>
//                   <i className="far fa-bell">
//                     <span className="text">
//                       <span style={{ color: "white" }}>
//                         {this.state.myNotifications.length}
//                       </span>
//                     </span>
//                   </i>
//                 </big>

//                 <div className="toggleMenu notification-display-box">
//                   {this.state.showMyNotifications ? (
//                     <MyNotifications
//                       myNotifications={this.state.myNotifications}
//                       updateNotifications={this.updateNotifications}
//                     />
//                   ) : (
//                     ""
//                   )}
//                 </div>
//               </div>
//                */}
//           </div>
//         </nav>
//       </header>
//     );
//   }
// }
