"use client";

import { motion } from "motion/react";
import { EASE, STAGGER, VIEW } from "@/lib/motion";

// Words rise out from under a line (mask reveal), one after another.
// block: one word per line (used for the name in the hero).
export default function SplitText({
  text,
  as = "span",
  block = false,
  delay = 0,
  trigger = "view",
  className = "",
  ...rest
}) {
  const Tag = motion[as];
  const words = text.split(" ");
  return (
    <Tag
      initial="hidden"
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: STAGGER * 2, delayChildren: delay },
        },
      }}
      {...(trigger === "load"
        ? { animate: "show" }
        : { whileInView: "show", viewport: VIEW })}
      className={className}
      {...rest}
    >
      {words.map((w, i) => (
        <span key={i}>
          <span
            className={`${block ? "block" : "inline-block align-bottom"} overflow-hidden`}
            style={{
              padding: "0.08em 0.04em 0.16em",
              margin: "-0.08em -0.04em -0.16em",
            }}
          >
            <motion.span
              data-m
              className="inline-block"
              variants={{
                hidden: { y: "115%" },
                show: { y: 0, transition: { duration: 0.9, ease: EASE } },
              }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
