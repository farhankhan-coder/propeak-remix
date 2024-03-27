// auth.ts
import { createCookieSessionStorage } from "@remix-run/node";

const { getSession, commitSession, destroySession } = createCookieSessionStorage({
  cookie: {
    name: "__session",
    domain: "example.com", // Replace with your domain
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 1 week in seconds
    path: "/",
    sameSite: "lax",
    secrets: ["your-session-secret"],
    secure: process.env.NODE_ENV === "production",
  },
});

export const Auth = {
  async getUserInfo(request) {
    const session = await getSession(request.headers.get("Cookie"));
    return session.get("userInfo") || null;
  },

  async setUserInfo(userInfo, request) {
    const session = await getSession(request.headers.get("Cookie"));
    session.set("userInfo", userInfo);
    await commitSession(session);
  },

  async clearUserInfo(request) {
    const session = await getSession(request.headers.get("Cookie"));
    session.unset("userInfo");
    await commitSession(session);
  },

  async getToken(request) {
    const session = await getSession(request.headers.get("Cookie"));
    return session.get("accessToken") || null;
  },

  async setToken(token, request) {
    const session = await getSession(request.headers.get("Cookie"));
    session.set("accessToken", token);
    await commitSession(session);
  },

  async clearToken(request) {
    const session = await getSession(request.headers.get("Cookie"));
    session.unset("accessToken");
    await commitSession(session);
  },
};

export default Auth;










// import { Authenticator, AuthorizationError} from "remix-auth";
// import { sessionStorage } from "~/routes/loginn/services/login-service";
// import { FormStrategy } from "remix-auth-form";
// import { getXataClient, UserRecord } from "./xata";
// import bcrypt from "bcryptjs";


// const authenticator= new Authenticator<UserRecord>(sessionStorage);
// const formStrategy=new FormStrategy(async ({form})=>{
//     const email =form.get("email")as String;
//     const password=form.get("password") as String

//     const xata =getXataClient();
//     const user=await xata.User.filter({email}).getFirst();
//     if (!user){
//         console.log("Email doesnot exist ")
//         throw new AuthorizationError();
//     }
//     const passwordMatch =await bcrypt.compare(password, user.password as String)
//     if(!passwordMatch){
//         throw new AuthorizationError();
//     }
//     return user; 
// })

// authenticator.use(formStrategy, "form")

// export {authenticator}