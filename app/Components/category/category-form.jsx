
import React, { Component } from "react";
import { Form } from "@remix-run/react";
import category from "./category.css";

export const links = () => [
  { rel: "stylesheet", href: category },
];
const labelStyle = {
  fontSize: "small",
};

export default class CategoryForm extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.state = {
      category: {
        _id: "",
        displayName: "",
        sequence: "",
        title: "",
      },
      msg: "",
      sequence: "",
      title: "",
    };
  }

  componentDidMount() {
    this.setState({ category: this.props.category });
  }

  handleCheckbox(e) {
    const name = e.target.name;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    this.setState({
      category: {
        ...this.state.category,
        [name]: value,
      },
    });
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    let title = this.state.category.title;
    let sequence = this.state.category.sequence;

    if (name === "sequence") {
      sequence = event.target.value;
    }

    if (name === "displayName") {
      if (title === "todo" || title === "inprogress" || title === "completed") {
        title = title;
      } else {
        title = value.toLowerCase().split(" ").join("");
      }
    }

    this.setState({
      category: {
        ...this.state.category,
        [name]: value,
        title: title,
        sequence: sequence,
      },
      msg: "",
    });
  }

  render() {
    const { displayName, sequence, show } = this.state.category;
    const { isEditMode } = this.props;

    return (
      <div style={{ marginTop: "10px" }}>
         <span onClick={this.props.closeCategory} className="float-right mr-3">
          <i className="fas fa-times close"></i>
          <button>close</button>
         </span>
        {this.state.category._id ? (
          <h4 className="sub-title ml-3"> Edit Category</h4>
        ) : (
          <h4 className="sub-title ml-3"> Add Category</h4>
        )}
        <hr />
        <div className="container">
          <div className="form-group">
            <Form
              method={isEditMode ? "PUT" : "POST"}
              action={
                isEditMode
                  ? `/category/${this.state.category._id}`
                  : "/category"
              }
            >
              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">
                    <label style={labelStyle}>Title</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder=" "
                      id="txtTitle"
                      name="title"
                      onChange={this.handleInputChange}
                      value={this.state.category.title}
                      autoComplete="off"
                    />
                    {this.state.msg ? <span>{this.state.msg}</span> : ""}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">
                    <label style={labelStyle}>Category</label>
                    <span style={{ color: "red" }}>*</span>

                    <input
                      className="form-control"
                      type="text"
                      placeholder=" "
                      id="txtDisplayName"
                      name="displayName"
                      onChange={this.handleInputChange}
                      value={displayName}
                      autoComplete="off"
                    />
                    {this.state.msg ? <span>{this.state.msg}</span> : ""}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label style={labelStyle}>Sequence</label>
                    <span style={{ color: "red" }}>*</span>

                    <input
                      className="form-control"
                      type="text"
                      placeholder=" "
                      id="txtSequence"
                      name="sequence"
                      onChange={this.handleInputChange}
                      value={sequence}
                      autoComplete="off"
                    />
                    {this.state.msg ? <span>{this.state.msg}</span> : ""}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-6">
                  <div className="form-group">
                    <label style={labelStyle}>Show</label>
                    <span style={{ color: "red" }}>*</span> &nbsp;
                    <input
                      type="checkbox"
                      placeholder=" "
                      id="txtShow"
                      onChange={this.handleCheckbox}
                      name="show"
                      value={show}
                      checked={show}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-info btn-block"
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
