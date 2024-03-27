import { useState } from "react";
import { Links, useLoaderData } from "@remix-run/react";
import { getAllProjectsSummary } from "../../Services/project/project-service";
import { json } from "@remix-run/node";
import { Link } from "react-router-dom";
import * as validate from "../../common/validate-entitlements";
import Auth from "../../utils/auth";

export async function loader({ request }) {
  try {
    const projects = await getAllProjectsSummary();
    return json({ projects });
  } catch (error) {
    console.error("Error in loader:", error);
    return json({ error: "Failed to load projects summary" }, { status: 500 });
  }
}

export default function ProjectsComponent() {
  const { projects } = useLoaderData();
  const userRole = Auth.get("userRole");
  const [showArchive, setShowArchive] = useState(false);

  const handleChange = (e) => {
    setShowArchive(e.target.checked);
  };

  //   const createProject = validate.validateAppLevelEntitlements(
  //     projects.appLevelAccess, // Accessing appLevelAccess directly from projects
  //     "Projects",
  //     "Create"
  //   );
  //   console.log(createProject, "create project ")

  return (
    <div className="container">
      {projects ? (
        <div className="row">
          <div className="col-sm-12 col-lg-4">
            <div className="row">
              <div className="col-7">
                <div className="row">
                  <h4 className="project-total mt-2">
                    Projects ({projects.length}) &nbsp;&nbsp;
                    {/* <button> */}
                    <Link to="/projectcreate">➕</Link>
                    {/* </button> */}
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-lg-2">
            {Auth.get("userRole") !== "user" ? (
              <span className="span-archive float-right">
                <label>Show Archive </label>&nbsp;
                <input
                  type="checkbox"
                  name="showArchive"
                  onChange={handleChange}
                  checked={showArchive}
                />
              </span>
            ) : (
              "  "
            )}
          </div>
          <div className="col-sm-12 col-lg-3 mt-2">
            <div className="row">
              <div className="input-group input-group mb-3 ">
                <div className="input-group-prepend">
                  <span
                    className="input-group-text rounded-0"
                    id="inputGroup-sizing-sm"
                  >
                    <i className="fas fa-sort-amount-down"></i>
                  </span>
                </div>
                <select
                  className="form-control mr-lg-1 rounded-0"
                  onChange={this.onGroupChanged}
                  value={this.state.selectedGroup}
                  placeholder="Select Group"
                >
                  {groupList}
                </select>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="logo">
          <img src="/images/loading.svg" alt="loading" />
        </div>
      )}
    </div>
  );
}
