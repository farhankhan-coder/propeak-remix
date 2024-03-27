import config from "~/config/config";
import { getSundayInaMonth } from "../../common/common";
import { logInfo } from "../../common/logger";
import Holiday from "../../models/leave/holiday-model";
import Project from "../../models/project/project-model";
import { DateToString } from "../../utils/date-util";

// Define error messages
const errors = {
  TASK_DOESNT_EXIST: "Task does not exist",
  ADD_TASK_ERROR: "Error occurred while adding the Task",
  EDIT_TASK_ERROR: "Error occurred while updating the Task",
  DELETE_TASK_ERROR: "Error occurred while deleting the Task",
  SEARCH_PARAM_MISSING: "Please input required parameters for search",
  SERVER_ERROR: "Oops, something went wrong. Please try again.",
  NOT_AUTHORIZED: "You are not authorized",
};

const getUsersTodaysOpenTasks = async (
  userRole,
  userId,
  projectid,
  flag,
  showArchive
) => {
  let projectId = projectid;
  logInfo("getUsersTodaysOpenTasks");
  if (!userRole) {
    res.json({
      err: errors.NOT_AUTHORIZED,
    });
    return;
  }
  let dt = new Date();
  let dt1 = new Date();
  dt1.setUTCFullYear(dt.getFullYear()),
    dt1.setUTCMonth(dt.getMonth()),
    dt1.setUTCDate(dt.getDate());
  let projectFields = {
    $project: {
      _id: 1,
      title: 1,
      status: 1,
      userid: 1,
      projectUsers: 1,
      "tasks.title": 1,
      "tasks._id": 1,
      "tasks.userId": 1,
      "tasks.description": 1,
      "tasks.startDate": 1,
      "tasks.endDate": 1,
      "tasks.isDeleted": 1,
      "tasks.category": 1,
      "tasks.status": 1,
      "tasks.completed": 1,
    },
  };
  let taskCondition = {
    "tasks.isDeleted": false,
  };

  if (flag === "duetoday") {
    taskCondition["tasks.status"] = { $ne: "onHold" };
  }
  if (flag === "newTask") {
    taskCondition["tasks.status"] = "new";
  }
  if (flag === "inprogress") {
    taskCondition["tasks.status"] = "inprogress";
  }
  if (flag === "overdue" || flag === "futureTask") {
    taskCondition["tasks.status"] = { $ne: "completed" };
  }
  if (flag === "onhold") {
    taskCondition["tasks.status"] = "onHold";
  }

  if (flag === "cancelled") {
    taskCondition = {
      "tasks.isDeleted": true,
    };
  }

  if (userRole !== "admin") {
    if (userRole === "owner") {
      if (flag === "duetoday") {
        taskCondition = {
          "tasks.isDeleted": false,
          "tasks.status": { $ne: "onHold" },
        };
      }
      if (flag === "newTask") {
        taskCondition = {
          "tasks.isDeleted": false,
          "tasks.status": "new",
        };
      }
      if (flag === "inprogress") {
        taskCondition = {
          "tasks.isDeleted": false,
          "tasks.status": "inprogress",
        };
      }
      if (flag === "overdue") {
        taskCondition = {
          "tasks.isDeleted": false,
          "tasks.status": { $ne: "completed" },
        };
      }
      if (flag === "onhold") {
        taskCondition = {
          "tasks.isDeleted": false,
          "tasks.status": "onHold",
        };
      }
      if (flag === "cancelled") {
        taskCondition = {
          "tasks.isDeleted": true,
        };
      }
      if (flag === "futureTask") {
        taskCondition = {
          "tasks.isDeleted": false,
          "tasks.status": { $ne: "completed" },
        };
      }
    } else {
      taskCondition["tasks.userId"] = userId;

      if (flag === "cancelled") {
        taskCondition = {
          "tasks.isDeleted": true,
          "tasks.userId": userId,
        };
      }
    }
  }
  let userCondition = {
    isDeleted: false,
  };
  if (showArchive === false) {
    userCondition["archive"] = false;
  }

  if (projectId !== "undefined" && projectId !== null && projectId !== "") {
    if (userRole === "admin") {
      userCondition["_id"] = ObjectId(projectId);
    }
    if (userRole === "owner") {
      userCondition = {
        _id: ObjectId(projectId),
        $and: [
          {
            $or: [
              {
                userid: userId,
              },
              {
                "projectUsers.userId": userId,
              },
            ],
          },
        ],
        isDeleted: false,
      };
    }
  } else {
    if (userRole === "owner") {
      userCondition = {
        $and: [
          {
            $or: [
              {
                userid: userId,
              },
              {
                "projectUsers.userId": userId,
              },
            ],
          },
        ],
        isDeleted: false,
      };
    }
    if (userRole === "user") {
      userCondition = {
        isDeleted: false,
        "projectUsers.userId": userId,
      };
    }
  }

  let projectCond = {
    $match: userCondition,
  };
  let tasksUnwind = {
    $unwind: "$tasks",
  };
  let taskFilterCondition = {
    $match: taskCondition,
  };

  logInfo(
    [projectCond, projectFields, tasksUnwind, taskFilterCondition],
    "getUsersTodaysOpenTasks filtercondition"
  );
  var result = await Project.aggregate([
    projectCond,
    projectFields,
    tasksUnwind,
    taskFilterCondition,
  ]);
  //  console.log("result",result);
  let date = DateToString(new Date().toISOString());
  let tasks = result.map((p) => {
    let t = {};
    t.projectId = p._id;
    t.projectTitle = p.title;
    t._id = p.tasks._id;
    t.title = p.tasks.title;
    t.description = p.tasks.description;
    t.status = p.tasks.status;
    t.startDate = p.tasks.startDate;
    t.endDate = p.tasks.endDate;
    t.userId = p.tasks.userId;
    t.completed = p.tasks.completed;
    let user = p.projectUsers.filter(
      (u) => u.userId === p.tasks.userId.toString()
    );
    t.userName =
      user && Array.isArray(user) && user.length > 0 ? user[0].name : "";
    return t;
  });

  if (flag === "duetoday") {
    let dueTodayTaskArray = [];
    for (let i = 0; i < tasks.length; i++) {
      if (dateUtil.DateToString(tasks[i].startDate) === date) {
        dueTodayTaskArray.push(tasks[i]);
      }
    }
    return dueTodayTaskArray;
  }
  if (flag === "overdue") {
    let overDueTaskArray = [];
    for (let i = 0; i < tasks.length; i++) {
      if (
        tasks[i].endDate !== undefined &&
        tasks[i].endDate !== null &&
        tasks[i].endDate !== ""
      ) {
        if (dateUtil.DateToString(tasks[i].endDate) < date) {
          overDueTaskArray.push(tasks[i]);
        }
      }
    }

    return overDueTaskArray;
  }

  if (flag === "futureTask") {
    let futureTaskArray = [];
    for (let i = 0; i < tasks.length; i++) {
      if (
        (tasks[i].endDate === undefined ||
          tasks[i].endDate === null ||
          tasks[i].endDate === "") &&
        (tasks[i].startDate === undefined ||
          tasks[i].startDate === null ||
          tasks[i].startDate === "") &&
        tasks[i].status !== "onHold"
      ) {
        futureTaskArray.push(tasks[i]);
      }
    }
    return futureTaskArray;
  }
  if (
    flag === "newTask" ||
    flag === "inprogress" ||
    flag === "onhold" ||
    flag === "cancelled"
  ) {
    return tasks;
  }
};

