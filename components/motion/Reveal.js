"use client";

import { motion } from "motion/react";
import { DUR, EASE, RISE, STAGGER, VIEW } from "@/lib/motion";

const when = (t) =>
  t === "load" ? { animate: "show" } : { whileInView: "show", viewport: VIEW };

// Fade + rise, once, the first time it scrolls into view (or on load).
export function Reveal({
  as = "div",
  y = RISE,
  delay = 0,
  trigger = "view",
  children,
  ...rest
}) {
  const Tag = motion[as];
  return (
    <Tag
      data-m
      initial="hidden"
      variants={{
        hidden: { opacity: 0, y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: DUR.in, ease: EASE, delay },
        },
      }}
      {...when(trigger)}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// A parent whose <StaggerItem> children appear one after another.
export function Stagger({
  as = "div",
  delay = 0,
  trigger = "view",
  children,
  ...rest
}) {
  const Tag = motion[as];
  return (
    <Tag
      initial="hidden"
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: STAGGER, delayChildren: delay },
        },
      }}
      {...when(trigger)}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({ as = "div", y = 14, children, ...rest }) {
  const Tag = motion[as];
  return (
    <Tag
      data-m
      variants={{
        hidden: { opacity: 0, y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: DUR.in, ease: EASE },
        },
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
