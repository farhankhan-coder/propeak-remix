// routes/index.tsx

import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import Group from "../models/group-model";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
// import Header from "../routes/header";
import mongoose, { ConnectOptions } from "mongoose";
import config from "../config/config";
import Menu from "./menu";
// import Summary from "./summary/route"
interface MyConnectOptions extends ConnectOptions {
  useUnifiedTopology?: boolean;
}

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      {/* <Header />  
      <Summary/> */}
      {/* <Menu/> */}
    </div>
  );
}

export const connectToMongoDB = async () => {
  try {
    await mongoose.connect(config.db, {
      useUnifiedTopology: true,
    } as MyConnectOptions);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

connectToMongoDB();
