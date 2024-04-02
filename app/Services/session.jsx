import { createCookieSessionStorage } from "@remix-run/node";
import secrets from "../config/secret";
import { redirect } from "@remix-run/node";
const sessionSecret = secrets.secret;
console.log("session secret is:", sessionSecret);
if (!sessionSecret) {
  throw new Error("No session secret");
}

const storage = createCookieSessionStorage({
  cookie: {
    name: "CalendarSession",
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
    httpOnly: true,
  },
});
export async function createUserSession(userId, redirectTo) {
  const session = await storage.getSession();
  session.set("userId", userId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}

export function getUserSession(request) {
  return storage.getSession(request.headers.get("Cookie"));
}

export async function getUser(request) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId) {
    return null;
  }

  try {
    const user = await db.user.findUnique({ where: { id: parseInt(userId) } });
    return user;
  } catch (error) {
    return null;
  }
}
export async function logout(request) {
  const session = await storage.getSession(request.headers.get("Cookie"));
  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}
