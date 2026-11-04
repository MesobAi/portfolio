"use client";

import { useActionState, useEffect, useRef } from "react";
import { Loader2, Send } from "lucide-react";
import { sendMessage, type ContactState } from "@/app/actions/contact";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/landing/section-shell";
import { contactLinks } from "@/components/landing/social-links";
import { SocialLinks } from "@/components/landing/social-links";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialState: ContactState = { status: "idle" };

export function ContactSection() {
  const [state, formAction, pending] = useActionState(sendMessage, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state]);

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's build something"
      description="Open to full-time roles, contracts, and collaborations. Hiring or have an idea worth building? Send me a message."
    >
      <div className="grid gap-8 md:grid-cols-5">
        <Reveal className="md:col-span-2">
          <div className="flex h-full flex-col justify-between gap-6 rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-sm">
            <div>
              <h3 className="text-lg font-semibold">Direct channels</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Prefer email or socials? Reach me directly — I usually reply within a day.
              </p>
              <a
                href={`mailto:${contactLinks.EMAIL_PRIMARY}`}
                className="mt-4 inline-block font-mono text-sm text-primary underline-offset-4 hover:underline"
              >
                {contactLinks.EMAIL_PRIMARY}
              </a>
              <a
                href={`mailto:${contactLinks.EMAIL_SECONDARY}`}
                className="mt-2 inline-block font-mono text-sm text-muted-foreground underline-offset-4 hover:underline"
              >
                {contactLinks.EMAIL_SECONDARY}
              </a>
            </div>
            <SocialLinks />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-3">
          <form
            ref={formRef}
            action={formAction}
            className="rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-sm"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Your name" required minLength={2} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="you@example.com" required />
              </div>
            </div>
            <div className="mt-4 grid gap-2">
              <Label htmlFor="subject">Subject (optional)</Label>
              <Input id="subject" name="subject" placeholder="What's this about?" />
            </div>
            <div className="mt-4 grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell me about the role, project, or idea…"
                rows={5}
                required
                minLength={10}
              />
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <Button type="submit" disabled={pending}>
                {pending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    <Send className="size-4" /> Send message
                  </>
                )}
              </Button>
              {state.status === "success" && (
                <p className="text-sm font-medium text-emerald-500">{state.message}</p>
              )}
              {state.status === "error" && (
                <p className="text-sm font-medium text-destructive" role="alert">
                  {state.message}
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
