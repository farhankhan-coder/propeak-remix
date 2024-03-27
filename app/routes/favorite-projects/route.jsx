import { useLoaderData } from "@remix-run/react";
import FavoriteProjectList from "./favorite-projectlist";
import Header from "../header";
import Footer from "../footer";
import Menu from "../menu";
export async function loader({ request, userInfo }) {
  try {
    console.log("Request body:", request.body);

    const { userId, userRole, projectId, showArchive } = request.body;

    console.log(userInfo, "getAllProjectsSummary userInfo");

    if (!userRole) {
      throw new Error("User role is not defined.");
    }

    const projectsSummary = await fetchAllProjectsSummary({
      userId,
      userRole,
      projectId,
      showArchive,
    });

    return json({
      success: true,
      data: projectsSummary.projects,
      count: userRole === "user" ? 1 : projectsSummary.totalProjectUser,
    });
  } catch (error) {
    console.error("Error fetching projects summary:", error);
    throw error;
  }
}

export default function favoriteProjectRoute() {
  const { projectsSummary } = useLoaderData();
  return (
    <div>
      {/* <div> */}
      <Header />
      <Menu />
      {/* <Summary /> */}
      <Footer />
      <div>
        <FavoriteProjectList projectsSummary={projectsSummary} />
      </div>
    </div>
  );
}

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
    } else if (request.method === "DELETE") {
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
    console.error("Error processing action:", error);
    return redirect("/error", { headers: { "X-Remix-Error": "500" } });
  }
};