const gettodaysTasksChartData = async (userRole, userId, projectid, showArchive) => {
  logInfo("gettodaysTasksChartData");
  let projectId = projectid;
  if (!userRole) {
    res.json({
      err: errors.NOT_AUTHORIZED,
    });
    return;
  }
  let dt = new Date();
  let dt1 = new Date();
  dt1.setUTCFullYear(dt.getFullYear()),
    dt1.setUTCMonth(dt.getMonth()),
    dt1.setUTCDate(dt.getDate());
  let projectFields = {
    $project: {
      _id: 1,
      title: 1,
      userid: 1,
      status: 1,
      "tasks.title": 1,
      "tasks._id": 1,
      "tasks.userId": 1,
      projectUsers: 1,
      "tasks.description": 1,
      "tasks.startDate": 1,
      "tasks.endDate": 1,
      "tasks.isDeleted": 1,
      "tasks.category": 1,
      "tasks.status": 1,
      "tasks.completed": 1,
      "tasks.dateOfCompletion": 1,
    },
  };
  let taskCondition = {
    "tasks.isDeleted": false,
  };

  let projCondition = {
    isDeleted: false,
  };
  if (projectId) {
    projCondition["_id"] = ObjectId(projectId);
  }
  if (showArchive === false) {
    projCondition["archive"] = false;
  }
  if (userRole === "owner") {
    projCondition.$or = [
      {
        userid: userId,
      },
      {
        "projectUsers.userId": userId,
      },
    ];
  }
  if (userRole === "user") {
    projCondition = {
      isDeleted: false,
      "projectUsers.userId": userId,
    };
  }
  if (userRole !== "admin") {
    if (userRole === "owner") {
      taskCondition = {
        "tasks.isDeleted": false,
      };
    } else {
      taskCondition = {
        "tasks.userId": userId,
        "tasks.isDeleted": false,
      };
    }
  }
  let projectCond = {
    $match: projCondition,
  };
  let tasksUnwind = {
    $unwind: "$tasks",
  };
  let taskFilterCondition = {
    $match: taskCondition,
  };

  logInfo(
    [projectCond, projectFields, tasksUnwind, taskFilterCondition],
    "gettodaysTasksChartData"
  );

  var result = await Project.aggregate([
    projectCond,
    projectFields,
    tasksUnwind,
    taskFilterCondition,
  ]);

  let tasks = result.map((p) => {
    let t = {};
    t.projectId = p._id;
    t.projectTitle = p.title;
    t.title = p.tasks.title;
    t.status = p.tasks.status;
    t.userId = p.tasks.userId;
    t.startDate = p.tasks.startDate;
    t.endDate = p.tasks.endDate;
    t.dateOfCompletion = p.tasks.dateOfCompletion;
    t.isDeleted = p.tasks.isDeleted;
    return t;
  });

  let countArray = [];

  if (tasks.length > 0) {
    let tasksByProjectId = {};
    for (let i = 0; i < tasks.length; i++) {
      if (tasksByProjectId[tasks[i].status]) {
        tasksByProjectId[tasks[i].status].push(tasks[i]);
      } else {
        tasksByProjectId[tasks[i].status] = [tasks[i]];
      }
    }

    let keys = Object.keys(tasksByProjectId);
    let overDueCount = 0;
    let futureTaskCount = 0;
    let todaysTaskCount = 0;
    let date = dateUtil.DateToString(new Date());
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] === "completed") {
        let completed = tasksByProjectId[keys[i]].length;
        countArray.push({ name: "Completed", value: completed });
      } else if (keys[i] === "inprogress") {
        let inprogress = tasksByProjectId[keys[i]].length;
        for (let j = 0; j < tasksByProjectId[keys[i]].length; j++) {
          let dbDate = dateUtil.DateToString(
            tasksByProjectId[keys[i]][j].endDate
          );
          if (
            tasksByProjectId[keys[i]][j].endDate !== undefined &&
            tasksByProjectId[keys[i]][j].endDate !== null &&
            tasksByProjectId[keys[i]][j].endDate !== ""
          ) {
            if (dbDate < date) {
              overDueCount++;
            }
          }
          if (
            (tasksByProjectId[keys[i]][j].endDate === undefined ||
              tasksByProjectId[keys[i]][j].endDate === null ||
              tasksByProjectId[keys[i]][j].endDate === "") &&
            (tasksByProjectId[keys[i]][j].startDate === undefined ||
              tasksByProjectId[keys[i]][j].startDate === null ||
              tasksByProjectId[keys[i]][j].startDate === "")
          ) {
            futureTaskCount++;
          }
        }
        countArray.push({ name: "Running", value: inprogress });
      } else if (keys[i] === "new") {
        let todo = tasksByProjectId[keys[i]].length;
        for (let j = 0; j < tasksByProjectId[keys[i]].length; j++) {
          let dbDate = dateUtil.DateToString(
            tasksByProjectId[keys[i]][j].endDate
          );
          if (
            tasksByProjectId[keys[i]][j].endDate !== undefined &&
            tasksByProjectId[keys[i]][j].endDate !== null &&
            tasksByProjectId[keys[i]][j].endDate !== ""
          ) {
            if (dbDate < date) {
              overDueCount++;
            }
          }
          if (
            (tasksByProjectId[keys[i]][j].endDate === undefined ||
              tasksByProjectId[keys[i]][j].endDate === null ||
              tasksByProjectId[keys[i]][j].endDate === "") &&
            (tasksByProjectId[keys[i]][j].startDate === undefined ||
              tasksByProjectId[keys[i]][j].startDate === null ||
              tasksByProjectId[keys[i]][j].startDate === "")
          ) {
            futureTaskCount++;
          }
        }
        countArray.push({ name: "New", value: todo });
      } else if (keys[i] === "onHold") {
        let onhold = tasksByProjectId[keys[i]].length;
        for (let j = 0; j < tasksByProjectId[keys[i]].length; j++) {
          let dbDate = dateUtil.DateToString(
            tasksByProjectId[keys[i]][j].endDate
          );
          if (
            tasksByProjectId[keys[i]][j].endDate !== undefined &&
            tasksByProjectId[keys[i]][j].endDate !== null &&
            tasksByProjectId[keys[i]][j].endDate !== ""
          ) {
            if (dbDate < date) {
              overDueCount++;
            }
          }
        }
        countArray.push({ name: "OnHold", value: onhold });
      }
    }
    let allTask = result.length;
    countArray.push({ name: "Overdue", value: overDueCount });
    countArray.push({ name: "FutureTask", value: futureTaskCount });
    countArray.push({ name: "TodaysTask", value: todaysTaskCount });
  }
  return countArray;
};

