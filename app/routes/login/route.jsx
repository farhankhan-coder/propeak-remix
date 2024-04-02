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
import { login } from "../../Services/login/login-service";
import { redirect, useActionData, useLoaderData } from "@remix-run/react";
import { json, createCookieSessionStorage } from "@remix-run/node"; // Import json f responses
import { createUserSession } from "../../Services/session";
// import { Session } from "@remix-run/node/dist";
// import { Session } from 'remix';
// import { createCookieSessionStorage } from 'remix';
// import { Session, createCookieSessionStorage } from '@remix-run/node';

export default function LoginForm() {
  const actionData = useLoaderData();
  console.log(666666, actionData);

  return (
    <div>
      <Login actionData={actionData} />
    </div>
  );
}

// const sessionStorage = createCookieSessionStorage({
//   cookie: {
//     name: '__session',
//     secrets: ['your-secret-key'],
//     sameSite: 'lax',
//     path: '/',
//     httpOnly: true,
//     // secure: process.env.NODE_ENV === 'production',
//     maxAge: 60 * 60 * 24 * 30, // 30 days
//   },
// });

// user should be stroed in session using given remix code


export const action = async ({ request, session }) => {
  try {
    const form = new URLSearchParams(await request.text());
    const email = form.get("email");
    const password = form.get("password");

    const user = await login(email, password);
    console.log(141414, user);

    if (!user) {
      return json({ error: "Invalid email or password" }, { status: 401 });
    }

    return createUserSession(user, "/");
    // session.setItem("userData", JSON.stringify(user));

    // session.set({"user": user});

    // const sessionData = new Session({ userId: user.id });

    // return redirect('/')
    // return json(
    //   { data: user },
    //   {
    //     headers: {
    //       "Set-Cookie": await sessionStorage.commit(sessionData),
    //       Location: "/", // Redirect to the home page
    //     },
    //     status: 303, // Use 303 status code for redirection after a POST request
    //   }
    // );
  } catch (error) {
    console.error("Error in login action:", error);
    return json({ error: "An error occurred during login" }, { status: 500 });
  }
};

// import { json, redirect } from "@remix-run/node"; // or cloudflare/deno
// import { useLoaderData } from "@remix-run/react";
// import Login from "../../Components/login/components/login";
// import { getSession, commitSession } from "../../sesion";
// import { login } from "../../Services/login/login-service";

// export async function loader({
//   request,
// }) {
//   const session = await getSession(
//     request.headers.get("Cookie")
//   );

//   if (session.has("userId")) {
//     // Redirect to the home page if they are already signed in.
//     return redirect("/");
//   }

//   const data = { error: session.get("error") };

//   return json(data, {
//     headers: {
//       "Set-Cookie": await commitSession(session),
//     },
//   });
// }

// export async function action({
//   request,
// }) {
//   const session = await getSession(
//     request.headers.get("Cookie")
//   );
//   const form = await request.formData();
//   const email = form.get("username");
//   const password = form.get("password");

//   const user = await login(email, password);
//   console.log(2121212, user);

//   if (user == null) {
//     session.flash("error", "Invalid username/password");

//     // Redirect back to the login page with errors.
//     return redirect("/", {
//       headers: {
//         "Set-Cookie": await commitSession(session),
//       },
//     });
//   }

//   session.set("userId", user);

//   // Login succeeded, send them to the home page.
//   return redirect("/", {
//     headers: {
//       "Set-Cookie": await commitSession(session),
//     },
//   });
// }

// export default function LoginForm() {
//   const { error } = useLoaderData();

//   return (
// <Login error={error} />  );
// }
