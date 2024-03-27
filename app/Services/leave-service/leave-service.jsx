import { serviceHost } from "../../common/const";
import ServiceRequest from "../../utils/service-request";
import LeaveApplication from "../../models/leave/leave-model";
import Holiday from "../../models/leave/holiday-model";
import * as dateUtil from "../../utils/date-util";
import LeaveType from "../../models/leave/leave-type-model";

export async function leaveTypes_get_all() {
  try {
    const leave = await LeaveType.find({});
    // console.log(leave, " leaves ");
    return { response: leave, err: null };
  } catch (err) {
    console.error("Error getting leave details:", err);
    return { response: null, err };
  }
}

// export async function saveLeaveApplication(
//   userName,
//   fromEmail,
//   fromDate,
//   toDate,
//   workingDays,
//   reason,
//   leaveTypeId,
//   leaveCategory,
//   createdBy,
//   createdOn,
//   modifiedBy,
//   modifiedOn,
//   isDeleted,
//   leaveId
// ) {
//   try {
//     // Fetch all leave types
//     const leaveTypesResponse = await leaveTypes_get_all();
//     if (leaveTypesResponse.err) {
//       throw new Error("Failed to fetch leave types");
//     }

//     // Find the leave type corresponding to the leaveTypeId
//     const leaveType = leaveTypesResponse.response.find(
//       (type) => type.leaveTypeId === leaveTypeId
//     );

//     if (!leaveType) {
//       throw new Error("Leave type not found");
//     }

//     // Create new leave application
//     const newLeaveApplication = await LeaveApplication.create({
//       userName,
//       fromEmail,
//       fromDate,
//       toDate,
//       workingDays,
//       reason,
//       leaveTypeId,
//       leaveType: leaveType.leaveTypeName,
//       leaveCategory,
//       createdBy,
//       createdOn,
//       modifiedBy,
//       modifiedOn,
//       isDeleted,
//       leaveId,
//     });

//     return { response: newLeaveApplication, err: null };
//   } catch (error) {
//     console.error("Error saving leave application:", error);
//     return { response: null, err: error };
//   }
// }

export async function saveLeaveApplication(
  userName,
  fromEmail,
  fromDate,
  toDate,
  workingDays,
  reason,
  leaveTypeId,
  leaveType,
  leaveCategory,
  createdBy,
  createdOn,
  modifiedBy,
  modifiedOn,
  isDeleted,
  leaveId
) {
  try {
    const newLeaveApplication = await LeaveApplication.create({
      userName,
      fromEmail,
      fromDate,
      toDate,
      workingDays,
      reason,
      leaveTypeId,
      leaveType,
      leaveCategory,
      createdBy,
      createdOn,
      modifiedBy,
      modifiedOn,
      isDeleted,
      leaveId,
    });

    return { response: newLeaveApplication, err: null };
  } catch (error) {
    console.error("Error saving leave application:", error);
    return { response: null, err: error };
  }
}

