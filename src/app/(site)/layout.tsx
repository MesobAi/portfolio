import type { ReactNode } from "react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/landing/site-footer";
import { HashScroll } from "@/components/hash-scroll";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-svh flex-col">
      <SiteNav />
      <HashScroll />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
