"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { messages } from "@/db/schema";
import { contactSchema, type ContactInput } from "@/lib/validations";

export type ContactState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

/** Naive per-email rate limit: max 3 messages per hour. */
const attempts = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;
const WINDOW_MS = 60 * 60 * 1000;

export async function sendMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  try {
    const input: ContactInput = contactSchema.parse(Object.fromEntries(formData));

    const now = Date.now();
    const record = attempts.get(input.email);
    if (record && record.resetAt > now && record.count >= RATE_LIMIT) {
      return { status: "error", message: "Too many messages. Try again in a little while." };
    }
    attempts.set(input.email, {
      count: record && record.resetAt > now ? record.count + 1 : 1,
      resetAt: record && record.resetAt > now ? record.resetAt : now + WINDOW_MS,
    });

    await db.insert(messages).values({
      name: input.name,
      email: input.email,
      subject: input.subject || null,
      message: input.message,
    });

    revalidatePath("/admin");
    return { status: "success", message: "Message sent — I'll get back to you soon." };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to send message. Please try again.";
    return { status: "error", message };
  }
}
