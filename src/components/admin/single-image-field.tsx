"use client";

import { useRef, useState } from "react";
import { ImageIcon, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useEdgeStore } from "@/lib/edgestore";

const MAX_SIZE = 8 * 1024 * 1024;

export function SingleImageField({
  value,
  onChange,
  label = "Choose image",
}: {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}) {
  const { edgestore } = useEdgeStore();
  const [progress, setProgress] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed");
      return;
    }
    if (file.size > MAX_SIZE) {
      toast.error("Max file size is 8 MB");
      return;
    }

    setProgress(0);
    setUploading(true);

    try {
      const res = await edgestore.publicImages.upload({
        file,
        onProgressChange: (p) => {
          setProgress(Math.max(0, Math.min(100, Math.round(p))));
        },
      });
      onChange(res.url);
      toast.success("Image uploaded");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed — check your connection and try again");
    } finally {
      setUploading(false);
      setProgress(null);
    }
  }

  return (
    <div className="grid gap-3">
      {value ? (
        <div className="relative w-full max-w-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Selected image"
            className="aspect-video w-full rounded-lg border border-border/60 bg-muted object-cover"
          />
          <Button
            type="button"
            size="icon"
            variant="destructive"
            aria-label="Remove image"
            className="absolute right-2 top-2 size-7"
            onClick={() => onChange("")}
            disabled={uploading}
          >
            <X className="size-4" />
          </Button>
        </div>
      ) : (
        <div className="flex aspect-video w-full max-w-sm items-center justify-center rounded-lg border border-dashed border-border/70 bg-muted/30 text-xs text-muted-foreground">
          <ImageIcon className="mr-2 size-4" />
          No image selected
        </div>
      )}

      {uploading && (
        <div className="w-full max-w-sm space-y-1">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
            <div
              className="h-1.5 rounded-full bg-primary transition-[width] duration-200"
              style={{ width: `${progress ?? 0}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Uploading… {progress ?? 0}%
          </p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        disabled={uploading}
        onChange={handleFile}
      />

      <div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          <Upload className="size-4" />
          {uploading ? "Uploading…" : value ? "Replace image" : label}
        </Button>
      </div>
    </div>
  );
}
