"use client";

import { motion } from "motion/react";
import { REDUCED, useMedia } from "@/lib/motion";

// Small Bluetooth mark with slow rings spreading out. Still when reduced.
export default function BleIcon() {
  const reduced = useMedia(REDUCED);
  return (
    <span
      aria-hidden="true"
      className="relative inline-flex h-8 w-8 shrink-0 items-center justify-center"
    >
      {!reduced &&
        [0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute inset-0 rounded-full border border-muted"
            initial={{ scale: 0.5, opacity: 0.6 }}
            animate={{ scale: 1.9, opacity: 0 }}
            transition={{
              duration: 3,
              ease: "easeOut",
              repeat: Infinity,
              delay: i,
            }}
          />
        ))}
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="relative"
      >
        <path d="M7 7l10 10-5 5V2l5 5L7 17" />
      </svg>
    </span>
  );
}
