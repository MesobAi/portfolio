import type { Metadata } from "next";
import { connection } from "next/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/landing/section-shell";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const rows = await db.select().from(projects).where(eq(projects.slug, slug));
  const project = rows[0];
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

function paragraphs(text: string): string[] {
  return text
    .split(/\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  await connection();
  const rows = await db.select().from(projects).where(eq(projects.slug, slug));
  const project = rows[0];
  if (!project || !project.published) notFound();

  const body = paragraphs(project.description);
  const tags = project.techTags;

  return (
    <div className="pt-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/#projects">
            <ArrowLeft className="size-4" /> All projects
          </Link>
        </Button>

        {/* Hero card */}
        <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-8 backdrop-blur-sm sm:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <p className="font-mono text-sm font-medium text-accent">PROJECT</p>
            {project.featured && <Badge>Featured</Badge>}
          </div>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
            {project.title}
          </h1>

          {project.imageUrl && (
            <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-xl border border-border/60 bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.imageUrl}
                alt={project.title}
                className="absolute inset-0 size-full object-cover"
              />
            </div>
          )}

          {tags.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <li key={tag}>
                  <Badge variant="secondary" className="font-medium">
                    {tag}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* About */}
        <Section id="overview" eyebrow="Overview" title="About this project">
          <div className="max-w-3xl space-y-4">
            {body.length > 0 ? (
              body.map((p, i) => (
                <p key={i} className="text-lg leading-relaxed text-foreground/90">
                  {p}
                </p>
              ))
            ) : (
              <p className="text-muted-foreground">No description yet.</p>
            )}
          </div>
        </Section>

        {/* Stack */}
        <Section id="stack" eyebrow="Stack" title="Tech stack">
          {tags.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <li key={tag}>
                  <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
                    {tag}
                  </Badge>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">Stack not specified.</p>
          )}
        </Section>

        {/* Links */}
        <Section id="links" eyebrow="Links" title="See it live">
          <div className="flex flex-wrap gap-3">
            {project.githubUrl && (
              <Button asChild variant="outline">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <GithubIcon className="size-4" /> GitHub
                </a>
              </Button>
            )}
            {project.liveUrl && (
              <Button asChild>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="size-4" /> Live demo
                </a>
              </Button>
            )}
            {!project.githubUrl && !project.liveUrl && (
              <p className="text-sm text-muted-foreground">
                Private project — reach out via the contact form.
              </p>
            )}
          </div>
        </Section>

        {/* CTA */}
        <div className="mb-16 rounded-2xl border border-border/60 bg-card/40 p-8 text-center backdrop-blur-sm sm:p-10">
          <p className="font-mono text-sm font-medium text-accent">NEXT STEP</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            Interested in something like this?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Let&apos;s talk about your next project — from architecture to launch.
          </p>
          <Button asChild className="mt-6">
            <Link href="/#contact">
              Get in touch <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
