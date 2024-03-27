import ProjectList from "../../Components/project/project-list";
import ProjectForm from "../../Components/project/project-form";
import { addProject } from "../../Services/project/project-service";

export default function Project() {
  return (
    <div>
      {/* <ProjectList/> */}
      <ProjectForm />
    </div>
  );
}
export const action = async ({ request }) => {
  try {
    if (request.method === "POST") {
      const formData = new URLSearchParams(await request.text());
      const {
        title,
        description,
        startdate,
        enddate,
        status,
        category,
        userid,
        createdBy,
        createdOn,
        modifiedBy,
        modifiedOn,
        sendnotification,
        companyId,
        userGroups,
        group,
        isDeleted,
        miscellaneous,
        archive,
        projectUsers,
        notifyUsers,
        messages,
        uploadFiles,
        tasks,
        userName,
      } = formData;
      console.log(formData,"form data is here ")
      const { response, err } = await addProject(
        title,
        description,
        startdate,
        enddate,
        status,
        category,
        userid,
        createdBy,
        createdOn,
        modifiedBy,
        modifiedOn,
        sendnotification,
        companyId,
        userGroups,
        group,
        isDeleted,
        miscellaneous,
        archive,
        projectUsers,
        notifyUsers,
        messages,
        uploadFiles,
        tasks,
        userName
      );
        console.log(response,"response msg ")
      if (err) {
        console.error("Error saving project:", err);
        return redirect("/error", { headers: { "X-Remix-Error": "500" } });
      }

      return redirect("/project"); // Redirect to success page
    } else {
      return json({ error: "Invalid request method." }, { status: 400 });
    }
  } catch (error) {
    console.error("Error processing action:", error);
    return redirect("/error", { headers: { "X-Remix-Error": "500" } });
  }
};
