import ResetPassword from "../../Components/login/components/reset-password";
import { json } from "@remix-run/node";
import { getToken } from "../../Services/token/token-service";
import Auth from "../../utils/auth";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ request }) => {
  try {
    if (typeof localStorage !== 'undefined') {
      const token = await getToken();
      const auth = Auth.getToken();
      console.log(auth, "auth")
      return json({ token, auth }); // Return the data as JSON
    } else {
      return json({ error: "localStorage is not available" }, { status: 500 });
    }
  } catch (error) {
    console.error("Error in loader:", error);
    return json({ error: "An error occurred while loading data" }, { status: 500 });
  }
};

export default function resetPasswordRoute() {
  const { token, auth } = useLoaderData();
  return (
    <div>
      <ResetPassword token={token} auth={auth} />
    </div>
  );
}

export const action = async ({ request }) => {
  try {
    const formData = await request.formData();
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const token = formData.get("token");
    console.log(token, "token ");
    console.log(formData, "formData ")
    if (!password || !confirmPassword || !token) {
      return json({ error: "Missing required fields" }, { status: 400 });
    }
    const resetResult = await resetpassservice.resetPass({
      password,
      confirmPassword,
      token,
    });

    if (resetResult.err) {
      return json({ error: resetResult.err }, { status: 400 });
    } else {
      return json({ message: resetResult.msg });
    }
  } catch (error) {
    console.error("Error in reset password action:", error);
    return json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
};