const getUserProductivityData = async (userRole, userId, projectid) => {
  logInfo("getUserProductivityData userInfo=");
  let condition = {};

  let projectFields = {
    $project: {
      _id: 1,
      "tasks._id": 1,
      "tasks.userId": 1,
      "tasks.startDate": 1,
      "tasks.isDeleted": 1,
      "tasks.storyPoint": 1,
      "tasks.dateOfCompletion": 1,
    },
  };
  let unwindTasks = {
    $unwind: "$tasks",
  };
  if (userId !== undefined && userId !== null && userId !== "") {
    condition = {
      $and: [
        {
          "tasks.dateOfCompletion": {
            $ne: undefined,
          },
        },
        {
          "tasks.dateOfCompletion": {
            $ne: null,
          },
        },
        {
          "tasks.dateOfCompletion": {
            $ne: "",
          },
        },
      ],
      $and: [
        {
          "tasks.startDate": {
            $ne: undefined,
          },
        },
        {
          "tasks.startDate": {
            $ne: null,
          },
        },
        {
          "tasks.startDate": {
            $ne: "",
          },
        },
      ],
      "tasks.userId": userId,
      "tasks.isDeleted": false,
    };
  }
  let taskFilterCondition = {
    $match: condition,
  };
  let projectCond = {};
  projectCond = {
    $match: {
      isDeleted: false,
    },
  };

  logInfo(
    [projectCond, projectFields, unwindTasks, taskFilterCondition],
    "getUserProductivity Data filtercondition="
  );
  var result = await Project.aggregate([
    projectCond,
    projectFields,
    unwindTasks,
    taskFilterCondition,
  ]);
  let storyPoint;
  let tasksByuserId = {};
  let yesterDayDate = dateUtil.DateToString(
    new Date(new Date() - 24 * 60 * 60 * 1000)
  );
  let lastMonthDate = dateUtil.DateToString(
    new Date(new Date(yesterDayDate) - 1000 * 60 * 60 * 24 * 30)
  );

  var result1 = await Holiday.find({
    $and: [
      {
        fullDate: { $lte: yesterDayDate },
      },
      {
        fullDate: { $gte: lastMonthDate },
      },
    ],
    isActive: "1",
  });
  let holidayCount = result1 && result1.length;
  let totalSunday = getSundayInaMonth(lastMonthDate, yesterDayDate);
  let totalHoliday = holidayCount + totalSunday;
  let oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  let daysInMonth = Math.round(
    Math.abs(
      (new Date(yesterDayDate).getTime() - new Date(lastMonthDate).getTime()) /
        oneDay
    )
  );

  let workingHours = (daysInMonth - totalHoliday) * config.minWorkingHours;

  if (result.length > 0) {
    for (let i = 0; i < result.length; i++) {
      let startDate = dateUtil.DateToString(result[i].tasks.startDate);
      if (startDate >= lastMonthDate || startDate <= yesterDayDate) {
        if (tasksByuserId[result[i].tasks.userId]) {
          storyPoint =
            tasksByuserId[result[i].tasks.userId].storyPoint +
            result[i].tasks.storyPoint;
          tasksByuserId[result[i].tasks.userId].storyPoint = storyPoint;
        } else {
          storyPoint = 0;
          storyPoint = storyPoint + result[i].tasks.storyPoint;
          tasksByuserId[result[i].tasks.userId] = {
            storyPoint: storyPoint,
            workingHours: workingHours,
          };
        }
      }
    }
  }
  let tasks = [];
  let keys = Object.keys(tasksByuserId);

  for (let i = 0; i < keys.length; i++) {
    let taskObj = {
      Storypoint: tasksByuserId[keys[i]].storyPoint,
      WorkingHours: tasksByuserId[keys[i]].workingHours,
    };
    tasks.push(taskObj);
  }
  logInfo("before response getUserProductivity Data  tasks=");
  return tasks;
};
export const getDashboardData = async ({ request, userInfo }) => {
  const body = Object.fromEntries(new URLSearchParams(await request.text()));
  const projectId = body.projectId; // Extract projectId from request body
  const flag = body.flag;
  const userRole = userInfo.userRole.toLowerCase();
  const userId = userInfo.userId;
  const showArchive = body.showArchive;

  // Check if projectId is undefined
  if (projectId === undefined) {
    // Handle the case where projectId is not provided in the request
    return json({
      success: false,
      error: "projectId is missing in the request parameters",
    });
  }

  const UsersTodaysTasks = await getUsersTodaysOpenTasks(
    userRole,
    userId,
    projectId,
    flag,
    showArchive
  );
  const todaysTasksChartData = await gettodaysTasksChartData(
    userRole,
    userId,
    projectId,
    showArchive
  );
  const userProductivityData = await getUserProductivityData(
    userRole,
    userId,
    projectId,
    showArchive
  );

  const dashboardData = {
    todaysTasksChartData: todaysTasksChartData,
    userProductivityData: userProductivityData,
    UsersTodaysTasks: UsersTodaysTasks,
  };

  return json({
    success: true,
    data: dashboardData,
  });
};

