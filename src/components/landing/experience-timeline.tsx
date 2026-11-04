import { Briefcase } from "lucide-react";
import type { ExperienceEntry } from "@/db/schema";
import { EmptyState, Section } from "@/components/landing/section-shell";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";

function formatMonth(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
}

export function ExperienceTimeline({ items }: { items: ExperienceEntry[] }) {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where I've built"
      description="Backend work, full-stack features, and products shipped with real teams."
    >
      {items.length === 0 ? (
        <EmptyState>No experience entries published yet — check back soon.</EmptyState>
      ) : (
        <ol className="relative ml-3 border-l border-border/60 sm:ml-4">
          {items.map((entry, i) => (
            <li key={entry.id} className="relative pb-10 last:pb-0">
              <Reveal delay={Math.min(i * 0.05, 0.2)}>
                <span className="absolute -left-[26px] sm:-left-[30px] flex size-6 items-center justify-center rounded-full border border-primary/40 bg-background">
                  <Briefcase className="size-3 text-primary" />
                </span>
                <div className="ml-6 rounded-xl border border-border/60 bg-card/40 p-5 backdrop-blur-sm transition-all hover:border-primary/40 sm:ml-8 sm:p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-lg font-semibold">
                      {entry.role} <span className="text-primary">·</span>{" "}
                      <span className="text-primary">{entry.company}</span>
                    </h3>
                    <time className="font-mono text-sm text-muted-foreground">
                      {formatMonth(entry.startDate)} — {entry.endDate ? formatMonth(entry.endDate) : "Present"}
                    </time>
                  </div>
                  {entry.location && (
                    <p className="mt-1 text-sm text-muted-foreground">{entry.location}</p>
                  )}
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {entry.description}
                  </p>
                  {entry.techTags.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {entry.techTags.map((tag) => (
                        <li key={tag}>
                          <Badge variant="secondary" className="font-medium">
                            {tag}
                          </Badge>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      )}
    </Section>
  );
}
