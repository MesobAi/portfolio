"use client";

import { useRef, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, type FieldValues } from "react-hook-form";
import { Check, Pencil, Plus, Trash2, Upload, X } from "lucide-react";
import type { ZodType } from "zod";
import { toast } from "sonner";
import { uploadImage, type ActionState } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ImagesManager } from "@/components/admin/images-manager";
import { cn } from "@/lib/utils";

export type FieldType = "text" | "textarea" | "date" | "number" | "switch" | "tags" | "image" | "images";

export type FieldDef = {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  help?: string;
  span?: 1 | 2;
};

export type EntityConfig<T extends FieldValues> = {
  key: string;
  singular: string;
  emptyHint: string;
  schema: ZodType<Record<string, unknown>, Record<string, unknown>>;
  upsert: (formData: FormData) => Promise<ActionState>;
  remove: (id: string) => Promise<ActionState>;
  fields: FieldDef[];
  /** Server row → form values (arrays become CSV, dates become YYYY-MM-DD). */
  toFormValues: (row: T) => Record<string, unknown>;
  listTitle: (row: T) => string;
  listSubtitle?: (row: T) => string;
  publishedFlag?: string;
};

export function EntityManager<T extends { id: string } & Record<string, unknown>>({
  config,
  rows,
}: {
  config: EntityConfig<T>;
  rows: T[];
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [pending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  function close() {
    setCreating(false);
    setEditingId(null);
  }

  function onDelete(id: string) {
    if (!confirm("Delete this entry? This cannot be undone.")) return;
    setDeletingId(id);
    startTransition(async () => {
      const result = await config.remove(id);
      setDeletingId(null);
      if (result.status === "success") toast.success(result.message);
      else toast.error(result.message);
      if (editingId === id) close();
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {rows.length} {rows.length === 1 ? "entry" : "entries"}
          {config.publishedFlag ? " (drafts shown greyed out)" : ""}
        </p>
        {!creating && (
          <Button size="sm" onClick={() => { setCreating(true); setEditingId(null); }}>
            <Plus className="size-4" /> New {config.singular.toLowerCase()}
          </Button>
        )}
      </div>

      {rows.length === 0 && (
        <div className="rounded-xl border border-dashed border-border/70 bg-card/40 px-6 py-10 text-center text-sm text-muted-foreground">
          {config.emptyHint}
        </div>
      )}

      {creating && <EntityForm key="new" config={config} row={null} onCancel={close} />}

      <ul className="space-y-3">
        {rows.map((row) =>
          editingId === row.id ? (
            <li key={row.id}>
              <EntityForm key={row.id} config={config} row={row} onCancel={close} />
            </li>
          ) : (
            <li
              key={row.id}
              className={cn(
                "flex items-start justify-between gap-4 rounded-xl border border-border/60 bg-card/40 p-4",
                typeof config.publishedFlag === "string" && row[config.publishedFlag] === false && "opacity-60"
              )}
            >
              <div className="min-w-0">
                <p className="font-semibold">{config.listTitle(row)}</p>
                {config.listSubtitle && (
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    {config.listSubtitle(row)}
                  </p>
                )}
                {typeof config.publishedFlag === "string" && row[config.publishedFlag] === false && (
                  <span className="mt-2 inline-block rounded bg-yellow-500/15 px-2 py-0.5 text-xs font-medium text-yellow-600 dark:text-yellow-400">
                    Draft
                  </span>
                )}
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label={`Edit ${config.singular.toLowerCase()}`}
                  disabled={pending && deletingId !== null}
                  onClick={() => { setEditingId(row.id); setCreating(false); }}
                >
                  <Pencil className="size-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label={`Delete ${config.singular.toLowerCase()}`}
                  className="text-destructive hover:text-destructive"
                  disabled={pending && deletingId === row.id}
                  onClick={() => onDelete(row.id)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

function EntityForm<T extends { id: string } & Record<string, unknown>>({
  config,
  row,
  onCancel,
}: {
  config: EntityConfig<T>;
  row: T | null;
  onCancel: () => void;
}) {
  const [pending, startTransition] = useTransition();
  const defaults = useMemoDefaults(config, row);
  const form = useForm({
    defaultValues: defaults,
    resolver: zodResolver(config.schema as never),
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  function onValid(values: Record<string, unknown>) {
    const formData = new FormData();
    for (const [key, value] of Object.entries(values)) {
      if (value === undefined || value === null) continue;
      if (key === "id" && !value) continue; // omit empty id on create
      formData.set(key, String(value));
    }

    startTransition(async () => {
      const result = await config.upsert(formData);
      if (result.status === "success") {
        toast.success(result.message);
        onCancel();
      } else {
        toast.error(result.message);
      }
    });
  }

  async function onUpload(file: File, fieldName: string) {
    if (!file) return;
    const fd = new FormData();
    fd.set("file", file);
    const result = await uploadImage(fd);
    if (result.url) {
      form.setValue(fieldName, result.url, { shouldDirty: true });
      toast.success("Image uploaded");
    } else {
      toast.error(result.error ?? "Upload failed");
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit((values) => onValid(values as Record<string, unknown>))}
      className="grid gap-4 rounded-xl border border-primary/30 bg-card/60 p-5 shadow-lg"
    >
      <input type="hidden" {...form.register("id")} />

      <div className="grid gap-4 sm:grid-cols-2">
        {config.fields.map((field) => (
          <div key={field.name} className={cn("grid gap-2", field.span === 2 && "sm:col-span-2")}>
            <Label htmlFor={`${config.key}-${field.name}`}>{field.label}</Label>

            {field.type === "images" && (
              <ImagesManager
                value={String(form.watch(field.name) ?? "")}
                onChange={(v) => form.setValue(field.name, v, { shouldDirty: true })}
              />
            )}

            {field.type === "textarea" && (
              <Textarea
                id={`${config.key}-${field.name}`}
                rows={field.rows ?? 4}
                placeholder={field.placeholder}
                {...form.register(field.name, { required: field.required })}
              />
            )}

            {(field.type === "text" || field.type === "tags") && (
              <Input
                id={`${config.key}-${field.name}`}
                type="text"
                placeholder={field.placeholder}
                {...form.register(field.name, { required: field.required })}
              />
            )}

            {field.type === "date" && (
              <Input
                id={`${config.key}-${field.name}`}
                type="date"
                {...form.register(field.name)}
              />
            )}

            {field.type === "number" && (
              <Input
                id={`${config.key}-${field.name}`}
                type="number"
                min={0}
                {...form.register(field.name)}
              />
            )}

            {field.type === "image" && (
              <div className="flex gap-2">
                <Input
                  id={`${config.key}-${field.name}`}
                  type="text"
                  placeholder="https://… or upload a file"
                  {...form.register(field.name)}
                />
                <>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) void onUpload(file, field.name);
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    aria-label="Upload image"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="size-4" />
                  </Button>
                </>
              </div>
            )}

            {field.type === "switch" && (
              <Controller
                control={form.control}
                name={field.name}
                render={({ field: c }) => (
                  <Switch
                    id={`${config.key}-${field.name}`}
                    checked={!!c.value}
                    onCheckedChange={(v) => c.onChange(v)}
                  />
                )}
              />
            )}

            {field.help && <p className="text-xs text-muted-foreground">{field.help}</p>}
            {form.formState.errors[field.name] && (
              <p className="text-xs font-medium text-destructive" role="alert">
                {String(form.formState.errors[field.name]?.message ?? `${field.label} is required`)}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end gap-2">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={pending}>
          <X className="size-4" /> Cancel
        </Button>
        <Button type="submit" disabled={pending}>
          <Check className="size-4" />
          {pending ? "Saving…" : row ? "Save changes" : `Create ${config.singular.toLowerCase()}`}
        </Button>
      </div>
    </form>
  );
}

export type AnyEntity = { id: string } & Record<string, unknown>;

function useMemoDefaults<T extends AnyEntity>(
  config: EntityConfig<T>,
  row: T | null
): Record<string, unknown> {
  return {
    ...(row ? config.toFormValues(row) : emptyValues(config)),
    id: row?.id ?? "",
  };
}

function emptyValues(config: EntityConfig<never>): Record<string, unknown> {
  const base: Record<string, unknown> = {};
  for (const field of config.fields) {
    if (field.type === "switch") {
      base[field.name] = field.name === "published" ? true : false;
    } else if (field.type === "number") {
      base[field.name] = 0;
    } else {
      base[field.name] = "";
    }
  }
  return base;
}