//   export const getDashboardData = async ({ request, userInfo }) => {
//     const body = Object.fromEntries(new URLSearchParams(await request.text()));
//     const projectId = body.projectId;
//     const flag = body.flag;
//     const userRole = userInfo.userRole.toLowerCase();
//     const userId = userInfo.userId;
//     const showArchive = body.showArchive;

//     const UsersTodaysTasks = await getUsersTodaysOpenTasks(userRole, userId, projectId, flag, showArchive);
//     const todaysTasksChartData = await gettodaysTasksChartData(userRole, userId, projectId, showArchive);
//     const userProductivityData = await getUserProductivityData(userRole, userId, projectId, showArchive);

//     const dashboardData = {
//       todaysTasksChartData: todaysTasksChartData,
//       userProductivityData: userProductivityData,
//       UsersTodaysTasks: UsersTodaysTasks
//     };

//     return json({
//       success: true,
//       data: dashboardData
//     });
//   };

// import {serviceHost } from '../../common/const';
// import ServiceRequest from  '../../utils/service-request';

// import Task from '../../models/task/task-model';
// import TaskType from '../../models/task/task-type-model';
// import TaskPriority from '../../models/task/task-priority-model';

// export const editTask = async (taskData) => {
//     try {
//         const updatedTask = await Task.findByIdAndUpdate(taskData.id, taskData, { new: true });
//         return { tasks: updatedTask, taskErr: null };
//     } catch (err) {
//         console.error('Error editing task:', err);
//         return { tasks: null, taskErr: err };
//     }
// };

