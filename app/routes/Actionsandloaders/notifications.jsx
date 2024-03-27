import { 
    getAllNotification,
    getNotificationById,
    getAllUnHideNotification,
    addNotification,
    editNotification,
    deleteNotification,
    approveRejectNotification,
    addHideNotification
} from '../../Services/notification/notification-service';
import { json, redirect } from 'remix';

export const loader = async () => {
  try {
    const { response, err } = await getAllNotification();

    if (err) {
      console.error("Error retrieving notifications:", err);
      return json({ error: "Failed to retrieve notifications." }, { status: 500 });
    }

    return json({ notifications: response });
  } catch (error) {
    console.error("Error processing request:", error);
    return json({ error: "Internal server error." }, { status: 500 });
  }
};

export const loader = async ({ params }) => {
  const { notificationId } = params;

  try {
    const { response, err } = await getNotificationById(notificationId);

    if (err) {
      console.error("Error retrieving notification by ID:", err);
      return json({ error: "Failed to retrieve notification by ID." }, { status: 500 });
    }

    return json({ notification: response });
  } catch (error) {
    console.error("Error processing request:", error);
    return json({ error: "Internal server error." }, { status: 500 });
  }
};

export const loader = async () => {
  try {
    const { response, err } = await getAllUnHideNotification();

    if (err) {
      console.error("Error retrieving unhidden notifications:", err);
      return json({ error: "Failed to retrieve unhidden notifications." }, { status: 500 });
    }

    return json({ unhiddenNotifications: response });
  } catch (error) {
    console.error("Error processing request:", error);
    return json({ error: "Internal server error." }, { status: 500 });
  }
};

export const action = async ({ request }) => {
    try {
      if (request.method === "POST") {
        const formData = new URLSearchParams(await request.text());
        const notification = {
          notification: formData.get("notification"),
          shownotifications: formData.get("shownotifications"),
          toDate: formData.get("toDate"),
          fromDate: formData.get("fromDate"),
          isDeleted: formData.get("isDeleted"),
          hidenotifications: formData.get("hidenotifications"),
        };
        const projectId = formData.get("projectId");
  
        const { response, err } = await addNotification(notification, projectId);
  
        if (err) {
          console.error("Error adding notification:", err);
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
  
export const action = async ({ request, params }) => {
  const { notificationId } = params;

  try {
    if (request.method === "PUT") {
      const formData = new URLSearchParams(await request.text());
      const status = formData.get("status");

      const { response, err } = await approveRejectNotification(notificationId, status);

      if (err) {
        console.error("Error approving/rejecting notification:", err);
        return json(
          { error: "Failed to approve/reject notification." },
          { status: 500 }
        );
      }

      return redirect("/success");
    } else {
      return json({ error: "Invalid request method." }, { status: 400 });
    }
  } catch (error) {
    console.error("Error processing action:", error);
    return redirect("/error", { headers: { "X-Remix-Error": "500" } });
  }
};

export const action = async ({ request, params }) => {
  const { notificationId } = params;

  try {
    if (request.method === "PUT") {
      const formData = new URLSearchParams(await request.text());

      const { response, err } = await editNotification(updatedNotification);

      if (err) {
        console.error("Error editing notification:", err);
        return json(
          { error: "Failed to edit notification." },
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

export const action = async ({ request, params }) => {
  const { notificationId } = params;

  try {
    if (request.method === "DELETE") {
      const { response, err } = await deleteNotification(notificationId);

      if (err) {
        console.error("Error deleting notification:", err);
        return json({ error: "Failed to delete notification." }, { status: 500 });
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

export const action = async ({ request }) => {
  const formData = new URLSearchParams(await request.text());
  const notificationId = formData.get("notificationId");
  const userId = formData.get("userId");

  try {
    const { response, err } = await addHideNotification(notificationId, userId);

    if (err) {
      console.error("Error hiding notification:", err);
      return json({ error: "Failed to hide notification." }, { status: 500 });
    }

    return redirect("/success"); // Redirect to success page
  } catch (error) {
    console.error("Error processing action:", error);
    return redirect("/error", { headers: { "X-Remix-Error": "500" } });
  }
};
