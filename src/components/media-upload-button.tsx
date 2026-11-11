"use client";

import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useEdgeStore } from "@/lib/edgestore";

const MAX_SIZE = 8 * 1024 * 1024;

export function MediaUploader({
  onUploadComplete,
  onUploadError,
  label = "Upload image",
}: {
  onUploadComplete?: (urls: string[]) => void;
  onUploadError?: (error: unknown) => void;
  label?: string;
}) {
  const { edgestore } = useEdgeStore();
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).filter((f) => f.type.startsWith("image/"));
    e.target.value = "";
    const file = files[0];
    if (!file) return;

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
      onUploadComplete?.([res.url]);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
      onUploadError?.(err);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {uploading && progress > 0 && progress < 100 && (
        <div className="w-full bg-border rounded-full h-1.5">
          <div className="bg-primary h-1.5 rounded-full" style={{ width: `${progress}%` }} />
        </div>
      )}
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          disabled={uploading}
          onChange={handleUpload}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          <Upload className="size-4" />
          {uploading ? "Uploading…" : label}
        </Button>
      </div>
    </div>
  );
}
