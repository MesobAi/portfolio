import Link from "next/link";
import { SocialLinks } from "@/components/landing/social-links";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background/80">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-10 sm:flex-row sm:px-6">
        <div className="text-center sm:text-left">
          <Link href="/" className="font-mono text-base font-bold">
            nd<span className="text-primary">.</span>dev
          </Link>
          <p className="mt-1 text-sm text-muted-foreground">
            © {2026} Nebiyou Daniel — Addis Ababa, Ethiopia
          </p>
        </div>
        <p className="font-mono text-sm text-muted-foreground">
          <span className="text-primary">&gt;</span> Learn More. Build Better.
        </p>
        <SocialLinks className="!gap-3" />
      </div>
    </footer>
  );
}
