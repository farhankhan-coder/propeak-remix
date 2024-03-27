import Task from "../../models/task/task-model";
import Project from "../../models/project/project-model";
import mongoose from "mongoose";
import access from "../../models/access-right/access-right-model";
import config from "../../config/config";
// Define errors object
const errors = {
  NOT_AUTHORIZED: "Not authorized to access this resource",
  SEARCH_PARAM_MISSING: "Search parameters are missing",
  SERVER_ERROR: "Internal server error occurred",
};

export const getMonthlyTaskReport = async (
  reportParams,
  projectId,
  userInfo
) => {
  try {
    const { year, month, dateFrom, dateTo } = reportParams;
    const userRole = userInfo.userRole.toLowerCase();
    const userId = userInfo.userId;
    const userAccess = userInfo.userAccess;

    // Perform access check
    const accessCheck = access.checkEntitlements(userRole);
    const getTaskReportAccess = config.validateEntitlements(
      userAccess,
      projectId,
      "Task Report",
      "view",
      userRole
    );

    if (accessCheck === false && !getTaskReportAccess) {
      return { response: null, err: errors.NOT_AUTHORIZED };
    }

    let condition = {};

    // Construct condition based on date range
    if (dateFrom === "" && dateTo === "") {
      condition = {
        $and: [
          {
            "tasks.startDate": {
              $gte: new Date(year, month - 1, 1),
            },
          },
          {
            "tasks.startDate": {
              $lte: new Date(year, month, 0),
            },
          },
        ],
        "tasks.isDeleted": false,
      };
    } else if (
      (year === "" || parseInt(year, 10) === -1) &&
      (month === "" || parseInt(month, 10) === -1)
    ) {
      condition = {
        $and: [
          {
            "tasks.startDate": {
              $gte: new Date(dateFrom),
            },
          },
          {
            "tasks.startDate": {
              $lte: new Date(dateTo),
            },
          },
        ],
        "tasks.isDeleted": false,
      };
    } else {
      return { response: null, err: errors.SEARCH_PARAM_MISSING };
    }

    // Define task filter condition
    const taskFilterCondition = {
      $match: condition,
    };

    // Define user condition
    const userCondition = {
      isDeleted: false,
    };

    if (userRole === "owner") {
      userCondition.userid = userId;
    }

    // Define project condition
    let projectCond = {};
    if (projectId) {
      projectCond = {
        $match: {
          _id: mongoose.Types.ObjectId(projectId),
        },
      };
    } else {
      projectCond = {
        $match: userCondition,
      };
    }

    // Aggregate query
    const aggregateQuery = [
      projectCond,
      {
        $project: {
          _id: 1,
          title: 1,
          userid: 1,
          projectUsers: 1,
          "tasks.title": 1,
          "tasks._id": 1,
          "tasks.userId": 1,
          "tasks.description": 1,
          "tasks.storyPoint": 1,
          "tasks.startDate": 1,
          "tasks.endDate": 1,
          "tasks.isDeleted": 1,
          "tasks.category": 1,
          "tasks.status": 1,
        },
      },
      { $unwind: "$tasks" },
      taskFilterCondition,
    ];

    // Execute aggregate query
    const result = await Project.aggregate(aggregateQuery);

    // Map result to desired format
    const tasks = result.map((p) => {
      const assignedUser = p.projectUsers.find(
        (u) => u.userId === p.tasks.userId
      );
      const userName = assignedUser ? assignedUser.name : "";
      return {
        projectId: p._id,
        userId: p.tasks.userId,
        userName: userName,
        projectTitle: p.title,
        title: p.tasks.title,
        description: p.tasks.description,
        category: p.tasks.category,
        status: p.tasks.status,
        storyPoint: p.tasks.storyPoint,
        startDate: p.tasks.startDate,
        endDate: p.tasks.endDate,
      };
    });

    return { response: tasks, err: null };
  } catch (err) {
    // logError(err, "getMonthlyTaskReport error");
    return { response: null, err: errors.SERVER_ERROR };
  }
};
