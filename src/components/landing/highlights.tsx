import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  Code2,
  Compass,
  Coffee,
  CreditCard,
  Headphones,
  Hand,
  Search,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import type { Highlight } from "@/db/schema";
import { Section, StaggerGrid, StaggerItem } from "@/components/landing/section-shell";

function HighlightCard({
  item,
  Icon,
}: {
  item: Highlight;
  Icon: LucideIcon;
}) {
  return (
    <StaggerItem className="group flex h-full flex-col rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:bg-card/70">
      <div className="mb-4 flex size-10 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
        <Icon className="size-5 text-primary" />
      </div>
      <h3 className="text-lg font-semibold transition-colors group-hover:text-accent">
        {item.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {item.description}
      </p>
      {item.linkHref && (
        <Link
          href={item.linkHref}
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent"
        >
          {item.linkLabel || "Learn more"}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </StaggerItem>
  );
}

function HighlightGrid({
  items,
  icons,
  columns = 3,
}: {
  items: Highlight[];
  icons: LucideIcon[];
  columns?: 2 | 3;
}) {
  return (
    <StaggerGrid
      className={
        columns === 2
          ? "grid gap-5 sm:grid-cols-2"
          : "grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      }
    >
      {items.map((item, index) => (
        <HighlightCard
          key={item.id}
          item={item}
          Icon={icons[index % icons.length] ?? Code2}
        />
      ))}
    </StaggerGrid>
  );
}

export function WhyIBuild({ items }: { items: Highlight[] }) {
  if (items.length === 0) return null;
  return (
    <Section
      id="why-i-build"
      eyebrow="Why I build"
      title="The problem came first"
      description="Every project started with something I could not understand, find, or use — so I built it."
    >
      <HighlightGrid items={items} icons={[Code2, CreditCard, Compass]} />
    </Section>
  );
}

export function HowIWork({ items }: { items: Highlight[] }) {
  if (items.length === 0) return null;
  return (
    <Section
      id="how-i-work"
      eyebrow="How I work"
      title="Principles I build by"
      description="How I approach the work beyond the code."
    >
      <HighlightGrid
        items={items}
        icons={[UserRound, Hand, Search, ShieldCheck]}
        columns={2}
      />
    </Section>
  );
}

export function Fuel({ items }: { items: Highlight[] }) {
  if (items.length === 0) return null;
  return (
    <Section
      id="fuel"
      eyebrow="Fuel"
      title="What keeps me going"
      description="The inputs behind the work — kept deliberately light."
    >
      <HighlightGrid items={items} icons={[Headphones, Compass, Coffee]} />
    </Section>
  );
}
