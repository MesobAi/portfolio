"use client";

import { X } from "lucide-react";
import { MediaUploader } from "@/components/media-upload-button";
import { cn } from "@/lib/utils";

type ImagesManagerProps = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
};

export function ImagesManager({ value, onChange, label, className }: ImagesManagerProps) {
  const urls = (value ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  function handleUploadComplete(newUrls: string[]) {
    onChange([...urls, ...newUrls].join(", "));
  }

  function removeImage(urlToRemove: string) {
    onChange(urls.filter((u) => u !== urlToRemove).join(", "));
  }

  return (
    <div className={cn("grid gap-2", className)}>
      {urls.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {urls.map((url) => (
            <div key={url} className="relative overflow-hidden rounded-lg border border-border/60 bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="h-16 w-24 object-cover" />
              <button
                type="button"
                aria-label="Remove image"
                onClick={() => removeImage(url)}
                className="absolute right-1 top-1 rounded-full bg-black/70 p-1 text-white"
              >
                <X className="size-3" />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center gap-2">
        <MediaUploader onUploadComplete={handleUploadComplete} />
        <span className="text-xs text-muted-foreground">
          {label ?? "Add images"} — one at a time, multiple total.
        </span>
      </div>
    </div>
  );
}
