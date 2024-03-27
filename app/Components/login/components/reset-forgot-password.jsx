import React, { Component } from "react";
import * as userservice from "../services/login-service";
import { Link } from "react-router-dom";
import { Form } from "@remix-run/react";

export class ResetForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      useremail: "",
      messageModal: "",
      emailError: false,
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      messageModal: "",
      emailError: false,
    });
  };

  validateEmail = (value) => {
    const emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    return !!emailValid;
  };

  render() {
    const { useremail, messageModal, emailError } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 offset-sm-3">
            <div className="logo-wrapper d-flex justify-content-center mt-5">
              <img src="/images/proPeakNewLogo.svg" alt="proPeak PMS" style={{ width: "450px" }} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-8 offset-sm-2">
            <div className="reset-wrapper box-shadow justify-content-center align-items-center">
              {messageModal && (
                <span className="alertposition reset-alert alert-danger text-center">{messageModal}</span>
              )}
              {emailError && (
                <span className="alertposition reset-alert alert-danger text-center" style={{ height: "50px" }}>
                  Please enter a valid email address.
                </span>
              )}
              <h4 className="login-title">Forgot Password</h4>
              <hr />
              <Form method="POST" action="/resetForgotPassword" >
                <div className="row">
                  <div className="col-sm-12">
                    <input
                      className="form-control"
                      type="email"
                      onChange={this.handleInputChange}
                      value={useremail}
                      name="useremail"
                      placeholder="Enter your registered email id"
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-sm-12">
                    <button className="btn btn-primary btn-md mt-1 float-right" type="submit">
                      Go
                    </button>
                  </div>
                </div>
              </Form>
              <hr />
              <div className="row">
                <div className="col-sm-12">
                  <small className="">
                    {" "}
                    Login ?{" "}
                    <Link
                      to={"/login"}
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
          </div>
        </div>
      </div>
    );
  }
}

export default ResetForgotPassword;
