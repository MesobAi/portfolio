import { headers } from "next/headers";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { auth } from "@/lib/auth";

const MAX_SIZE = 8 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const adminEmail = process.env.ADMIN_EMAIL;
    if (!session || !adminEmail || session.user.email !== adminEmail) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File) || file.size === 0) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }
    if (file.size > MAX_SIZE) {
      return Response.json({ error: "Max file size is 8 MB" }, { status: 413 });
    }
    if (!file.type.startsWith("image/")) {
      return Response.json({ error: "Only image files are allowed" }, { status: 415 });
    }

    const dir = path.join(process.cwd(), "public", "uploads");
    await mkdir(dir, { recursive: true });
    const ext = path.extname(file.name).toLowerCase() || ".png";
    const name = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
    await writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));

    return Response.json({ url: `/uploads/${name}` });
  } catch (error) {
    console.error("[upload] failed:", error);
    return Response.json({ error: "Upload failed" }, { status: 500 });
  }
}
