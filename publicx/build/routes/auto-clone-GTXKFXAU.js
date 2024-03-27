import {
  Menu
} from "/build/_shared/chunk-VFWVPLG5.js";
import {
  Footer
} from "/build/_shared/chunk-KUE2LJET.js";
import {
  Header
} from "/build/_shared/chunk-TDYRR7WO.js";
import "/build/_shared/chunk-WSROVG5I.js";
import "/build/_shared/chunk-BFH63P63.js";
import "/build/_shared/chunk-CGPR7F7J.js";
import "/build/_shared/chunk-ZNTOAH5I.js";
import "/build/_shared/chunk-IX3CRINA.js";
import {
  Form
} from "/build/_shared/chunk-7K4UV4CH.js";
import "/build/_shared/chunk-GIAAE3CH.js";
import {
  createHotContext
} from "/build/_shared/chunk-7LE2OC7F.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XU7DNSPJ.js";
import {
  require_react
} from "/build/_shared/chunk-BOXFZXVX.js";
import "/build/_shared/chunk-UWV35TSL.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/auto-clone/route.jsx
var import_react3 = __toESM(require_react(), 1);

// app/Components/auto-clone/daily-form.jsx
var import_react = __toESM(require_react(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/Components/auto-clone/daily-form.jsx"
  );
}
var DailyForm = class extends import_react.default.Component {
  constructor(props) {
    super(props);
    this.onSelectPeriodChanged = this.onSelectPeriodChanged.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.onSelectMonthDayChanged = this.onSelectMonthDayChanged.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  state = {
    periodType: "",
    repeat: "1",
    endNever: true,
    endOnDate: "",
    endAfterOccurances: "",
    repeatOnDate: "",
    repeatOn: "",
    monthlyType: "",
    end: "endNever",
    day: [],
    projectId: this.props.projectId,
    startDate: "",
    repeatOnDateValue: "",
    monthRepeatOnDayValue: "",
    monthRepeatOnDayValueOccurances: "",
    checkMsg: false,
    message: this.props.message,
    periodList: [
      { id: 1, value: "day", displayName: "Day" },
      { id: 2, value: "week", displayName: "Week" },
      { id: 3, value: "month", displayName: "Month" },
      { id: 4, value: "year", displayName: "Year" }
    ],
    repeatOnDay: [
      { id: 1, day: "sunday", value: false },
      { id: 2, day: "monday", value: false },
      { id: 3, day: "tuesday", value: false },
      { id: 4, day: "wednesday", value: false },
      { id: 5, day: "thursday", value: false },
      { id: 6, day: "friday", value: false },
      { id: 7, day: "saturday", value: false }
    ],
    monthRepeatOnDay: [
      { id: 1, day: "sunday", displayName: "Sunday" },
      { id: 2, day: "monday", displayName: "Monday" },
      { id: 3, day: "tuesday", displayName: "Tuesday" },
      { id: 4, day: "wednesday", displayName: "Wednesday" },
      { id: 5, day: "thursday", displayName: "Thursday" },
      { id: 6, day: "friday", displayName: "Friday" },
      { id: 7, day: "saturday", displayName: "Saturday" }
    ],
    MonthOptionList: [
      { id: 1, value: "repeatondate", displayName: "Repeat On Date" },
      { id: 2, value: "repeatonday", displayName: "Repeat On Day" }
    ]
  };
  componentDidMount() {
    this.getAutoClonByProjectId();
  }
  async getAutoClonByProjectId() {
    let { response, err } = await (void 0)(this.props.projectId);
    if (err) {
      this.setState({
        message: err
      });
    } else if (response && response.data.err) {
      this.setState({ message: response.data.err });
    } else {
      if (response.data.length > 0) {
        if (response.data[0].day !== void 0 && response.data[0].day !== null) {
          let days = response.data[0].day.split(",");
          for (let i = 0; i < days.length; i++) {
            for (let j = 0; j < this.state.repeatOnDay.length; j++) {
              if (this.state.repeatOnDay[j].day === days[i]) {
                this.state.repeatOnDay[j].value = true;
              }
            }
          }
        }
        if (response.data[0].endNever !== void 0 && response.data[0].endNever !== null) {
          this.setState({
            end: "endNever"
          });
        }
        if (response.data[0].endOnDate !== void 0 && response.data[0].endOnDate !== null) {
          this.setState({
            end: "endAfter"
          });
        }
        if (response.data[0].endAfterOccurances !== void 0 && response.data[0].endAfterOccurances !== null) {
          this.setState({
            end: "endOn"
          });
        }
        this.setState({
          _id: response.data[0]._id,
          projectId: response.data[0].projectId,
          periodType: response.data[0].periodType,
          repeat: response.data[0].repeat,
          endNever: response.data[0].endNever,
          endOnDate: response.data[0].endOnDate,
          endAfterOccurances: response.data[0].endAfterOccurances,
          monthlyType: response.data[0].monthlyType,
          day: response.data[0].day,
          repeatOnDateValue: response.data[0].repeatOnDateValue,
          monthRepeatOnDayValue: response.data[0].monthRepeatOnDayValue,
          monthRepeatOnDayValueOccurances: response.data[0].monthRepeatOnDayValueOccurances,
          startDate: response.data[0].startDate
        });
      }
    }
  }
  onSelectPeriodChanged(e) {
    let selectedPeriod = e.target.value;
    const name = e.target.name;
    if (name === "periodType") {
      let repeatOnDay = this.state.repeatOnDay && this.state.repeatOnDay.map((a) => {
        if (a.value === true) {
          a.value = false;
        }
        return a;
      });
      this.setState({
        end: "endNever",
        endOnDate: "",
        endAfterOccurances: "",
        repeatOnDay
      });
    }
    if (this.state.monthlyType === "repeatonday") {
      this.setState({
        monthRepeatOnDayValueOccurances: "",
        monthRepeatOnDayValue: ""
      });
    } else {
      this.setState({
        repeatOnDateValue: ""
      });
    }
    this.setState({
      [name]: selectedPeriod,
      checkMsg: false
    });
  }
  handleInputChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    if (name === "end") {
      if (this.state.end === "endAfter") {
        this.setState({
          endAfterOccurances: "",
          endNever: false
        });
      }
      if (this.state.end === "endOn") {
        this.setState({
          endOnDate: "",
          endNever: false
        });
      }
      if (this.state.end === "endNever") {
        this.setState({
          endNever: true,
          endOnDate: "",
          endAfterOccurances: ""
        });
      }
    }
    this.setState({
      [name]: value,
      checkMsg: false
    });
  }
  handleCheck(e) {
    const name = e.target.name;
    const value = e.target.type === "radio" ? e.target.checked : e.target.value;
    this.setState({
      [name]: value,
      checkMsg: false
    });
  }
  handleCheckbox(e, id) {
    const target = e.target;
    const value = target.checked;
    let checkDay = Object.assign([], this.state.repeatOnDay);
    let day = checkDay.map((r) => {
      if (r.id === id) {
        r.value = value;
      }
      return r;
    });
    this.setState({
      repeatOnDay: day,
      checkMsg: false
    });
  }
  onSelectMonthDayChanged(e) {
    let selectedPeriod = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: selectedPeriod,
      checkMsg: false
    });
  }
  onSubmit(e) {
    e.preventDefault();
    let values = this.state.repeatOnDay && this.state.repeatOnDay.filter((r) => {
      return r.value === true;
    });
    let day = [];
    let startDateId;
    let startDate;
    if (values.length > 0) {
      for (let i = 0; i < values.length; i++) {
        day.push(values[i].day);
      }
    }
    if (this.state.periodType === "week") {
      if (values.length > 0) {
        for (let i = 0; i < values.length; i++) {
          startDateId = values[i].id - 1;
        }
      }
      var currentDt = /* @__PURE__ */ new Date();
      var a = currentDt.getDay();
      var b = startDateId - a;
      startDate = /* @__PURE__ */ new Date();
      startDate.setDate(startDate.getDate() + b);
    } else {
      startDate = /* @__PURE__ */ new Date();
      if (this.state._id) {
        startDate = this.state.startDate;
      }
    }
    let period = {};
    if (this.state._id) {
      period = {
        _id: this.state._id,
        projectId: this.props.projectId,
        periodType: this.state.periodType,
        repeat: this.state.repeat,
        endNever: this.state.endNever,
        endOnDate: this.state.endOnDate,
        endAfterOccurances: this.state.endAfterOccurances,
        monthlyType: this.state.monthlyType,
        day,
        repeatOnDateValue: this.state.repeatOnDateValue,
        monthRepeatOnDayValue: this.state.monthRepeatOnDayValue,
        monthRepeatOnDayValueOccurances: this.state.monthRepeatOnDayValueOccurances,
        startDate
      };
      this.props.onUpdateAutoClone(period);
      this.setState(
        {
          checkMsg: true
        }
      );
    } else {
      period = {
        projectId: this.props.projectId,
        periodType: this.state.periodType,
        repeat: this.state.repeat,
        endNever: this.state.endNever,
        endOnDate: this.state.endOnDate,
        endAfterOccurances: this.state.endAfterOccurances,
        monthlyType: this.state.monthlyType,
        day,
        repeatOnDateValue: this.state.repeatOnDateValue,
        monthRepeatOnDayValue: this.state.monthRepeatOnDayValue,
        monthRepeatOnDayValueOccurances: this.state.monthRepeatOnDayValueOccurances,
        startDate
      };
      this.props.onAddAutoClone(period);
      this.setState({
        periodType: "",
        repeat: "1",
        endNever: false,
        endOnDate: "",
        endAfterOccurances: "",
        repeatOnDate: "",
        repeatOn: "",
        monthlyType: "",
        end: "endNever",
        day: [],
        projectId: this.props.projectId,
        startDate: "",
        repeatOnDateValue: "",
        monthRepeatOnDayValue: "",
        monthRepeatOnDayValueOccurances: "",
        checkMsg: true
      });
    }
  }
  render() {
    var {
      endOnDate,
      monthRepeatOnDayValueOccurances,
      repeatOnDateValue,
      monthRepeatOnDayValue,
      repeat,
      periodType,
      endAfterOccurances,
      monthlyType,
      end
    } = this.state;
    const labelStyle = {
      fontSize: "small"
    };
    const submitStyle = {
      float: "right"
    };
    let timeList = [];
    timeList.push(/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "", children: "Select " }, "mod", false, {
      fileName: "app/Components/auto-clone/daily-form.jsx",
      lineNumber: 361,
      columnNumber: 19
    }, this));
    this.state.periodList.forEach(function(period, i) {
      timeList.push(/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: period.value, children: period.displayName }, period.value, false, {
        fileName: "app/Components/auto-clone/daily-form.jsx",
        lineNumber: 363,
        columnNumber: 21
      }, this));
    });
    let monthList = [];
    monthList.push(/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "", children: "Select " }, "mod", false, {
      fileName: "app/Components/auto-clone/daily-form.jsx",
      lineNumber: 366,
      columnNumber: 20
    }, this));
    this.state.MonthOptionList.forEach(function(month, i) {
      monthList.push(/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: month.value, children: month.displayName }, month.value, false, {
        fileName: "app/Components/auto-clone/daily-form.jsx",
        lineNumber: 368,
        columnNumber: 22
      }, this));
    });
    let repeatOnDateData = [];
    repeatOnDateData.push(/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "", children: "Select Date" }, "mod", false, {
      fileName: "app/Components/auto-clone/daily-form.jsx",
      lineNumber: 371,
      columnNumber: 27
    }, this));
    for (let i = 1; i <= 31; i++) {
      repeatOnDateData.push(/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: i, children: i }, i, false, {
        fileName: "app/Components/auto-clone/daily-form.jsx",
        lineNumber: 374,
        columnNumber: 29
      }, this));
    }
    let repeatOnDayDropdown = [];
    repeatOnDayDropdown.push(/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "", children: "Select " }, "mod", false, {
      fileName: "app/Components/auto-clone/daily-form.jsx",
      lineNumber: 377,
      columnNumber: 30
    }, this));
    for (let i = 1; i < 6; i++) {
      repeatOnDayDropdown.push(/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: i, children: i }, i, false, {
        fileName: "app/Components/auto-clone/daily-form.jsx",
        lineNumber: 380,
        columnNumber: 32
      }, this));
    }
    let values = this.state.repeatOnDay.map((a) => {
      return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "checkbox", placeholder: " ", onChange: (e) => {
          this.handleCheckbox(e, a.id);
        }, checked: a.value }, void 0, false, {
          fileName: "app/Components/auto-clone/daily-form.jsx",
          lineNumber: 388,
          columnNumber: 29
        }, this),
        " \xA0",
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { style: { fontSize: "small", marginRight: "7px", textTransform: "capitalize" }, children: a.day }, void 0, false, {
          fileName: "app/Components/auto-clone/daily-form.jsx",
          lineNumber: 389,
          columnNumber: 21
        }, this)
      ] }, a.id, true, {
        fileName: "app/Components/auto-clone/daily-form.jsx",
        lineNumber: 385,
        columnNumber: 9
      }, this);
    });
    let monthRepeatOnDayArray = [];
    monthRepeatOnDayArray.push(/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "", children: "Select" }, "mod", false, {
      fileName: "app/Components/auto-clone/daily-form.jsx",
      lineNumber: 395,
      columnNumber: 32
    }, this));
    this.state.monthRepeatOnDay.forEach(function(day, i) {
      monthRepeatOnDayArray.push(/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: day.value, children: day.displayName }, i, false, {
        fileName: "app/Components/auto-clone/daily-form.jsx",
        lineNumber: 397,
        columnNumber: 34
      }, this));
    });
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "container", children: [
      this.state.checkMsg ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "alert alert-success", children: this.props.messagesuccess }, void 0, false, {
        fileName: "app/Components/auto-clone/daily-form.jsx",
        lineNumber: 401,
        columnNumber: 45
      }, this) }, void 0, false, {
        fileName: "app/Components/auto-clone/daily-form.jsx",
        lineNumber: 401,
        columnNumber: 40
      }, this) : "",
      this.state.message ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "alert alert-danger", children: this.state.message }, void 0, false, {
        fileName: "app/Components/auto-clone/daily-form.jsx",
        lineNumber: 403,
        columnNumber: 39
      }, this) : "",
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "POST", action: "/auto-clone", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-6 col-md-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-group", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "repeat", style: labelStyle, children: "Repeat Every" }, void 0, false, {
              fileName: "app/Components/auto-clone/daily-form.jsx",
              lineNumber: 409,
              columnNumber: 33
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
              "input",
              {
                type: "number",
                name: "repeat",
                className: "form-control",
                min: "1",
                value: repeat,
                onChange: this.handleInputChange
              },
              void 0,
              false,
              {
                fileName: "app/Components/auto-clone/daily-form.jsx",
                lineNumber: 411,
                columnNumber: 33
              },
              this
            )
          ] }, void 0, true, {
            fileName: "app/Components/auto-clone/daily-form.jsx",
            lineNumber: 408,
            columnNumber: 29
          }, this) }, void 0, false, {
            fileName: "app/Components/auto-clone/daily-form.jsx",
            lineNumber: 407,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-6 col-md-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-group", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { style: labelStyle, children: "Period/Time" }, void 0, false, {
              fileName: "app/Components/auto-clone/daily-form.jsx",
              lineNumber: 420,
              columnNumber: 33
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
              "select",
              {
                className: "form-control",
                onChange: this.onSelectPeriodChanged,
                value: periodType,
                name: "periodType",
                children: timeList
              },
              void 0,
              false,
              {
                fileName: "app/Components/auto-clone/daily-form.jsx",
                lineNumber: 421,
                columnNumber: 33
              },
              this
            )
          ] }, void 0, true, {
            fileName: "app/Components/auto-clone/daily-form.jsx",
            lineNumber: 418,
            columnNumber: 29
          }, this) }, void 0, false, {
            fileName: "app/Components/auto-clone/daily-form.jsx",
            lineNumber: 417,
            columnNumber: 25
          }, this)
        ] }, void 0, true, {
          fileName: "app/Components/auto-clone/daily-form.jsx",
          lineNumber: 406,
          columnNumber: 21
        }, this),
        this.state.periodType === "week" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
            " ",
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { htmlFor: "ends", style: labelStyle, children: "Repeat On : \xA0  " }, void 0, false, {
              fileName: "app/Components/auto-clone/daily-form.jsx",
              lineNumber: 432,
              columnNumber: 36
            }, this)
          ] }, void 0, true, {
            fileName: "app/Components/auto-clone/daily-form.jsx",
            lineNumber: 432,
            columnNumber: 29
          }, this),
          values
        ] }, void 0, true, {
          fileName: "app/Components/auto-clone/daily-form.jsx",
          lineNumber: 431,
          columnNumber: 11
        }, this) : "",
        this.state.periodType === "month" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-6 col-md-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-group", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { style: labelStyle, children: "Monthly Select" }, void 0, false, {
            fileName: "app/Components/auto-clone/daily-form.jsx",
            lineNumber: 443,
            columnNumber: 37
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
            "select",
            {
              className: "form-control",
              onChange: this.onSelectPeriodChanged,
              name: "monthlyType",
              value: monthlyType,
              children: monthList
            },
            void 0,
            false,
            {
              fileName: "app/Components/auto-clone/daily-form.jsx",
              lineNumber: 444,
              columnNumber: 37
            },
            this
          )
        ] }, void 0, true, {
          fileName: "app/Components/auto-clone/daily-form.jsx",
          lineNumber: 442,
          columnNumber: 33
        }, this) }, void 0, false, {
          fileName: "app/Components/auto-clone/daily-form.jsx",
          lineNumber: 441,
          columnNumber: 29
        }, this) }, void 0, false, {
          fileName: "app/Components/auto-clone/daily-form.jsx",
          lineNumber: 439,
          columnNumber: 11
        }, this) : "",
        this.state.periodType === "month" && this.state.monthlyType === "repeatondate" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-6 col-md-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-group", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          "select",
          {
            className: "form-control",
            onChange: this.onSelectPeriodChanged,
            name: "repeatOnDateValue",
            value: repeatOnDateValue,
            children: repeatOnDateData
          },
          void 0,
          false,
          {
            fileName: "app/Components/auto-clone/daily-form.jsx",
            lineNumber: 462,
            columnNumber: 37
          },
          this
        ) }, void 0, false, {
          fileName: "app/Components/auto-clone/daily-form.jsx",
          lineNumber: 461,
          columnNumber: 33
        }, this) }, void 0, false, {
          fileName: "app/Components/auto-clone/daily-form.jsx",
          lineNumber: 460,
          columnNumber: 29
        }, this) }, void 0, false, {
          fileName: "app/Components/auto-clone/daily-form.jsx",
          lineNumber: 458,
          columnNumber: 11
        }, this) : "",
        this.state.periodType === "month" && this.state.monthlyType === "repeatonday" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-6 col-md-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-group", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          "select",
          {
            className: "form-control",
            onChange: this.onSelectPeriodChanged,
            name: "monthRepeatOnDayValue",
            value: monthRepeatOnDayValue,
            children: monthRepeatOnDayArray
          },
          void 0,
          false,
          {
            fileName: "app/Components/auto-clone/daily-form.jsx",
            lineNumber: 476,
            columnNumber: 37
          },
          this
        ) }, void 0, false, {
          fileName: "app/Components/auto-clone/daily-form.jsx",
          lineNumber: 475,
          columnNumber: 33
        }, this) }, void 0, false, {
          fileName: "app/Components/auto-clone/daily-form.jsx",
          lineNumber: 474,
          columnNumber: 29
        }, this) }, void 0, false, {
          fileName: "app/Components/auto-clone/daily-form.jsx",
          lineNumber: 473,
          columnNumber: 11
        }, this) : "",
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
          fileName: "app/Components/auto-clone/daily-form.jsx",
          lineNumber: 484,
          columnNumber: 21
        }, this),
        this.state.periodType === "month" && this.state.monthRepeatOnDayValue !== "" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-6 col-md-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-group", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          "select",
          {
            className: "form-control",
            onChange: this.onSelectMonthDayChanged,
            name: "monthRepeatOnDayValueOccurances",
            value: monthRepeatOnDayValueOccurances,
            children: repeatOnDayDropdown
          },
          void 0,
          false,
          {
            fileName: "app/Components/auto-clone/daily-form.jsx",
            lineNumber: 489,
            columnNumber: 37
          },
          this
        ) }, void 0, false, {
          fileName: "app/Components/auto-clone/daily-form.jsx",
          lineNumber: 488,
          columnNumber: 33
        }, this) }, void 0, false, {
          fileName: "app/Components/auto-clone/daily-form.jsx",
          lineNumber: 487,
          columnNumber: 29
        }, this) }, void 0, false, {
          fileName: "app/Components/auto-clone/daily-form.jsx",
          lineNumber: 486,
          columnNumber: 11
        }, this) : "",
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "ends", style: labelStyle, children: "End" }, void 0, false, {
            fileName: "app/Components/auto-clone/daily-form.jsx",
            lineNumber: 501,
            columnNumber: 25
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-6 col-md-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-group", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-6 col-md-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-group", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "radio", checked: end === "endNever" ? true : false, onChange: this.handleInputChange, value: "endNever", name: "end" }, void 0, false, {
                fileName: "app/Components/auto-clone/daily-form.jsx",
                lineNumber: 507,
                columnNumber: 45
              }, this),
              " Never \xA0"
            ] }, void 0, true, {
              fileName: "app/Components/auto-clone/daily-form.jsx",
              lineNumber: 506,
              columnNumber: 41
            }, this) }, void 0, false, {
              fileName: "app/Components/auto-clone/daily-form.jsx",
              lineNumber: 505,
              columnNumber: 37
            }, this) }, void 0, false, {
              fileName: "app/Components/auto-clone/daily-form.jsx",
              lineNumber: 504,
              columnNumber: 33
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-4 col-md-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-group", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "radio", checked: end === "endOn" ? true : false, onChange: this.handleInputChange, value: "endOn", name: "end" }, void 0, false, {
                  fileName: "app/Components/auto-clone/daily-form.jsx",
                  lineNumber: 514,
                  columnNumber: 45
                }, this),
                " On \xA0"
              ] }, void 0, true, {
                fileName: "app/Components/auto-clone/daily-form.jsx",
                lineNumber: 513,
                columnNumber: 41
              }, this) }, void 0, false, {
                fileName: "app/Components/auto-clone/daily-form.jsx",
                lineNumber: 512,
                columnNumber: 37
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-8 col-md-8", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-group", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "input",
                {
                  className: "form-control",
                  type: "Date",
                  name: "endOnDate",
                  onChange: this.handleInputChange,
                  value: endOnDate,
                  disabled: this.state.end === "endOn" ? false : true
                },
                void 0,
                false,
                {
                  fileName: "app/Components/auto-clone/daily-form.jsx",
                  lineNumber: 519,
                  columnNumber: 45
                },
                this
              ) }, void 0, false, {
                fileName: "app/Components/auto-clone/daily-form.jsx",
                lineNumber: 518,
                columnNumber: 41
              }, this) }, void 0, false, {
                fileName: "app/Components/auto-clone/daily-form.jsx",
                lineNumber: 517,
                columnNumber: 37
              }, this)
            ] }, void 0, true, {
              fileName: "app/Components/auto-clone/daily-form.jsx",
              lineNumber: 511,
              columnNumber: 33
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-4 col-md-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-group", children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "radio", checked: end === "endAfter" ? true : false, onChange: this.handleInputChange, value: "endAfter", name: "end" }, void 0, false, {
                  fileName: "app/Components/auto-clone/daily-form.jsx",
                  lineNumber: 528,
                  columnNumber: 45
                }, this),
                " After \xA0"
              ] }, void 0, true, {
                fileName: "app/Components/auto-clone/daily-form.jsx",
                lineNumber: 526,
                columnNumber: 41
              }, this) }, void 0, false, {
                fileName: "app/Components/auto-clone/daily-form.jsx",
                lineNumber: 525,
                columnNumber: 37
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-6 col-md-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-group", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
                "input",
                {
                  type: "number",
                  name: "endAfterOccurances",
                  className: "form-control",
                  min: "1",
                  value: endAfterOccurances,
                  onChange: this.handleInputChange,
                  disabled: this.state.end === "endAfter" ? false : true
                },
                void 0,
                false,
                {
                  fileName: "app/Components/auto-clone/daily-form.jsx",
                  lineNumber: 534,
                  columnNumber: 45
                },
                this
              ) }, void 0, false, {
                fileName: "app/Components/auto-clone/daily-form.jsx",
                lineNumber: 533,
                columnNumber: 41
              }, this) }, void 0, false, {
                fileName: "app/Components/auto-clone/daily-form.jsx",
                lineNumber: 532,
                columnNumber: 37
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-2 col-md-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-group", children: "Occurances" }, void 0, false, {
                fileName: "app/Components/auto-clone/daily-form.jsx",
                lineNumber: 539,
                columnNumber: 41
              }, this) }, void 0, false, {
                fileName: "app/Components/auto-clone/daily-form.jsx",
                lineNumber: 538,
                columnNumber: 37
              }, this)
            ] }, void 0, true, {
              fileName: "app/Components/auto-clone/daily-form.jsx",
              lineNumber: 524,
              columnNumber: 33
            }, this)
          ] }, void 0, true, {
            fileName: "app/Components/auto-clone/daily-form.jsx",
            lineNumber: 503,
            columnNumber: 29
          }, this) }, void 0, false, {
            fileName: "app/Components/auto-clone/daily-form.jsx",
            lineNumber: 502,
            columnNumber: 25
          }, this)
        ] }, void 0, true, {
          fileName: "app/Components/auto-clone/daily-form.jsx",
          lineNumber: 500,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "row", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "col-sm-12", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-group", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(
          "input",
          {
            type: "submit",
            value: "Save",
            className: "btn btn-info btn-md mb-3",
            style: submitStyle
          },
          void 0,
          false,
          {
            fileName: "app/Components/auto-clone/daily-form.jsx",
            lineNumber: 550,
            columnNumber: 33
          },
          this
        ) }, void 0, false, {
          fileName: "app/Components/auto-clone/daily-form.jsx",
          lineNumber: 549,
          columnNumber: 29
        }, this) }, void 0, false, {
          fileName: "app/Components/auto-clone/daily-form.jsx",
          lineNumber: 548,
          columnNumber: 25
        }, this) }, void 0, false, {
          fileName: "app/Components/auto-clone/daily-form.jsx",
          lineNumber: 547,
          columnNumber: 21
        }, this)
      ] }, void 0, true, {
        fileName: "app/Components/auto-clone/daily-form.jsx",
        lineNumber: 404,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "app/Components/auto-clone/daily-form.jsx",
      lineNumber: 400,
      columnNumber: 7
    }, this);
  }
};

