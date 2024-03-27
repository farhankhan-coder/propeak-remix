import {updateProjectCategory} from "../Services/project/project-service"
import { json,redirect } from "@remix-run/node";


export const action = async ({ request }) => {
    try {
      if (request.method === "PUT") {
        const formData = new URLSearchParams(await request.text());
        const { id, category } = Object.fromEntries(formData);
  
        const project = { id, category };
  
        const { response, err } = await updateProjectCategory(project);
  
        if (err) {
          console.error("Error updating project category:", err);
          return redirect("/error", { headers: { "X-Remix-Error": "500" } });
        }
  
        return redirect("/categorySortOrder"); 
      } else {
        return json({ error: "Invalid request method." }, { status: 400 });
      }
    } catch (error) {
      console.error("Error processing action:", error);
      return redirect("/error", { headers: { "X-Remix-Error": "500" } });
    }
  };