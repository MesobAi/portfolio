import { GraduationCap } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/landing/section-shell";

const education = [
  {
    icon: GraduationCap,
    title: "Computer Science & JavaScript",
    org: "Self-learning",
    period: "Ongoing",
  },
];

export function EducationSection() {
  return (
    <Section id="education" eyebrow="Education" title="Learning">
      <div className="max-w-2xl">
        <Reveal>
          <div className="rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-sm">
            {education.map((ed) => (
              <div key={ed.title} className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
                  <ed.icon className="size-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">{ed.title}</p>
                  <p className="text-sm text-muted-foreground">{ed.org}</p>
                  <p className="mt-0.5 font-mono text-sm text-primary">{ed.period}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
