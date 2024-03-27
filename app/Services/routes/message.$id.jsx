import { redirect } from "@remix-run/react";
import { deleteMessage ,getMessage} from "../Services/message/message-service";
import { json } from "@remix-run/react";

export async function action({ request, params }) {
    const messageId = params.id;

    try {
        if (request.method === "DELETE") {
            const { response, err } = await deleteMessage(messageId);
            if (!err) {
                return redirect("/message");
            } else {
                console.error("Error deleting message:", err);
                return json({ error: "Failed to delete message." }, { status: 500 });
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
    const messages = await getMessage();
    return json({ messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
}
