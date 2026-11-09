import { z } from "zod";

/* ------------------------------ Contact ------------------------------- */

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.email("Enter a valid email address"),
  subject: z.string().max(150).optional().or(z.literal("")),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
});

export type ContactInput = z.infer<typeof contactSchema>;

/* -------------------------- Admin: projects ---------------------------- */

const dateString = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Use the date picker (YYYY-MM-DD)");

const tagsField = z
  .string()
  .default("")
  .transform((s) =>
    s
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
  );

const imagesField = z
  .string()
  .default("")
  .transform((s) =>
    s
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
  );

/** Absolute URL, site path (/uploads/…), or empty. */
const imageUrlField = z
  .union([
    z.string().url(),
    z.string().regex(/^\/[^\s]*$/, "Enter a valid image URL or site path"),
    z.literal(""),
  ])
  .optional();

export const projectSchema = z.object({
  title: z.string().min(2).max(120),
  slug: z
    .string()
    .min(2)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Lowercase letters, numbers and dashes only"),
  description: z.string().min(10).max(2000),
  imageUrl: imageUrlField,
  images: imagesField,
  githubUrl: z.union([z.string().url(), z.literal("")]).optional(),
  liveUrl: z.union([z.string().url(), z.literal("")]).optional(),
  techTags: tagsField,
  featured: z.coerce.boolean().default(false),
  published: z.coerce.boolean().default(true),
  orderIndex: z.coerce.number().int().min(0).max(999).default(0),
  id: z.string().uuid().optional(),
});

export type ProjectInput = z.infer<typeof projectSchema>;

/* -------------------------- Admin: research ---------------------------- */

export const researchSchema = z.object({
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Lowercase letters, numbers and dashes only")
    .optional(),
  title: z.string().min(2).max(160),
  summary: z.string().min(10).max(6000),
  imageUrl: imageUrlField,
  images: imagesField,
  tags: tagsField,
  published: z.coerce.boolean().default(true),
  orderIndex: z.coerce.number().int().min(0).max(999).default(0),
  id: z.string().uuid().optional(),
});

export type ResearchInput = z.infer<typeof researchSchema>;

/* ------------------------- Admin: build log ---------------------------- */

export const buildLogSchema = z.object({
  title: z.string().min(2).max(160),
  content: z.string().min(10).max(10000),
  imageUrl: imageUrlField,
  images: imagesField,
  tags: tagsField,
  published: z.coerce.boolean().default(true),
  id: z.string().uuid().optional(),
});

export type BuildLogInput = z.infer<typeof buildLogSchema>;

/* ------------------------- Admin: experience --------------------------- */

export const experienceSchema = z.object({
  role: z.string().min(2).max(120),
  company: z.string().min(2).max(120),
  location: z.string().max(120).optional().or(z.literal("")),
  startDate: dateString,
  endDate: z.union([dateString, z.literal("")]).optional(),
  description: z.string().min(10).max(4000),
  techTags: tagsField,
  published: z.coerce.boolean().default(true),
  orderIndex: z.coerce.number().int().min(0).max(999).default(0),
  id: z.string().uuid().optional(),
});

export type ExperienceInput = z.infer<typeof experienceSchema>;

/* --------------------------- Admin: profile ---------------------------- */

export const profileSchema = z.object({
  fullName: z.string().min(2).max(120),
  title: z.string().min(2).max(160),
  tagline: z.string().min(2).max(160),
  location: z.string().min(2).max(160),
  traits: tagsField,
  heroLine: z.string().min(10).max(400),
  story: z.string().min(50).max(6000),
  mission: z.string().min(10).max(2000),
  vision: z.string().min(10).max(2000),
  startup: z.string().min(10).max(2000),
  motto: z.string().min(5).max(400),
  mottoAttribution: z.string().max(160).optional().or(z.literal("")),
  published: z.coerce.boolean().default(true),
  id: z.string().uuid().optional(),
});

export type ProfileInput = z.infer<typeof profileSchema>;

/* -------------------------- Admin: highlights -------------------------- */

export const highlightGroups = ["why-i-build", "how-i-work", "fuel"] as const;

const siteLink = z
  .union([
    z.string().url(),
    z.string().regex(/^\/[\w\-/]*$/, "Use a full URL or a site path starting with /"),
    z.literal(""),
  ])
  .optional();

export const highlightSchema = z.object({
  group: z.enum(highlightGroups),
  title: z.string().min(2).max(160),
  description: z.string().min(10).max(3000),
  linkLabel: z.string().max(80).optional().or(z.literal("")),
  linkHref: siteLink,
  published: z.coerce.boolean().default(true),
  orderIndex: z.coerce.number().int().min(0).max(999).default(0),
  id: z.string().uuid().optional(),
});

export type HighlightInput = z.infer<typeof highlightSchema>;
