import Link from "next/link";
import { ArrowLeft, Compass, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-4 text-center">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="shader-bg">
          <div className="shader-blob shader-blob-1" />
          <div className="shader-blob shader-blob-2" />
          <div className="shader-blob shader-blob-3" />
          <div className="shader-grid" />
          <div className="shader-sheen" />
          <div className="shader-noise" />
        </div>
      </div>
      <div className="relative z-10 mx-auto max-w-xl px-4 py-32">
        <p className="font-mono text-sm font-medium text-primary">404</p>
        <h1 className="mt-3 text-5xl font-extrabold tracking-tight sm:text-6xl">
          Page not found
        </h1>
        <p className="mt-4 text-muted-foreground">
          The page you&apos;re looking for went down a rabbit hole — just like in a backend
          service without retries.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild>
            <Link href="/">
              <Home className="size-4" /> Back home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/build-log">
              <Compass className="size-4" /> Explore the build log
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/#projects">
              <Compass className="size-4" /> Browse projects
            </Link>
          </Button>
        </div>
        <Button asChild variant="ghost" className="mt-6">
          <Link href="/">
            <ArrowLeft className="size-4" /> Go somewhere useful
          </Link>
        </Button>
      </div>
    </div>
  );
}
