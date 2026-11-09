import Link from "next/link";
import { getProfile } from "@/lib/data";
import { SocialLinks } from "@/components/landing/social-links";

export async function SiteFooter() {
  const profile = await getProfile();

  return (
    <footer className="border-t border-border/60 bg-background/80">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {profile.motto && (
          <blockquote className="mb-8 text-center">
            <p className="text-base font-medium leading-relaxed text-foreground/90 sm:text-lg">
              <span className="text-primary">&ldquo;</span>
              {profile.motto}
              <span className="text-primary">&rdquo;</span>
            </p>
            {profile.mottoAttribution && (
              <cite className="mt-2 block font-mono text-xs not-italic text-muted-foreground">
                — {profile.mottoAttribution}
              </cite>
            )}
          </blockquote>
        )}

        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="text-center sm:text-left">
            <Link href="/" className="font-mono text-base font-bold">
              nd<span className="text-primary">.</span>dev
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">
              © {2026} {profile.fullName} — {profile.location}
            </p>
          </div>
          <p className="font-mono text-sm text-muted-foreground">
            <span className="text-primary">&gt;</span> {profile.tagline}
          </p>
          <SocialLinks className="!gap-3" />
        </div>
      </div>
    </footer>
  );
}
