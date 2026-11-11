/**
 * Seed script: fills the database with the portfolio's real content.
 *
 * Run with:  npx tsx src/db/seed.ts
 * Idempotent: skips rows that already exist (matched by slug/title, safe to re-run).
 */
import { config } from "dotenv";
config({ path: ".env.local" });

import { and, eq } from "drizzle-orm";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { DEFAULT_BUILD_LOG, DEFAULT_HIGHLIGHTS, DEFAULT_PROFILE } from "../lib/content-defaults";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is missing. Add it to .env.local first.");
  process.exit(1);
}

const db = drizzle(neon(process.env.DATABASE_URL), { schema });

async function seedProjects() {
  const rows: (typeof schema.projects.$inferInsert)[] = [
    {
      title: "Node Agent / Team Compute Platform",
      slug: "node-agent",
      description:
        "Part of a team compute platform: a Go agent that collects machine hardware specs and serves them over HTTP, plus a coordinator that validates worker heartbeats (CPU, RAM, active tasks). Early development.",
      techTags: ["Go", "Distributed Systems", "HTTP", "gopsutil"],
      featured: true,
      orderIndex: 0,
    },
    {
      title: "Tigil Reports",
      slug: "tigil-reports",
      description:
        "AI-powered business report generation for Ethiopian companies — turn raw business data into clear, actionable reports.",
      techTags: ["Next.js", "TypeScript", "Supabase", "Chapa", "DeepSeek"],
      githubUrl: "https://github.com/nebioudaniel", // TODO: link the real repo
      featured: true,
      orderIndex: 1,
    },
    {
      title: "Bedebo",
      slug: "bedebo",
      description:
        "AI-powered educational workspace designed to help students think and create instead of just handing them answers.",
      techTags: ["TypeScript", "AI", "Education", "RAG"],
      githubUrl: "https://github.com/nebioudaniel",
      featured: true,
      orderIndex: 2,
    },
    {
      title: "HULU_Code",
      slug: "hulu-code",
      description:
        "Local-first AI codebase navigator — ask questions about any codebase and get grounded answers. Your source code never leaves your laptop.",
      techTags: ["TypeScript", "LLMs", "RAG", "Local-first"],
      githubUrl: "https://github.com/nebioudaniel", // TODO: link the real repo
      featured: false,
      orderIndex: 3,
    },
    {
      title: "Multiverse Africa Website & Management Systems",
      slug: "multiverse-africa",
      description:
        "Company website plus a vehicle and user management system with an admin dashboard, built while working at Multiverse Africa.",
      techTags: ["TypeScript", "Next.js", "PostgreSQL", "Admin Dashboard"],
      githubUrl: "https://github.com/nebioudaniel",
      featured: false,
      orderIndex: 4,
    },
    {
      title: "School Management SaaS",
      slug: "school-management-saas",
      description:
        "Multi-tenant school management platform with Better Auth, role-based access control, Chapa payments, webhooks, and per-tenant subdomains.",
      techTags: ["TypeScript", "Better Auth", "RBAC", "Chapa", "Webhooks", "Multi-tenant"],
      githubUrl: "https://github.com/nebioudaniel",
      featured: false,
      orderIndex: 5,
    },
  ];

  for (const row of rows) {
    const existing = await db
      .select({ id: schema.projects.id })
      .from(schema.projects)
      .where(eq(schema.projects.slug, row.slug))
      .limit(1);
    if (existing.length === 0) {
      await db.insert(schema.projects).values(row);
      console.log(`+ project: ${row.title}`);
    } else {
      console.log(`· project exists: ${row.title}`);
    }
  }
}

async function seedResearch() {
  const rows: (typeof schema.research.$inferInsert)[] = [
    {
      slug: "distributed-ai-infrastructure",
      title: "Distributed AI Infrastructure",
      summary:
        "Building a load balancer that spreads AI model inference across multiple computers — routing requests to healthy nodes, balancing GPU-bound workloads, and keeping latency low while models scale.",
      tags: ["AI Infrastructure", "Load Balancing", "Distributed Systems"],
      orderIndex: 0,
    },
    {
      slug: "ai-for-education",
      title: "AI for Education",
      summary:
        "Designing AI that makes students think and create instead of just giving answers — Socratic prompting, guided generation, and guardrails that build problem-solving skills.",
      tags: ["AI", "Education", "Pedagogy"],
      orderIndex: 1,
    },
  ];

  for (const row of rows) {
    const existing = await db
      .select({ id: schema.research.id })
      .from(schema.research)
      .where(eq(schema.research.title, row.title))
      .limit(1);
    if (existing.length === 0) {
      await db.insert(schema.research).values(row);
      console.log(`+ research: ${row.title}`);
    } else {
      await db.update(schema.research)
        .set({ slug: row.slug, updatedAt: new Date() })
        .where(eq(schema.research.title, row.title));
      console.log(`· research exists: ${row.title}`);
    }
  }
}

