import type { Metadata } from "next";
import { Newspaper } from "lucide-react";
import { getBuildLogPage } from "@/lib/data";
import { EmptyState, Section, StaggerGrid, StaggerItem } from "@/components/landing/section-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Build Log",
  description: "A running feed of project updates — what Nebiyou Daniel is building and shipping.",
};

function formatDate(iso: Date | string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default async function BuildLogPage() {
  const entries = await getBuildLogPage();

  return (
    <div className="pt-24">
      <Section
        id="build-log"
        eyebrow="Build Log"
        title="Project updates"
        description="Everything I'm building, testing, and shipping — newest first."
      >
        {entries.length === 0 ? (
          <EmptyState>No build log entries yet — come back soon.</EmptyState>
        ) : (
          <StaggerGrid className="grid gap-4 md:grid-cols-2">
            {entries.map((entry) => (
              <StaggerItem key={entry.id}>
                <article className="h-full rounded-xl border border-border/60 bg-card/40 p-5 backdrop-blur-sm transition-all hover:border-primary/40 sm:p-6">
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <Newspaper className="size-4 text-primary" />
                    <time dateTime={new Date(entry.createdAt).toISOString()}>
                      {formatDate(entry.createdAt)}
                    </time>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold">{entry.title}</h3>
                  <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                    {entry.content}
                  </p>
                  {entry.images && entry.images.length > 0 && (
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {entry.images.map((url, i) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          key={`${url}-${i}`}
                          src={url}
                          alt={`${entry.title} screenshot ${i + 1}`}
                          className="w-full rounded-lg border border-border/60 object-cover"
                        />
                      ))}
                    </div>
                  )}
                  {entry.tags.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {entry.tags.map((tag) => (
                        <li key={tag}>
                          <Badge variant="secondary" className="text-xs font-medium">
                            {tag}
                          </Badge>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              </StaggerItem>
            ))}
          </StaggerGrid>
        )}
        <div className="mt-10">
          <Button asChild variant="ghost">
            <Link href="/">
              <ArrowLeft className="size-4" /> Back home
            </Link>
          </Button>
        </div>
      </Section>
    </div>
  );
}