export const getAllLeavesForCalendar = async () => {
  try {
    const result = await LeaveApplication.find(
      {
        isDeleted: false,
        status: "approved",
      },
      {
        _id: 1,
        leaveType: 1,
        status: 1,
        userName: 1,
        fromDate: 1,
        toDate: 1,
        workingDays: 1,
      }
    );

    // console.log("Retrieved leaves for calendar:", result);

    const userReportsData = result.map((d) => {
      let d1 = new Date(d.toDate);
      d1.setDate(d1.getDate() + 1);
      let endDate = dateUtil.DateToString(d1);
      let info = {
        id: d._id,
        start: d.fromDate,
        end: endDate,
        title: d.leaveType + " - " + d.userName,
        leaveType: d.leaveType,
      };
      return info;
    });

    console.log("Formatted leaves for calendar:", userReportsData);

    return { response: userReportsData, err: null };
  } catch (err) {
    console.error("Error retrieving leaves for calendar:", err);
    return { response: null, err };
  }
};
//deleteLeave
export const deleteLeave = async (leaveId) => {
  try {
    const leave = await LeaveApplication.findByIdAndDelete(leaveId);
    return { response: leave, err: null };
  } catch (err) {
    console.error("Error deleting leave:", err);
    return { response: null, err };
  }
};
//Details
export const getDetails = async (leaveId) => {
  try {
    const leave = await LeaveApplication.findById(leaveId);
    console.log(leave, " leaves ");
    return { response: leaveDetails, err: null };
  } catch (err) {
    // console.error("Error getting leave details:", err);
    return { response: null, err };
  }
};
export const getAllLeaves = async () => {
  try {
    const leaves = await LeaveApplication.find({});
    return { response: leaves, err: null };
  } catch (err) {
    console.error("Error retrieving leaves:", err);
    return { response: null, err };
  }
};
export const approveReject = async (request, response) => {
  try {
    let loggedInUser = request.userInfo;
    let leaveApplication = {
      status: request.body.approvedRejected,
      rejectionReason: request.body.reasonRejection,
      modifiedBy: request.body.modifiedBy,
      modifiedOn: request.body.modifiedOn,
      leaveWithoutApproval: request.body.leaveWithoutApproval,
    };

    let mailOptions = {
      from: 1,
      to: request.body.toEmail,
      cc: config.emails,
      subject: 1,
      html: 1,
    };

    const result = await LeaveApplication.findOneAndUpdate(
      { _id: request.body.leaveId },
      leaveApplication,
      { context: "query" }
    );

    let bodyHtml = config.approveRejectEmailContent;
    let subject = config.approveRejectSubject;
    bodyHtml = bodyHtml.replace("{leaveStatus}", leaveApplication.status);
    bodyHtml = bodyHtml.replace("{loggedInUser}", loggedInUser.userName);
    bodyHtml = bodyHtml.replace(
      "{reasonOfRejection}",
      leaveApplication.rejectionReason
    );
    subject = subject
      .replace("{status}", leaveApplication.status)
      .replace("{fromDate}", result.fromDate)
      .replace("{toDate}", result.toDate);
    mailOptions.subject = subject;
    mailOptions.html = bodyHtml;

    let emailResponse = 1;
    if (config.prodMode == "ON") {
      emailResponse = await sendEmail(mailOptions);
    } else {
      mailOptions.to = config.defaultEmail;
      emailResponse = await sendEmail(mailOptions);
    }

    if (emailResponse.response) {
      logInfo(
        response,
        "leaveController.approveReject - Error occurred while sending email " +
          mailOptions.to
      );
      response.json({
        success: false,
        err: "Something went wrong: Email Id is wrong for sending to.",
      });
    } else {
      logInfo(
        "leaveController.approveReject - An e-mail has been sent to " +
          mailOptions.to +
          " with further instructions."
      );
    }

    response.json({
      success: true,
      message: `Leave has been ${leaveApplication.status}`,
    });
  } catch (error) {
    console.error("Error in approveReject function:", error);
    response.json({ success: false, err: "Internal Server Error" });
  }
};

// Console log the function
console.log(approveReject);

export const getAllAppliedLeaves = async () => {
  try {
    const leaves = await LeaveApplication.find({});
    return { response: leaves, err: null };
  } catch (err) {
    console.error("Error retrieving applied leaves:", err);
    return { response: null, err };
  }
};

//get holidays for the current month
export const getHolidays = async () => {
  try {
    const holidays = await Holiday.find();
    // console.log(holidays,"holidays......")
    return { response: holidays, err: null };
  } catch (err) {
    console.error("Error retrieving holidays:", err);
    return { response: null, err };
  }
};

//Approved Rejected
export const approveRejectLeave = async (leaveId, status) => {
  try {
    const leave = await LeaveApplication.findByIdAndUpdate(
      leaveId,
      { status },
      { new: true }
    );
    return { response: leave, err: null };
  } catch (err) {
    console.error("Error approving/rejecting leave:", err);
    return { response: null, err };
  }
};

//edit request
// export const editLeaveApplication = async (leaveId, updatedLeave) => {
//   try {
//     const leave = await LeaveApplication.findByIdAndUpdate(
//       leaveId,
//       updatedLeave,
//       { new: true }
//     );
//     return { response: leave, err: null };
//   } catch (err) {
//     console.error("Error editing leave application:", err);
//     return { response: null, err };
//   }
// };
// export const CheckForBalanceLeaves = async (request, response) => {
//   try {
//     leaveValidation.init();
//     let loggedInUserId = request.userInfo.userId;
//     let newLeaveApplication = new LeaveApplication({
//       fromDate: request.body.fromDate,
//       toDate: request.body.toDate,
//       workingDays: request.body.workingDays,
//       reason: request.body.reason,
//       leaveTypeId: request.body.leaveTypeId,
//       leaveType: request.body.leaveType,
//       leaveCategory: request.body.leaveCategory,
//     });
    
