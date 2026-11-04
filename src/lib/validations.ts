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

export const projectSchema = z.object({
  title: z.string().min(2).max(120),
  slug: z
    .string()
    .min(2)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Lowercase letters, numbers and dashes only"),
  description: z.string().min(10).max(2000),
  imageUrl: z.union([z.string().url(), z.literal("")]).optional(),
  githubUrl: z.union([z.string().url(), z.literal("")]).optional(),
  liveUrl: z.union([z.string().url(), z.literal("")]).optional(),
  techTags: tagsField,
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
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
  imageUrl: z.union([z.string().url(), z.literal("")]).optional(),
  tags: tagsField,
  published: z.boolean().default(true),
  orderIndex: z.coerce.number().int().min(0).max(999).default(0),
  id: z.string().uuid().optional(),
});

export type ResearchInput = z.infer<typeof researchSchema>;

/* ------------------------- Admin: build log ---------------------------- */

export const buildLogSchema = z.object({
  title: z.string().min(2).max(160),
  content: z.string().min(10).max(10000),
  tags: tagsField,
  published: z.boolean().default(true),
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
  published: z.boolean().default(true),
  orderIndex: z.coerce.number().int().min(0).max(999).default(0),
  id: z.string().uuid().optional(),
});

export type ExperienceInput = z.infer<typeof experienceSchema>;
