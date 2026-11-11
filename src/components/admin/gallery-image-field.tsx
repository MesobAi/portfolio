"use client";

import { useRef, useState } from "react";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useEdgeStore } from "@/lib/edgestore";

const MAX_SIZE = 8 * 1024 * 1024;

type PendingUpload = {
  id: string;
  progress: number;
};

export function GalleryImageField({
  value,
  onChange,
  max = 4,
  label = "Add photos",
}: {
  value: string;
  onChange: (value: string) => void;
  max?: number;
  label?: string;
}) {
  const { edgestore } = useEdgeStore();
  const [urls, setUrls] = useState(() =>
    (value ?? "").split(",").map((s) => s.trim()).filter(Boolean)
  );
  const [pending, setPending] = useState<PendingUpload[]>([]);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const remaining = max - urls.length - pending.length;

  async function handleFiles(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []).filter(
      (f) => f.type.startsWith("image/")
    );
    event.target.value = "";
    if (files.length === 0) return;

    const toUpload = files.slice(0, remaining);
    if (toUpload.length === 0) {
      toast.error(`Maximum ${max} images`);
      return;
    }

    const oversized = toUpload.filter((f) => f.size > MAX_SIZE);
    if (oversized.length > 0) {
      toast.error(`${oversized.map((f) => f.name).join(", ")} too large (max 8 MB)`);
      return;
    }

    const ids = toUpload.map(
      () => `${Date.now()}-${Math.random().toString(36).slice(2)}`
    );
    setPending((prev) => [...prev, ...ids.map((id) => ({ id, progress: 0 }))]);
    setUploading(true);

    try {
      const newUrls: string[] = [];
      for (let i = 0; i < toUpload.length; i++) {
        const res = await edgestore.publicImages.upload({
          file: toUpload[i],
          onProgressChange: (p) => {
            const progress = Math.max(0, Math.min(100, Math.round(p)));
            setPending((prev) =>
              prev.map((item) => (item.id === ids[i] ? { ...item, progress } : item))
            );
          },
        });
        newUrls.push(res.url);
      }

      const next = [...urls, ...newUrls];
      setUrls(next);
      onChange(next.join(", "));
      toast.success(newUrls.length === 1 ? "Image uploaded" : "Images uploaded");
    } catch {
      toast.error("Upload failed — check your connection and try again");
    } finally {
      setUploading(false);
      setPending((prev) => prev.filter((p) => !ids.includes(p.id)));
    }
  }

  function removeUrl(urlToRemove: string) {
    const next = urls.filter((u) => u !== urlToRemove);
    setUrls(next);
    onChange(next.join(", "));
  }

  return (
    <div className="grid gap-2">
      <div className="flex flex-wrap gap-2">
        {urls.map((url) => (
          <div key={url} className="relative overflow-hidden rounded-lg border border-border/60 bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={url}
              alt="Gallery"
              className="h-20 w-24 object-cover"
            />
            <Button
              type="button"
              size="icon"
              variant="destructive"
              aria-label="Remove image"
              className="absolute right-1 top-1 size-7"
              onClick={() => removeUrl(url)}
            >
              <X className="size-3" />
            </Button>
          </div>
        ))}
        {pending.map((p) => (
          <div
            key={p.id}
            className="relative overflow-hidden rounded-lg border border-border/60 bg-muted h-20 w-24 flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center gap-1">
              <span className="text-xs text-muted-foreground">
                {p.progress}%
              </span>
              <div className="w-8 h-1 bg-border/50 overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${p.progress}%` }}
                />
              </div>
            </div>
            <Button
              type="button"
              size="icon"
              variant="destructive"
              aria-label="Cancel upload"
              className="absolute right-1 top-1 size-7"
              onClick={() => setPending((prev) => prev.filter((x) => x.id !== p.id))}
            >
              <X className="size-3" />
            </Button>
          </div>
        ))}
      </div>

      {remaining > 0 && (
        <div className="space-y-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            disabled={uploading}
            onChange={handleFiles}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={remaining <= 0 || uploading}
            onClick={() => inputRef.current?.click()}
          >
            <Plus className="mr-2 size-4" />
            {remaining === max ? label : `Add ${remaining} more`}
          </Button>
          <span className="text-xs text-muted-foreground">
            Up to {max} images
          </span>
        </div>
      )}

      {urls.length === 0 && pending.length === 0 && remaining > 0 && (
        <p className="text-xs text-muted-foreground">No images yet</p>
      )}
    </div>
  );
}
