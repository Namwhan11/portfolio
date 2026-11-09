"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { REDUCED, useMedia } from "@/lib/motion";

const DIM = "#3e5c76";
const FULL = "#f0ebd8";

function Word({ word, progress, range }) {
  const color = useTransform(progress, range, [DIM, FULL]);
  return (
    <motion.span data-mc style={{ color }}>
      {word}
    </motion.span>
  );
}

// Each word changes from dim to full colour as you scroll past it.
export default function ScrubText({ text, className = "" }) {
  const ref = useRef(null);
  const reduced = useMedia(REDUCED);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.55"],
  });
  const words = text.split(" ");
  if (reduced) return <p className={className}>{text}</p>;
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => {
        const start = (i / words.length) * 0.85;
        return (
          <span key={i}>
            <Word
              word={w}
              progress={scrollYProgress}
              range={[start, start + 0.15]}
            />
            {i < words.length - 1 ? " " : null}
          </span>
        );
      })}
    </p>
  );
}
