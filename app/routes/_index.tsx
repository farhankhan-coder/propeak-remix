// routes/index.tsx

import { LoaderFunctionArgs, json } from "@remix-run/node";
import mongoose from "mongoose";
import { getDashboardData } from "~/Services/task/task-service";
import Summary from "../Components/summary/summary";
import config from "../config/config";
import Footer from "../routes/footer";
import { useLoaderData } from "@remix-run/react";
// // import Dashboard from "../routes/dashboard/route"
// interface MyConnectOptions extends ConnectOptions {
//   useUnifiedTopology?: boolean;
// }

export async function loader({ request }: LoaderFunctionArgs) {
  // Destructure the `request` object from the argument
  try {
    const companies = await getDashboardData();
    console.log(companies, request, "company here ");
    return json({ companies });
  } catch (error) {
    console.error("Error fetching companies:", error);
    throw error;
  }
}

export default function App() {
  const {companies} = useLoaderData()
  return (
    <div>
      {/* <Header /> */}
      {/* <Menu/> */}
      <Summary companies={companies} />
      <Footer />
    </div>
  );
}

export const connectToMongoDB = async () => {
  try {
    await mongoose.connect(config.db);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
connectToMongoDB();
