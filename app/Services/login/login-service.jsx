import User from "../../models/user/user-model";
import crypto from "crypto";
import { Jwt } from "jsonwebtoken";
import nodemailer from "nodemailer";
import config from "../../config/config";
import AccessRight from "../../models/access-right/access-right-model";
import { sendEmail } from "../../common/mailer";
import {
  generateAccessToken,
  generateRefreshToken,
  decodeToken,
} from "../../verify-token/token-management";
import { logInfo } from "../../common/logger";
import { loggers } from "winston";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../common/const";
import Token from "../../models/Token/token";
import { saveRefreshToken, removeToken } from "../token/token-service";
import acces from "../../check-entitlements";
import { json } from "@remix-run/node";
import { log } from "console";
const errors = {
  REGISTER_EMAIL_TAKEN: "Email is unavailable",
  RESET_PASSWORD: "An error has occured while reseting password",
  REGISTER_GENERAL_ERROR: "An error has occured while adding/updating user",
  LOGIN_INVALID: "Invalid Email/Password combination",
  LOGIN_GENERAL_ERROR: "Invalid user credentials",
  RESET_EXPIRE: "Your link has expired, kindly reset again",
  PASSWORDS_DONT_MATCH: "Passwords do not match",
  LOGIN_GENERAL_ERROR_DELETE: "An error has occured while deleting user",
  NOT_AUTHORIZED: "You are not authorized",
  ACTIVE_ERROR: "Your Account is Deactivated",
  LOGIN_LOCKED_ERROR:
    "Your Account has been Locked. Please reset your password to login again.",
  RESET_PASSWORD_ERROR:
    "Your Account has been locked please reset password After One hour",
};

let count = 0;
let isLocked = false;
// import { getSession, commitSession } from '../../Services/server'; 
export async function login(email, password) {
  try {
    const user = await User.findOne({ email: email, isActive: true }).exec();

    if (!user) {
      return null;
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      count++;
      if (count === config.loginAttemptCount) {
        isLocked = true;
      }
      return null; 
    }

    // Generate new tokens
    const u = {
      _id: user._id,
      name: user.name,
      role: user.role,
      profilePicture: user.profilePicture,
    };
    const accessToken = generateAccessToken(u);
    const refreshToken = generateRefreshToken(u);

    // Save the new tokens
    await saveRefreshToken(accessToken, refreshToken, user._id);

    // Fetch access rights
    const accessRights = await AccessRight.find({ userId: user._id }, { projectId: 1, entitlementId: 1, group: 1 }).exec();

    return {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        access: accessRights,
        profilePicture: user.profilePicture,
      },
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  } catch (error) {
    console.error("Error in login:", error);
    throw error;
  }
}

// export async function login(email, password) {
//   try {
//     const user = await User.findOne({ email: email, isActive: true }).exec();

//     if (!user) {
//       return null;
//     }

//     const isMatch = await user.comparePassword(password);

//     if (!isMatch) {
//       count++;
//       if (count === config.loginAttemptCount) {
//         isLocked = true;
//       }
//       return null; 
//     }

//     const existingToken = await Token.create({
//       accessToken: accessToken,
//       refreshToken: refreshToken,
//       userId: user._id,
//     });
//         let accessToken, refreshToken;

//     if (existingToken) {
//       accessToken = existingToken.accessToken;
//       refreshToken = existingToken.refreshToken;
//     } else {
//       const u = {
//         _id: user._id,
//         name: user.name,
//         role: user.role,
//         profilePicture: user.profilePicture,
//       };

//       accessToken = generateAccessToken(u);
//       refreshToken = generateRefreshToken(u);

//       await saveRefreshToken(accessToken, refreshToken, user._id);
//     }

//     const accessRights = await AccessRight.find({ userId: user._id }, { projectId: 1, entitlementId: 1, group: 1 }).exec();
//     console.log(accessRights, "accessrights from ")
//     return {
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         access: accessRights,
//         profilePicture: user.profilePicture,
//       },
//       accessToken: accessToken,
//       refreshToken: refreshToken,
//     };
//   } catch (error) {
//     console.error("Error in login:", error);
//     throw error;
//   }
// }

// export async function login(email, password) {
//   try {
//     const user = await User.findOne({ email: email, isActive: true }).exec();

//     if (!user) {
//       return null;
//     }

//     const isMatch = await user.comparePassword(password);

//     if (!isMatch) {
//       count++;
//       if (count === config.loginAttemptCount) {
//         isLocked = true;
//       }
//       return null; 
//     }

//     const existingToken = await Token.create({ userId: user._id }).exec();
//     let accessToken, refreshToken;

//     if (existingToken) {
//       accessToken = existingToken.accessToken;
//       refreshToken = existingToken.refreshToken;
//     } else {
//       const u = {
//         _id: user._id,
//         name: user.name,
//         role: user.role,
//         profilePicture: user.profilePicture,
//       };

//       accessToken = generateAccessToken(u);
//       refreshToken = generateRefreshToken(u);

//       await saveRefreshToken(accessToken, refreshToken, user._id);
//     }

//     const accessRights = await AccessRight.find({ userId: user._id }, { projectId: 1, entitlementId: 1, group: 1 }).exec();

