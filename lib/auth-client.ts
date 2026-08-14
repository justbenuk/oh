import { nextCookies } from "better-auth/next-js";
import { createAuthClient } from "better-auth/react";

const baseURL = process.env.BETTER_AUTH_URL ?? (process.env.NODE_ENV === "production" ? "https://operatorhub.app" : "http://localhost:3000");

export const authClient = createAuthClient({
  baseURL,
  plugins: [nextCookies()],
});
