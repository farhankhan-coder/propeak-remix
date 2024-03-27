import {
  getAllLeaves,
  getAllAppliedLeavesforAdmin,
  getAllLeavesForCalendar,
} from "../../Services/leave-service/leave-service";
import { json, useLoaderData } from "@remix-run/react";
import LeaveList from "../../Components/leave/components/leave-list";

// export const loader = async ({ params }) => {
//     try {
//         const { response: leavesResponse, err: leavesErr } = await getAllLeaves();
//         const { response: appliedLeavesResponseForAdmin, err: appliedLeavesErr } = await getAllAppliedLeavesforAdmin();

//         // console.log(appliedLeavesResponseForAdmin, "response .....")
//         if (leavesErr || appliedLeavesErr) {
//             console.error('Error fetching leaves:', leavesErr || appliedLeavesErr);
//             return json({ error: 'Failed to load leaves' }, { status: 500 });
//         }
//         return json({ leaves: leavesResponse, appliedLeavesResponseForAdmin: appliedLeavesResponseForAdmin });
//     } catch (error) {
//         console.error('Error in loader function:', error);
//         return json({ error: 'Internal Server Error' }, { status: 500 });
//     }
// };
// export const loader = async () => {
//     try {
//       const result = await getAllLeavesForCalendar();
//         console.log(result,"result is here ")
//       return json(result.response);
//     } catch (error) {
//       // Handle errors
//       console.error("Error retrieving leaves for calendar:", error);
//       return json({ error: "Failed to retrieve leaves for calendar" }, { status: 500 });
//     }
//   };
export async function loader({ params }) {
  try {
    const { leaveId } = params;
    const allLeavesForCalander = await getAllLeavesForCalendar();
    const leaves = await getAllLeaves();
    // const detailsLeave = await getDetails(leaveId);
    const appliedLeavesResponseForAdmin = await getAllAppliedLeavesforAdmin();
    // console.log(leaves, "leavesResponse...........");
    // console.log(appliedLeavesResponseForAdmin, "appliedLeavesResponseForAdmin........");
    // console.log(allLeavesForCalander, "allLeavesForCalander in loaders........");
    return json({
      allLeavesForCalander,
      leaves,
      appliedLeavesResponseForAdmin,
    });
  } catch (error) {
    console.error("Error fetching leaveType:", error);
    throw error;
  }
}

export default function LeaveListComponent() {
  const { allLeavesForCalander, leaves, appliedLeavesResponseForAdmin } =
    useLoaderData();
  console.log(appliedLeavesResponseForAdmin, " data in route ");
  console.log(allLeavesForCalander, "allLeavesForCalander ,,,,,,,");
  return (
    <div>
      <LeaveList
        appliedLeavesResponseForAdmin={appliedLeavesResponseForAdmin}
        leaves={leaves}
        allLeavesForCalander={allLeavesForCalander}
      />
    </div>
  );
}
