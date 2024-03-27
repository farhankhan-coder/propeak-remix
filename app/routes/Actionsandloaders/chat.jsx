import {
  addSubject,
  getAllSubjects,
  getProjectSubjects,
  deleteSubject,
  editSubject,
  addDiscussionMessage,
  getAllDiscussionMessages,
  deleteDiscussionMessage,
} from "../../Services/chat/chat-service";

//create
export const action = async ({ request }) => {
  try {
    if (request.method === "POST") {
      const formData = new URLSearchParams(await request.text());
      const subjectTitle = formData.get("subjectTitle");
      const projectId = formData.get("projectId");

      const { response, err } = await addSubject(subjectTitle, projectId);

      if (err) {
        console.error("Error adding subject:", err);
        return redirect("/error", { headers: { "X-Remix-Error": "500" } });
      }

      return redirect("/subjects");
    } else {
      return json({ error: "Invalid request method." }, { status: 400 });
    }
  } catch (error) {
    console.error("Error processing action:", error);
    return redirect("/error", { headers: { "X-Remix-Error": "500" } });
  }
};

//getAll Subject
export const loader = async () => {
  try {
    const { response, err } = await getAllSubjects();

    if (err) {
      console.error("Error retrieving subjects:", err);
      return json({ error: "Failed to retrieve subjects." }, { status: 500 });
    }

    return json({ subjects: response });
  } catch (error) {
    console.error("Error processing request:", error);
    return json({ error: "Internal server error." }, { status: 500 });
  }
};

//getProjectSubjects
export const loader = async ({ params }) => {
  try {
    const { projectId } = params;
    const { response, err } = await getProjectSubjects(projectId);

    if (err) {
      console.error("Error retrieving subjects for project:", err);
      return json(
        { error: "Failed to retrieve subjects for project." },
        { status: 500 }
      );
    }

    return json({ subjects: response });
  } catch (error) {
    console.error("Error processing request:", error);
    return json({ error: "Internal server error." }, { status: 500 });
  }
};

//delete subject
export const action = async ({ request, params }) => {
  const { subjectId } = params;

  try {
    if (request.method === "DELETE") {
      const { response, err } = await deleteSubject(subjectId);
      if (!err) {
        return redirect("/subjects");
      } else {
        console.error("Error deleting subject:", err);
        return json({ error: "Failed to delete subject." }, { status: 500 });
      }
    } else {
      return json({ error: "Invalid request method." }, { status: 400 });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return json({ error: "Internal server error." }, { status: 500 });
  }
};

//editSubject
export const action = async ({ request, params }) => {
  const { subjectId } = params;

  try {
    if (request.method === "PUT") {
      const formData = new URLSearchParams(await request.text());
      const subjectTitle = formData.get("subjectTitle");

      const { response, err } = await editSubject(subjectId, subjectTitle);

      if (!err) {
        return redirect("/subjects");
      } else {
        console.error("Error updating subject:", err);
        return json({ error: "Failed to update subject." }, { status: 500 });
      }
    } else {
      return json({ error: "Invalid request method." }, { status: 400 });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return json({ error: "Internal server error." }, { status: 500 });
  }
};

// Action for adding a discussion message
export const action = async ({ request }) => {
  try {
    if (request.method === "POST") {
      const formData = new URLSearchParams(await request.text());
      const title = formData.get("title");
      const subjectId = formData.get("subjectId");
      const messageId = formData.get("messageId");

      const { response, err } = await addDiscussionMessage(
        title,
        subjectId,
        messageId
      );

      if (err) {
        console.error("Error adding discussion message:", err);
        return redirect("/error", { headers: { "X-Remix-Error": "500" } });
      }

      return redirect(`/subjects/${subjectId}`);
    } else {
      return json({ error: "Invalid request method." }, { status: 400 });
    }
  } catch (error) {
    console.error("Error processing action:", error);
    return redirect("/error", { headers: { "X-Remix-Error": "500" } });
  }
};

// Loader for getting all discussion messages of a subject
export const loader = async ({ params }) => {
  try {
    const { subjectId } = params;
    const { response, err } = await getAllDiscussionMessages(subjectId);

    if (err) {
      console.error("Error retrieving discussion messages:", err);
      return json(
        { error: "Failed to retrieve discussion messages." },
        { status: 500 }
      );
    }

    return json({ discussionMessages: response });
  } catch (error) {
    console.error("Error processing request:", error);
    return json({ error: "Internal server error." }, { status: 500 });
  }
};

// Action for deleting a discussion message
export const action = async ({ request, params }) => {
  const { messageId, subjectId } = params;

  try {
    if (request.method === "DELETE") {
      const { response, err } = await deleteDiscussionMessage(
        messageId,
        subjectId
      );
      if (!err) {
        return redirect(`/subjects/${subjectId}`);
      } else {
        console.error("Error deleting discussion message:", err);
        return json(
          { error: "Failed to delete discussion message." },
          { status: 500 }
        );
      }
    } else {
      return json({ error: "Invalid request method." }, { status: 400 });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return json({ error: "Internal server error." }, { status: 500 });
  }
};
