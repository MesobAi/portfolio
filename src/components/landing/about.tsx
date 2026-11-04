import { BrainCircuit, Database, ShieldCheck, Workflow } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/landing/section-shell";

const pillars = [
  {
    icon: Database,
    title: "Backend systems",
    text: "Go and Python services built for reliability — clean architecture, testing, and observability from day one.",
  },
  {
    icon: Workflow,
    title: "APIs & data pipelines",
    text: "REST and GraphQL layers, ingestion pipelines that clean and normalize messy real-world data.",
  },
  {
    icon: ShieldCheck,
    title: "Auth & database design",
    text: "Authentication, RBAC, multi-tenancy, and schema design that scales with the product.",
  },
  {
    icon: BrainCircuit,
    title: "AI-powered tools",
    text: "LLM integrations, RAG pipelines, and AI features shipped in open-source projects.",
  },
];

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="Systems that work in the real world"
      description="I build the parts users never see — and make sure they never fail. Backend engineering, database design, and AI-powered tooling, shipped through open source."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {pillars.map((pillar, i) => (
          <Reveal key={pillar.title} delay={i * 0.08}>
            <div className="group h-full rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-card/60">
              <pillar.icon className="mb-4 size-6 text-primary" />
              <h3 className="mb-2 text-lg font-semibold">{pillar.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{pillar.text}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <blockquote className="mt-10 rounded-xl border border-primary/25 bg-primary/5 p-6 sm:p-8">
          <p className="text-lg font-medium leading-relaxed sm:text-xl">
            <span className="text-primary">&ldquo;</span>
            The best way to learn engineering is to build, test, and improve real systems.
            <span className="text-primary">&rdquo;</span>
          </p>
          <footer className="mt-3 font-mono text-sm text-muted-foreground">— my philosophy</footer>
        </blockquote>
      </Reveal>
    </Section>
  );
}
