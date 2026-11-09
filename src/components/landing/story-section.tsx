import type { Profile } from "@/db/schema";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/landing/section-shell";
import { Badge } from "@/components/ui/badge";

export function StorySection({ profile }: { profile: Profile }) {
  return (
    <Section
      id="story"
      eyebrow="My story"
      title="How I got here"
      description="Self-taught in spirit — from curiosity about how apps work to building the systems behind them."
    >
      <Reveal>
        <div className="grid gap-8 rounded-2xl border border-border/60 bg-card/40 p-6 backdrop-blur-sm sm:p-8 lg:grid-cols-[1fr_16rem]">
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            {profile.story}
          </p>

          <div className="border-border/60 lg:border-l lg:pl-6">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">
              In three words
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {profile.traits.map((trait) => (
                <li key={trait}>
                  <Badge variant="secondary" className="font-medium">
                    {trait}
                  </Badge>
                </li>
              ))}
            </ul>

            <p className="mt-6 font-mono text-xs font-semibold uppercase tracking-widest text-primary">
              Based in
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{profile.location}</p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
