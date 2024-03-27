import React, { useState } from "react";
import GroupList from "../../Components/groups/group-list";
import GroupForm from "../../Components/groups/group-form";
import { useLoaderData, redirect } from "@remix-run/react";
import { getAllGroups, addGroup } from "../../Services/group/group-service";
import { json } from "@remix-run/react";
import groupc from "../../Components/groups/group.css";

export const links = () => [{ rel: "stylesheet", href: groupc }];

export async function loader() {
  try {
    const groups = await getAllGroups();
    {
      groups.map((group)=>{
        // console.log(group.groupMembers,"single data ")
      }
      )}
    // console.log(groups,"data is here ")
    return json({ groups });
  } catch (error) {
    console.error("Error fetching groups:", error);
    throw error;
  }
};

export default function GroupComponent() {
  const { groups } = useLoaderData();
  const [showNewGroup, setShowNewGroup] = useState(false);
  const [group, setGroup] = useState({
    groupName: "",
    groupMembers:  [],
    isDeleted: false,
  });
  const [labelsuccessvalue, setLabelSuccessValue] = useState("");
  const [labelvalue, setLabelValue] = useState("");

  const addNewGroupWindow = () => {
    setShowNewGroup(true);
    setGroup({
      groupName: "",
      groupMembers: "",
      isDeleted: false,
    });
    setLabelSuccessValue("");
    setLabelValue("");
  };

  const closeGroup = () => {
    setShowNewGroup(false);
    setGroup({
      groupName: "",
      groupMembers: "",
      isDeleted: false,
    });
    setLabelSuccessValue("");
    setLabelValue("");
  };

  return (
    <div className="container bg-white">
      <div className="row">
        <div className="col-sm-7">
          <div className="row">
            <div className="col-sm-6">
              <h4 className="sub-title ml-3 mt-3">
                Group ({groups.length})
              </h4>
            </div>
            <div className="col-sm-6">
              <h4 className="mt-3">
                <span
                  className="btn btn-xs btn-info float-right"
                  title="New Group"
                  onClick={addNewGroupWindow}
                >
                  Add Group &nbsp;
                  <button>Add new </button>
                </span>
              </h4>
            </div>
          </div>
        </div>
      </div>
      <hr />

      <div className="row">
        <div className="col-sm-12 col-md-5 col-lg-5 order-lg-1 order-md-1 form-wrapper">
          {showNewGroup && (
            <GroupForm
              group={group}
              onSubmit={async (formData) => {
                try {
                  const { response, err } = await addGroup(formData);

                  if (err || (response && response.data && response.data.err)) {
                    console.error("Error adding group:", err || response.data.err);
                    return { error: "Error adding group" };
                  }

                  window.location.reload();
                } catch (error) {
                  console.error("Error adding group:", error);
                  return { error: "Error adding group" };
                }
              }}
              onClose={closeGroup}
            />
          )}
        </div>
        <div className={`col-sm-12 col-md-7 col-lg-7 contentWrapper`}>
          <div className="scroll">
            <GroupList groups={groups} />
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
      const groupName = formData.get("groupName");
      const groupMembers = formData.get("groupMembers");
      const isDeleted = formData.get("isDeleted");

      const { response, err } = await addGroup(groupName, groupMembers, isDeleted);

      if (err || (response && response.data && response.data.err)) {
        console.error("Error adding group:", err || response.data.err);
        return redirect("/error", { headers: { "X-Remix-Error": "500" } });
      }

      return redirect("/groups");
    } else {
      return json({ error: "Invalid request method." }, { status: 400 });
    }
  } catch (error) {
    console.error("Error processing action:", error);
    return redirect("/error", { headers: { "X-Remix-Error": "500" } });
  }
};
