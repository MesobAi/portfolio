"use client";

import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "@/lib/uploadthing";

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

export function MediaUploader({
  onUploadComplete,
  onUploadError,
}: {
  onUploadComplete?: (urls: string[]) => void;
  onUploadError?: (error: unknown) => void;
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

  const handleUpload = async (files: File[]) => {
    await startUpload(files);
  };

  return (
    <input
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
  );
}
