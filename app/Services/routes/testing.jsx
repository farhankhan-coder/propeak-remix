// import User from "../models/user/user-model";

// export const loader = async () => {
//     try {
//         const UserFromDB = await User.find({}).maxTimeMS(30000); // Set timeout to 30 seconds
//         const formattedUser = UserFromDB.map((user) => ({
//         _id: user._id,
//       }));
//       console.log(
//         formattedUser,
//         "Fetched and formatted Users data"
//       );
//       return { users: formattedUser };
//     } catch (error) {
//       console.error("Error fetching Users:", error);
//       throw new Error("Failed to fetch Users");
//     }
//   };






// import { json, useLoaderData } from "@remix-run/react";
// import * as validateAppLevelAccessRight from "../common/validate-entitlements";

// export const loader = async () => {
//   try {
//     // Call the validateAppLevelAccessRights function
//     console.log(validateAppLevelAccessRight,"okay okay data here ")
//     const accessRights = [true] ;
//     const group = "Access Rights";
//     const entitlementId = "Edit";
//     const B = validateAppLevelAccessRight.validateAppLevelEntitlements(accessRights, group, entitlementId);
//     console.log(B, "B data here ");
//     return json({
//       B
//     });
//   } catch (error) {
//     console.error("Error fetching categories:", error);
//     throw new Error("Failed to fetch ACCESS RIGHT");
//   }
// };

// import { json } from "@remix-run/react";
// import { validateAppLevelAccessRight } from "../common/validate-entitlements";

// export const loader = async () => {
//   try {
//     // Replace 'userId' with the actual userId value you want to use
//     const userId = "5d1f2e407cfeb4bc12a1581f"; 

//     // Call the validateAppLevelAccessRight function
//     const appLevelAccessRights = await validateAppLevelAccessRight(userId);
//     console.log(appLevelAccessRights, "okay okay data here ");

   
//     return json({
//       appLevelAccessRights
//     });
//   } catch (error) {
//     console.error("Error fetching access right:", error);
//     throw new Error("Failed to fetch ACCESS RIGHT");
//   }
// };


// const demo = () => {
//   const { B } = useLoaderData();
//   return (
//     <div>
//       {/* You can use B here */}
//     </div>
//   );
// };

// export default demo;



// // import React from "react";
// // import { Link } from "react-router-dom";
// // import Auth from "../utils/auth";
// // // import "../../src/features/tasks/task.css";
// // import app from "./../styles/app.css";
// // import tasks from "./../styles/task.css"
// // export const links = () => [
// //   { rel: "stylesheet", href: app },
// //   { rel: "stylesheet", href: tasks },
// // ];
// // import * as validateAppLevelAccessRights from "../common/validate-entitlements";
// // import AppLevelAccessRight from "../models/access-right/applevelaccessright-model"
// // export const loader = async () => {
// //     try {
// //       const appLevelAccessRigh = await AppLevelAccessRight.find({}).maxTimeMS(30000);
// //       const formatedappLevelAccessRigh = appLevelAccessRigh.map((access) => ({
// //         _id: access._id,
// //         entitlementId: access.entitlementId || "",
// //         group: access.group || "",
// //         userId: access.userId || "",
// //         access: true
// //       }));
// //       console.log(formatedappLevelAccessRigh, "Fetched and formatted appLevelAccess data");
// //       return { access: formatedappLevelAccessRigh };
// //     } catch (error) {
// //       console.error("Error fetching categories:", error);
// //       throw new Error("Failed to fetch categories");
// //     }
// //   };
  

