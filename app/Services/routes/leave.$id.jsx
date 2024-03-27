import { redirect } from "@remix-run/react";
import { deleteLeave } from "../Services/leave-service/leave-service";
import { json } from "@remix-run/react";

export async function action({ request, params }) {
  const leaveId = params.id;
  console.log("Leave ID:", leaveId);

  try {
    if (request.method === "DELETE") {
      const { success, error } = await deleteLeave(leaveId);
      if (success) {
        return redirect("/leave");
      } else {
        console.error("Error deleting leave:", error);
        return json({ error: "Failed to delete leave." }, { status: 500 });
      }
    } else {
      console.error("Invalid request method:", request.method);
      return json({ error: "Invalid request method." }, { status: 400 });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return json({ error: "Internal server error." }, { status: 500 });
  }
}
