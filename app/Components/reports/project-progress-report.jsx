import React from "react";
import app from "../../styles/app.css";
import reports from "./reports.css";
import { CSVLink } from "react-csv";
import * as ProjectProgressReportsService from "../../Services/reports/project-progress-reports-service";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const links = () => [
  { rel: "stylesheet", href: app },
  { rel: "stylesheet", href: reports },
];

export default class ProjectProgressReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectData: this.props.context?.state?.projectData || [],
      data: [],
      isLoaded: false,
      hiddenProjectId: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.context?.state?.projectData !== this.props.context?.state?.projectData) {
      this.setState({
        projectData: this.props.context?.state?.projectData || [],
      });
    }
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  reset() {
    this.setState({
      data: [],
      hiddenProjectId: "",
    });
  }

  async getReportData(e) {
    e.preventDefault();
    // Fetch report data using hiddenProjectId
    // Example:
    // const data = await ProjectProgressReportsService.fetchReportData(this.state.hiddenProjectId);
    // this.setState({ data, isLoaded: true });
  }

  render() {
    const { projectProgressReport } = this.props;
    const { data, isLoaded, projectData, hiddenProjectId } = this.state;

    const projects = projectData.map((project) => (
      <option key={project._id} value={project._id}>
        {project.title}
      </option>
    ));

    const dataChart = (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          className="datachart"
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          {/* Add XAxis, YAxis, CartesianGrid, Tooltip, Legend, and Line components here */}
        </LineChart>
      </ResponsiveContainer>
    );

    return (
      <div className="">
        <h3 className="project-title">Project Progress Report</h3>
        <hr />
        <form onSubmit={this.getReportData} className="form-wrapper">
          <div className="row">
            <div className="form-group col-sm-6 col-lg-3">
              <input
                type="text"
                value={hiddenProjectId}
                list="data"
                onChange={this.handleInputChange}
                name="hiddenProjectId"
                className="form-control"
                autoComplete="off"
                placeholder="Select Project"
              />
              {hiddenProjectId && (
                <span
                  onClick={this.reset}
                  className="fa fa-times-circle rounded-0 close-circle"
                  style={{
                    position: "absolute",
                    top: "11px",
                    right: "50px",
                    cursor: "pointer",
                  }}
                ></span>
              )}
              <datalist id="data">{projects}</datalist>
            </div>
            <div className="form-group col-sm-3 col-lg-2">
              <input
                type="submit"
                className="btn btn-info btn-block"
                value="Submit"
                style={{ height: "35px" }}
                disabled={!hiddenProjectId}
              />
            </div>
          </div>
        </form>

        {isLoaded ? (
          <div className="logo">
            <img src="/images/loading.svg" alt="loading" />
          </div>
        ) : (
          <div>
            {data.length > 0 ? (
              <div>
                <span className="mb-1">(SP:Storypoint)</span>
                <div className="row">
                  <div className="col-lg-6 col-sm-12 col-md-9" style={{ height: "300px" }}>
                    {dataChart}
                  </div>
                  {/* Add another chart component here if needed */}
                </div>{" "}
              </div>
            ) : (
              <p className="text-center mt-5">
                <strong>Please select a project to view the report</strong>
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
}




// import React from "react";
// import app from "../../styles/app.css";
// import { CSVLink } from "react-csv";
// import reports from "./reports.css";
// export const links = () => [
//   { rel: "stylesheet", href: app },
//   { rel: "stylesheet", href: reports },
// ];
// import * as ProjectProgressReportsService from "../../Services/reports/project-progress-reports-service";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// //import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList } from 'recharts';

// export default class ProjectProgressReport extends React.Component {
//   constructor(props) {
//     super(props);
//     this.getReportData = this.getReportData.bind(this);
//     this.handleInputChange = this.handleInputChange.bind(this);
//     this.reset = this.reset.bind(this);
//   }
//   state = {
//     projectData: this.props.context?.state?.projectData || [],
//     data: [],
//     isLoaded: false,
//     hiddenProjectId: "",
//   };

//   async componentDidMount() {
//     if (this.state.projectData.length === 0) {
//     }
//     this.setState({
//       isLoaded: false,
//     });
//   }
//   componentWillReceiveProps(nextProps) {
//     this.setState({
//       projectData: nextProps.context.state.projectData,
//     });
//   }
//   handleInputChange(e) {
//     const target = e.target;
//     const value = target.value;
//     const name = target.name;

//     this.setState({
//       ...this.state,
//       [name]: value,
//     });
//   }
//   reset() {
//     this.setState({
//       data: [],
//       hiddenProjectId: "",
//     });
//   }

//   render() {
//     const {projectProgressReport}=this.props
//     console.log(projectProgressReport)
//     let projects = [];
//     const labelStyle = {
//       fontSize: "small",
//     };
//     // console.log("data", this.state.data);
//     projects = this.state.projectData.map((u) => {
//       return (
//         <option key={u._id} data-value={u._id}>
//           {u.title}
//         </option>
//       );
//     });
//     const dataChart = (
//       <ResponsiveContainer width="100%" height="100%">
//         <LineChart
//           className="datachart"
//           data={this.state.data ? this.state.data : []}
//           margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//         >
//           <XAxis dataKey="date" />
//           <YAxis />
//           <CartesianGrid strokeDasharray="3 3" />
//           <Tooltip />
//           <Legend
//             className="reportscrollbar"
//             verticalAlign="bottom"
//             align="center"
//             layout="horizontal"
//           />
//           <Line
//             type="monotone"
//             name=" Todo"
//             dataKey="todo"
//             stroke="#8884d8"
//             activeDot={{ r: 8 }}
//           />
//           <Line
//             type="monotone"
//             name=" Inprogress"
//             dataKey="inprogress"
//             stroke="#ffc658"
//           />
//           <Line
//             type="monotone"
//             name=" Completed"
//             dataKey="completed"
//             stroke="#82ca9f"
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     );

//     const dataChart1 = (
//       <ResponsiveContainer width="100%" height="100%">
//         <LineChart
//           data={this.state.data ? this.state.data : []}
//           margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//         >
//           <XAxis dataKey="date" />
//           <YAxis />
//           <CartesianGrid strokeDasharray="3 3" />
//           <Tooltip />
//           <Legend
//             className="reportscrollbar"
//             verticalAlign="bottom"
//             align="center"
//             layout="horizontal"
//           />
//           <Line
//             type="monotone"
//             name=" Todo SP"
//             dataKey="todoStoryPoint"
//             stroke="#8884d8"
//             activeDot={{ r: 8 }}
//           />
//           <Line
//             type="monotone"
//             name=" Inprogress SP"
//             dataKey="inprogressStoryPoint"
//             stroke="#ffc658"
//           />
//           <Line
//             type="monotone"
//             name=" Completed SP"
//             dataKey="completedStoryPoint"
//             stroke="#82ca9f"
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     );

//     return (
//       <React.Fragment>
//         <div className="">
//           <h3 className="project-title">Project Progress Report</h3>
//           <hr />
//           <form onSubmit={this.getReportData} className="form-wrapper">
//             <div className="row">
//               <div className="form-group col-sm-6 col-lg-3">
//                 <input
//                   type="text"
//                   value={this.state.hiddenProjectId}
//                   style={labelStyle}
//                   list="data"
//                   onChange={this.handleInputChange}
//                   name="hiddenProjectId"
//                   className="form-control"
//                   autoComplete="off"
//                   placeholder="Select Project"
//                 />
//                 {this.state.hiddenProjectId && (
//                   <span
//                     onClick={this.reset}
//                     className="fa fa-times-circle rounded-0 close-circle"
//                     style={{
//                       position: "absolute",
//                       top: "11px",
//                       right: "50px",
//                       cursor: "pointer",
//                     }}
//                   ></span>
//                 )}
//                 <datalist id="data">{projects}</datalist>
//               </div>
//               <div className="form-group col-sm-3 col-lg-2">
//                 <input
//                   type="submit"
//                   className="btn btn-info btn-block"
//                   value="Submit"
//                   style={{ height: "35px" }}
//                   disabled={!this.state.hiddenProjectId}
//                 />
//               </div>
//             </div>
//           </form>

//           {this.state.isLoaded ? (
//             <div className="logo">
//               <img src="/images/loading.svg" alt="loading" />
//             </div>
//           ) : (
//             <div>
//               {this.state.data.length > 0 ? (
//                 <div>
//                   <span className="mb-1">(SP:Storypoint)</span>
//                   <div className="row">
//                     <div
//                       className="col-lg-6 col-sm-12 col-md-9"
//                       style={{ height: "300px" }}
//                     >
//                       {dataChart}
//                     </div>
//                     <div
//                       className="col-lg-6 col-sm-12 col-md-9 "
//                       style={{ height: "300px" }}
//                     >
//                       {dataChart1}
//                     </div>
//                   </div>{" "}
//                 </div>
//               ) : (
//                 <p className="text-center mt-5">
//                   <strong> Please select a project to view the report</strong>
//                 </p>
//               )}
//             </div>
//           )}
//         </div>
//       </React.Fragment>
//     );
//   }
// }