async function seedExperience() {
  const rows: (typeof schema.experience.$inferInsert)[] = [
    {
      role: "Developer",
      company: "Amani Solutions",
      location: "Addis Ababa, Ethiopia",
      startDate: "2026-03-01",
      endDate: "2026-07-01",
      description:
        "Built a data ingestion pipeline that cleans and normalizes SACCO financial data, and an API layer so downstream services can consume clean, reliable records. Worked closely with a cross-functional team.",
      techTags: ["Python", "Data Ingestion", "REST APIs", "SQL"],
      orderIndex: 0,
    },
    {
      role: "Web Developer",
      company: "Cardinal PLC",
      location: "Addis Ababa, Ethiopia",
      startDate: "2026-01-01",
      endDate: "2026-02-01",
      description:
        "Developed the official magazine-style website for Cardinal PLC with a publishing-friendly content layout.",
      techTags: ["Next.js", "TypeScript", "CMS"],
      orderIndex: 1,
    },
    {
      role: "Junior Software Engineer",
      company: "Multiverse Enterprise PLC",
      location: "Addis Ababa, Ethiopia",
      startDate: "2025-06-01",
      endDate: "2026-05-01",
      description:
        "Built the company website and a vehicle and user management system with an admin dashboard. Provided IT support and contributed to digital strategy.",
      techTags: ["TypeScript", "Next.js", "Admin Dashboard", "Databases"],
      orderIndex: 2,
    },
    {
      role: "Junior Software Developer",
      company: "Buddy Athletics",
      location: "Remote — US sports startup",
      startDate: "2025-09-01",
      endDate: "2026-02-01",
      description:
        "Worked remotely for a US sports startup — shipped full-stack features and improved performance across the platform.",
      techTags: ["TypeScript", "React", "Full-stack", "Performance"],
      orderIndex: 3,
    },
    {
      role: "Web Developer",
      company: "AgroCore Solutions PLC",
      location: "Addis Ababa, Ethiopia",
      startDate: "2025-01-01",
      endDate: "2025-02-01",
      description:
        "Built and deployed the company website with uptime monitoring.",
      techTags: ["Web", "Deployment", "Monitoring"],
      orderIndex: 4,
    },
  ];

  for (const row of rows) {
    const existing = await db
      .select({ id: schema.experience.id })
      .from(schema.experience)
      .where(and(eq(schema.experience.company, row.company), eq(schema.experience.role, row.role)))
      .limit(1);
    if (existing.length === 0) {
      await db.insert(schema.experience).values(row);
      console.log(`+ experience: ${row.role} @ ${row.company}`);
    } else {
      console.log(`· experience exists: ${row.role} @ ${row.company}`);
    }
  }
}

async function seedProfile() {
  const existing = await db.select({ id: schema.profile.id }).from(schema.profile).limit(1);
  if (existing.length > 0) {
    console.log("· profile already seeded");
    return;
  }
  await db.insert(schema.profile).values(DEFAULT_PROFILE);
  console.log("+ profile");
}

async function seedHighlights() {
  for (const row of DEFAULT_HIGHLIGHTS) {
    const existing = await db
      .select({ id: schema.highlights.id })
      .from(schema.highlights)
      .where(
        and(eq(schema.highlights.group, row.group), eq(schema.highlights.title, row.title))
      )
      .limit(1);
    if (existing.length === 0) {
      await db.insert(schema.highlights).values(row);
      console.log(`+ ${row.group}: ${row.title}`);
    } else {
      console.log(`· ${row.group} exists: ${row.title}`);
    }
  }
}

async function seedBuildLog() {
  const rows: (typeof schema.buildLog.$inferInsert)[] = [
    {
      title: "Kicked off HULU_Code — a local-first AI codebase navigator",
      content:
        "Started building HULU_Code: an AI navigator that indexes your codebase locally and answers questions with grounded, citation-style responses. Design principle #1: your source code never leaves your laptop. Next up — smarter chunking and incremental indexing.",
      tags: ["HULU_Code", "AI", "RAG"],
    },
    {
      title: "SACCO data pipeline at Amani Solutions",
      content:
        "Wrapped up the ingestion pipeline for SACCO financial data: validation passes, normalization rules, and an idempotent API layer downstream services can rely on. Learned a lot about make-the-mess-clean-before-sell-it architecture.",
      tags: ["Amani Solutions", "Data Engineering", "APIs"],
    },
    {
      title: "Researching distributed AI inference",
      content:
        "Prototyping a load balancer that spreads model inference across multiple machines — node health checks, queue-aware routing, and retry semantics. Early results look promising for multi-machine setups.",
      tags: ["Research", "AI Infrastructure"],
    },
    ...DEFAULT_BUILD_LOG,
  ];

  for (const row of rows) {
    const existing = await db
      .select({ id: schema.buildLog.id })
      .from(schema.buildLog)
      .where(eq(schema.buildLog.title, row.title))
      .limit(1);
    if (existing.length === 0) {
      await db.insert(schema.buildLog).values(row);
      console.log(`+ build log: ${row.title}`);
    } else {
      console.log(`· build log exists: ${row.title}`);
    }
  }
}

async function main() {
  console.log("Seeding database…");
  await seedProfile();
  await seedHighlights();
  await seedProjects();
  await seedResearch();
  await seedExperience();
  await seedBuildLog();
  console.log("Done ✅");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });
