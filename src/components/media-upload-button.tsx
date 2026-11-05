"use client";

import { useRef } from "react";
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
    onClientUploadComplete: async (res) => {
      const urls = res
        .map((f) => f.ufsUrl ?? f.url)
        .filter((url): url is string => Boolean(url));
      onUploadComplete?.(urls);
    },
    onUploadError: async (err) => {
      onUploadError?.(err);
    },
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (files: File[]) => {
    await startUpload(files);
  };

  return (
    <div className="flex items-center gap-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        disabled={isUploading}
        onChange={async (e) => {
          const files = Array.from(e.target.files ?? []).filter((f) => f.type.startsWith("image/"));
          e.target.value = "";
          if (files.length > 0) {
            await handleUpload(files);
          }
        }}
      />
      <Button type="button" variant="outline" size="sm" disabled={isUploading} onClick={() => inputRef.current?.click()}>
        <Upload className="size-4" /> {isUploading ? "Uploading…" : label}
      </Button>
    </div>
  );
}
