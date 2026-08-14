import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "./db";
import { admin } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";

const baseURL = process.env.BETTER_AUTH_URL ?? (process.env.NODE_ENV === "production" ? "https://operatorhub.app" : "http://localhost:3000");

export const auth = betterAuth({
  baseURL,
  trustedOrigins: [baseURL, "https://operatorhub.app", "https://www.operatorhub.app", "http://localhost:3000"],
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [admin(), nextCookies()],
});
