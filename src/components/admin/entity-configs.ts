"use client";

import {
  deleteBuildLog,
  deleteExperience,
  deleteHighlight,
  deleteProject,
  deleteResearch,
  upsertBuildLog,
  upsertExperience,
  upsertHighlight,
  upsertProject,
  upsertResearch,
} from "@/app/admin/actions";
import type {
  BuildLogEntry,
  ExperienceEntry,
  Highlight,
  Project,
  ResearchItem,
} from "@/db/schema";
import {
  buildLogSchema,
  experienceSchema,
  highlightSchema,
  projectSchema,
  researchSchema,
} from "@/lib/validations";
import type { EntityConfig } from "@/components/admin/entity-manager";

export const projectConfig: EntityConfig<Project> = {
  key: "projects",
  singular: "Project",
  emptyHint: "No projects yet — create your first project.",
  schema: projectSchema,
  upsert: upsertProject,
  remove: deleteProject,
  publishedFlag: "published",
  fields: [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "slug", label: "Slug", type: "text", required: true, placeholder: "hulu-code" },
    { name: "description", label: "Description", type: "textarea", required: true, span: 2, rows: 3 },
    { name: "imageUrl", label: "Image", type: "image", span: 2 },
    { name: "images", label: "Gallery photos (up to 4)", type: "images", span: 2 },
    { name: "githubUrl", label: "GitHub URL", type: "text", placeholder: "https://github.com/…" },
    { name: "liveUrl", label: "Live URL", type: "text", placeholder: "https://…" },
    { name: "techTags", label: "Tech tags (comma separated)", type: "tags", span: 2, placeholder: "Go, Next.js, Postgres" },
    { name: "orderIndex", label: "Order", type: "number" },
    { name: "featured", label: "Featured", type: "switch" },
    { name: "published", label: "Published", type: "switch" },
  ],
  toFormValues: (row) => ({
    title: row.title,
    slug: row.slug,
    description: row.description,
    imageUrl: row.imageUrl ?? "",
    images: (row.images ?? []).join(", "),
    githubUrl: row.githubUrl ?? "",
    liveUrl: row.liveUrl ?? "",
    techTags: row.techTags.join(", "),
    orderIndex: row.orderIndex,
    featured: row.featured,
    published: row.published,
  }),
  listTitle: (row) => row.title,
  listSubtitle: (row) => row.description,
};

export const researchConfig: EntityConfig<ResearchItem> = {
  key: "research",
  singular: "Research item",
  emptyHint: "No research items yet.",
  schema: researchSchema,
  upsert: upsertResearch,
  remove: deleteResearch,
  publishedFlag: "published",
  fields: [
    { name: "slug", label: "Slug", type: "text", required: true, placeholder: "distributed-ai-infrastructure" },
    { name: "title", label: "Title", type: "text", required: true, span: 2 },
    { name: "summary", label: "Summary", type: "textarea", required: true, span: 2, rows: 4 },
    { name: "imageUrl", label: "Image", type: "image", span: 2 },
    { name: "tags", label: "Tags (comma separated)", type: "tags", span: 2 },
    { name: "orderIndex", label: "Order", type: "number" },
    { name: "published", label: "Published", type: "switch" },
  ],
  toFormValues: (row) => ({
    slug: row.slug ?? "",
    title: row.title,
    summary: row.summary,
    imageUrl: row.imageUrl ?? "",
    images: (row.images ?? []).join(", "),
    tags: row.tags.join(", "),
    orderIndex: row.orderIndex,
    published: row.published,
  }),
  listTitle: (row) => row.title,
  listSubtitle: (row) => row.summary,
};

