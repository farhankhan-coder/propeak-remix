import { useLoaderData } from "@remix-run/react";
import ActiveUserReport from "../../Components/reports/active-users-report";
import { getActiveUsersReport } from "../../Services/reports/active-users-report-service";
import { json } from "@remix-run/node";
import Header from "../header";
import Footer from "../footer";
import Menu from "../menu";

export const loader = async ({ params }) => {
  try {
    const { response, err } = await getActiveUsersReport(
      params.reportParams,
      params.projectId
    );
    // console.log(response,"reponse .....");
    if (err) {
      console.error("Error fetching active users report:", err);
      return json(
        { error: "Failed to load active users report" },
        { status: 500 }
      );
    }
    return json({ activeUsersReport: response });
  } catch (error) {
    console.error("Error in loader function:", error);
    return json({ error: "Internal Server Error" }, { status: 500 });
  }
};
export default function activeUserComponent() {
  const { activeUsersReport } = useLoaderData();
  return (
    <div>
      {/* <Header /> */}
      {/* <Menu /> */}
      <Summary />
      <ActiveUserReport activeUsersReport={activeUsersReport} />
      <Footer />
    </div>
  );
}
