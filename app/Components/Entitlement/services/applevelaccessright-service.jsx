import { serviceHost } from "../../../common/const";
import ServiceRequest from "../../../utils/service-request";
import AppLevelAccessRightEntitlement from "~/models/access-right/applevelaccessrightentitlment-model";
import User from "~/models/user/user-model";
import AppLevelAccessRight from "~/models/access-right/applevelaccessright-model";
export const getAppLevelAccessState = async () => {
  try {
    // Perform the query using the Mongoose model
    const accessRightData = await AppLevelAccessRightEntitlement.find({});
    console.log(accessRightData, " app leavel access right from services ");
    return { accessRightData, err: null };
  } catch (err) {
    // Handle errors
    return { accessRightData: null, err };
  }
};

export const getAll = async () => {
  try {
    const users = await User.find({}).select();
    console.log(users);
    return users;
  } catch (error) {
    console.error("Error fetching user emails:", error);
    throw error;
  }
};

export async function saveUserAppLevelAccessRight(
  userId,
  entitlementId,
  group,
  access,
  createdBy
) {
  try {
    const newUserAppLevelAccessRight = await AppLevelAccessRight.create({
      userId,
      entitlementId,
      group,
      access,
      createdBy,
      createdOn: new Date(),
      isDeleted: false,
    });

    return { response: newUserAppLevelAccessRight, err: null };
  } catch (error) {
    console.error("Error saving UserAppLevelAccessRight:", error);
    return { response: null, err: error };
  }
}
export const getUserAppLevelAccessRights = async () => {
  try {
    const accessRights = await AppLevelAccessRight.find({ });
    return { response: accessRights, err: null };
  } catch (err) {
    // Handle errors
    return { response: null, err };
  }
};

// export const getUserAppLevelAccessRights = async (userId) => {
//   try {
//     const accessRights = await AppLevelAccessRight.findOne({ userId });
//     return { response: accessRights, err: null };
//   } catch (err) {
//     // Handle errors
//     return { response: null, err };
//   }
// };

// export const getAppLevelAccessState = async () => {
//   try {
//     let response = await ServiceRequest(
//       "get",
//       "json",
//       serviceHost + "/appLevelAccessRight",
//       ""
//     );
//     return { accessRightData: response.data, err: null };
//   } catch (err) {
//     if (err) {
//       return { accessRightData: null, err };
//     }
//   }
// };

// export const saveUserAppLevelAccessRight = async (userAccessRights) => {
//   try {
//     let response = await ServiceRequest(
//       "post",
//       "json",
//       serviceHost + "/appLevelAccessRight/save",
//       userAccessRights
//     );
//     return { response, err: null };
//   } catch (err) {
//     if (err) {
//       return { response: null, err };
//     }
//   }
// };

// export const getUserAppLevelAccessRights = async (userId) => {
//   try {
//     let data = { userId: userId };

//     let response = await ServiceRequest(
//       "post",
//       "json",
//       serviceHost + "/appLevelAccessRight/get",
//       data
//     );

//     return { response, err: null };
//   } catch (err) {
//     if (err) {
//       return { response: null, err };
//     }
//   }
// };
