import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { db } from "@/db";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg" }),
  baseURL: process.env.BETTER_AUTH_URL ?? "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET ?? "dev-only-secret-change-me-please-32chars-min",
  emailAndPassword: {
    enabled: true,
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      // Only the single admin account may sign up; everyone else is rejected.
      if (ctx.path === "/sign-up/email") {
        if (ctx.body.email !== process.env.ADMIN_EMAIL) {
          throw new APIError("FORBIDDEN", {
            message: "Sign up is limited to the site owner.",
          });
        }
      }
    }),
  },
});

export type Session = typeof auth.$Infer.Session;
