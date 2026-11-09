import { auth } from "@/lib/auth";
import { desc, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import {
  buildLog,
  experience,
  highlights,
  messages,
  profile,
  projects,
  research,
  user,
  type BuildLogEntry,
  type ExperienceEntry,
  type Highlight,
  type Message,
  type Profile,
  type Project,
  type ResearchItem,
} from "@/db/schema";
import { DEFAULT_HIGHLIGHTS, DEFAULT_PROFILE } from "@/lib/content-defaults";

const FALLBACK_PROFILE: Profile = {
  ...DEFAULT_PROFILE,
  id: "default",
  updatedAt: new Date(0),
};

const FALLBACK_HIGHLIGHTS: Highlight[] = DEFAULT_HIGHLIGHTS.map((item, index) => ({
  ...item,
  id: `default-${index}`,
  createdAt: new Date(0),
  updatedAt: new Date(0),
}));

export type SiteData = {
  profile: Profile;
  projects: Project[];
  research: ResearchItem[];
  buildLog: BuildLogEntry[];
  experience: ExperienceEntry[];
  highlights: Highlight[];
};

export const EMPTY_SITE_DATA: SiteData = {
  profile: FALLBACK_PROFILE,
  projects: [],
  research: [],
  buildLog: [],
  experience: [],
  highlights: FALLBACK_HIGHLIGHTS,
};

/** Fetch the single profile row; falls back to the canonical content. */
export async function getProfile(): Promise<Profile> {
  try {
    const rows = await db.select().from(profile).limit(1);
    return rows[0] ?? FALLBACK_PROFILE;
  } catch (error) {
    console.error("[profile] failed to load:", error);
    return FALLBACK_PROFILE;
  }
}

/** Fetch published content for public pages; survives an unreachable/empty DB. */
export async function getSiteData(): Promise<SiteData> {
  try {
    const [p, r, b, e, pr, h] = await Promise.all([
      db
        .select()
        .from(projects)
        .where(eq(projects.published, true))
        .orderBy(desc(projects.featured), projects.orderIndex, desc(projects.createdAt)),
      db
        .select()
        .from(research)
        .where(eq(research.published, true))
        .orderBy(research.orderIndex, desc(research.createdAt)),
      db
        .select()
        .from(buildLog)
        .where(eq(buildLog.published, true))
        .orderBy(desc(buildLog.createdAt)),
      db
        .select()
        .from(experience)
        .where(eq(experience.published, true))
        .orderBy(desc(experience.startDate)),
      db.select().from(profile).limit(1),
      db
        .select()
        .from(highlights)
        .where(eq(highlights.published, true))
        .orderBy(highlights.orderIndex, highlights.createdAt),
    ]);
    return {
      profile: pr[0] ?? FALLBACK_PROFILE,
      projects: p,
      research: r,
      buildLog: b,
      experience: e,
      highlights: h,
    };
  } catch (error) {
    console.error("[site data] failed to load:", error);
    return EMPTY_SITE_DATA;
  }
}

export async function getBuildLogPage(limit = 50): Promise<BuildLogEntry[]> {
  try {
    return await db
      .select()
      .from(buildLog)
      .where(eq(buildLog.published, true))
      .orderBy(desc(buildLog.createdAt))
      .limit(limit);
  } catch (error) {
    console.error("[build log] failed to load:", error);
    return [];
  }
}

/** Everything for the admin dashboard (drafts included). */
export type AdminData = SiteData & { messages: Message[]; highlights: Highlight[] };

export async function getAdminData(): Promise<AdminData> {
  const base = await getSiteData();
  const [msgs, allHighlights] = await Promise.all([
    db.select().from(messages).orderBy(desc(messages.createdAt)),
    db.select().from(highlights).orderBy(highlights.group, highlights.orderIndex),
  ]);
  return { ...base, messages: msgs, highlights: allHighlights };
}

export async function getAdminStats() {
  const [projectsCount, researchCount, buildLogCount, experienceCount, unread] = await Promise.all([
    db.$count(projects),
    db.$count(research),
    db.$count(buildLog),
    db.$count(experience),
    db.$count(messages, sql`${messages.readAt} is null`),
  ]);
  return {
    projects: Number(projectsCount),
    research: Number(researchCount),
    buildLog: Number(buildLogCount),
    experience: Number(experienceCount),
    unread: Number(unread),
  };
}

/** Creates the single admin account from env vars if it doesn't exist yet. */
export async function ensureAdmin() {
  const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.warn("[auth] ADMIN_EMAIL / ADMIN_PASSWORD not set; admin account not provisioned.");
    return false;
  }
  const existing = await db
    .select({ id: user.id })
    .from(user)
    .where(eq(user.email, ADMIN_EMAIL))
    .limit(1);
  if (existing.length > 0) return true;
  await auth.api.signUpEmail({
    body: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD, name: "Nebiyou Daniel" },
  });
  return true;
}
