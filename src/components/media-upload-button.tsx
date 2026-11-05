"use client";

import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { generateReactHelpers } from "@uploadthing/react";
import { Button } from "@/components/ui/button";
import type { OurFileRouter } from "@/lib/uploadthing";

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

export function MediaUploader({
  onUploadComplete,
  onUploadError,
  label = "Upload image",
}: {
  onUploadComplete?: (urls: string[]) => void;
  onUploadError?: (error: unknown) => void;
  label?: string;
}) {
  const { startUpload, isUploading } = useUploadThing("image", {
    onUploadProgress: (p) => {
      setProgress(Math.max(0, Math.min(100, Math.round(p))));
    },
    onUploadError: async (err) => {
      onUploadError?.(err);
    },
  });

  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).filter((f) => f.type.startsWith("image/"));
    e.target.value = "";
    if (files.length === 0) return;
    setProgress(0);
    const result = await startUpload(files);
    setProgress(100);
    const urls = (result ?? [])
      .map((f) => f.ufsUrl ?? f.url)
      .filter((url): url is string => Boolean(url));
    if (urls.length > 0) {
      onUploadComplete?.(urls);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {progress > 0 && progress < 100 && (
        <div className="w-full bg-border rounded-full h-1.5">
          <div className="bg-primary h-1.5 rounded-full" style={{ width: `${progress}%` }} />
        </div>
      )}
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          disabled={isUploading}
          onChange={handleUpload}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isUploading}
          onClick={() => inputRef.current?.click()}
        >
          <Upload className="size-4" />
          {isUploading ? "Uploading…" : label}
        </Button>
      </div>
    </div>
  );
}
