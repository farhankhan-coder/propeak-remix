// import { login } from '../Services/login/login-service';
// import { redirect } from '@remix-run/node';
// import { AuthorizationError } from 'remix-auth';
// import { REFRESH_TOKEN } from "../common/const"; // Assuming REFRESH_TOKEN is imported from "../common/const"

// async function authenticate(request, session, headers = new Headers()) {
//   try {
//     let accessToken = session.get("accessToken");

//     if (!accessToken) {
//       // Redirect to login if no access token is found
//       throw redirect("/login");
//     }

//     if (new Date(session.get("expirationDate")) < new Date()) {
//       throw new AuthorizationError("Expired");
//     }

//     return accessToken;
//   } catch (error) {
//     if (error instanceof AuthorizationError) {
//       // If authorization error, refresh token
//       try {
//         const { accessToken, refreshToken, expirationDate } = await refreshToken(session.get("refreshToken")); // Use refreshToken instead of REFRESH_TOKEN

//         // Update session with new values
//         session.set("accessToken", accessToken);
//         session.set("refreshToken", refreshToken);
//         session.set("expirationDate", expirationDate);

//         // Commit the session and append Set-Cookie header
//         headers.append("Set-Cookie", await commitSession(session)); // Assuming commitSession is imported properly

//         // Redirect to the same URL if the request was a GET
//         if (request.method === "GET") {
//           throw redirect(request.url, { headers });
//         }

//         // Return the access token
//         return accessToken;
//       } catch (refreshError) {
//         // Handle refresh token error
//         throw redirect("/login"); // Redirect to login page
//       }
//     }

//     // Throw any other unexpected errors
//     throw error;
//   }
// }

// // Modified authenticate function to incorporate login logic
// export async function authenticateAndLogin(request, session, headers = new Headers()) {
//   try {
//     // Call existing authenticate function
//     return await authenticate(request, session, headers);
//   } catch (error) {
//     // If not authenticated, attempt login
//     if (error instanceof redirect && error.url === "/login") {
//       const { email, password } = JSON.parse(request.body);

//       try {
//         // Call login function
//         const loginResult = await login(email, password);

//         if (loginResult) {
//           // Successful login, return access token
//           return loginResult.accessToken;
//         } else {
//           // Invalid credentials, redirect to login page
//           throw redirect("/login");
//         }
//       } catch (loginError) {
//         // Handle login error
//         throw redirect("/login");
//       }
//     }

//     // Throw any other unexpected errors
//     throw error;
//   }
// }




// working....
import jwt from 'jsonwebtoken';
import secret from '../config/secret';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../common/const';
import { generateAccessToken } from './token-management';
import { isValidRefreshToken } from "../Services/token/token-service";
import { json } from '@remix-run/node';

export  async function verifyToken({ request, response }, next) {
  // Check if the request object is defined and contains the headers property
  if (!request || !request.headers) {
    return json({ auth: false, message: 'Invalid request object.' }, { status: 400 });
  }

  const token = request.headers.get(ACCESS_TOKEN) || request.headers.get(ACCESS_TOKEN.toLowerCase());
  const refreshToken = request.headers.get(REFRESH_TOKEN) || request.headers.get(REFRESH_TOKEN.toLowerCase());

  if (!token || !refreshToken) {
    return json({ auth: false, message: 'No token provided.' }, { status: 403 });
  }

  const validRefreshToken = await isValidRefreshToken(refreshToken);

  if (!validRefreshToken) {
    return json({ auth: false, message: 'Not valid token.' }, { status: 403 });
  }

  jwt.verify(token, secret.secret, async function (err, decoded) {
    if (err) {
      if (err.name === "TokenExpiredError") {
        jwt.verify(refreshToken, secret.secretRefreshToken, function (err, decoded) {
          if (err) {
            return json({ error: true, auth: false, message: 'Token Expired Error' }, { status: 403 });
          }

          const u = decoded.user;
          const newToken = generateAccessToken(u);
          updateRequest(request, response, decoded, newToken, refreshToken);
          next();
        });
      } else {
        return json({ error: true, auth: false, message: 'Failed to authenticate token.' }, { status: 403 });
      }
    } else {
      updateRequest(request, response, decoded, token, refreshToken);
      next();
    }
  });
}

