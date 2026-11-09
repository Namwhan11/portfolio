"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { REDUCED, useMedia } from "@/lib/motion";

// Dashed line with a small dot running down it; fades once you start scrolling.
export default function ScrollHint() {
  const reduced = useMedia(REDUCED);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 160], [1, reduced ? 1 : 0]);
  return (
    <motion.div
      aria-hidden="true"
      style={{ opacity }}
      className="absolute bottom-8 left-6 h-14 border-l border-dashed border-line md:left-12"
    >
      {!reduced && (
        <motion.span
          className="absolute -left-[3px] top-0 h-1.5 w-1.5 rounded-full bg-ink"
          animate={{ y: [0, 50], opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 2.2,
            ease: "easeInOut",
            repeat: Infinity,
            times: [0, 0.2, 0.8, 1],
          }}
        />
      )}
    </motion.div>
  );
}
