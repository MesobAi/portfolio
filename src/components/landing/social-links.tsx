import { Mail, Send } from "lucide-react";
import type { SVGProps } from "react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

// TODO: keep these in sync with your real handles / emails.
const EMAIL_PRIMARY = "dnebiou@gmail.com";
const EMAIL_SECONDARY = "mesobaiprojects@gmail.com";
const GITHUB_URL = "https://github.com/nebioudaniel";
const LINKEDIN_URL = "https://www.linkedin.com/in/nebyiou-daniel-5086b8315";
const TELEGRAM_URL = "https://t.me/neba_mesobai";
const X_URL = "https://x.com/mesobai";

const links = [
  { key: "github", href: GITHUB_URL, label: "GitHub", icon: GithubIcon },
  { key: "linkedin", href: LINKEDIN_URL, label: "LinkedIn", icon: LinkedinIcon },
  { key: "email-primary", href: `mailto:${EMAIL_PRIMARY}`, label: "Email", icon: Mail },
  { key: "telegram", href: TELEGRAM_URL, label: "Telegram", icon: Send },
  { key: "x", href: X_URL, label: "X (Twitter)", icon: XIcon },
];

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {links.map(({ key, href, label, icon: Icon }) => (
        <a
          key={key}
          href={href}
          target={href.startsWith("mailto") ? undefined : "_blank"}
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className="flex size-10 items-center justify-center rounded-full border border-border/60 bg-card/40 text-muted-foreground backdrop-blur-sm transition-all hover:border-primary/50 hover:text-primary"
        >
          <Icon className="size-4" />
        </a>
      ))}
    </div>
  );
}

export const contactLinks = { EMAIL_PRIMARY, EMAIL_SECONDARY, GITHUB_URL, LINKEDIN_URL, TELEGRAM_URL, X_URL };