//     let leavesTaken = 0;

//     let todaysDate = new Date();
//     let currentMonth = todaysDate.getMonth();
//     let currYear = todaysDate.getFullYear();
//     let financialYearStartDate = new Date(),
//         financialYearEndDate = new Date();
    
//     if (currentMonth > 2 && currentMonth < 12) {
//       financialYearStartDate = new Date(currYear, 3, 1);
//       financialYearEndDate = new Date(currYear + 1, 2, 31);
//     } else {
//       financialYearStartDate = new Date(currYear - 1, 3, 1);
//       financialYearEndDate = new Date(currYear, 2, 31);
//     }
    
//     let financialYearStartDateInTime = financialYearStartDate.getTime(),
//         financialYearEndDateInTime = financialYearEndDate.getTime();

//     const result = await LeaveApplication.find({
//       leaveTypeId: newLeaveApplication.leaveTypeId,
//       userId: loggedInUserId,
//       status: "approved",
//       isDeleted: false,
//     });

//     for (let i = 0; i < result.length; i++) {
//       let fromDate = new Date(result[i].fromDate).getTime();
//       if (
//         fromDate >= financialYearStartDateInTime &&
//         fromDate <= financialYearEndDateInTime
//       ) {
//         leavesTaken += parseFloat(result[i].workingDays);
//       }
//     }

//     const leavesResult = await Leaves.find(
//       {
//         leaveTypeId: newLeaveApplication.leaveTypeId,
//         financialyear: currYear,
//       },
//       {
//         maxinyear: 1,
//         months: 1,
//         financialyear: 1,
//       }
//     );

//     let totalLeaves = leavesResult[0];
//     let validationResult;
//     if (newLeaveApplication.leaveTypeId === "2") {
//       validationResult = leaveValidation.checkForBalance(
//         leavesTaken,
//         newLeaveApplication.workingDays,
//         newLeaveApplication.leaveTypeId,
//         totalLeaves.maxinyear,
//         totalLeaves.months,
//         config.monthStart
//       );
//     } else {
//       validationResult = leaveValidation.checkForBalance(
//         leavesTaken,
//         newLeaveApplication.workingDays,
//         newLeaveApplication.leaveTypeId,
//         totalLeaves.maxinyear,
//         "",
//         config.monthStart
//       );
//     }

//     response.json({
//       success: true,
//       leaveValidationResult: validationResult,
//     });
//   } catch (err) {
//     console.error("Error checking for balance leaves:", err);
//     return { response: null, err };
//   }
// };

//approveLeave
export const approveLeave = async (leaveId) => {
  try {
    const leave = await LeaveApplication.findById(leaveId);
    if (!leave) {
      return { response: null, err: "Leave not found" };
    }

    // Update the leave status to "approved"
    leave.status = "approved";
    const updatedLeave = await leave.save();

    return { response: updatedLeave, err: null };
  } catch (err) {
    console.error("Error approving leave:", err);
    return { response: null, err };
  }
};
export const checkEligibility = async (leaveApplication) => {
  try {
    let data = leaveApplication;
    let response = await ServiceRequest(
      "post",
      "json",
      serviceHost + "/leaves/checkEligibility/",
      data
    );
    return { response, err: null };
  } catch (err) {
    if (err) {
      return { response: null, err };
    }
  }
};
//these 4 in a legacy way
export const getAllAppliedLeavesforAdmin = async () => {
  try {
    const leaves = await LeaveApplication.find({});
    return { response: leaves, err: null };
  } catch (err) {
    console.error("Error retrieving applied leaves:", err);
    return { response: null, err };
  }
};

export const getUserOnLeaveDetails = async (userId) => {
  try {
    let data = { userId };
    let response = await ServiceRequest(
      "post",
      "json",
      serviceHost + "/leaves/getUserOnLeaveDetails/",
      data
    );
    return { response, err: null };
  } catch (err) {
    if (err) {
      return { response: null, err };
    }
  }
};