export const buildLogConfig: EntityConfig<BuildLogEntry> = {
  key: "build-log",
  singular: "Build log entry",
  emptyHint: "No build log entries yet.",
  schema: buildLogSchema,
  upsert: upsertBuildLog,
  remove: deleteBuildLog,
  publishedFlag: "published",
  fields: [
    { name: "title", label: "Title", type: "text", required: true, span: 2 },
    { name: "content", label: "Content", type: "textarea", required: true, span: 2, rows: 5 },
    { name: "imageUrl", label: "Image", type: "image", span: 2 },
    { name: "tags", label: "Tags (comma separated)", type: "tags", span: 2 },
    { name: "published", label: "Published", type: "switch" },
  ],
  toFormValues: (row) => ({
    title: row.title,
    content: row.content,
    imageUrl: row.imageUrl ?? "",
    images: (row.images ?? []).join(", "),
    tags: row.tags.join(", "),
    published: row.published,
  }),
  listTitle: (row) => row.title,
  listSubtitle: (row) => row.content,
};

export const experienceConfig: EntityConfig<ExperienceEntry> = {
  key: "experience",
  singular: "Experience entry",
  emptyHint: "No experience entries yet.",
  schema: experienceSchema,
  upsert: upsertExperience,
  remove: deleteExperience,
  publishedFlag: "published",
  fields: [
    { name: "role", label: "Role", type: "text", required: true },
    { name: "company", label: "Company", type: "text", required: true },
    { name: "location", label: "Location", type: "text", placeholder: "Remote / Addis Ababa" },
    { name: "startDate", label: "Start date", type: "date", required: true },
    { name: "endDate", label: "End date", type: "date", help: "Leave empty for current role" },
    { name: "description", label: "Description", type: "textarea", required: true, span: 2, rows: 3 },
    { name: "techTags", label: "Tech tags (comma separated)", type: "tags", span: 2 },
    { name: "orderIndex", label: "Order", type: "number" },
    { name: "published", label: "Published", type: "switch" },
  ],
  toFormValues: (row) => ({
    role: row.role,
    company: row.company,
    location: row.location ?? "",
    startDate: row.startDate,
    endDate: row.endDate ?? "",
    description: row.description,
    techTags: row.techTags.join(", "),
    orderIndex: row.orderIndex,
    published: row.published,
  }),
  listTitle: (row) => `${row.role} @ ${row.company}`,
  listSubtitle: (row) => row.description,
};

/* ------------------------------ Highlights ----------------------------- */

function makeHighlightConfig(
  group: "why-i-build" | "how-i-work" | "fuel",
  singular: string,
  emptyHint: string
): EntityConfig<Highlight> {
  return {
    key: group,
    singular,
    emptyHint,
    schema: highlightSchema,
    upsert: upsertHighlight,
    remove: deleteHighlight,
    publishedFlag: "published",
    hiddenValues: { group },
    fields: [
      { name: "title", label: "Title", type: "text", required: true, span: 2 },
      { name: "description", label: "Description", type: "textarea", required: true, span: 2, rows: 4 },
      {
        name: "linkLabel",
        label: "Link label",
        type: "text",
        help: "Optional. Shown when a link is set (e.g. “View project”).",
      },
      {
        name: "linkHref",
        label: "Link URL",
        type: "text",
        placeholder: "/projects/hulu-code or https://…",
      },
      { name: "orderIndex", label: "Order", type: "number" },
      { name: "published", label: "Published", type: "switch" },
    ],
    toFormValues: (row) => ({
      group: row.group,
      title: row.title,
      description: row.description,
      linkLabel: row.linkLabel ?? "",
      linkHref: row.linkHref ?? "",
      orderIndex: row.orderIndex,
      published: row.published,
    }),
    listTitle: (row) => row.title,
    listSubtitle: (row) => row.description,
  };
}

export const whyIBuildConfig = makeHighlightConfig(
  "why-i-build",
  "Why I build card",
  "No “why I build” cards yet."
);

export const howIWorkConfig = makeHighlightConfig(
  "how-i-work",
  "How I work card",
  "No “how I work” cards yet."
);

export const fuelConfig = makeHighlightConfig("fuel", "Fuel card", "No fuel cards yet.");
