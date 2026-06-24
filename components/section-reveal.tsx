"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { sectionRevealVariants } from "@/components/scroll-reveal";

type SectionRevealProps = {
  id: string;
  className?: string;
  children: ReactNode;
};

export function SectionReveal({ id, className = "", children }: SectionRevealProps) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.12, margin: "-70px" }}
      variants={sectionRevealVariants}
      className={className}
    >
      {children}
    </motion.section>
  );
}
