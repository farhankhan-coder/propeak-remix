import LeaveDetails from "../../../Components/leave/components/leave-details";
import { getDetails,getAllLeaves } from "../../../Services/leave-service/leave-service";
import { json, useLoaderData } from "@remix-run/react";
export const loader = async ({ params }) => {
    try {
      const leaveId = params.leaveId; 
      const { response, err } = await getDetails(leaveId); 
      console.log(response, "response .....");
      if (err) {
        console.error("Error fetching leave details:", err);
        return json(
          { error: "Failed to load leave details" },
          { status: 500 }
        );
      }
      return json({ leaveDetails: response });
    } catch (error) {
      console.error("Error in loader function:", error);
      return json({ error: "Internal Server Error" }, { status: 500 });
    }
  };



export default function LeaveDetailsComponent() {
  const {leaveDetails}=useLoaderData()
  console.log(leaveDetails, " loader data ")
  return (
    <div>
      <LeaveDetails
      leaveDetails={leaveDetails} />
    </div>
  );
}