function updateRequest(request, response, decoded, token, refreshToken) {
  
  request.locals.user = {
    _id: decoded._id,
    name: decoded.name,
    role: decoded.role,
    access: decoded.access
  };

  response.headers.set(ACCESS_TOKEN, token);
  response.headers.set(REFRESH_TOKEN, refreshToken);
}







// // authMiddleware.js

// import jwt from 'jsonwebtoken';
// import secret from '../config/secret';
// import { ACCESS_TOKEN, REFRESH_TOKEN } from '../common/const';
// import { generateAccessToken } from './token-management';
// import { isValidRefreshToken } from "../Services/token/token-service";
// import { json } from '@remix-run/node';

// export const verifyToken = async ({ request, response }, next) => {
//   const token = request.headers.get(ACCESS_TOKEN) || request.headers.get(ACCESS_TOKEN.toLowerCase());
//   const refreshToken = request.headers.get(REFRESH_TOKEN) || request.headers.get(REFRESH_TOKEN.toLowerCase());

//   if (!token || !refreshToken) {
//     return json({ auth: false, message: 'No token provided.' }, { status: 403 });
//   }

//   const validRefreshToken = await isValidRefreshToken(refreshToken);

//   if (!validRefreshToken) {
//     return json({ auth: false, message: 'Not valid token.' }, { status: 403 });
//   }

//   jwt.verify(token, secret.secret, async function (err, decoded) {
//     if (err) {
//       if (err.name === "TokenExpiredError") {
//         jwt.verify(refreshToken, secret.secretRefreshToken, function (err, decoded) {
//           if (err) {
//             return json({ error: true, auth: false, message: 'Token Expired Error' }, { status: 403 });
//           }

//           const u = decoded.user;
//           const newToken = generateAccessToken(u);
//           updateRequest(request, response, decoded, newToken, refreshToken);
//           next();
//         });
//       } else {
//         return json({ error: true, auth: false, message: 'Failed to authenticate token.' }, { status: 403 });
//       }
//     } else {
//       updateRequest(request, response, decoded, token, refreshToken);
//       next();
//     }
//   });
// };

// function updateRequest(request, response, decoded, token, refreshToken) {
//   request.locals.user = {
//     _id: decoded._id,
//     name: decoded.name,
//     role: decoded.role,
//     access: decoded.access
//   };

//   response.headers.set(ACCESS_TOKEN, token);
//   response.headers.set(REFRESH_TOKEN, refreshToken);
// }









// // import jwt from 'jsonwebtoken';
// // import secret from '../config/secret';
// // import { ACCESS_TOKEN, REFRESH_TOKEN } from '../common/const';
// // import { generateAccessToken, generateRefreshToken } from './token-management';
// // import { isValidRefreshToken } from "../Services/token/token-service";

// // async function verifyToken(req, res, next) {
// //   const token = req.headers[ACCESS_TOKEN] || req.headers[ACCESS_TOKEN.toLowerCase()];
// //   const refreshToken = req.headers[REFRESH_TOKEN] || req.headers[REFRESH_TOKEN.toLowerCase()];
// //   let statusCode = 201;

// //   if (!token || !refreshToken) {
// //     return res.status(403).json({ auth: false, message: 'No token provided.' });
// //   }

// //   const validRefreshToken = await isValidRefreshToken(refreshToken);

// //   if (!validRefreshToken) {
// //     return res.status(403).json({ auth: false, message: 'Not valid token.' });
// //   }

