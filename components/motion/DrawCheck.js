"use client";

import { motion } from "motion/react";
import { EASE, VIEW } from "@/lib/motion";

// A ✓ that draws itself (SVG stroke). onView: draw when scrolled into view,
// otherwise draw as soon as it is rendered.
export default function DrawCheck({
  size = 14,
  delay = 0,
  onView = false,
  className = "",
}) {
  const when = onView
    ? { whileInView: { pathLength: 1 }, viewport: VIEW }
    : { animate: { pathLength: 1 } };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <motion.path
        data-m
        d="M5 12.5l4.5 4.5L19 7.5"
        initial={{ pathLength: 0 }}
        transition={{ duration: 0.45, ease: EASE, delay }}
        {...when}
      />
    </svg>
  );
}
