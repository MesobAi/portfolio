import Link from "next/link";
import { ArrowRight, FlaskConical } from "lucide-react";
import type { ResearchItem } from "@/db/schema";
import { EmptyState, Section, StaggerGrid, StaggerItem } from "@/components/landing/section-shell";
import { Badge } from "@/components/ui/badge";

export function ResearchSection({ items }: { items: ResearchItem[] }) {
  return (
    <Section
      id="research"
      eyebrow="Research"
      title="Experiments & write-ups"
      description="Areas I'm actively researching, prototyping, and documenting. Click any card to dig deeper."
    >
      {items.length === 0 ? (
        <EmptyState>No research items published yet — check back soon.</EmptyState>
      ) : (
        <StaggerGrid className="grid gap-5 md:grid-cols-2">
          {items.map((item) => {
            const href = item.slug ? `/research/${item.slug}` : "#research";
            return (
              <StaggerItem
                key={item.id}
                className="article-card group relative rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:bg-card/70"
              >
                <Link
                  href={href}
                  aria-label={`Read about ${item.title}`}
                  className="absolute inset-0 z-10"
                />
                <div className="mb-4 flex size-10 items-center justify-center rounded-lg border border-accent/30 bg-accent/10">
                  <FlaskConical className="size-5 text-accent" />
                </div>
                <h3 className="text-lg font-semibold transition-colors group-hover:text-accent">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
                {item.tags.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <li key={tag}>
                        <Badge variant="secondary" className="text-xs font-medium">
                          {tag}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                )}
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                  Read more
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </StaggerItem>
            );
          })}
        </StaggerGrid>
      )}
    </Section>
  );
}
