import React from "react";
import { json, useLoaderData, redirect } from "@remix-run/react";
import {
  getAppLevelAccessState,
  saveUserAppLevelAccessRight,
  getUserAppLevelAccessRights,
} from "../../Components/Entitlement/services/applevelaccessright-service";
import AppLevelAccessRight from "../../Components/Entitlement/components/applevelaccessrights";

export async function loader({ params }) {
  try {
    // Extract any parameters needed for fetching the user ID
    const { userId } = params;
    // Now that we have the user ID, we can proceed with loading the access rights
    const { accessRightData, err } = await getAppLevelAccessState();
    console.log(accessRightData, "   okay ");
    // Fetch the user's app level access rights using the obtained user ID
    const { response: appLevelAccessRight, err: accessRightErr } =
      await getUserAppLevelAccessRights(userId);
    // console.log(appLevelAccessRight, " app level access data ");

    if (err || accessRightErr) {
      throw err || accessRightErr;
    }
    return json({ accessRightData, appLevelAccessRight }); // Include users in the data object
  } catch (error) {
    console.error("Error fetching app level access state:", error);
    throw error;
  }
}

// export async function loader() {
//   try {
//     const { accessRightData, err } = await getAppLevelAccessState();
//     const {appLevelAccessRight} =await getUserAppLevelAccessRights();
//     // console.log(accessRightData, " access data ");
//     console.log(appLevelAccessRight, " app level access data ");

//     if (err ) {
//       throw err ;
//     }
//     return json({ accessRightData ,appLevelAccessRight}); // Include users in the data object
//   } catch (error) {
//     console.error("Error fetching app level access state:", error);
//     throw error;
//   }
// }

export default function AppLevelAccessRightsComponent() {
  const { accessRightData,appLevelAccessRight} = useLoaderData();
  const context = {};
  const actions = {
    setUsers: () => {},
  };

  return (
    <div>
      <AppLevelAccessRight
        accessRightData={accessRightData}
        context={context}
        actions={actions}
      />
    </div>
  );
}

export async function action({ request }) {
  try {
    if (request.method === "POST") {
      const formData = new URLSearchParams(await request.text());
      const userId = formData.get("userId");
      const entitlementId = formData.get("entitlementId");
      const group = formData.get("group");
      const access = formData.get("access");
      const createdBy = formData.get("createdBy");
      console.log(formData, " form data .......");
      const { response, err } = await saveUserAppLevelAccessRight(
        userId,
        entitlementId,
        group,
        access,
        createdBy
      );

      if (!err) {
        return redirect("/applevelaccessrights");
      } else {
        console.error("Error saving user app level access right:", err);
        return json(
          { error: "Failed to save user app level access right." },
          { status: 500 }
        );
      }
    } else {
      return json({ error: "Invalid request method." }, { status: 400 });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return json({ error: "Internal server error." }, { status: 500 });
  }
}
