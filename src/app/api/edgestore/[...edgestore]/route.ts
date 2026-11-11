import { initEdgeStore } from "@edgestore/server";
import {
  createEdgeStoreNextHandler,
  type CreateContextOptions,
} from "@edgestore/server/adapters/next/app";
import { auth } from "@/lib/auth";

type Context = {
  userId: string;
  /** Only the site owner (ADMIN_EMAIL) may upload or delete files. */
  role: "admin" | "user";
};

async function createContext({ req }: CreateContextOptions): Promise<Context> {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    const adminEmail = process.env.ADMIN_EMAIL;
    const isAdmin = !!session && !!adminEmail && session.user.email === adminEmail;
    return {
      userId: session?.user.id ?? "",
      role: isAdmin ? "admin" : "user",
    };
  } catch {
    return { userId: "", role: "user" };
  }
}

const es = initEdgeStore.context<Context>().create();

const router = es.router({
  /** Public portfolio images: readable by anyone with the link, admin-only writes. */
  publicImages: es
    .imageBucket({
      maxSize: 8 * 1024 * 1024,
      accept: ["image/*"],
    })
    .beforeUpload(({ ctx }) => ctx.role === "admin")
    .beforeDelete(({ ctx }) => ctx.role === "admin"),
});

const handler = createEdgeStoreNextHandler({
  router,
  createContext,
});

export { handler as GET, handler as POST };

export type EdgeStoreRouter = typeof router;
