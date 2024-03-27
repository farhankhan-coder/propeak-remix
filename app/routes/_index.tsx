// routes/index.tsx

import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import mongoose, { ConnectOptions } from "mongoose";
import config from "../config/config";
import Header from "../routes/header";
import Footer from "../routes/footer";
import Menu from "../routes/menu";
import Summary from "../Components/summary/summary";
// import Dashboard from "../routes/dashboard/route"
interface MyConnectOptions extends ConnectOptions {
  useUnifiedTopology?: boolean;
}
export default function App() {
  return (
    <div>
      <Header />
      {/* <Menu/> */}
      {/* <Dashboard/> */}
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
