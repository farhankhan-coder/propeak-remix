import { 
    getAllLeaves,
    getAllAppliedLeaves,
    getDetails,
    getHolidays,
    saveLeaveApplication,
    approveRejectLeave,
    editLeaveApplication,
    deleteLeave,
    approveLeave
  } from '../../Services/leave-service/leave-service';
  

//getAllLeaves
export const loader = async () => {
  try {
    const { response, err } = await getAllLeaves();

    if (err) {
      console.error("Error retrieving leaves:", err);
      return json({ error: "Failed to retrieve leaves." }, { status: 500 });
    }

    return json({ leaves: response });
  } catch (error) {
    console.error("Error processing request:", error);
    return json({ error: "Internal server error." }, { status: 500 });
  }
};

//getAllAppliedLeaves
export const loader = async ({ params }) => {
  const { flag } = params;

  try {
    const { response, err } = await getAllAppliedLeaves(flag);

    if (err) {
      console.error("Error retrieving applied leaves:", err);
      return json(
        { error: "Failed to retrieve applied leaves." },
        { status: 500 }
      );
    }

    return json({ leaves: response });
  } catch (error) {
    console.error("Error processing request:", error);
    return json({ error: "Internal server error." }, { status: 500 });
  }
};

//getDetails
export const loader = async ({ params }) => {
  const { leaveId } = params;

  try {
    const { response, err } = await getDetails(leaveId);

    if (err) {
      console.error("Error getting leave details:", err);
      return json(
        { error: "Failed to retrieve leave details." },
        { status: 500 }
      );
    }

    return json({ leave: response });
  } catch (error) {
    console.error("Error processing request:", error);
    return json({ error: "Internal server error." }, { status: 500 });
  }
};

//getHolidays
export const loader = async () => {
  try {
    const { response, err } = await getHolidays();

    if (err) {
      console.error("Error retrieving holidays:", err);
      return json({ error: "Failed to retrieve holidays." }, { status: 500 });
    }

    return json({ holidays: response });
  } catch (error) {
    console.error("Error processing request:", error);
    return json({ error: "Internal server error." }, { status: 500 });
  }
};

//saveLeaveApplication
export const action = async ({ request }) => {
  try {
    if (request.method === "POST") {
      const formData = new URLSearchParams(await request.text());
      const {
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
      } = formData;

      const { response, err } = await saveLeaveApplication(
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
      );

      if (err) {
        console.error("Error saving leave application:", err);
        return redirect("/error", { headers: { "X-Remix-Error": "500" } });
      }

      return redirect("/success"); // Redirect to success page
    } else {
      return json({ error: "Invalid request method." }, { status: 400 });
    }
  } catch (error) {
    console.error("Error processing action:", error);
    return redirect("/error", { headers: { "X-Remix-Error": "500" } });
  }
};

//approveRejectLeave
export const action = async ({ request, params }) => {
  const { leaveId } = params;

  try {
    if (request.method === "PUT") {
      const formData = new URLSearchParams(await request.text());
      const status = formData.get("status");

      const { response, err } = await approveRejectLeave(leaveId, status);

      if (err) {
        console.error("Error approving/rejecting leave:", err);
        return json(
          { error: "Failed to approve/reject leave." },
          { status: 500 }
        );
      }

      return redirect("/success"); // Redirect to success page
    } else {
      return json({ error: "Invalid request method." }, { status: 400 });
    }
  } catch (error) {
    console.error("Error processing action:", error);
    return redirect("/error", { headers: { "X-Remix-Error": "500" } });
  }
};

//editLeaveApplication
export const action = async ({ request, params }) => {
  const { leaveId } = params;

  try {
    if (request.method === "PUT") {
      const formData = new URLSearchParams(await request.text());
      // Parse formData and construct updatedLeave object

      const { response, err } = await editLeaveApplication(
        leaveId,
        updatedLeave
      );

      if (err) {
        console.error("Error editing leave application:", err);
        return json(
          { error: "Failed to edit leave application." },
          { status: 500 }
        );
      }

      return redirect("/success"); // Redirect to success page
    } else {
      return json({ error: "Invalid request method." }, { status: 400 });
    }
  } catch (error) {
    console.error("Error processing action:", error);
    return redirect("/error", { headers: { "X-Remix-Error": "500" } });
  }
};

//deleteLeave
export const action = async ({ request, params }) => {
  const { leaveId } = params;

  try {
    if (request.method === "DELETE") {
      const { response, err } = await deleteLeave(leaveId);

      if (err) {
        console.error("Error deleting leave:", err);
        return json({ error: "Failed to delete leave." }, { status: 500 });
      }

      return redirect("/success"); // Redirect to success page
    } else {
      return json({ error: "Invalid request method." }, { status: 400 });
    }
  } catch (error) {
    console.error("Error processing action:", error);
    return redirect("/error", { headers: { "X-Remix-Error": "500" } });
  }
};

//approveLeave
export const action = async ({ request, params }) => {
  const { leaveId } = params;

  try {
    if (request.method === "PUT") {
      const { response, err } = await approveLeave(leaveId);

      if (err) {
        console.error("Error approving leave:", err);
        return json({ error: "Failed to approve leave." }, { status: 500 });
      }

      return redirect("/success"); // Redirect to success page
    } else {
      return json({ error: "Invalid request method." }, { status: 400 });
    }
  } catch (error) {
    console.error("Error processing action:", error);
    return redirect("/error", { headers: { "X-Remix-Error": "500" } });
  }
};
