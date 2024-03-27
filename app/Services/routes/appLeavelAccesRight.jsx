import { json, useLoaderData } from "@remix-run/react";
import { getUserAppLevelAccessRights } from "../Components/Entitlement/services/applevelaccessright-service";

export const loader = async () => {
    try {
        const { response, err } = await getUserAppLevelAccessRights();
        console.log(response, "check response.......")
        if (err) {
            console.error("Error while loading user app level access rights:", err);
            return null;
        }
        if (!response) {
            console.error("Empty response while loading user app level access rights");
            return null;
        }
        return json({response});
    } catch (error) {
        console.error("Error while loading user app level access rights:", error);
        return null;
    }
}

export default function accessRights(){
    const {response}=useLoaderData()
    console.log(response, "response ")
}