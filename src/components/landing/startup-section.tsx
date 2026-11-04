import { Rocket } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/landing/section-shell";
import { Badge } from "@/components/ui/badge";

export function StartupSection() {
  return (
    <Section
      id="startup"
      eyebrow="What's next"
      title="Building a startup"
    >
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 via-card/50 to-secondary/40 p-6 backdrop-blur-sm sm:p-10">
          <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-primary/20 blur-3xl" aria-hidden="true" />
          <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/30">
            <Rocket className="size-6" />
          </div>
          <h3 className="text-xl font-semibold sm:text-2xl">
            A mobile platform connecting local businesses with local people
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            A product that helps neighborhood businesses get discovered by the people living
            around them — directories, real-world promotion, and a direct channel that big
            marketplaces ignore. In active design and development.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {["Discovery", "Local commerce", "Mobile-first"].map((tag) => (
              <li key={tag}>
                <Badge variant="secondary" className="font-medium">
                  {tag}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
