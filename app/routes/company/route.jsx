import React, { useState } from "react";
import { useLoaderData, redirect } from "@remix-run/react";
import { getAllCompanies, addCompany } from "../../Services/company/company-service";
import { json } from "@remix-run/react";
import CompanyForm from "../../Components/company/company-form";
import CompanyList from "../../Components/company/company-list";
// import companyc from "../../Components/company/company.css";
import company from "../../Components/company/company.css";
import Header from "../header";
import Footer from "../footer";
import Menu from "../menu";
export const links = () => [
  { rel: "stylesheet", href: company },
];


export async function loader({ request }) { // Destructure the `request` object from the argument
  try {
      // const accessToken = request.headers.get("Authorization");
      // if (!accessToken) {
      //   return json({ error: "Access token not provided" }, { status: 401 });
      // }
  
      // const userData = await verifyAccessToken(accessToken); 
  
      // if (!userData) {
      //   return json({ error: "Invalid access token" }, { status: 401 });
      // }
    const companies = await getAllCompanies();
    return json({ companies });
  } catch (error) {
    console.error("Error fetching companies:", error);
    throw error;
  }
}

export default function CompanyComponent() {
  const { companies } = useLoaderData();
  const [showNewCompany, setShowNewCompany] = useState(false);
  const [showEditCompany, setShowEditCompany] = useState(false);
  const [company, setCompany] = useState({
    companyName: "",
    companyCode: "",
    country: "",
    address: "",
    contact: "",
    isDeleted: false
  });
  const [labelSuccessValue, setLabelSuccessValue] = useState("");

  const addNewCompanyWindow = () => {
    setShowNewCompany(true);
    setCompany({
      companyName: "",
      companyCode: "",
      country: "",
      address: "",
      contact: "",
      isDeleted: false
    });
    setLabelSuccessValue("");
  };

  const closeCompany = () => {
    setShowNewCompany(false);
    setShowEditCompany(false);
    setCompany({
      companyName: "",
      companyCode: "",
      country: "",
      address: "",
      contact: "",
      isDeleted: false
    });
    setLabelSuccessValue("");
  };

  return (
    <div className="container bg-white">
            {/* <div> */}
            <Header />
      <Menu />
      {/* <Summary /> */}
      <Footer />
      <div className="row">
        <div className="col-sm-7">
          <div className="row">
            <div className="col-sm-6">
              <h4 className="sub-title ml-3 mt-3">
                Company ({companies.length})
              </h4>
            </div>
            <div className="col-sm-6">
              <h4 className="mt-3">
                <span
                  className="btn btn-xs btn-info float-right"
                  title="New Company"
                  onClick={addNewCompanyWindow}
                >
                  Add Company &nbsp; <i className="fas fa-plus"></i>
                </span>
              </h4>
            </div>
          </div>
        </div>
      </div>
      <hr />

      <div className="row">
        <div className="col-sm-12 col-md-5 col-lg-5 order-lg-1 order-md-1 form-wrapper">
          {showNewCompany || showEditCompany ? (
            <CompanyForm
              company={company}
              labelSuccessValue={labelSuccessValue}
              closeCompany={closeCompany}
            />
          ) : null}
        </div>
        <div className="col-sm-12 col-md-7 col-lg-7 contentWrapper">
          <div className="scroll">
            <CompanyList companies={companies} />
          </div>
        </div>
      </div>
    </div>
  );
}




export const action = async ({ request }) => {
  try {
    if (request.method === "POST") {
      const formData = new URLSearchParams(await request.text());
      const companyName = formData.get("companyName");
      const companyCode = formData.get("companyCode");
      const country = formData.get("country");
      const address = formData.get("address");
      const contact = formData.get("contact");

      const { response, err } = await addCompany(companyName, companyCode, country, address, contact);

      if (err || (response && response.data && response.data.err)) {
        console.error("Error adding company:", err || response.data.err);
        return redirect("/error", { headers: { "X-Remix-Error": "500" } });
      }

      return redirect("/company");
    } else {
      return json({ error: "Invalid request method." }, { status: 400 });
    }
  } catch (error) {
    console.error("Error processing action:", error);
    return redirect("/error", { headers: { "X-Remix-Error": "500" } });
  }
};

