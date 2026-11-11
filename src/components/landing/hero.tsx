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
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] lg:gap-14 xl:gap-20">
          <div className="min-w-0">
            <motion.h1
              variants={item}
              className="max-w-4xl text-4xl font-extrabold leading-[1.03] tracking-tight text-balance sm:text-6xl md:text-7xl"
            >
              {profile.fullName}
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-4 text-lg font-semibold tracking-tight text-primary sm:text-2xl md:text-3xl"
            >
              {profile.title}
            </motion.p>

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

          <motion.div
            variants={item}
            className="order-first mx-auto w-full max-w-[240px] sm:max-w-[280px] lg:order-last lg:mx-0 lg:max-w-none"
          >
            <div className="group relative isolate">
              <div
                aria-hidden="true"
                className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-tr from-primary/25 via-accent/5 to-primary/15 opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-border/70 bg-muted shadow-[0_24px_70px_-28px_rgba(0,0,0,0.55)] ring-1 ring-primary/20 transition-shadow duration-500 group-hover:ring-primary/35 group-hover:shadow-[0_24px_70px_-28px_rgba(0,0,0,0.55),0_0_36px_-14px_oklch(0.52_0.21_228/0.45)]">
                <Image
                  src="/nebapic.jpg"
                  alt={`Portrait of ${profile.fullName}`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 360px, (min-width: 640px) 280px, 240px"
                  className="object-cover object-[center_25%] grayscale transition-transform duration-700 will-change-transform group-hover:scale-[1.03]"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center" aria-hidden="true">
        <div className="h-8 w-px animate-bounce bg-gradient-to-b from-transparent to-primary" />
      </div>
    </section>
  );
}
