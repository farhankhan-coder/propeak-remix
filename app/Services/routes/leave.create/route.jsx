import { useLoaderData } from "@remix-run/react";
import LeaveApplication from "../../Components/leave/components/leave-application";
import {
  saveLeaveApplication,
  leaveTypes_get_all,
  getHolidays,
  getDetails
} from "../../Services/leave-service/leave-service";
import { json } from "@remix-run/react";
import { redirect } from "@remix-run/react";

export async function loader({ params }) {
  try {
    const { leaveId } = params;
    const leaveType = await leaveTypes_get_all();
    console.log(leaveType," All Leave Types ");
    const holidays = await getHolidays();
    console.log(holidays, " all the holidays .... ")
    const details = await getDetails(leaveId);
    console.log(details, "all the details ...............")
    return json({ leaveType, holidays, details });
  } catch (error) {
    console.error("Error fetching loader data:", error);
    throw error;
  }
}

export default function LeaveCreate() {
  const { leaveType, holidays, details } = useLoaderData();
  return (
    <div>
      <LeaveApplication
        leaveType={leaveType}
        holidays={holidays}
        details={details}
      />
    </div>
  );
}

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
        leaveCategory,
        createdBy,
        createdOn,
        modifiedBy,
        modifiedOn,
        isDeleted,
        leaveId
      } = Object.fromEntries(formData);

      const { response, err } = await saveLeaveApplication(
        userName,
        fromEmail,
        fromDate,
        toDate,
        workingDays,
        reason,
        leaveTypeId,
        leaveCategory,
        createdBy,
        createdOn,
        modifiedBy,
        modifiedOn,
        isDeleted,
        leaveId
      );

      if (err || (response && response.data && response.data.err)) {
        console.error("Error saving leave application:", err || response.data.err);
        return redirect("/error", { headers: { "X-Remix-Error": "500" } });
      }

      return redirect("/leave-create");
    } else {
      return json({ error: "Invalid request method." }, { status: 400 });
    }
  } catch (error) {
    console.error("Error processing action:", error);
    return redirect("/error", { headers: { "X-Remix-Error": "500" } });
  }
};
