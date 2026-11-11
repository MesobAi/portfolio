"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Profile } from "@/db/schema";
import { SocialLinks } from "@/components/landing/social-links";
import { ShaderBackground } from "@/components/landing/shader-background";
import { Button } from "@/components/ui/button";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function Hero({ profile }: { profile: Profile }) {
  const reduce = useReducedMotion();
  const wrap = reduce
    ? { visible: {} }
    : container;

  return (
    <section id="hero" className="relative flex min-h-svh items-center overflow-hidden">
      <ShaderBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" aria-hidden="true" />

      <motion.div
        variants={wrap}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto w-full max-w-6xl px-4 py-28 sm:px-6 sm:py-32"
      >
        <div className="max-w-3xl">
          <div className="min-w-0">
            <div className="flex items-center gap-4 sm:gap-6">
              <motion.div variants={item} className="shrink-0">
                <div className="relative size-24 overflow-hidden rounded-full border border-foreground/15 bg-muted shadow-lg shadow-primary/20 ring-1 ring-primary/25 sm:size-28">
                  <Image
                    src="/nebapic.jpg"
                    alt={`Portrait of ${profile.fullName}`}
                    fill
                    priority
                    sizes="(min-width: 640px) 112px, 96px"
                    className="object-cover object-[center_30%] grayscale"
                  />
                </div>
              </motion.div>

              <div className="min-w-0">
                <motion.h1
                  variants={item}
                  className="text-3xl font-extrabold leading-[1.05] tracking-tight text-balance sm:text-5xl md:text-6xl"
                >
                  {profile.fullName}
                </motion.h1>

                <motion.p
                  variants={item}
                  className="mt-2 text-base font-semibold tracking-tight text-primary sm:text-xl md:text-2xl"
                >
                  {profile.title}
                </motion.p>
              </div>
            </div>

            <motion.p
              variants={item}
              className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/75 sm:text-lg"
            >
              {profile.heroLine}
            </motion.p>

            <motion.p variants={item} className="mt-3 font-mono text-sm text-foreground/55">
              {profile.location}
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                asChild
                size="lg"
                className="group shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]"
              >
                <Link href="/#projects">
                  View Work
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-border/80 transition-colors hover:border-primary/50 hover:bg-primary/5 hover:text-primary active:scale-[0.98]"
              >
                <Link href="/#contact">
                  <Mail className="size-4" />
                  Contact
                </Link>
              </Button>
            </motion.div>

            <motion.div variants={item} className="mt-8">
              <SocialLinks />
            </motion.div>

            <motion.p variants={item} className="mt-10 font-mono text-sm text-muted-foreground">
              <span className="text-accent">&gt;</span> {profile.tagline}
            </motion.p>
          </div>
        </div>
      </motion.div>

      <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center" aria-hidden="true">
        <div className="h-8 w-px animate-bounce bg-gradient-to-b from-transparent to-primary" />
      </div>
    </section>
  );
}
