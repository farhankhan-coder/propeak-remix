import React, { Component } from "react";
import TaskMenu from "../tasks/task-menu";
import * as projectservice from "../../Services/project/project-service";
import { Form } from "@remix-run/react";

export default class CategorySortOrder extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.cat = [];
  }

  state = {
    labelvalue: "",
    labelsuccessvalue: "",
    projectName: "",
    project: null,
    users: [],
    categorySequency: [],
  };

  async componentDidMount() {
    await this.props.context.actions.getProjectData(this.props.projectId);
    if (this.state.users.length === 0) this.props.context.actions.setUsers();

    if (this.state.project && this.state.project.category) {
      this.setState({
        categorySequency: this.state.project.category.split(","),
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      project: nextProps.context.state.project,
      users: nextProps.context.state.users,
    });
  }

  handleInputChange(e, index) {
    const value = e.target.value;
    const name = e.target.name;

    const new_index = value;
    const old_index = this.state.categorySequency.indexOf(name);

    let orderlist = array_move(
      this.state.categorySequency,
      old_index,
      new_index
    );

    this.setState({
      labelvalue: "",
      labelsuccessvalue: "",
      categorySequency: orderlist,
    });

    function array_move(arr, old_index, new_index) {
      if (new_index >= arr.length) {
        new_index = old_index;
      }
      arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
      return arr;
    }
  }
  render() {
    const { categories } = this.props;
    console.log(categories, "category value from component ");
    let category;

    if (this.state.categorySequency) {
      category = this.state.categorySequency;
    }

    return (
      <React.Fragment>
        <div className="container content-wrapper">
          <h3 className="project-title d.inline-block mt-3 mb-3">
            {this.state.projectName}-Change Frequency
          </h3>
          <hr />
          {/* <TaskMenu {...this.props} /> */}
          <Form method="PUT" action="/categorySortOrder/${category._id}">
            <div className="row">
              <div className="col-sm-12">
                {this.state.labelvalue ? (
                  <span
                    htmlFor="project"
                    className="alert alert-danger"
                    value={this.state.labelvalue}
                  >
                    {this.state.labelvalue}
                  </span>
                ) : this.state.labelsuccessvalue ? (
                  <span
                    htmlFor="project"
                    className="alert alert-success"
                    value={this.state.labelsuccessvalue}
                  >
                    {this.state.labelsuccessvalue}
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12"> </div>
            </div>
            {categories &&
              categories.map((category, index) => (
                <div className="row" key={index}>
                  <div className="col-sm-3">
                    <label>{category.title}</label>
                  </div>
                  <div className="col-sm-3">
                    <input
                      type="text"
                      onChange={(e) => this.handleInputChange(e, category.title)}
                      value={category.sequence || ''}
                    />
                  </div>
                </div>
              ))}
            <div className="row">
              <div className="col-sm-3"></div>
              <div className="col-sm-2">
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block"
                />
              </div>
            </div>
          </Form>
        </div>
      </React.Fragment>
    );
  }
}
