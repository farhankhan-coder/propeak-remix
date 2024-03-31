import Summary from "../../Components/summary/summary";
import { json } from "@remix-run/node";
import { getDashboardData } from "~/Services/task/task-service";
export async function loader({ request }) {
  // Destructure the `request` object from the argument
  try {
    const companies = await getDashboardData();
    
    console.log(companies, "company here ");
    return json({ companies });
  } catch (error) {
    console.error("Error fetching companies:", error);
    throw error;
  }
}
export default function summaryRoute() {
  return (
    <div>
      <Summary />
    </div>
  );
}
