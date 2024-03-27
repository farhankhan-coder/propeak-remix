import React from "react";
import app from "../../styles/app.css";
import { CSVLink } from "react-csv";

export const links = () => [{ rel: "stylesheet", href: app }];
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  ResponsiveContainer,
} from "recharts";

const TiltedAxisTick = (props) => {
  const { x, y, stroke, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={10}
        textAnchor="middle"
        width={20}
        scaleToFit={true}
        fontSize={12}
        fill="#666"
        transform="rotate(-15)"
      >
        {payload.value}
      </text>
    </g>
  );
};

export default class IncompeleteTaskCountReport extends React.Component {
  constructor(props) {
    super(props);
    if (this.getReportData) {
      this.getReportData = this.getReportData.bind(this);
    }
  }
  
  state = {
    users: [],
    data: [],
    isLoaded: false,
    userNameToId: {},
    projectName: "",
  };
  async componentDidMount() {
    if (this.state.users.length === 0) {
      this.props.context.actions.setUsers();
    }
    this.getReportData();
    this.setState({
      isLoaded: false,
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      projectName: nextProps.context.state.projectName,
      users: nextProps.context.state.users,
      userNameToId: nextProps.context.state.userNameToId,
    });
  }

  render() {
    const {incompleteTaskCountReport}=this.props;
    console.log(incompleteTaskCountReport," is data is coming or not ")
    const CustomLabelList = (props) => {
      const { x, y, stroke, value, payload } = props;

      return (
        <g transform={`translate(${x},${y})`}>
          <text
            x={0}
            y={0}
            width={20}
            scaleToFit={true}
            fontSize={12}
            fill="#666"
            transform="rotate(-45)"
          >
            {payload.value}
          </text>
        </g>
      );
    };

    const dataChart = (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={this.state.data ? this.state.data : []}
          margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
        >
          <XAxis
            dataKey="userName"
            tick={<TiltedAxisTick />}
            minTickGap={10}
            interval={0}
          />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" position="middle" />
          <Bar
            name=" New Task Count"
            dataKey="newtaskCount"
            stackId="a"
            fill="#00C49F"
          ></Bar>
          <Bar
            name=" Inprogress Task Count"
            dataKey="inprogresstaskCount"
            stackId="a"
            fill="#FFBB28"
          />
        </BarChart>
      </ResponsiveContainer>
    );

    return (
      <React.Fragment>
        <div className="">
          <h3 className="project-title">Member Incomplete Task Count Report</h3>
          <hr />

          {this.state.isLoaded ? (
            <div className="logo">
              <img src="/images/loading.svg" alt="loading" />
            </div>
          ) : (
            <div>
              <div className="row ">
                <div
                  className="col-lg-9 col-sm-12 col-md-12 "
                  style={{ height: "350px" }}
                >
                  {dataChart}
                </div>
              </div>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}
