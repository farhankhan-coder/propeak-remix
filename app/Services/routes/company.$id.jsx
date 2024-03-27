import { redirect } from "@remix-run/react";
import { editCompany, deleteCompany ,} from "../Services/company/company-service";
import { json } from "@remix-run/react";

export async function action({ request, params }) {
    const companyId = params.id;

    try {
        if (request.method === "DELETE") {
            const { response, err } = await deleteCompany(companyId);
            if (!err) {
                return redirect("/company");
            } else {
                console.error("Error deleting company:", err);
                return json({ error: "Failed to delete company." }, { status: 500 });
            }
        } else if (request.method === "PUT") {
            const formData = new URLSearchParams(await request.text());
            const companyData = {};
            formData.forEach((value, key) => {
                companyData[key] = value;
            });

            const { response, err } = await editCompany(companyId, companyData);
            if (!err) {
                return redirect("/company");
            } else {
                console.error("Error editing company:", err);
                return json({ error: "Failed to edit company." }, { status: 500 });
            }
        } else {
            return json({ error: "Invalid request method." }, { status: 400 });
        }
    } catch (error) {
        console.error("Error processing request:", error);
        return json({ error: "Internal server error." }, { status: 500 });
    }
}

export async function loader() {
    try {
        const companies = await getAllCompanies();
        return json({ companies });
    } catch (error) {
        console.error("Error fetching companies:", error);
        throw error;
    }
}

// import { redirect } from "@remix-run/react";
// import { addCompany } from "../Services/company/company-service";
// import { json } from "@remix-run/react";

// export async function action({ request }) {
//     try {
//         if (request.method === "POST") {
//             const formData = new URLSearchParams(await request.text());
//             const sequence = formData.get("sequence");
//             const title = formData.get("title");
//             const displayName = formData.get("displayName");
//             const show = formData.get("show") === "true";

//             const companyData = {
//                 sequence,
//                 title,
//                 displayName,
//                 show
//             };

//             const { response, err } = await addCompany(companyData);
//             if (!err) {
//                 return redirect("/company");
//             } else {
//                 console.error("Error adding company:", err);
//                 return json({ error: "Failed to add company." }, { status: 500 });
//             }
//         } else {
//             return json({ error: "Invalid request method." }, { status: 400 });
//         }
//     } catch (error) {
//         console.error("Error processing request:", error);
//         return json({ error: "Internal server error." }, { status: 500 });
//     }
// }
