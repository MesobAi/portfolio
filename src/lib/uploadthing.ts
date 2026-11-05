import { createUploadthing, createRouteHandler } from "uploadthing/next";
import type { AnyFileRoute, FileRouter } from "uploadthing/types";

export type OurFileRouter = FileRouter & { image: AnyFileRoute };

const createUploadThing = createUploadthing({
  errorFormatter: (err) => ({ message: err.message }),
});

const imageRoute = createUploadThing({
  image: { maxFileCount: 10, minFileCount: 1 },
}).onUploadComplete(async ({ file }) => {
  return { url: file.key };
});

export const handler = createRouteHandler({
  router: { image: imageRoute },
});

export { createUploadThing };
export type { FileRouter };
