"use client";

import { motion } from "framer-motion";
import { OrbitalScene } from "@/components/OrbitalScene";
import { site } from "@/lib/site-data";

function SparkleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5 text-emerald-400"
      fill="currentColor"
    >
      <path d="M12 2l1.4 4.6L18 8l-4.6 1.4L12 14l-1.4-4.6L6 8l4.6-1.4L12 2zm7 9 1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3zm-14 4 0.8 2.4L8 18l-2.2.6L5 21l-0.8-2.4L2 18l2.2-0.6L5 15z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative min-h-screen scroll-mt-28 overflow-hidden bg-black px-5 pb-28 pt-28 sm:px-8 lg:px-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      > 
        <div className="absolute right-[-4%] top-1/2 hidden aspect-square w-[min(52vw,560px)] -translate-y-1/2 md:block lg:right-[4%] lg:w-[min(46vw,600px)]">
          <div className="h-full w-full rounded-full border border-emerald-500/30 bg-emerald-500/10" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#000_0%,rgba(0,0,0,0.95)_34%,rgba(0,0,0,0.45)_62%,rgba(0,0,0,0.05)_100%)]" />
      </div>

      <div className="relative z-20 mx-auto grid w-full max-w-7xl items-center lg:min-h-[calc(100vh-7rem)] lg:grid-cols-[minmax(0,540px)_1fr]">
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-400"
          >
            <ArrowIcon />
            {site.hero.greeting}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -left-6 top-2 hidden sm:block">
              <SparkleIcon />
            </div>
            <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
              {site.hero.headline}{" "}
              <span className="text-emerald-400">{site.hero.headlineAccent}</span>
            </h1>
            <div className="absolute -right-2 top-16 hidden lg:block">
              <SparkleIcon />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-lg text-base leading-8 text-neutral-400 sm:text-lg"
          >
            <span className="text-white">{site.hero.subtextLead}</span>{" "}
            <span className="text-emerald-400">{site.hero.subtextHighlight}</span>{" "}
            {site.hero.subtextTail}{" "}
            <span className="text-emerald-400">{site.hero.subtextAccent}</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 px-6 py-3 text-sm font-medium text-emerald-400 transition hover:bg-emerald-500/10"
            >
              View My Work
              <ArrowIcon />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-white transition hover:border-white/50 hover:bg-white/5"
            >
              Get In Touch
              <ArrowIcon />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
