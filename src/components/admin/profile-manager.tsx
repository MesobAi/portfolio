"use client";

import { useTransition } from "react";
import type { ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { upsertProfile } from "@/app/admin/actions";
import type { Profile } from "@/db/schema";
import { profileSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ProfileManager({ profile }: { profile: Profile }) {
  const [pending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(profileSchema as never),
    defaultValues: {
      fullName: profile.fullName,
      title: profile.title,
      tagline: profile.tagline,
      location: profile.location,
      traits: profile.traits.join(", "),
      heroLine: profile.heroLine,
      story: profile.story,
      mission: profile.mission,
      vision: profile.vision,
      startup: profile.startup,
      motto: profile.motto,
      mottoAttribution: profile.mottoAttribution ?? "",
      published: profile.published,
    },
  });

  function onValid(values: Record<string, unknown>) {
    const formData = new FormData();
    for (const [key, value] of Object.entries(values)) {
      if (value === undefined || value === null) continue;
      formData.set(key, String(value));
    }

    startTransition(async () => {
      const result = await upsertProfile(formData);
      if (result.status === "success") {
        toast.success(result.message);
        form.reset(values);
      } else {
        toast.error(result.message);
      }
    });
  }

  return (
    <form
      onSubmit={form.handleSubmit((values) => onValid(values as Record<string, unknown>))}
      className="grid gap-4 rounded-xl border border-primary/30 bg-card/60 p-5 shadow-lg"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name">
          <Input {...form.register("fullName")} />
        </Field>
        <Field label="Title">
          <Input {...form.register("title")} />
        </Field>
        <Field label="Tagline">
          <Input {...form.register("tagline")} />
        </Field>
        <Field label="Location">
          <Input {...form.register("location")} />
        </Field>
        <Field label="Three words (comma separated)" span={2}>
          <Input {...form.register("traits")} placeholder="Passionate, Thoughtful, Fun to be with" />
        </Field>
        <Field label="Hero one-liner" span={2}>
          <Textarea rows={2} {...form.register("heroLine")} />
        </Field>
        <Field label="My story" span={2}>
          <Textarea rows={8} {...form.register("story")} />
        </Field>
        <Field label="Mission" span={2}>
          <Textarea rows={3} {...form.register("mission")} />
        </Field>
        <Field label="3-year vision" span={2}>
          <Textarea rows={3} {...form.register("vision")} />
        </Field>
        <Field label="Startup" span={2}>
          <Textarea rows={3} {...form.register("startup")} />
        </Field>
        <Field label="Motto">
          <Textarea rows={2} {...form.register("motto")} />
        </Field>
        <Field label="Motto attribution">
          <Input {...form.register("mottoAttribution")} placeholder="Chinese proverb" />
        </Field>
      </div>

      {Object.keys(form.formState.errors).length > 0 && (
        <p className="text-xs font-medium text-destructive" role="alert">
          {String(
            Object.values(form.formState.errors)[0]?.message ?? "Please check the fields above."
          )}
        </p>
      )}

      <div className="flex items-center justify-end gap-2">
        <Button type="submit" disabled={pending}>
          <Check className="size-4" />
          {pending ? "Saving…" : "Save profile"}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  span,
  children,
}: {
  label: string;
  span?: 2;
  children: ReactNode;
}) {
  return (
    <div className={span === 2 ? "grid gap-2 sm:col-span-2" : "grid gap-2"}>
      <Label>{label}</Label>
      {children}
    </div>
  );
}
