/**
 * Canonical portfolio content used by both the seed script and the public
 * page fallback. Keep this file free of unconfirmed numbers or claims.
 */
import type { Highlight, Profile } from "../db/schema";

type HighlightContent = Omit<Highlight, "id" | "createdAt" | "updatedAt">;

export type ProfileContent = Omit<Profile, "id" | "updatedAt">;

export const HIGHLIGHT_GROUPS = ["why-i-build", "how-i-work", "fuel"] as const;
export type HighlightGroup = (typeof HIGHLIGHT_GROUPS)[number];

export const DEFAULT_PROFILE: ProfileContent = {
  fullName: "Nebiyou Daniel",
  title: "Backend Engineer & AI Developer",
  tagline: "Learn More. Build Better.",
  location: "Addis Ababa, Ethiopia",
  traits: ["Passionate", "Thoughtful", "Fun to be with"],
  heroLine:
    "I've been asking how apps work since grade 6. Now I build the systems behind them.",
  story:
    "I started coding in grade 6. I was curious how the apps on a phone screen work: how they know what video I like and suggest similar ones. That curiosity led me to research, then to building simple games, and then to real projects. I taught myself through freeCodeCamp, YouTube and official documentation, and today I use AI as a tutor that corrects me and explains the details. I have worked with companies in Ethiopia and the US, built payment and authentication systems, and shipped open-source tools. I am still self-taught in spirit: I try to solve a problem on my own first, then ask how others solved it and why.",
  mission:
    "Solve real problems in Ethiopia, then scale the solutions across Africa. Learn, build and grow.",
  vision:
    "A software engineer at a company on a remote job, still working on local projects, and building my startup: growing its users, scaling it and shipping new features.",
  startup:
    "A mobile platform that helps local businesses connect with local people.",
  motto: "Be not afraid of growing slowly; be afraid only of standing still.",
  mottoAttribution: "Chinese proverb",
  published: true,
};

export const DEFAULT_HIGHLIGHTS: HighlightContent[] = [
  /* ----------------------------- Why I build ---------------------------- */
  {
    group: "why-i-build",
    title: "HULU_Code",
    description:
      "As a student I could not understand unfamiliar codebases. READMEs explained installation but never how endpoints and files connect. So I built a local-first AI navigator that maps dependencies and shows which files are safe or risky to change, without source code leaving the laptop.",
    linkLabel: "View project",
    linkHref: "/projects/hulu-code",
    published: true,
    orderIndex: 0,
  },
  {
    group: "why-i-build",
    title: "School Management SaaS (Chapa payments)",
    description:
      "I learned local payment integration from documentation alone, since most tutorials only cover Stripe and global tools. I built a secure ETB payment flow with webhooks, role-based access and multi-tenant subdomains.",
    linkLabel: "View project",
    linkHref: "/projects/school-management-saas",
    published: true,
    orderIndex: 1,
  },
  {
    group: "why-i-build",
    title: "Bedebo",
    description:
      "I built a study workspace for myself where you upload your own material, get questions and take quizzes. Friends and other students used it, and some users paid to upgrade.",
    linkLabel: "View project",
    linkHref: "/projects/bedebo",
    published: true,
    orderIndex: 2,
  },

  /* ----------------------------- How I work ----------------------------- */
  {
    group: "how-i-work",
    title: "I think about the user.",
    description:
      'I ask "what if this fails?" and "how will people actually access this?" before I ship.',
    linkLabel: null,
    linkHref: null,
    published: true,
    orderIndex: 0,
  },
  {
    group: "how-i-work",
    title: "I own the problem.",
    description:
      "The work a company gives me is my work. The problem is my problem and the growth is my growth.",
    linkLabel: null,
    linkHref: null,
    published: true,
    orderIndex: 1,
  },
  {
    group: "how-i-work",
    title: "I figure it out, then learn from the best.",
    description:
      "I try on my own first, then ask how others solved it and which steps they took.",
    linkLabel: null,
    linkHref: null,
    published: true,
    orderIndex: 2,
  },
  {
    group: "how-i-work",
    title: "No shortcuts.",
    description:
      "Building products is more than coding: communication, understanding user needs, and system design.",
    linkLabel: null,
    linkHref: null,
    published: true,
    orderIndex: 3,
  },

  /* -------------------------------- Fuel -------------------------------- */
  {
    group: "fuel",
    title: "Podcasts on becoming a great engineer",
    description:
      "They taught me to be disciplined, stick to one stack, and keep working on communication and general knowledge.",
    linkLabel: null,
    linkHref: null,
    published: true,
    orderIndex: 0,
  },
  {
    group: "fuel",
    title: "National Geographic and documentaries",
    description: "They feed my curiosity about how the world works.",
    linkLabel: null,
    linkHref: null,
    published: true,
    orderIndex: 1,
  },
  {
    group: "fuel",
    title: "When I am stuck",
    description:
      "Coffee, Stack Overflow or AI, then I step away to refresh my mind and come back to try a different approach.",
    linkLabel: null,
    linkHref: null,
    published: true,
    orderIndex: 2,
  },
];

/** Build log entries from the brief; existing entries are left untouched. */
export const DEFAULT_BUILD_LOG: { title: string; content: string; tags: string[] }[] = [
  {
    title: "Why I built HULU_Code",
    content:
      "As a student I could not understand unfamiliar codebases. READMEs explained installation but never how endpoints and files connect. So I built a local-first AI navigator that maps dependencies and shows which files are safe or risky to change, without source code leaving the laptop.",
    tags: ["HULU_Code", "AI", "Developer Tools"],
  },
  {
    title: "Learning Chapa payments from documentation",
    content:
      "I learned local payment integration from documentation alone, since most tutorials only cover Stripe and global tools. I built a secure ETB payment flow with webhooks, role-based access and multi-tenant subdomains.",
    tags: ["Chapa", "Payments", "Documentation"],
  },
  {
    title: "Moving from React to Solid.js",
    content:
      "Notes from moving from React to Solid.js: what carried over from React and what I had to learn again.",
    tags: ["Solid.js", "React", "Learning"],
  },
];