// app/routes/auto-clone/route.jsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/auto-clone/route.jsx"
  );
  import.meta.hot.lastModified = "1709724100520.156";
}
var AutoCloneType = class extends import_react3.default.Component {
  constructor(props) {
    super(props);
    this.onSelectPeriodChanged = this.onSelectPeriodChanged.bind(this);
    this.onAddAutoClone = this.onAddAutoClone.bind(this);
    this.onUpdateAutoClone = this.onUpdateAutoClone.bind(this);
  }
  state = {
    period: "",
    periodList: [{ id: 5, value: "custom", displayName: "Custom" }]
  };
  onSelectPeriodChanged(e) {
    let selectedPeriod = e.target.value;
    this.setState({
      period: selectedPeriod
    });
  }
  async onAddAutoClone(period) {
    let { response, err } = await autocloneservice.addAutoClone(period);
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
        messagesuccess: response.data.msg
      });
    }
  }
  async onUpdateAutoClone(period) {
    let { response, err } = await autocloneservice.updateAutoClone(period);
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
        messagesuccess: response.data.msg
      });
    }
  }
  render() {
    var { period } = this.state;
    const labelStyle = {
      fontSize: "small"
    };
    let timeList = [];
    timeList.push(
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { value: "", children: "Select Period" }, "mod", false, {
        fileName: "app/routes/auto-clone/route.jsx",
        lineNumber: 100,
        columnNumber: 7
      }, this)
    );
    this.state.periodList.forEach(function(period2, i) {
      timeList.push(
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("option", { value: period2.value, children: period2.displayName }, period2.value, false, {
          fileName: "app/routes/auto-clone/route.jsx",
          lineNumber: 106,
          columnNumber: 9
        }, this)
      );
    });
    return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Header, {}, void 0, false, {
        fileName: "app/routes/auto-clone/route.jsx",
        lineNumber: 113,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Menu, {}, void 0, false, {
        fileName: "app/routes/auto-clone/route.jsx",
        lineNumber: 114,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Footer, {}, void 0, false, {
        fileName: "app/routes/auto-clone/route.jsx",
        lineNumber: 116,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "container-fluid", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("form", { onSubmit: this.onSubmit, className: "mt-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "row", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "col-sm-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "form-group", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("label", { style: labelStyle, children: "Period/Time" }, void 0, false, {
            fileName: "app/routes/auto-clone/route.jsx",
            lineNumber: 122,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
            "select",
            {
              className: "form-control",
              onChange: this.onSelectPeriodChanged,
              value: period,
              children: timeList
            },
            void 0,
            false,
            {
              fileName: "app/routes/auto-clone/route.jsx",
              lineNumber: 123,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "app/routes/auto-clone/route.jsx",
          lineNumber: 121,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "app/routes/auto-clone/route.jsx",
          lineNumber: 120,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "app/routes/auto-clone/route.jsx",
          lineNumber: 119,
          columnNumber: 11
        }, this) }, void 0, false, {
          fileName: "app/routes/auto-clone/route.jsx",
          lineNumber: 118,
          columnNumber: 9
        }, this),
        this.state.period === "custom" ? /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
          DailyForm,
          {
            projectId: this.props.projectId,
            onAddAutoClone: this.onAddAutoClone,
            onUpdateAutoClone: this.onUpdateAutoClone,
            messagesuccess: this.state.messagesuccess,
            message: this.state.message
          },
          void 0,
          false,
          {
            fileName: "app/routes/auto-clone/route.jsx",
            lineNumber: 135,
            columnNumber: 11
          },
          this
        ) : ""
      ] }, void 0, true, {
        fileName: "app/routes/auto-clone/route.jsx",
        lineNumber: 117,
        columnNumber: 15
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/auto-clone/route.jsx",
      lineNumber: 112,
      columnNumber: 7
    }, this);
  }
};
export {
  AutoCloneType as default
};
//# sourceMappingURL=/build/routes/auto-clone-GTXKFXAU.js.map
