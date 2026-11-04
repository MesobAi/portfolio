"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ensureAdmin } from "@/lib/data";
import { auth } from "@/lib/auth";

/**
 * Login page loader: provisions the single admin account from env vars on
 * first visit, then verifies the existing session.
 */
export async function loadLoginContext() {
  try {
    await ensureAdmin();
  } catch (error) {
    console.error("[auth] failed to provision admin account:", error);
  }

  let authed = false;
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    authed = !!session && session.user.email === process.env.ADMIN_EMAIL;
  } catch {
    authed = false;
  }

  if (authed) redirect("/admin");
  return { authed };
}
