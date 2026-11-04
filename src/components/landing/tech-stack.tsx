import { Section, StaggerGrid, StaggerItem } from "@/components/landing/section-shell";

const groups = [
  { label: "Languages", items: ["Go", "Python", "TypeScript", "SQL"] },
  { label: "APIs & Architecture", items: ["GraphQL", "REST", "Microservices"] },
  { label: "Frontend", items: ["React", "Next.js", "Solid.js", "Tailwind"] },
  { label: "Infra & DevOps", items: ["Docker", "Linux", "AWS"] },
  { label: "Databases", items: ["PostgreSQL", "Neon", "Supabase"] },
  { label: "AI", items: ["LLMs", "RAG", "OpenAI", "Claude", "DeepSeek APIs"] },
];

export function TechStack() {
  return (
    <Section
      id="stack"
      eyebrow="Tech Stack"
      title="Tools I use to ship"
      description="A backend-first stack with just enough frontend to bring products to life."
    >
      <StaggerGrid className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <StaggerItem
            key={group.label}
            className="rounded-xl border border-border/60 bg-card/40 p-5 backdrop-blur-sm transition-colors hover:border-primary/40"
          >
            <h3 className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-primary">
              {group.label}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-border/60 bg-background/60 px-2.5 py-1 text-sm text-foreground/90"
                >
                  {item}
                </li>
              ))}
            </ul>
          </StaggerItem>
        ))}
      </StaggerGrid>
    </Section>
  );
}
