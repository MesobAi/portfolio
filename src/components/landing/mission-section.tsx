import { Rocket, Target, Telescope } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Profile } from "@/db/schema";
import { Reveal } from "@/components/reveal";
import { Section, StaggerGrid, StaggerItem } from "@/components/landing/section-shell";

function MissionCard({
  Icon,
  label,
  text,
}: {
  Icon: LucideIcon;
  label: string;
  text: string;
}) {
  return (
    <StaggerItem className="flex h-full flex-col rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-card/70">
      <div className="mb-4 flex size-10 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
        <Icon className="size-5 text-primary" />
      </div>
      <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">
        {label}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground sm:text-base">
        {text}
      </p>
    </StaggerItem>
  );
}

export function MissionSection({ profile }: { profile: Profile }) {
  return (
    <Section
      id="mission"
      eyebrow="Mission & vision"
      title="Where this is going"
      description="Learn, build and grow — starting here, then across Africa."
    >
      <Reveal>
        <div>
          <StaggerGrid className="grid gap-5 md:grid-cols-3">
            <MissionCard Icon={Target} label="Mission" text={profile.mission} />
            <MissionCard Icon={Telescope} label="3-year vision" text={profile.vision} />
            <MissionCard Icon={Rocket} label="Startup" text={profile.startup} />
          </StaggerGrid>
        </div>
      </Reveal>
    </Section>
  );
}
