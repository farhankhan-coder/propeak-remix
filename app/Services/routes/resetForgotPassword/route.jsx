import React from "react";
import { json } from "@remix-run/node";
import ResetForgotPassword from "../../Components/login/components/reset-forgot-password";
import { forgotPassword } from "../../Services/login/login-service";

export default function resetPasswordRoute() {
  return (
    <div>
      <ResetForgotPassword />
    </div>
  );
}
export const action = async ({ request }) => {
  try {
    const formData = await request.formData();
    const email = formData.get('useremail'); 
    console.log(email, "email")
    if (!email) {
      return json({ error: 'Email is missing' }, { status: 400 });
    }

    const response = await forgotPassword(email); 

    if (!response) {
      return json({ error: 'No response from forgotPassword function' }, { status: 500 });
    }

    if (response.err) {
      return json({ error: response.err }, { status: 404 });
    } else {
      return json({ message: response.msg });
    }
  } catch (error) {
    console.error("Error in forgotPassword action:", error);
    return json({ error: 'An error occurred while processing your request' }, { status: 500 });
  }
};

