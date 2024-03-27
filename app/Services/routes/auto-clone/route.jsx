import React, { useState } from "react";
import DailyForm from "../../Components/auto-clone/daily-form";
// import * as autocloneservice from "../../Services/autoclone/auto-clone-service";
import { addAutoClone ,getAutoCloneByProjectId} from '../../Services/autoclone/auto-clone-service';
import { redirect,json } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
//get 
export const loader = async ({ params }) => {
  try {
    const projectId = params.projectId;
    
    const { autoCloneData, err } = await getAutoCloneByProjectId(projectId);
    console.log(autoCloneData)
    if (err) {
      console.error('Error getting auto clone by project id:', err);
      throw new Error('Failed to fetch auto clone data');
    }

    return json({ autoCloneData: autoCloneData });
  } catch (error) {
    console.error('Error processing request:', error);
    throw error;
  }
};
export default class AutoCloneType extends React.Component {
  constructor(props) {
    super(props);
    this.onSelectPeriodChanged = this.onSelectPeriodChanged.bind(this);
    this.onAddAutoClone = this.onAddAutoClone.bind(this);
    this.onUpdateAutoClone = this.onUpdateAutoClone.bind(this);
  }
  state = {
    period: "",
    periodList: [{ id: 5, value: "custom", displayName: "Custom" }],
  };

  onSelectPeriodChanged(e) {
    let selectedPeriod = e.target.value;
    this.setState({
      period: selectedPeriod,
    });
  }

  async onAddAutoClone(period) {
    let { response, err } = await autocloneservice.addAutoClone(period);
    if (err) {
      this.setState({
        message: "Error: " + err,
      });
    } else if (response && response.data.err) {
      this.setState({
        message: "Error: " + response.data.err,
      });
    } else {
      this.setState({
        messagesuccess: response.data.msg,
      });
    }
  }

  async onUpdateAutoClone(period) {
    let { response, err } = await autocloneservice.updateAutoClone(period);
    if (err) {
      this.setState({
        message: "Error: " + err,
      });
    } else if (response && response.data.err) {
      this.setState({
        message: "Error: " + response.data.err,
      });
    } else {
      this.setState({
        messagesuccess: response.data.msg,
      });
    }
  }

  render() {
    var { period } = this.state;
    const labelStyle = {
      fontSize: "small",
    };

    let timeList = [];
    timeList.push(
      <option value="" key="mod">
        Select Period
      </option>
    );
    this.state.periodList.forEach(function (period, i) {
      timeList.push(
        <option value={period.value} key={period.value}>
          {period.displayName}
        </option>
      );
    });
    return (
      <div className="container-fluid">
        <form onSubmit={this.onSubmit} className="mt-3">
          <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
                <label style={labelStyle}>Period/Time</label>
                <select
                  className="form-control"
                  onChange={this.onSelectPeriodChanged}
                  value={period}
                >
                  {timeList}
                </select>
              </div>
            </div>
          </div>
        </form>
        {this.state.period === "custom" ? (
          <DailyForm
            projectId={this.props.projectId}
            onAddAutoClone={this.onAddAutoClone}
            onUpdateAutoClone={this.onUpdateAutoClone}
            messagesuccess={this.state.messagesuccess}
            message={this.state.message}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export const action = async ({ request }) => {
  try {
    if (request.method === 'POST') {
      const formData = new URLSearchParams(await request.text());
      const projectId = formData.get('projectId');
      const periodType = formData.get('periodType');
      const repeat = formData.get('repeat');
      const endOnDate = formData.get('endOnDate');
      const endAfterOccurances = formData.get('endAfterOccurances');
      const endNever = formData.get('endNever');
      const monthlyType = formData.get('monthlyType');
      const day = formData.get('day');
      const repeatOnDateValue = formData.get('repeatOnDateValue');
      const monthRepeatOnDayValue = formData.get('monthRepeatOnDayValue');
      const monthRepeatOnDayValueOccurances = formData.get('monthRepeatOnDayValueOccurances');
      const startDate = formData.get('startDate');

      const { response, err } = await addAutoClone(
        projectId,
        periodType,
        repeat,
        endOnDate,
        endAfterOccurances,
        endNever,
        monthlyType,
        day,
        repeatOnDateValue,
        monthRepeatOnDayValue,
        monthRepeatOnDayValueOccurances,
        startDate
      );

      if (!err) {
        return redirect('/auto-clone'); 
      } else {
        console.error('Error adding auto clone:', err);
        return json({ error: 'Failed to add auto clone' }, { status: 500 });
      }
    } else {
      return json({ error: 'Invalid request method.' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error processing action:', error);
    return json({ error: 'Internal server error.' }, { status: 500 });
  }
};