//     return {
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         access: accessRights,
//         profilePicture: user.profilePicture,
//       },
//       accessToken: accessToken,
//       refreshToken: refreshToken,
//     };
//   } catch (error) {
//     console.error("Error in login:", error);
//     throw error;
//   }
// }
// export async function login(email, password) {
//   try {
//     const user = await User.findOne({ email: email, isActive: true }).exec();
//     console.log(user, "users from service ")
//     if (!user) {
//       return null;
//     }

//     const isMatch = await user.comparePassword(password);

//     if (!isMatch) {
//       count++;
//       if (count === config.loginAttemptCount) {
//         isLocked = true;
//       }
//       return null; 
//     }

//     // Query tokens associated with the user
//     const existingToken = await Token.findOne({ userId: user._id }).exec();
//     let accessToken, refreshToken;

//     if (existingToken) {
//       // If a token exists, use it
//       accessToken = existingToken.accessToken;
//       refreshToken = existingToken.refreshToken;
//     } else {
//       // If no token exists, generate new tokens
//       const u = {
//         _id: user._id,
//         name: user.name,
//         role: user.role,
//         // Access rights can be queried here if needed
//         profilePicture: user.profilePicture,
//       };

//       accessToken = generateAccessToken(u);
//       refreshToken = generateRefreshToken(u);

//       // Save refresh token
//       await saveRefreshToken(accessToken, refreshToken, user._id);
//     }

//     // Query access rights
//     const accessRights = await AccessRight.find({ userId: user._id }, { projectId: 1, entitlementId: 1, group: 1 }).exec();
//     console.log(accessRights, "access right ");

//     return {
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         access: accessRights,
//         profilePicture: user.profilePicture,
//       },
//       accessToken: accessToken,
//       refreshToken: refreshToken,
//     };
//   } catch (error) {
//     console.error("Error in login:", error);
//     throw error;
//   }
// }

export const forgotPassword = async (email) => {
  try {
    const token = await new Promise((resolve, reject) => {
      crypto.randomBytes(20, (err, buf) => {
        if (err) reject(err);
        else resolve(buf.toString("hex"));
      });
    });

    const user = await User.findOne({ email });
    

    if (!user) {
      return json({ err: errors.LOGIN_GENERAL_ERROR }, { status: 404 });
    }

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    const mailOptions = {
      to: user.email,
      from: config.from,
      subject: "Project Management System - Password Reset",
      html: `Hi, <br><br> You are receiving this because you (or someone else) have requested the reset of the password for your account.<br>
        Please click on the following link, or paste this into your browser to complete the process:<br>
        ${config.link}users/reset/${token}<br><br>
        If you did not request this, please ignore this email and your password will remain unchanged.<br><br> Thanks, <br> proPeak Team`,
    };

    const response = await sendEmail(mailOptions);

    if (response.response) {
      logInfo(
        response,
        `userController.forgotPassword - Error occurred while sending email to ${mailOptions.to}`
      );
    } else {
      logInfo(
        `taskController.forgotPassword - An e-mail has been sent to ${mailOptions.to} with further instructions.`
      );
      return json({
        msg: `An e-mail has been sent to ${mailOptions.to} with further instructions.`,
      });
    }
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    return json(
      { err: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
};

export async function resetPass(updatedPass) {
  try {
    const user = await User.findOne({ resetPasswordToken: updatedPass.token });

    if (!user) {
      return { err: "Invalid user" };
    } else if (user.resetPasswordExpires < Date.now()) {
      return { err: errors.RESET_EXPIRE };
    }

    user.password = updatedPass.password;
    if (user.isLocked === true) {
      user.isLocked = false;
    }
    if (user.password !== updatedPass.confirmPassword) {
      return { err: errors.PASSWORDS_DONT_MATCH };
    } else {
      const result = await user.save();
      return {
        success: true,
        msg: "Successfully updated!",
        result: {
          _id: result._id,
          name: result.name,
          role: result.role,
          email: result.email,
          companyId: result.companyId,
        },
      };
    }
  } catch (error) {
    console.error("Error in resetPass service:", error);
    throw new Error("An error occurred while processing your request");
  }
}

export const changePassword = async ({ request }) => {
  try {
    const { newPassword, newConfirmPassword } = await request.json();
    const userId = request.locals.user.id; // Assuming you have user information available in request.locals.user

    const user = await User.findById(userId);
    if (!user) {
      return json({ err: "Invalid user" });
    }

    user.password = newPassword;

    if (user.password !== newConfirmPassword) {
      return json({ err: "Passwords don't match" });
    }

    await user.save();

    return json({
      success: true,
      msg: "Password updated successfully",
      result: {
        _id: user._id,
        name: user.name,
        role: user.role,
        email: user.email,
        companyId: user.companyId,
      },
    });
  } catch (error) {
    console.error("Error in changePassword:", error);
    return json({ err: "Internal server error" }, { status: 500 });
  }
};

export const logout = async ({ request }) => {
  try {
    const token = request.headers.get(ACCESS_TOKEN);
    return json({
      success: true,
      msg: "Token deleted",
      token: "",
      refreshToken: "",
    });
  } catch (error) {
    console.error("Error in logout:", error);
    return json({ err: "Internal server error" }, { status: 500 });
  }
};
