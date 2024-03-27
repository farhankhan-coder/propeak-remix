import { addCloneProject } from "../../Services/project/project-clone-service";
import { addProject } from "../../Services/project/project-service";
// Action for saving a project application
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

//edit projev
export const action = async ({ request }) => {
  try {
    if (request.method === "PUT") {
      const formData = new URLSearchParams(await request.text());
      const { id, newprojects, userName } = formData;

      const { response, err } = await editProject(newprojects, id, userName);

      if (err) {
        console.error("Error editing project:", err);
        return redirect("/error", { headers: { "X-Remix-Error": "500" } });
      }

      return redirect("/success"); // Redirect to success page
    } else {
      return json({ error: "Invalid request method." }, { status: 400 });
    }
  } catch (error) {
    console.error("Error processing edit project action:", error);
    return redirect("/error", { headers: { "X-Remix-Error": "500" } });
  }
};

//delete
export const action = async ({ request }) => {
  try {
    if (request.method === "DELETE") {
      const formData = new URLSearchParams(await request.text());
      const id = formData.get("id");

      const { response, err } = await deleteProject(id);

      if (err) {
        console.error("Error deleting project:", err);
        return redirect("/error", { headers: { "X-Remix-Error": "500" } });
      }

      return redirect("/success"); // Redirect to success page
    } else {
      return json({ error: "Invalid request method." }, { status: 400 });
    }
  } catch (error) {
    console.error("Error processing delete project action:", error);
    return redirect("/error", { headers: { "X-Remix-Error": "500" } });
  }
};

