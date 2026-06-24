"use client";

import { motion } from "framer-motion";

export function ScrollIndicator() {
  return (
    <motion.a
      href="#projects"
      aria-label="Scroll to explore projects"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-auto absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3 text-neutral-400"
    >
      <div className="relative flex h-10 w-6 items-start justify-center rounded-full border border-emerald-500/30 pt-2">
        <motion.span
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.45)]"
        />
      </div>
      <span className="text-[10px] font-medium uppercase tracking-[0.35em]">
        Scroll to explore
      </span>
    </motion.a>
  );
}
