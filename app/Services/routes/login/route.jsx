import Login from "../../Components/login/components/login";
import { login } from "../../Components/login/services/login-service";
import { redirect } from "@remix-run/react";
import { json } from "@remix-run/node"; // Import json from @remix-run/node for error responses

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
    if (user || user.accessToken || user.refreshToken) {
      console.log("Login successful!");
      console.log("Access token:", user.accessToken);
      console.log("Refresh token:", user.refreshToken);
    } else {
      console.log("Login failed or tokens were not generated.");
      return json({ error: "Login failed" }, { status: 401 });
    }
    if (!user) {
      return json({ error: "Invalid email or password" }, { status: 401 });
    }
    return redirect("/");
  } catch (error) {
    console.error("Error in login action:", error);
    return json({ error: "An error occurred during login" }, { status: 500 });
  }
};