// //   jwt.verify(token, secret.secret, async function (err, decoded) {
// //     if (err) {
// //       if (err.name === "TokenExpiredError") {
// //         jwt.verify(refreshToken, secret.secretRefreshToken, function (err, decoded) {
// //           if (err) {
// //             statusCode = 403;
// //             return res.status(statusCode).json({ error: true, auth: false, message: 'Token Expired Error' });
// //           }

// //           const u = decoded.user;
// //           const newToken = generateAccessToken(u);
// //           updateRequest(req, res, decoded, newToken, refreshToken);
// //           next();
// //         });
// //       } else {
// //         statusCode = 403;
// //         return res.status(statusCode).json({ error: true, auth: false, message: 'Failed to authenticate token.' });
// //       }
// //     } else {
// //       updateRequest(req, res, decoded, token, refreshToken);
// //       next();
// //     }
// //   });
// // }

// // function updateRequest(req, res, decoded, token, refreshToken) {
// //   req.userId = decoded._id;
// //   req.userName = decoded.name;
// //   req.userRole = decoded.role;
// //   req.userAccess = decoded.access;

// //   req.userInfo = {
// //     userId: decoded._id,
// //     userName: decoded.name,
// //     userRole: decoded.role,
// //     userAccess: decoded.access
// //   };

// //   res.setHeader(ACCESS_TOKEN, token);
// //   res.setHeader(REFRESH_TOKEN, refreshToken);
// // }

// // export default verifyToken;







// // // import jwt from 'jsonwebtoken';
// // // import secret from '../config/secret';
// // // import { ACCESS_TOKEN, REFRESH_TOKEN } from '../common/const';
// // // import { generateAccessToken } from './token-management';
// // // import { isValidRefreshToken } from "../Services/token/token-service";

// // // async function verifyToken(req, res, next) {
// // //   const token = req.headers[ACCESS_TOKEN] || req.headers[ACCESS_TOKEN.toLowerCase()];
// // //   const refreshToken = req.headers[REFRESH_TOKEN] || req.headers[REFRESH_TOKEN.toLowerCase()];

// // //   if (!token || !refreshToken) {
// // //     return res.status(403).json({ auth: false, message: 'No token provided.' });
// // //   }

// // //   try {
// // //     const refreshIsValid = await isValidRefreshToken(refreshToken);
// // //     if (!refreshIsValid) {
// // //       return res.status(403).json({ auth: false, message: 'Not valid refresh token.' });
// // //     }

// // //     jwt.verify(token, secret.secret, async function (err, decoded) {
// // //       if (err) {
// // //         if (err.name === "TokenExpiredError") {
// // //           jwt.verify(refreshToken, secret.secretRefreshToken, function (err, decoded) {
// // //             if (err) {
// // //               return res.status(403).json({ error: true, auth: false, message: 'Token Expired Error' });
// // //             }

// // //             const u = decoded.user;
// // //             const newToken = generateAccessToken(u);
// // //             updateRequest(req, res, decoded, newToken, refreshToken);
// // //             next();
// // //           });
// // //         } else {
// // //           return res.status(403).json({ error: true, auth: false, message: 'Failed to authenticate token.' });
// // //         }
// // //       } else {
// // //         updateRequest(req, res, decoded, token, refreshToken);
// // //         next();
// // //       }
// // //     });
// // //   } catch (error) {
// // //     return res.status(500).json({ error: true, message: 'Internal Server Error' });
// // //   }
// // // }

// // // function updateRequest(req, res, decoded, token, refreshToken) {
// // //   req.userId = decoded._id;
// // //   req.userName = decoded.name;
// // //   req.userRole = decoded.role;
// // //   req.userAccess = decoded.access;

// // //   req.userInfo = {
// // //     userId: decoded._id,
// // //     userName: decoded.name,
// // //     userRole: decoded.role,
// // //     userAccess: decoded.access
// // //   };
// // //   res.setHeader(ACCESS_TOKEN, token);
// // //   res.setHeader(REFRESH_TOKEN, refreshToken);
// // // }

// // // export default verifyToken;
