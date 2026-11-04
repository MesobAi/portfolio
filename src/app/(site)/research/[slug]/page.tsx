import type { Metadata } from "next";
import { connection } from "next/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, FlaskConical } from "lucide-react";
import { db } from "@/db";
import { research } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/landing/section-shell";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const rows = await db.select().from(research).where(eq(research.slug, slug));
  const item = rows[0];
  if (!item) return { title: "Research Not Found" };
  return {
    title: item.title,
    description: item.summary,
    alternates: { canonical: `/research/${item.slug}` },
  };
}

function paragraphs(text: string): string[] {
  return text
    .split(/\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export default async function ResearchDetailPage({ params }: Props) {
  const { slug } = await params;
  await connection();
  const rows = await db.select().from(research).where(eq(research.slug, slug));
  const item = rows[0];
  if (!item || !item.published) notFound();

  const body = paragraphs(item.summary);
  const tags = item.tags;

  return (
    <div className="pt-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/#research">
            <ArrowLeft className="size-4" /> All research
          </Link>
        </Button>

        {/* Hero card */}
        <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-8 backdrop-blur-sm sm:p-10">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-xl border border-accent/30 bg-accent/10">
              <FlaskConical className="size-6 text-accent" />
            </div>
            <div>
              <p className="font-mono text-sm font-medium text-accent">RESEARCH</p>
              <h1 className="mt-1 text-4xl font-extrabold tracking-tight sm:text-5xl">
                {item.title}
              </h1>
            </div>
          </div>

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
        <Section id="overview" eyebrow="Overview" title="About this research">
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

        {/* Related */}
        <Section id="related" eyebrow="More" title="Explore the research index">
          <p className="max-w-2xl text-muted-foreground">
            This research area is under active exploration. Browse the full list of experiments
            and write-ups to see what else I&apos;m working on.
          </p>
          <Button asChild variant="outline" className="mt-5">
            <Link href="/#research">
              View all research <ArrowRight className="size-4" />
            </Link>
          </Button>
        </Section>

        {/* CTA */}
        <div className="mb-16 rounded-2xl border border-border/60 bg-card/40 p-8 text-center backdrop-blur-sm sm:p-10">
          <p className="font-mono text-sm font-medium text-accent">COLLABORATE</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            Want to explore this together?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            I&apos;m always happy to discuss ideas, papers, and prototypes.
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
