"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
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
        className="relative z-10 mx-auto w-full max-w-6xl px-4 py-32 sm:px-6"
      >
        <motion.h1
          variants={item}
          className="max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          {profile.fullName}
        </motion.h1>

        <motion.p variants={item} className="mt-3 text-xl font-semibold text-primary sm:text-2xl md:text-3xl">
          {profile.title}
        </motion.p>

        <motion.p variants={item} className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {profile.heroLine}
        </motion.p>

        <motion.p variants={item} className="mt-2 font-mono text-sm text-muted-foreground">
          {profile.location}
        </motion.p>

        <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
          <Button asChild size="lg" className="group">
            <Link href="/#projects">
              View Work
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
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
      </motion.div>

      <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center" aria-hidden="true">
        <div className="h-8 w-px animate-bounce bg-gradient-to-b from-transparent to-primary" />
      </div>
    </section>
  );
}
