import { getAllUserRoles,getAllUsers,getUser,getProfilePicture,addUser,updateUser, deleteUser } from '../../Services/user/user-service'; 
import { redirect, json } from '@remix-run/react'; 

// getAllUserRoles
export const loader = async ({ params }) => {
  try {
    const { response: rolesResponse, err: rolesErr } = await getAllUserRoles();
    
    if (rolesErr) {
      console.error("Error fetching user roles:", rolesErr);
      throw new Error("Failed to fetch user roles");
    }

    return json({ userRoles: rolesResponse });
  } catch (error) {
    console.error("Error processing request:", error);
    throw error;
  }
}


// getAllUsers
export const loader = async ({ params }) => {
  try {
    const { response: usersResponse, err: usersErr } = await getAllUsers();
    
    if (usersErr) {
      console.error("Error fetching users:", usersErr);
      throw new Error("Failed to fetch users");
    }

    return json({ users: usersResponse });
  } catch (error) {
    console.error("Error processing request:", error);
    throw error;
  }
}


// getUser
export const loader = async ({ params }) => {
  try {
    const userId = params.id; 
    
    const { response: userResponse, err: userErr } = await getUser(userId);
    
    if (userErr) {
      console.error("Error fetching user by ID:", userErr);
      throw new Error("Failed to fetch user");
    }

    return json({ user: userResponse });
  } catch (error) {
    console.error("Error processing request:", error);
    throw error;
  }
}


// getProfilePicture
export const loader = async ({ params }) => {
  try {
    const userId = params.id; 
    
    const { response: pictureResponse, err: pictureErr } = await getProfilePicture(userId);
    
    if (pictureErr) {
      console.error("Error fetching profile picture:", pictureErr);
      throw new Error("Failed to fetch profile picture");
    }

    return json({ profilePicture: pictureResponse });
  } catch (error) {
    console.error("Error processing request:", error);
    throw error;
  }
}

//create user 
export const action = async ({ request }) => {
    try {
      if (request.method === "POST") {
        const formData = new URLSearchParams(await request.text());
        const userData = {
          name: formData.get("name"),
          role: formData.get("role"),
          email: formData.get("email"),
          password: formData.get("password"),
          isDeleted: formData.get("isDeleted"),
          companyId: formData.get("companyId"),
          reportingManagerId: formData.get("reportingManagerId"),
          contactNumber: formData.get("contactNumber"),
          alternateNumber: formData.get("alternateNumber"),
          gender: formData.get("gender"),
          dob: formData.get("dob"),
          isActive: formData.get("isActive"),
          isLocked: formData.get("isLocked"),
          dateOfJoining: formData.get("dateOfJoining"),
          designation: formData.get("designation"),
          bloodGroup: formData.get("bloodGroup"),
          currentAddress: formData.get("currentAddress"),
          permanentAddress: formData.get("permanentAddress"),
          panNo: formData.get("panNo"),
          addharNo: formData.get("addharNo"),
          passportNo: formData.get("passportNo"),
          passportName: formData.get("passportName"),
          passportissueDate: formData.get("passportissueDate"),
          passportexpiryDate: formData.get("passportexpiryDate"),
          placeOfIssue: formData.get("placeOfIssue"),
          createdBy: formData.get("createdBy"),
          createdOn: formData.get("createdOn"),
          modifiedBy: formData.get("modifiedBy"),
          modifiedOn: formData.get("modifiedOn"),
        };
  
        const { response, err } = await addUser(userData);
  
        if (err || (response && response.data && response.data.err)) {
          console.error("Error adding user:", err || response.data.err);
          return redirect("/error", { headers: { "X-Remix-Error": "500" } });
        }
  
        return redirect("/users");
      } else {
        return json({ error: "Invalid request method." }, { status: 400 });
      }
    } catch (error) {
      console.error("Error processing action:", error);
      return redirect("/error", { headers: { "X-Remix-Error": "500" } });
    }
  };

//update and delete
export const action = async ({ request ,params}) => {
  const userId = params.id;

  try {
    if (request.method === "DELETE") {
      const { response, err } = await deleteUser(userId);
      if (!err) {
        return redirect("/users");
      } else {
        console.error("Error deleting user:", err);
        return json({ error: "Failed to delete user." }, { status: 500 });
      }
    } else if (request.method === "PUT") {
      const formData = new URLSearchParams(await request.text());
      const userData = {};
      formData.forEach((value, key) => {
        userData[key] = value;
      });
      
      const { response, err } = await updateUser(userId, userData);
      if (!err) {
        return redirect("/users");
      } else {
        console.error("Error updating user:", err);
        return json({ error: "Failed to update user." }, { status: 500 });
      }
    } else {
      return json({ error: "Invalid request method." }, { status: 400 });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return json({ error: "Internal server error." }, { status: 500 });
  }
}
