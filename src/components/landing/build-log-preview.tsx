import Link from "next/link";
import { ArrowRight, Newspaper } from "lucide-react";
import type { BuildLogEntry } from "@/db/schema";
import { EmptyState, Section, StaggerGrid, StaggerItem } from "@/components/landing/section-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function formatDate(iso: Date | string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export function BuildLogPreview({ items }: { items: BuildLogEntry[] }) {
  return (
    <Section
      id="build-log"
      eyebrow="Build Log"
      title="Latest updates"
      description="A running feed of what I'm building and shipping."
    >
      {items.length === 0 ? (
        <EmptyState>No build log entries yet — come back soon.</EmptyState>
      ) : (
        <>
          <StaggerGrid className="grid gap-4">
            {items.slice(0, 3).map((entry) => (
              <StaggerItem key={entry.id}>
                <article className="rounded-xl border border-border/60 bg-card/40 p-5 backdrop-blur-sm transition-all hover:border-primary/40 sm:p-6">
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <Newspaper className="size-4 text-primary" />
                    <time dateTime={new Date(entry.createdAt).toISOString()}>
                      {formatDate(entry.createdAt)}
                    </time>
                    {entry.tags.length > 0 && (
                      <ul className="flex flex-wrap gap-1.5">
                        {entry.tags.map((tag) => (
                          <li key={tag}>
                            <Badge variant="secondary" className="text-xs font-medium">
                              {tag}
                            </Badge>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <h3 className="mt-3 text-lg font-semibold">{entry.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {entry.content}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </StaggerGrid>
          <div className="mt-6 flex justify-center">
            <Button asChild variant="outline">
              <Link href="/build-log">
                View full build log <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </>
      )}
    </Section>
  );
}
