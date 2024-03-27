
import React, { useState } from "react";
import GroupForm from "./group-form";
import { Form } from "@remix-run/react";

const GroupList = ({ groups = [], editGroupWindow,closeGroup }) => {
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleEditClick = (group) => {
    setSelectedGroup(group);
    editGroupWindow(group);

  };
  const handleCloseGroup = () => {
    setSelectedGroup(null); 
    closeGroup(); 
  };
 

  return (
    <ul className="list-group list-group-flush">
      {groups.map((group, index) => (
        <li
          className="list-group-item d-flex justify-content-between align-items-center"
          id={index}
          key={group._id}
        >
          {/* {group.groupName} */}
          <span>
            {group.groupName}&nbsp;&nbsp;&nbsp;
            <span className="btn btn-xs btn-outline-info">
              <button onClick={() => handleEditClick(group)}>Edit</button>
            </span>
            <span
              title="Delete group"
              className="btn btn-xs btn-outline-danger"
            >
              <Form method="DELETE" action={`/groups/${group._id}`}>
                <button type="submit">Delete</button>
              </Form>{" "}
            </span>
          </span>
          {/* Render the groupForm only if the current group is selected for editing */}
          {selectedGroup && selectedGroup._id === group._id && (
            <GroupForm group={selectedGroup} isEditMode
            handleCloseGroup={handleCloseGroup} />
          )}
        </li>
      ))}
    </ul>
  );
};

export default GroupList;