// Loader for getting project data by project ID
export const getProjectDataLoader = async ({ params }) => {
    const { projectId } = params;
  
    try {
      const { response, err } = await getProjectData(projectId);
  
      if (err) {
        console.error("Error getting project data:", err);
        return json({ error: "Failed to get project data." }, { status: 500 });
      }
  
      return json({ projectData: response });
    } catch (error) {
      console.error("Error processing request:", error);
      return json({ error: "Internal server error." }, { status: 500 });
    }
  };
  
  // Loader for getting data by project ID
  export const getDataByProjectIdLoader = async ({ params }) => {
    const { projectId } = params;
  
    try {
      const { response, err } = await getDataByProjectId(projectId);
  
      if (err) {
        console.error("Error getting data by project ID:", err);
        return json({ error: "Failed to get data by project ID." }, { status: 500 });
      }
  
      return json({ projectData: response });
    } catch (error) {
      console.error("Error processing request:", error);
      return json({ error: "Internal server error." }, { status: 500 });
    }
  };
  
  // Loader for getting project data by project ID
  export const getProjectDataByProjectIdLoader = async ({ params }) => {
    const { projectId } = params;
  
    try {
      const { response, err } = await getProjectDataByProjectId(projectId);
  
      if (err) {
        console.error("Error getting project data by project ID:", err);
        return json({ error: "Failed to get project data by project ID." }, { status: 500 });
      }
  
      return json({ projectData: response });
    } catch (error) {
      console.error("Error processing request:", error);
      return json({ error: "Internal server error." }, { status: 500 });
    }
  };
  
  // Loader for getting project audit log
  export const getProjectAuditLogLoader = async ({ params }) => {
    const { projectId } = params;
  
    try {
      const { response, err } = await getProjectAuditLog(projectId);
  
      if (err) {
        console.error("Error getting project audit log:", err);
        return json({ error: "Failed to get project audit log." }, { status: 500 });
      }
  
      return json({ auditLog: response });
    } catch (error) {
      console.error("Error processing request:", error);
      return json({ error: "Internal server error." }, { status: 500 });
    }
  };

  export const favoriteProjectAction = async ({ request }) => {
    try {
      if (request.method === "POST") {

        const formData = new URLSearchParams(await request.text());
                const projectId = formData.get('projectId');
        const userId = formData.get('userId');
  
        const { response, err } = await favoriteProject(projectId, userId);
  
        if (err) {
          console.error("Error favoriting project:", err);
          return json({ error: "Failed to favorite project." }, { status: 500 });
        }
  
        return json({ response });
      } else {
        return json({ error: "Invalid request method." }, { status: 400 });
      }
    } catch (error) {
      console.error("Error processing action:", error);
      return json({ error: "Internal server error." }, { status: 500 });
    }
  };
  
  export const allFavoriteProjectsLoader = async ({ params }) => {
    const { userId, showArchive } = params;
  
    try {
      const { projects, projectErr } = await getAllFavoriteProjects(userId, showArchive);
  
      if (projectErr) {
        console.error("Error getting all favorite projects:", projectErr);
        return json({ error: "Failed to retrieve all favorite projects." }, { status: 500 });
      }
  
      return json({ projects });
    } catch (error) {
      console.error("Error processing request:", error);
      return json({ error: "Internal server error." }, { status: 500 });
    }
  };

  export const statusOptionsLoader = async () => {
    try {
      const { statusOptions, err } = await getStatusOptions();
  
      if (err) {
        console.error("Error getting status options:", err);
        return json({ error: "Failed to retrieve status options." }, { status: 500 });
      }
  
      return json({ statusOptions });
    } catch (error) {
      console.error("Error processing request:", error);
      return json({ error: "Internal server error." }, { status: 500 });
    }
  };
  export const projectTasksAndUsersLoader = async ({ params }) => {
    const { projectId } = params;
  
    try {
      const { projects, projectErr } = await getProjectTasksAndUsers(projectId);
  
      if (projectErr) {
        console.error("Error getting project tasks and users:", projectErr);
        return json({ error: "Failed to retrieve project tasks and users." }, { status: 500 });
      }
  
      return json({ projects });
    } catch (error) {
      console.error("Error processing request:", error);
      return json({ error: "Internal server error." }, { status: 500 });
    }
  };
  
  export const allProjectsSummaryLoader = async ({ params }) => {
    const { userId, userRole, showArchive, projectId } = params;
  
    try {
      const { projects, projectErr } = await getAllProjectsSummary(userId, userRole, showArchive, projectId);
  
      if (projectErr) {
        console.error("Error getting all projects summary:", projectErr);
        return json({ error: "Failed to retrieve all projects summary." }, { status: 500 });
      }
  
      return json({ projects });
    } catch (error) {
      console.error("Error processing request:", error);
      return json({ error: "Internal server error." }, { status: 500 });
    }
  };

  export const userProjectLoader = async ({ params }) => {
    const { showArchive } = params;
  
    try {
      const { response, err } = await getUserProject(showArchive);
  
      if (err) {
        console.error("Error getting user project:", err);
        return json({ error: "Failed to retrieve user project." }, { status: 500 });
      }
  
      return json({ projects: response });
    } catch (error) {
      console.error("Error processing request:", error);
      return json({ error: "Internal server error." }, { status: 500 });
    }
  };

  export const updateFavoriteProjectAction = async ({ request }) => {
    try {
      if (request.method === "PUT") {
        const formData = new URLSearchParams(await request.text());
        const { projectId } = Object.fromEntries(formData);
  
        const { response, err } = await updateFavoriteProject(projectId);
  
        if (err) {
          console.error("Error updating favorite project:", err);
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
  
  export const updateProjectFieldAction = async ({ request }) => {
    try {
      if (request.method === "PUT") {
        const formData = new URLSearchParams(await request.text());
        const {
          id,
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
        } = Object.fromEntries(formData);
  
        const updatedProject = {
          id,
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
        };
  
        const { response, err } = await updateProjectField(updatedProject);
  
        if (err) {
          console.error("Error updating project field:", err);
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
  
  export const updateProjectCategoryAction = async ({ request }) => {
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
  
        return redirect("/project"); // Redirect to success page
      } else {
        return json({ error: "Invalid request method." }, { status: 400 });
      }
    } catch (error) {
      console.error("Error processing action:", error);
      return redirect("/error", { headers: { "X-Remix-Error": "500" } });
    }
  };
  
  export const addProjectUsersAction = async ({ request }) => {
    try {
      if (request.method === "PUT") {
        const formData = new URLSearchParams(await request.text());
        const { projectId, projectUsers } = Object.fromEntries(formData);
  
        const { response, err } = await addProjectUsers(projectId, projectUsers);
  
        if (err) {
          console.error("Error adding project users:", err);
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
  
  export const archiveProjectAction = async ({ request }) => {
    try {
      if (request.method === "PUT") {
        const formData = new URLSearchParams(await request.text());
        const { projectId, archive } = Object.fromEntries(formData);
  
        const { response, err } = await archiveProject(projectId, archive);
  
        if (err) {
          console.error("Error archiving project:", err);
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
    



export const action = async ({ request }) => {
  try {
    if (request.method === "POST") {
      const formData = new URLSearchParams(await request.text());
      const projectId = formData.get("projectId");

      const { response, err } = await addCloneProject(projectId);

      if (err) {
        console.error("Error cloning project:", err);
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
