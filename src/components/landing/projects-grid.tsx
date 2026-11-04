import Link from "next/link";
import { ArrowRight, ExternalLink, FolderOpen } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import Image from "next/image";
import type { Project } from "@/db/schema";
import { EmptyState, Section, StaggerGrid, StaggerItem } from "@/components/landing/section-shell";
import { Badge } from "@/components/ui/badge";

export function ProjectsGrid({ items }: { items: Project[] }) {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Things I've built"
      description="From AI developer tools to multi-tenant SaaS — real systems solving real problems. Click any card to read the full story."
    >
      {items.length === 0 ? (
        <EmptyState>No projects published yet — check back soon.</EmptyState>
      ) : (
        <StaggerGrid className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((project) => (
            <StaggerItem
              key={project.id}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card/40 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:bg-card/70"
            >
              <Link
                href={`/projects/${project.slug}`}
                aria-label={`Read about ${project.title}`}
                className="absolute inset-0 z-10"
              />

              <div className="relative aspect-video overflow-hidden bg-muted">
                {project.imageUrl ? (
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center bg-gradient-to-br from-primary/20 via-background to-secondary">
                    <FolderOpen className="size-8 text-primary/60" />
                  </div>
                )}
                {project.featured && (
                  <Badge className="absolute left-3 top-3" variant="default">
                    Featured
                  </Badge>
                )}
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-semibold transition-colors group-hover:text-accent">
                  {project.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                {project.techTags.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {project.techTags.map((tag) => (
                      <li key={tag}>
                        <Badge variant="secondary" className="text-xs font-medium">
                          {tag}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-4 flex items-center gap-3 border-t border-border/40 pt-3">
                  <div className="relative z-20 flex items-center gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        <GithubIcon className="size-4" /> GitHub
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        <ExternalLink className="size-4" /> Live
                      </a>
                    )}
                    {!project.githubUrl && !project.liveUrl && (
                      <span className="text-xs text-muted-foreground/70">Private project</span>
                    )}
                  </div>
                  <span className="ml-auto inline-flex items-center gap-1 text-sm font-medium text-accent">
                    View project
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      )}
      <p className="mt-6 text-center text-sm text-muted-foreground">
        More experiments live on{" "}
        <a
          href="https://github.com/nebioudaniel"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline-offset-4 hover:underline"
        >
          GitHub
        </a>
        .
      </p>
    </Section>
  );
}
