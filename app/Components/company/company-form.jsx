import React from "react";
import FormErrors from "../tasks/form-errors";
import { Form } from "@remix-run/react";

const labelStyle = {
  fontSize: "small",
};

export default class CompanyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company: props.company || {
        companyName: "",
        companyCode: "",
        country: "",
        address: "",
        contact: ""
      },
      formValid: props.companyId ? true : false,
      titleCheck: false,
      checkMsg: false,
      message: "",
      companyId: props.companyId,
      formErrors: {},
      companyNameValid: "",
      contactValid: "",
      labelsuccessvalue: props.labelsuccessvalue
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      company: nextProps.company,
      companyId: nextProps.companyId,
      labelsuccessvalue: nextProps.labelsuccessvalue,
    });
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState(
      {
        company: {
          ...this.state.company,
          [name]: value,
        },
        checkMsg: false,
        labelsuccessvalue: "",
      },
      () => this.validateField(name, value)
    );
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let companyNameValid = this.state.companyNameValid;
    let contactValid = this.state.contactValid;

    switch (fieldName) {
      case "companyName":
        companyNameValid = value.length !== 0;
        fieldValidationErrors["Company Name"] = companyNameValid
          ? ""
          : " Please fill the";
        break;
      case "contact":
        contactValid = value.match(/^[0-9]{10}$/); //value.length !== 0 &&
        fieldValidationErrors["Contact"] = contactValid
          ? ""
          : " Please fill the 10 digits number only in";
        break;
      default:
        break;
    }

    this.setState(
      {
        formErrors: fieldValidationErrors,
        companyNameValid: companyNameValid,
      },
      () => this.validateForm(this.state.companyId)
    );
  }

  validateForm(companyId) {
    if (companyId) {
      this.setState({ formValid: true });
    }
  }
  render() {
    const { companyName, companyCode, country, address, contact } = this.state.company;

    return (
      <div style={{ marginTop: "10px" }}>
        <span onClick={this.props.closeCompany} className="float-right mr-3">
          {/* <i className="fas fa-times close"></i> */}
          <button>close</button>
        </span>
        {this.state.company._id ? (
          <h4 className="sub-title ml-3"> Edit Company</h4>
        ) : (
          <h4 className="sub-title ml-3"> Add Company</h4>
        )}
        <hr />
        <div className="container">
          {this.state.errUserMessage ||
          this.state.errMessage ||
          this.state.formErrors ? (
            <div className="row">
              <div className="col-sm-12 ">
                {this.state.checkMsg ? (
                  <span className="alert alert-success">
                    {this.state.message}
                  </span>
                ) : null}

                {Object.keys(this.state.formErrors).length ? (
                  <FormErrors formErrors={this.state.formErrors} />
                ) : null}

                {this.state.labelsuccessvalue ? (
                  <span className="alert alert-success">
                    {this.state.labelsuccessvalue}
                  </span>
                ) : null}
              </div>
            </div>
          ) : null}

          <div className="form-group">
            <div className="form-group">
              <Form
                method={this.state.company._id ? "PUT" : "POST"}
                action={
                  this.state.company._id ? `/company/${this.state.company._id}` : "/company"
                }
              >
                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label htmlFor="companyName" style={labelStyle}>
                        Company Name
                      </label>
                      <span style={{ color: "red" }}>*</span>
                      <input
                        type="text"
                        name="companyName"
                        className="form-control"
                        placeholder="Company Name"
                        value={companyName}
                        onChange={this.handleInputChange}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="companyCode" style={labelStyle}>
                        Company Code
                      </label>
                      <input
                        type="text"
                        name="companyCode"
                        className="form-control"
                        placeholder="Company Code"
                        value={companyCode}
                        onChange={this.handleInputChange}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="country" style={labelStyle}>
                        Country
                      </label>
                      <select
                        value={country}
                        onChange={this.handleInputChange}
                        name="country"
                        className="form-control"
                      >
                        <option value="" disabled>
                          Select Country
                        </option>
                        <option value="India">India</option>
                        <option value="America">America</option>
                        <option value="China">China</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="address" style={labelStyle}>
                        Company Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        className="form-control"
                        placeholder="Company Address"
                        value={address}
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="contact" style={labelStyle}>
                        Contact
                      </label>
                      <input
                        type="text"
                        name="contact"
                        className="form-control"
                        placeholder="Contact"
                        value={contact}
                        onChange={this.handleInputChange}
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12">
                    <input
                      type="submit"
                      className="btn btn-info btn-block"
                      value="Submit"
                      disabled={!companyName}
                    />
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
