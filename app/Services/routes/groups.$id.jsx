import { redirect } from "@remix-run/react";
import { editGroup, deleteGroup,getAllGroups} from "../Services/group/group-service";
import { json } from "@remix-run/react";

export async function action({ request, params }) {
    const groupId = params.id;

    try {
        if (request.method === "DELETE") {
            const { success, error } = await deleteGroup(groupId);
            if (success) {
                return redirect("/groups");
            } else {
                console.error("Error deleting group:", error);
                return json({ error: "Failed to delete group." }, { status: 500 });
            }
        } else if (request.method === "PUT") {
            const formData = new URLSearchParams(await request.text());
            const groupData = {};
            formData.forEach((value, key) => {
                groupData[key] = value;
            });

            const { success, error } = await editGroup(groupId, groupData);
            if (success) {
                return redirect("/groups");
            } else {
                console.error("Error editing group:", error);
                return json({ error: "Failed to edit group." }, { status: 500 });
            }
        } else {
            return json({ error: "Invalid request method." }, { status: 400 });
        }
    } catch (error) {
        console.error("Error processing request:", error);
        return json({ error: "Internal server error." }, { status: 500 });
    }
}

export async function loader() {
    try {
        const groups = await getAllGroups();
        return json({ groups });
    } catch (error) {
        console.error("Error fetching groups:", error);
        throw error;
    }
}
