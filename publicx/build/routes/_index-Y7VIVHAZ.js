import {
  summaryRoute
} from "/build/_shared/chunk-CANGC224.js";
import "/build/_shared/chunk-HUF2CQ7I.js";
import "/build/_shared/chunk-VFRTC5XU.js";
import "/build/_shared/chunk-NUU62HHF.js";
import "/build/_shared/chunk-YU2GXVM7.js";
import "/build/_shared/chunk-YRVGMHYS.js";
import "/build/_shared/chunk-G7CHZRZX.js";
import {
  require_browser_umd
} from "/build/_shared/chunk-FN7THW23.js";
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
import "/build/_shared/chunk-7K4UV4CH.js";
import "/build/_shared/chunk-GIAAE3CH.js";
import {
  createHotContext
} from "/build/_shared/chunk-7LE2OC7F.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XU7DNSPJ.js";
import "/build/_shared/chunk-BOXFZXVX.js";
import "/build/_shared/chunk-UWV35TSL.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/_index.tsx
var import_mongoose = __toESM(require_browser_umd(), 1);

// app/config/config.ts
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/config/config.ts"
  );
  import.meta.hot.lastModified = "1709383713302.354";
}
var config = {
  UPLOAD_PATH: "E:/Propeak-PMS/server",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "propeakpms@gmail.com",
    pass: "algorisys"
  },
  link: "http://172.104.176.113:3000/",
  from: "propeakpms@gmail.com",
  serverPort: 3001,
  db: "mongodb://localhost/propeakdb",
  taskEmailContent: 'Hi, <br/> <br/> You have been assigned the following task: <br/><br/> <b> Project </b> : #projectName# <br/> <b> Task </b> : #title#<br/> <b> Priority </b> : #priority# <br/> <b> Description </b> : #description# <br/> <br/> To view task details, click <a href="http://172.104.176.113:3000/project/task/edit/#projectId#/#newTaskId#" alt="task">here</a> or copy this URL on the browser  http://172.104.176.113:3000/project/task/edit/#projectId#/#newTaskId# <br/><br/> Thanks, <br/> proPeak Team',
  editlink: " http://172.104.176.113:3000/project/tasks/",
  servercert: "../cert/localhost.crt",
  servercertkey: "../cert/localhost.key",
  secureSite: true,
  securePort: 9e3,
  tokenExpiry: 5e3,
  refreshTokenExpiry: 36e5,
  msgLink: "http://172.104.176.113:3000/project/task/edit/",
  daysForMessageMail: 3,
  projectStatusCheck: ["inprogress", "new", "onHold"],
  socketPort: 3002,
  maxInprogressTaskCount: 2,
  defaultEmail: "sapana.shete@algorisys.com",
  leaveEmailContent: " //This is a system-generated mail. Please do not reply to this mail  <br> Dear Ma'am/Sir,<br><br> This is to inform you that I will not be able to attend the office from <b>{fromDate}</b> to <b>{toDate}</b>.<br>Kindly grant me permission for <b>{workingDays}</b> day/s <b>{leaveType}.</b>.<br>Reason: {reason} <br>Please click on the following link, http://172.104.176.113:3000/leave-details/{leaveId} to view the leave details.<br><br> Thanks and Regards,<br> proPeak Team",
  leaveSubject: "Leave application {fromDate} to {toDate}- {userName}",
  prodMode: "ON",
  approveRejectEmailContent: "//This is a system-generated mail. Please don't reply <br> Your Leave has been {leaveStatus} <br>Reason: {reasonOfRejection} <br> Thanks and Regards,<br> {loggedInUser}",
  approveRejectSubject: "Leave {status} - {fromDate}  to  {toDate}",
  holidayList: [],
  monthStart: 3,
  months: [3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2],
  taskEmailLink: "/project/task/edit/#projectId#/#newTaskId#",
  msgEmailLink: "/project/task/edit/",
  redisClientPort: 6379,
  redisClientHost: "127.0.0.1",
  accessRightsExpiry: 2592e3,
  rabbitMQ_exchangeName: "ALGO_message_exch",
  rabbitMQ_connectionKey: "amqp://localhost",
  taskStatusEmailContent: 'Hi, <br/> <br/> Task assigned to the user is completed. task: <br/><br/> <b> Project </b> : #projectName# <br/> <b> Task </b> : #title#<br/> <b> Priority </b> : #priority# <br/> <b> Description </b> : #description# <br/> <br/> To view task details, click <a href="http://172.104.176.113:3000/project/task/edit/#projectId#/#newTaskId#" alt="task">here</a> or copy this URL on the browser  http://172.104.176.113:3000/project/task/edit/#projectId#/#newTaskId# <br/><br/> Thanks, <br/> proPeak Team',
  companyCode: "Algo_",
  emails: "sapana.shete@algorisys.com",
  applytoEmail: "rinkulata.pooniya@algorisys.com",
  loginAttemptCount: 5,
  unLockAccountHour: 1,
  beforeThreeDay: 3,
  beforeSevenDay: 7,
  minWorkingHours: 8,
  showMessage: true,
  leaveLink: "http://172.104.176.113:3000/leave-details/",
  extentionFile: ["PDF", "DOCX", "PNG", "JPEG", "JPG", "TXT", "PPT", "XLSX", "XLS", "PPTX"],
  projectCreation: "unLimited",
  taskCreation: "unLimited",
  userCreation: "unLimited",
  defaultProject: "Daily Task"
};
var config_default = config;

// app/routes/_index.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/_index.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/_index.tsx"
  );
  import.meta.hot.lastModified = "1709724502938.9377";
}
function App() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Header, {}, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 32,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Menu, {}, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 33,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(summaryRoute, {}, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 34,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Footer, {}, void 0, false, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 35,
      columnNumber: 5
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 30,
    columnNumber: 10
  }, this);
}
_c = App;
var connectToMongoDB = async () => {
  try {
    await import_mongoose.default.connect(config_default.db, {
      useUnifiedTopology: true
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
connectToMongoDB();
var _c;
$RefreshReg$(_c, "App");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  App as default
};
//# sourceMappingURL=/build/routes/_index-Y7VIVHAZ.js.map
