import React from "react";
import DataTable from "../datatable";
import app from "../../styles/app.css";
import { CSVLink } from "react-csv";

export const links = () => [{ rel: "stylesheet", href: app }];

export default class ActiveUserReport extends React.Component {
  state = {
    headers: [
      { title: "Name", accessor: "name", index: 1 },
      { title: "Email ", accessor: "email", index: 2 },
      { title: "Company Name", accessor: "companyName", index: 3 },
    ],
    data: [], 
  };

  componentDidMount() {
    const { activeUsersReport } = this.props;
    console.log(activeUsersReport,"activeUsers.....")
    if (activeUsersReport) {
      this.setState({ data: activeUsersReport });
    }
  }

  render() {
    const { headers, data } = this.state;
    const dataTable = (
      <DataTable
        className="data-table"
        title="Active User Report"
        keyField="id"
        pagination={{
          enabled: true,
          pageLength: 50,
          type: "long",
        }}
        width="100%"
        headers={headers}
        data={data}
        noData="No records!"
      />
    );

    return (
      <React.Fragment>
        <div className="container bg-white">
          <div className="row">
            <div className="col-sm-12">{dataTable}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

