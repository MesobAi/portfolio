"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { buildLog, experience, messages, projects, research, type Message } from "@/db/schema";
import {
  buildLogSchema,
  experienceSchema,
  projectSchema,
  researchSchema,
} from "@/lib/validations";

export type ActionState =
  | { status: "success"; message: string }
  | { status: "error"; message: string };

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() });
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!session || !adminEmail || session.user.email !== adminEmail) {
    throw new Error("Unauthorized");
  }
}

function revalidateAll() {
  revalidatePath("/");
  revalidatePath("/build-log");
  revalidatePath("/admin");
}

function parseMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "Something went wrong";
}

/* ------------------------------- Projects ------------------------------ */

export async function upsertProject(formData: FormData): Promise<ActionState> {
  try {
    await requireAdmin();
    const input = projectSchema.parse(Object.fromEntries(formData));
    const values = {
      title: input.title,
      slug: input.slug,
      description: input.description,
      imageUrl: input.imageUrl || null,
      images: input.images ?? [],
      githubUrl: input.githubUrl || null,
      liveUrl: input.liveUrl || null,
      techTags: input.techTags,
      featured: input.featured,
      published: input.published,
      orderIndex: input.orderIndex,
      updatedAt: new Date(),
    };
    if (input.id) {
      await db.update(projects).set(values).where(eq(projects.id, input.id));
    } else {
      await db.insert(projects).values(values);
    }
    revalidateAll();
    return { status: "success", message: input.id ? "Project updated" : "Project created" };
  } catch (error) {
    return { status: "error", message: parseMessage(error) };
  }
}

export async function deleteProject(id: string): Promise<ActionState> {
  try {
    await requireAdmin();
    await db.delete(projects).where(eq(projects.id, id));
    revalidateAll();
    return { status: "success", message: "Project deleted" };
  } catch (error) {
    return { status: "error", message: parseMessage(error) };
  }
}

/* ------------------------------- Research ------------------------------ */

export async function upsertResearch(formData: FormData): Promise<ActionState> {
  try {
    await requireAdmin();
    const input = researchSchema.parse(Object.fromEntries(formData));
    const values = {
      slug: input.slug || null,
      title: input.title,
      summary: input.summary,
      imageUrl: input.imageUrl || null,
      images: input.images ?? [],
      tags: input.tags,
      published: input.published,
      orderIndex: input.orderIndex,
      updatedAt: new Date(),
    };
    if (input.id) {
      await db.update(research).set(values).where(eq(research.id, input.id));
    } else {
      await db.insert(research).values(values);
    }
    revalidateAll();
    return { status: "success", message: input.id ? "Research item updated" : "Research item created" };
  } catch (error) {
    return { status: "error", message: parseMessage(error) };
  }
}

export async function deleteResearch(id: string): Promise<ActionState> {
  try {
    await requireAdmin();
    await db.delete(research).where(eq(research.id, id));
    revalidateAll();
    return { status: "success", message: "Research item deleted" };
  } catch (error) {
    return { status: "error", message: parseMessage(error) };
  }
}

/* ------------------------------ Build log ------------------------------ */

export async function upsertBuildLog(formData: FormData): Promise<ActionState> {
  try {
    await requireAdmin();
    const input = buildLogSchema.parse(Object.fromEntries(formData));
    const values = {
      title: input.title,
      content: input.content,
      images: input.images ?? [],
      tags: input.tags,
      published: input.published,
      updatedAt: new Date(),
    };
    if (input.id) {
      await db.update(buildLog).set(values).where(eq(buildLog.id, input.id));
    } else {
      await db.insert(buildLog).values(values);
    }
    revalidateAll();
    return { status: "success", message: input.id ? "Build log entry updated" : "Build log entry created" };
  } catch (error) {
    return { status: "error", message: parseMessage(error) };
  }
}

export async function deleteBuildLog(id: string): Promise<ActionState> {
  try {
    await requireAdmin();
    await db.delete(buildLog).where(eq(buildLog.id, id));
    revalidateAll();
    return { status: "success", message: "Build log entry deleted" };
  } catch (error) {
    return { status: "error", message: parseMessage(error) };
  }
}

/* ------------------------------ Experience ----------------------------- */

export async function upsertExperience(formData: FormData): Promise<ActionState> {
  try {
    await requireAdmin();
    const input = experienceSchema.parse(Object.fromEntries(formData));
    const values = {
      role: input.role,
      company: input.company,
      location: input.location || null,
      startDate: input.startDate,
      endDate: input.endDate || null,
      description: input.description,
      techTags: input.techTags,
      published: input.published,
      orderIndex: input.orderIndex,
      updatedAt: new Date(),
    };
    if (input.id) {
      await db.update(experience).set(values).where(eq(experience.id, input.id));
    } else {
      await db.insert(experience).values(values);
    }
    revalidateAll();
    return { status: "success", message: input.id ? "Experience updated" : "Experience created" };
  } catch (error) {
    return { status: "error", message: parseMessage(error) };
  }
}

export async function deleteExperience(id: string): Promise<ActionState> {
  try {
    await requireAdmin();
    await db.delete(experience).where(eq(experience.id, id));
    revalidateAll();
    return { status: "success", message: "Experience deleted" };
  } catch (error) {
    return { status: "error", message: parseMessage(error) };
  }
}

/* ------------------------------- Messages ------------------------------ */

export async function markMessageRead(id: string, read: boolean): Promise<ActionState> {
  try {
    await requireAdmin();
    await db
      .update(messages)
      .set({ readAt: read ? new Date() : null })
      .where(eq(messages.id, id));
    revalidatePath("/admin");
    return { status: "success", message: read ? "Marked as read" : "Marked as unread" };
  } catch (error) {
    return { status: "error", message: parseMessage(error) };
  }
}

export async function deleteMessage(id: string): Promise<ActionState> {
  try {
    await requireAdmin();
    await db.delete(messages).where(eq(messages.id, id));
    revalidatePath("/admin");
    return { status: "success", message: "Message deleted" };
  } catch (error) {
    return { status: "error", message: parseMessage(error) };
  }
}

/* ----------------------------- Image upload ---------------------------- */

export async function uploadImage(formData: FormData): Promise<{ url?: string; error?: string }> {
  try {
    await requireAdmin();
    const file = formData.get("file");
    if (!(file instanceof File) || file.size === 0) {
      return { error: "No file provided" };
    }
    if (file.size > 5 * 1024 * 1024) return { error: "Max file size is 5 MB" };
    if (!file.type.startsWith("image/")) return { error: "Only image files are allowed" };

    const { mkdir, writeFile } = await import("node:fs/promises");
    const path = await import("node:path");
    const dir = path.join(process.cwd(), "public", "uploads");
    await mkdir(dir, { recursive: true });
    const ext = path.extname(file.name) || ".png";
    const name = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
    await writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));
    return { url: `/uploads/${name}` };
  } catch (error) {
    return { error: parseMessage(error) };
  }
}

export type { Message };