// export const addTask = async (taskData) => {
//     try {
//         const newTask = await Task.create(taskData);
//         return { tasks: newTask, taskErr: null };
//     } catch (err) {
//         console.error('Error adding task:', err);
//         return { tasks: null, taskErr: err };
//     }
// };

// export const getAllTasks = async () => {
//     try {
//         const tasks = await Task.find({});
//         return { tasks, taskErr: null };
//     } catch (err) {
//         console.error('Error getting all tasks:', err);
//         return { tasks: null, taskErr: err };
//     }
// };

// export const toggleEditTask = async (taskData, projectId) => {
//     try {
//         // Assuming taskData contains the task object to be updated
//         const updatedTask = await Task.findByIdAndUpdate(taskData.id, taskData, { new: true });
//         return { tasks: updatedTask, taskErr: null };
//     } catch (err) {
//         console.error('Error toggling edit task:', err);
//         return { tasks: null, taskErr: err };
//     }
// };

// export const updateTasksSequence = async (taskList, projectId) => {
//     try {
//         const tasks = await Task.updateMany({ _id: { $in: taskList } }, { projectId });
//         return { tasks, taskErr: null };
//     } catch (err) {
//         console.error('Error updating tasks sequence:', err);
//         return { tasks: null, taskErr: err };
//     }
// }

// export const getAllTaskTypes = async () => {
//     try {
//         const taskTypes = await TaskType.find();
//         return { taskTypes, taskErr: null };
//     } catch (err) {
//         console.error('Error getting all task types:', err);
//         return { taskTypes: null, taskErr: err };
//     }
// }

// export const getProjectTasks = async (projectId) => {
//     try {
//         const tasks = await Task.find({ projectId });
//         return { tasks, taskErr: null };
//     } catch (err) {
//         console.error('Error getting project tasks:', err);
//         return { tasks: null, taskErr: err };
//     }
// }

// export const getTaskPriorities = async () => {
//     try {
//         const taskPriorities = await TaskPriority.find();
//         return { taskPriorities, taskErr: null };
//     } catch (err) {
//         console.error('Error getting task priorities:', err);
//         return { taskPriorities: null, taskErr: err };
//     }
// }

// export const getDashboardData = async (projectId, flag, showArchive) => {
//     try {
//         const tasks = await Task.find({ projectId, flag, showArchive });
//         return { tasks, tasksErr: null };
//     } catch (err) {
//         console.error('Error getting dashboard data:', err);
//         return { tasks: null, tasksErr: err };
//     }
// }

