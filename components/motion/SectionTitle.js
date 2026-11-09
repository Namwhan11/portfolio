"use client";

import { motion } from "motion/react";
import { EASE, VIEW } from "@/lib/motion";
import SplitText from "./SplitText";

// Section heading: words rise from under a line, then the rule draws itself.
export default function SectionTitle({ id, title }) {
  return (
    <div>
      <SplitText as="h2" id={id} text={title} className="section-title" />
      <motion.span
        data-m
        aria-hidden="true"
        className="mt-6 block h-px w-full max-w-sm origin-left bg-line"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={VIEW}
        transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
      />
    </div>
  );
}
