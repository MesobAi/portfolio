import { createUploadthing, createRouteHandler } from "uploadthing/next";
import type { FileRouter } from "uploadthing/next";

const f = createUploadthing({
  errorFormatter: (err) => ({ message: err.message }),
});

export const ourFileRouter = {
  image: f({ image: { maxFileSize: "8MB", maxFileCount: 1 } }).onUploadComplete(
    async ({ file }) => ({ url: file.ufsUrl })
  ),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

/** UploadThing v7 expects UPLOADTHING_TOKEN; build it from the legacy env pair. */
function getUploadThingToken(): string | undefined {
  if (process.env.UPLOADTHING_TOKEN) return process.env.UPLOADTHING_TOKEN;
  const apiKey = process.env.UPLOADTHING_SECRET;
  const appId = process.env.UPLOADTHING_APP_ID;
  if (!apiKey || !appId) return undefined;
  return Buffer.from(
    JSON.stringify({
      apiKey,
      appId,
      regions: [process.env.UPLOADTHING_REGION ?? "us"],
    })
  ).toString("base64");
}

export const handler = createRouteHandler({
  router: ourFileRouter,
  config: {
    token: getUploadThingToken(),
  },
});
