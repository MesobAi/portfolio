import type { Metadata } from "next";
import { Suspense } from "react";
import { loadLoginContext } from "./actions";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  await loadLoginContext();

  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden px-4">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, oklch(0.5 0 0 / 0.15), transparent)",
        }}
      />
      <div className="relative z-10 w-full max-w-sm rounded-xl border border-border/60 bg-card/60 p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in with the owner account to manage content.
          </p>
        </div>
        <Suspense fallback={<p className="text-center text-sm text-muted-foreground">Loading…</p>}>
          <LoginForm />
        </Suspense>
        <p className="mt-6 text-center font-mono text-xs text-muted-foreground">
          Credentials come from ADMIN_EMAIL / ADMIN_PASSWORD env vars.
        </p>
      </div>
    </div>
  );
}
