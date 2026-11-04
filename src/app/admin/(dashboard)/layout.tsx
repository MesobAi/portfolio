import type { ReactNode } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { SiteNav } from "@/components/site-nav";

/** Authoritative server-side guard for every /admin/* page. */
export default async function AdminLayout({ children }: { children: ReactNode }) {
  let authed = false;
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    authed = !!session && session.user.email === process.env.ADMIN_EMAIL;
  } catch {
    authed = false;
  }

  if (!authed) redirect("/admin/login");

  return (
    <div className="relative flex min-h-svh flex-col bg-muted/30">
      <SiteNav />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-16 pt-24 sm:px-6">{children}</main>
    </div>
  );
}
