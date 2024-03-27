import { saveAccessRight } from "../../Services/access-right/access-right-service";


export const action = async ({ request }) => {
  try {
      if (request.method === "POST") {
        const formData = new URLSearchParams(await request.text());
        
        const userId = formData.get("userId");
        const projectId = formData.get("projectId");
        const entitlementId = formData.get("entitlementId");
        const group = formData.get("group");
        const createdBy = formData.get("createdBy");
        const createdOn = formData.get("createdOn");
        const isDeleted = formData.get("isDeleted");
  
        const { response, err } = await saveAccessRight(
          userId,
          projectId,
          entitlementId,
          group,
          createdBy,
          createdOn,
          isDeleted
        );
  
        if (!err) {
          return redirect("/success"); 
        } else {
          console.error("Error saving access rights:", err);
          return json({ error: "Failed to save access rights." }, { status: 500 });
        }
      } else {
        return json({ error: "Invalid request method." }, { status: 400 });
      }
    } catch (error) {
      console.error("Error processing request:", error);
      return json({ error: "Internal server error." }, { status: 500 });
    }
  }


  export const loader = async ({ params }) => {
    try {
      const { projectId, userId } = params;
  
      const { response, err } = await getAccessRights(projectId, userId);
  
      if (!err) {
        return json({ accessRights: response });
      } else {
        console.error("Error getting access rights:", err);
        return json({ error: "Failed to retrieve access rights." }, { status: 500 });
      }
    } catch (error) {
      console.error("Error processing request:", error);
      return json({ error: "Internal server error." }, { status: 500 });
    }
  }
  
