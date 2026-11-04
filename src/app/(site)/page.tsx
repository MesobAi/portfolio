import { getSiteData } from "@/lib/data";
import { About } from "@/components/landing/about";
import { BuildLogPreview } from "@/components/landing/build-log-preview";
import { ContactSection } from "@/components/landing/contact-section";
import { EducationSection } from "@/components/landing/education-section";
import { ExperienceTimeline } from "@/components/landing/experience-timeline";
import { Hero } from "@/components/landing/hero";
import { ProjectsGrid } from "@/components/landing/projects-grid";
import { ResearchSection } from "@/components/landing/research-section";
import { StartupSection } from "@/components/landing/startup-section";
import { TechStack } from "@/components/landing/tech-stack";

export default async function HomePage() {
  const data = await getSiteData();

  return (
    <>
      <Hero />
      <About />
      <TechStack />
      <ExperienceTimeline items={data.experience} />
      <ProjectsGrid items={data.projects} />
      <ResearchSection items={data.research} />
      <StartupSection />
      <BuildLogPreview items={data.buildLog} />
      <EducationSection />
      <ContactSection />
    </>
  );
}
