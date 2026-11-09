import { getSiteData } from "@/lib/data";
import { About } from "@/components/landing/about";
import { BuildLogPreview } from "@/components/landing/build-log-preview";
import { ContactSection } from "@/components/landing/contact-section";
import { EducationSection } from "@/components/landing/education-section";
import { ExperienceTimeline } from "@/components/landing/experience-timeline";
import { Fuel, HowIWork, WhyIBuild } from "@/components/landing/highlights";
import { Hero } from "@/components/landing/hero";
import { MissionSection } from "@/components/landing/mission-section";
import { ProjectsGrid } from "@/components/landing/projects-grid";
import { ResearchSection } from "@/components/landing/research-section";
import { StartupSection } from "@/components/landing/startup-section";
import { StorySection } from "@/components/landing/story-section";
import { TechStack } from "@/components/landing/tech-stack";

export default async function HomePage() {
  const data = await getSiteData();

  return (
    <>
      <Hero profile={data.profile} />
      <About />
      <StorySection profile={data.profile} />
      <TechStack />
      <ExperienceTimeline items={data.experience} />
      <ProjectsGrid items={data.projects} />
      <WhyIBuild items={data.highlights.filter((item) => item.group === "why-i-build")} />
      <HowIWork items={data.highlights.filter((item) => item.group === "how-i-work")} />
      <ResearchSection items={data.research} />
      <Fuel items={data.highlights.filter((item) => item.group === "fuel")} />
      <StartupSection />
      <MissionSection profile={data.profile} />
      <BuildLogPreview items={data.buildLog} />
      <EducationSection />
      <ContactSection />
    </>
  );
}
