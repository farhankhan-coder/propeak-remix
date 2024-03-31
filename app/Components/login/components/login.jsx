import React, { Component } from "react";
import { Form, redirect } from "@remix-run/react";
import Recaptcha from "react-recaptcha";
import { Link } from "@remix-run/react";
import * as userservice from "../services/login-service";
import Auth from "../../../utils/auth";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../common/const";
import config from "../../../common/config";
import resetPass from "./reset-password.css";
export const links = () => [{ rel: "stylesheet", href: resetPass }];
class Login extends Component {
  state = {
    login: Auth.get("userId") ? true : false,
    message: "",
    messageModal: "",
    user: {},
    showForgotPassword: false,
    email: "",
    useremail: "",
    domain: "",
    isVerified: false,
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      message: "",
    });
  };

  onkeyEnter = (e) => {
    if (e.which === 13) {
      this.forgotPasswordRequestOnSubmit();
    }
  };

  forgotPasswordRequestOnSubmit = async () => {
    let { useremail } = this.state;
    let { response, err } = await userservice.forgotPassword(useremail);
    if (err) {
      this.setState({
        messageModal: err,
      });
    } else if (response && response.data.err) {
      this.setState({
        messageModal: response.data.err,
      });
    } else {
      this.setState({
        messageModal: response.data.msg,
        useremail: "",
      });
    }
  };

  checkKey = (e) => {
    if (e.which === 13) {
      this.onLogin();
    }
  };

  recaptchaLoaded() {
    // console.log("Captcha has loaded");
  }

  verifyCallback = (response) => {
    if (response) {
      this.setState({
        isVerified: true,
        message: "",
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <div
          className="container-fluid justify-content-center align-items-center"
          id="loginpage"
        >
          <div className="row">
            <div className="col-sm-5 offset-sm-1 logo-container">
              <div className="logo-wrapper d-flex flex-column justify-content-center ">
                <img src="/images/proPeakNewLogo.svg" alt="proPeak PMS" />
              </div>
            </div>

            <div className="col-sm-5 d-flex flex-column justify-content-center">
              <div className="loginWrapper justify-content-center align-items-center">
                <div className="loginBox  justify-content-center align-items-center">
                  <h4 className="login-title">LOGIN</h4>
                  <hr />
                  {this.state.message ? (
                    <span className="login-alert alert-danger">
                      {this.state.message}
                    </span>
                  ) : (
                    ""
                  )}

                  <Form method="POST" action="/login">
                    <div className="form-group ">
                      <label>Username</label>
                      <div className="row">
                        <div className="col-sm-12">
                          <input
                            type="text"
                            className=" form-control username"
                            placeholder="email"
                            name="email"
                            onChange={this.handleInputChange}
                            onKeyPress={this.checkKey}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Password</label>
                      <input
                        className="form-control password text-muted"
                        placeholder="password"
                        name="password"
                        type="password"
                        onChange={this.handleInputChange}
                        onKeyPress={this.checkKey}
                      />
                    </div>
                    <div className="form-group">
                      <Recaptcha
                        sitekey={config.sitekey}
                        render="explicit"
                        onloadCallback={this.recaptchaLoaded}
                        verifyCallback={this.verifyCallback}
                      />
                    </div>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-sm-12">
                          <button
                            type="submit"
                            className="btn btn-primary btn-block"
                          >
                            Login
                          </button>
                        </div>
                        <div className="col-sm-12 reset-link">
                          <small className="text-muted">
                            Forgot Password?{" "}
                            <Link
                              to={"/resetForgotPassword"}
                              className="links"
                              style={{
                                lineHeight: "1.3em",
                                color: "rgb(255, 152, 0)",
                                fontSize: "15px",
                              }}
                            >
                              Click here
                            </Link>
                          </small>
                        </div>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;

// import React, { Component } from "react";
// import { Form } from "@remix-run/react";
// import Recaptcha from "react-recaptcha";
// import { Link } from "react-router-dom";
// import * as userservice from "../services/login-service";
// import Auth from "../../../utils/auth";
// import { ACCESS_TOKEN } from "../../../common/const";
// import config from "../../../common/config";
// import "./reset-password.css";

// class Login extends Component {
//   state = {
//     login: Auth.get("userId") ? true : false,
//     message: "",
//     messageModal: "",
//     user: {},
//     showForgotPassword: false,
//     email: "",
//     useremail: "",
//     domain: "",
//     isVerified: false,
//   };

//   handleInputChange = (e) => {
//     const { name, value } = e.target;
//     this.setState({
//       [name]: value,
//       message: "",
//     });
//   };

//   onkeyEnter = (e) => {
//     if (e.which === 13) {
//       this.forgotPasswordRequestOnSubmit();
//     }
//   };

//   forgotPasswordRequestOnSubmit = async () => {
//     let { useremail } = this.state;
//     let { response, err } = await userservice.forgotPassword(useremail);
//     if (err) {
//       this.setState({
//         messageModal: err,
//       });
//     } else if (response && response.data.err) {
//       this.setState({
//         messageModal: response.data.err,
//       });
//     } else {
//       this.setState({
//         messageModal: response.data.msg,
//         useremail: "",
//       });
//     }
//   };

//   checkKey = (e) => {
//     if (e.which === 13) {
//       this.onLogin();
//     }
//   };

//   recaptchaLoaded() {
//     // console.log("Captcha has loaded");
//   }

//   verifyCallback = (response) => {
//     if (response) {
//       this.setState({
//         isVerified: true,
//         message: "",
//       });
//     }
//   };

//   render() {
//     return (
//       <React.Fragment>
//         <div className="container-fluid justify-content-center align-items-center" id="loginpage">
//           <div className="row">
//             <div className="col-sm-5 offset-sm-1 logo-container">
//               <div className="logo-wrapper d-flex flex-column justify-content-center ">
//                 <img src="/images/proPeakNewLogo.svg" alt="proPeak PMS" />
//               </div>
//             </div>

//             <div className="col-sm-5 d-flex flex-column justify-content-center">
//               <div className="loginWrapper justify-content-center align-items-center">
//                 <div className="loginBox  justify-content-center align-items-center">
//                   <h4 className="login-title">LOGIN</h4>
//                   <hr />
//                   {this.state.message ? (
//                     <span className="login-alert alert-danger">{this.state.message}</span>
//                   ) : (
//                     ""
//                   )}

//                   <Form method="POST" action="/login" >
//                     <div className="form-group ">
//                       <label>Username</label>
//                       <div className="row">
//                         <div className="col-sm-12">
//                           <input
//                             type="text"
//                             className=" form-control username"
//                             placeholder="email"
//                             name="email"
//                             onChange={this.handleInputChange}
//                             onKeyPress={this.checkKey}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                     <div className="form-group">
//                       <label>Password</label>
//                       <input
//                         className="form-control password text-muted"
//                         placeholder="password"
//                         name="password"
//                         type="password"
//                         onChange={this.handleInputChange}
//                         onKeyPress={this.checkKey}
//                       />
//                     </div>
//                     <div className="form-group">
//                       <Recaptcha
//                         sitekey={config.sitekey}
//                         render="explicit"
//                         onloadCallback={this.recaptchaLoaded}
//                         verifyCallback={this.verifyCallback}
//                       />
//                     </div>
//                     <div className="form-group">
//                       <div className="row">
//                         <div className="col-sm-12">
//                           <button type="submit" className="btn btn-primary btn-block">
//                             Login
//                           </button>
//                         </div>
//                         <div className="col-sm-12 reset-link">
//                           <small className="text-muted">
//                             Forgot Password?{" "}
//                             <Link
//                               to={"/resetPassword"}
//                               className="links"
//                               style={{
//                                 lineHeight: "1.3em",
//                                 color: "rgb(255, 152, 0)",
//                                 fontSize: "15px",
//                               }}
//                             >
//                               Click here
//                             </Link>
//                           </small>
//                         </div>
//                       </div>
//                     </div>
//                   </Form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </React.Fragment>
//     );
//   }
// }

// export default Login;
