// import { login } from "../../Services/login/login-service";
// import { redirect } from "@remix-run/react";
// import { json,setCookie } from "@remix-run/node";
// import Login from "../../Components/login/components/login";
// export default function LoginForm() {
//   return (
//     <div>
//       {/* Your login form component */}
//       <Login />
//     </div>
//   );
// }

// export const action = async ({ request, response }) => {
//   try {
//     // Parse form data from the request
//     const form = new URLSearchParams(await request.text());
//     const email = form.get("email");
//     const password = form.get("password");

//     // Call your login function with email and password
//     const user = await login(email, password);

//     // If login is successful, set session cookies and redirect
//     if (user) {
//       response.setHeader("Set-Cookie", `accessToken=${user.accessToken}; HttpOnly`);
//       response.setHeader("Set-Cookie", `refreshToken=${user.refreshToken}; HttpOnly`);
      
//       // Log the cookies
//       console.log("Access Token:", user.accessToken);
//       console.log("Refresh Token:", user.refreshToken);

//       return redirect("/category");
//     } else {
//       // If login fails, return an error response
//       return json({ error: "Invalid email or password" }, { status: 401 });
//     }
//   } catch (error) {
//     // Handle errors
//     console.error("Error in login action:", error);
//     return json({ error: "An error occurred during login" }, { status: 500 });
//   }
// };



import Login from "../../Components/login/components/login";
// import { login } from "../../Components/login/services/login-service";
import {login } from "../../Services/login/login-service"
import { redirect } from "@remix-run/react";
import { json } from "@remix-run/node"; // Import json f responses
// import { getSession } from "@remix-run/react";


export default function LoginForm() {
  return (
    <div>
      <Login />
    </div>
  );
}
export const action = async ({ request }) => {
  try {
    const form = new URLSearchParams(await request.text());
    const email = form.get("email");
    const password = form.get("password");

    const user = await login(email, password);
    console.log(user, "users");
    // if (user || user.token || user.refreshToken) {
    //   console.log("Login successful!");
    //   console.log("Access token:", user.token);
    //   console.log("Refresh token:", user.refreshToken);
    // } else {
    //   console.log("Login failed or tokens were not generated.");
    //   return json({ error: "Login failed" }, { status: 401 });
    // }
    if (!user) {
      return json({ error: "Invalid email or password" }, { status: 401 });
    }
    return redirect("/");
  } catch (error) {
    console.error("Error in login action:", error);
    return json({ error: "An error occurred during login" }, { status: 500 });
  }
};