// // import Task from "../../models/task/task-model";
// // import TaskType from "../../models/task/task-type-model";
// // import TaskPriority from "../../models/task/task-priority-model";

// // // export async function getUsersTodaysOpenTasks(
// // //   userRole,
// // //   userId,
// // //   projectId,
// // //   flag,
// // //   showArchive
// // // ) {
// // //   console.log("getUsersTodaysOpenTasks"); // Changed from logInfo to console.log
// // //   if (!userRole) {
// // //     throw new Error("User role is required");
// // //   }

// // //   const currentDate = new Date();
// // //   const currentDateISOString = currentDate.toISOString().split('T')[0]; // Extracting YYYY-MM-DD

// // //   let taskCondition = {
// // //     "isDeleted": false, // Changed from "tasks.isDeleted" to "isDeleted"
// // //   };

// // //   if (flag === "duetoday") {
// // //     taskCondition["status"] = { $ne: "onHold" }; // Changed from "tasks.status" to "status"
// // //     taskCondition["startDate"] = currentDateISOString; // Changed from "tasks.startDate" to "startDate"
// // //   } else if (flag === "overdue") {
// // //     taskCondition["status"] = { $ne: "completed" }; // Changed from "tasks.status" to "status"
// // //     taskCondition["endDate"] = { $lt: currentDateISOString }; // Changed from "tasks.endDate" to "endDate"
// // //   } else if (flag === "futureTask") {
// // //     taskCondition["status"] = { $ne: "completed" }; // Changed from "tasks.status" to "status"
// // //     taskCondition["startDate"] = { $exists: false }; // Changed from "tasks.startDate" to "startDate"
// // //     taskCondition["endDate"] = { $exists: false }; // Changed from "tasks.endDate" to "endDate"
// // //     taskCondition["status"] = { $ne: "onHold" }; // Changed from "tasks.status" to "status"
// // //   } else if (flag === "newTask" || flag === "inprogress" || flag === "onhold" || flag === "cancelled") {
// // //     taskCondition["status"] = flag; // Changed from "tasks.status" to "status"
// // //   }

// // //   if (showArchive === false) {
// // //     taskCondition["archive"] = false;
// // //   }

// // //   let userCondition = {
// // //     isDeleted: false,
// // //   };

// // //   if (projectId !== "undefined" && projectId !== null && projectId !== "") {
// // //     if (userRole === "admin") {
// // //       userCondition["_id"] = ObjectId(projectId);
// // //     } else if (userRole === "owner") {
// // //       userCondition["_id"] = ObjectId(projectId);
// // //       userCondition["$or"] = [
// // //         { "projectUsers.userId": userId },
// // //         { "projectUsers.userId": { $exists: false } },
// // //       ];
// // //     }
// // //   } else {
// // //     if (userRole === "owner") {
// // //       userCondition["$or"] = [
// // //         { "projectUsers.userId": userId },
// // //         { "projectUsers.userId": { $exists: false } },
// // //       ];
// // //     } else if (userRole === "user") {
// // //       userCondition["projectUsers.userId"] = userId;
// // //     }
// // //   }

// // //   let aggregatePipeline = [
// // //     { $match: userCondition },
// // //     {
// // //       $project: {
// // //         _id: 1,
// // //         title: 1,
// // //         "tasks._id": 1,
// // //         "tasks.title": 1,
// // //         "tasks.description": 1,
// // //         "tasks.status": 1,
// // //         "tasks.startDate": 1,
// // //         "tasks.endDate": 1,
// // //         "tasks.userId": 1,
// // //         "tasks.completed": 1,
// // //         projectUsers: 1,
// // //       },
// // //     },
// // //     { $unwind: "$tasks" },
// // //     { $match: taskCondition },
// // //   ];

// // //   console.log(aggregatePipeline, "getUsersTodaysOpenTasks filter condition"); // Changed from logInfo to console.log

// // //   const result = await Project.aggregate(aggregatePipeline);

// // //   return result.map((project) => {
// // //     const task = project.tasks;
// // //     const assignedUser = project.projectUsers.find((user) => user.userId === task.userId.toString());
// // //     const userName = assignedUser ? assignedUser.name : "";

// // //     return {
// // //       projectId: project._id,
// // //       projectTitle: project.title,
// // //       _id: task._id,
// // //       title: task.title,
// // //       description: task.description,
// // //       status: task.status,
// // //       startDate: task.startDate,
// // //       endDate: task.endDate,
// // //       userId: task.userId,
// // //       completed: task.completed,
// // //       userName: userName,
// // //     };
// // //   });
// // // }

// // // export async function getTodaysTasksChartData(userId, isAdmin, userTeamId) {
// // //   let projCondition = {
// // //     isDeleted: false,
// // //   };

