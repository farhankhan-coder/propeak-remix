import React, { useState } from "react";
import { Form } from "@remix-run/react";
import CompanyForm from "./company-form";
import company from "./company.css";
export const links = () => [
  { rel: "stylesheet", href: company },
];
const CompanyList = ({ companies = { response: [] } },editCompanyWindow,closeCompany) => {
  const { response } = companies;

  if (!Array.isArray(response) || response.length === 0) {
    console.error("Companies response is not an array or is empty:", response);
    return null;
  }
    const [selectedCompany, setselectedCompany] = useState(null);

    const handleEditClick = (company) => {
      setselectedCompany(company);
      editCompanyWindow(company);

    };
    const handlecloseCompany = () => {
      setselectedCompany(null); //
      closeCompany(); // 
    };

  return (
    <ul className="list-group list-group-flush">
      {response.map((company, index) => (
        <li
          className="list-group-item d-flex justify-content-between align-items-center"
          id={index}
          key={company._id}
        >
          {company.companyName}
		   <span> 
            {company.sequence}&nbsp;&nbsp;&nbsp;
            <span className="btn btn-xs btn-outline-info">
              <button onClick={() => handleEditClick(company)}>Edit</button>
            </span>
            <span
              title="Delete company"
              className="btn btn-xs btn-outline-danger"
            >
              <Form method="DELETE" action={`/company/${company._id}`}>
                <button type="submit">Delete</button>
              </Form>{" "}
            </span>
          </span> 
          {/* Render the companyForm only if the current company is selected for editing */}
          {selectedCompany && selectedCompany._id === company._id && (
			 <CompanyForm company={selectedCompany} isEditMode
            handlecloseCompany={handlecloseCompany} />
           )} 
        </li>
      ))}
    </ul>
  );
};

export default CompanyList;

