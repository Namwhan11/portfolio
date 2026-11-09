"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { DUR, EASE, VIEW } from "@/lib/motion";

// Photo is revealed bottom-to-top (clip-path); the accent frame slides in
// right after it. Hover moves the frame closer (CSS `translate`, so it never
// fights the reveal's `transform`). Reduced motion / no JS: final state.
export default function AboutPhoto({ photo }) {
  return (
    <motion.div
      className="group relative mb-3 mr-3 w-60 max-w-full shrink-0"
      initial="hidden"
      whileInView="show"
      viewport={VIEW}
    >
      <motion.span
        aria-hidden="true"
        data-m
        variants={{
          hidden: { opacity: 0, x: -12, y: -12 },
          show: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: { duration: DUR.in, ease: EASE, delay: DUR.in * 0.5 },
          },
        }}
        className="absolute inset-0"
      >
        <span className="absolute inset-0 translate-x-3 translate-y-3 rounded-[4px] border border-accent transition-[translate] duration-200 ease-[var(--ease)] group-hover:translate-x-1.5 group-hover:translate-y-1.5" />
      </motion.span>
      <motion.div
        data-clip
        variants={{
          hidden: { clipPath: "inset(100% 0% 0% 0%)" },
          show: {
            clipPath: "inset(0% 0% 0% 0%)",
            transition: { duration: DUR.in, ease: EASE },
          },
        }}
        className="relative overflow-hidden rounded-[4px] bg-panel"
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          width={740}
          height={962}
          sizes="240px"
          className="block h-auto w-full"
        />
      </motion.div>
    </motion.div>
  );
}