// // //   let projectFields = {
// // //     $project: {
// // //       _id: 1,
// // //       title: 1,
// // //       tasks: 1,
// // //     },
// // //   };

// // //   let taskCondition = {};
// // //   if (!isAdmin) {
// // //     if (userTeamId) {
// // //       taskCondition.$and = [
// // //         { "tasks.teamId": userTeamId },
// // //         { "tasks.isDeleted": false },
// // //       ];
// // //     } else {
// // //       taskCondition = {
// // //         "tasks.userId": userId,
// // //         "tasks.isDeleted": false,
// // //       };
// // //     }
// // //   }

// // //   let projectCond = {
// // //     $match: projCondition,
// // //   };
// // //   let tasksUnwind = {
// // //     $unwind: "$tasks",
// // //   };
// // //   let taskFilterCondition = {
// // //     $match: taskCondition,
// // //   };

// // //   let result = await Project.aggregate([
// // //     projectCond,
// // //     projectFields,
// // //     tasksUnwind,
// // //     taskFilterCondition,
// // //   ]);

// // //   let tasks = result.map((p) => {
// // //     let t = {};
// // //     t.projectId = p._id;
// // //     t.projectTitle = p.title;
// // //     t.title = p.tasks.title;
// // //     t.status = p.tasks.status;
// // //     t.userId = p.tasks.userId;
// // //     t.startDate = p.tasks.startDate;
// // //     t.endDate = p.tasks.endDate;
// // //     t.dateOfCompletion = p.tasks.dateOfCompletion;
// // //     t.isDeleted = p.tasks.isDeleted;
// // //     return t;
// // //   });

// // //   let countArray = [];

// // //   if (tasks.length > 0) {
// // //     let tasksByStatus = {};
// // //     tasks.forEach((task) => {
// // //       if (!tasksByStatus[task.status]) {
// // //         tasksByStatus[task.status] = [];
// // //       }
// // //       tasksByStatus[task.status].push(task);
// // //     });

// // //     for (const [status, tasks] of Object.entries(tasksByStatus)) {
// // //       let count = tasks.length;
// // //       if (status === "inprogress" || status === "new") {
// // //         let overDueCount = tasks.filter((t) => {
// // //           let dbDate = dateUtil.DateToString(t.endDate);
// // //           return (
// // //             (t.endDate !== undefined && t.endDate !== null && t.endDate !== "" && dbDate < date) ||
// // //             (t.endDate === undefined || t.endDate === null || t.endDate === "") &&
// // //             (t.startDate === undefined || t.startDate === null || t.startDate === "")
// // //           );
// // //         }).length;
// // //         countArray.push({ name: status === "inprogress" ? "Running" : "New", value: count });
// // //         if (overDueCount > 0) {
// // //           countArray.push({ name: "Overdue", value: overDueCount });
// // //         }
// // //       } else {
// // //         countArray.push({ name: status === "completed" ? "Completed" : status, value: count });
// // //       }
// // //     }
// // //   }

// // //   return countArray;
// // // }

// // // export async function getUserProductivityData(
// // //   userRole,
// // //   userId,
// // //   projectId,
// // //   showArchive
// // // ) {
// // //   console.log("getUserProductivityData userInfo="); // Changed from logInfo to console.log
// // //   let condition = {};

// // //   let projectFields = {
// // //     $project: {
// // //       _id: 1,
// // //       // "tasks.title": 1,
// // //       "tasks._id": 1,
// // //       "tasks.userId": 1,
// // //       "tasks.startDate": 1,
// // //       "tasks.isDeleted": 1,
// // //       "tasks.storyPoint": 1,
// // //       "tasks.dateOfCompletion": 1,
// // //     },
// // //   };
// // //   let unwindTasks = {
// // //     $unwind: "$tasks",
// // //   };
// // //   if (userId !== undefined && userId !== null && userId !== "") {
// // //     condition = {
// // //       $and: [
// // //         {
// // //           "tasks.dateOfCompletion": {
// // //             $ne: undefined,
// // //           },
// // //         },
// // //         {
// // //           "tasks.dateOfCompletion": {
// // //             $ne: null,
// // //           },
// // //         },
// // //         {
// // //           "tasks.dateOfCompletion": {
// // //             $ne: "",
// // //           },
// // //         },
// // //       ],
// // //       $and: [
// // //         {
// // //           "tasks.startDate": {
// // //             $ne: undefined,
// // //           },
// // //         },
// // //         {
// // //           "tasks.startDate": {
// // //             $ne: null,
// // //           },
// // //         },
// // //         {
// // //           "tasks.startDate": {
// // //             $ne: "",
// // //           },
// // //         },
// // //       ],
// // //       "tasks.userId": userId,
// // //       "tasks.isDeleted": false,
// // //     };
// // //   }

