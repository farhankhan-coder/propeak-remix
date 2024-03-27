import { addMessage } from "../../Services/message/message-service";

export async function action({ request }) {
    try {
      if (request.method === "POST") {
        const formData = new URLSearchParams(await request.text());
        const title = formData.get("title");
  
        const { response, err } = await addMessage(
          title,
        );
        if (!err) {
          return redirect("/message");
        } else {
          console.error("Error saving message:", err);
          return json({ error: "Failed to save message." }, { status: 500 });
        }
      } else {
        return json({ error: "Invalid request method." }, { status: 400 });
      }
    } catch (error) {
      console.error("Error processing request:", error);
      return json({ error: "Internal server error." }, { status: 500 });
    }
  }
  