// // //   let taskFilterCondition = {
// // //     $match: condition,
// // //   };
// // //   let projectCond = {};
// // //   projectCond = {
// // //     $match: {
// // //       isDeleted: false,
// // //     },
// // //   };

// // //   console.log(
// // //     [projectCond, projectFields, unwindTasks, taskFilterCondition],
// // //     "getUserProductivity Data filtercondition="
// // //   ); // Changed from logInfo to console.log
// // //   var result = await Project.aggregate([
// // //     projectCond,
// // //     projectFields,
// // //     unwindTasks,
// // //     taskFilterCondition,
// // //   ]);
// // //   let storyPoint;
// // //   let tasksByuserId = {};
// // //   let yesterDayDate = dateUtil.DateToString(
// // //     new Date(new Date() - 24 * 60 * 60 * 1000)
// // //   );
// // //   let lastMonthDate = dateUtil.DateToString(
// // //     new Date(new Date(yesterDayDate) - 1000 * 60 * 60 * 24 * 30)
// // //   );

// // //   var result1 = await Holiday.find({
// // //     $and: [
// // //       {
// // //         fullDate: { $lte: yesterDayDate },
// // //       },
// // //       {
// // //         fullDate: { $gte: lastMonthDate },
// // //       },
// // //     ],
// // //     isActive: "1",
// // //   });
// // //   // .then((result1) => {
// // //   let holidayCount = result1 && result1.length;
// // //   let totalSunday = sundaysInMonth.getSundayInaMonth(
// // //     lastMonthDate,
// // //     yesterDayDate
// // //   );
// // //   let totalHoliday = holidayCount + totalSunday;
// // //   let oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
// // //   let daysInMonth = Math.round(
// // //     Math.abs(
// // //       (new Date(yesterDayDate).getTime() - new Date(lastMonthDate).getTime()) /
// // //         oneDay
// // //     )
// // //   );

// // //   let workingHours = (daysInMonth - totalHoliday) * config.minWorkingHours;

// // //   if (result.length > 0) {
// // //     for (let i = 0; i < result.length; i++) {
// // //       let startDate = dateUtil.DateToString(result[i].tasks.startDate);
// // //       if (startDate >= lastMonthDate || startDate <= yesterDayDate) {
// // //         if (tasksByuserId[result[i].tasks.userId]) {
// // //           storyPoint =
// // //             tasksByuserId[result[i].tasks.userId].storyPoint +
// // //             result[i].tasks.storyPoint;
// // //           tasksByuserId[result[i].tasks.userId].storyPoint = storyPoint;
// // //         } else {
// // //           storyPoint = 0;
// // //           storyPoint = storyPoint + result[i].tasks.storyPoint;
// // //           tasksByuserId[result[i].tasks.userId] = {
// // //             storyPoint: storyPoint,
// // //             workingHours: workingHours,
// // //           };
// // //         }
// // //       }
// // //     }
// // //   }
// // //   let tasks = [];
// // //   let keys = Object.keys(tasksByuserId);

// // //   for (let i = 0; i < keys.length; i++) {
// // //     let taskObj = {
// // //       Storypoint: tasksByuserId[keys[i]].storyPoint,
// // //       WorkingHours: tasksByuserId[keys[i]].workingHours,
// // //     };
// // //     tasks.push(taskObj);
// // //   }
// // //   console.log("before response getUserProductivity Data  tasks="); // Changed from logInfo to console.log
// // //   return tasks;

// // //   // })
// // // }

// // export default async function getDashboardData(req) {
// //   try {
// //     const { projectId, flag, showArchive } = req.params;
// //     const userRole = req.locals.userInfo.userRole.toLowerCase();
// //     const userId = req.locals.userInfo.userId;

// //     const UsersTodaysTasks = await getUsersTodaysOpenTasks(userRole, userId, projectId, flag, showArchive);
// //     const todaysTasksChartData = await getTodaysTasksChartData(userId, userRole === "admin", userId); // Assuming userTeamId can be used as userId
// //     const userProductivityData = await getUserProductivityData(userRole, userId, projectId, showArchive);

// //     const dashboardData = {
// //       todaysTasksChartData,
// //       userProductivityData,
// //       UsersTodaysTasks,
// //     };

// //     return json({
// //       success: true,
// //       data: dashboardData,
// //     });
// //   } catch (error) {
// //     console.error("Error fetching dashboard data:", error);
// //     return json(
// //       {
// //         success: false,
// //         error: "Failed to fetch dashboard data",
// //       },
// //       500
// //     );
// //   }
// // }
