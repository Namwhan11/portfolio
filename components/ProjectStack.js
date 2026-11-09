"use client";

import { Children, createRef, useEffect, useMemo, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { STACK, useMedia } from "@/lib/motion";

function Item({ children, selfRef, nextRef, last, stack }) {
  // How far the NEXT case study has slid up (0 = not yet, 1 = fully covering)
  const { scrollYProgress } = useScroll({
    target: nextRef ?? selfRef,
    offset: ["start end", "start 0.2"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const dim = useTransform(scrollYProgress, [0, 1], [0, 0.55]);
  const active = stack && !last;

  // A card taller than the screen (e.g. case study open) sticks by its bottom
  // edge, so all of it can be read while scrolling.
  const [top, setTop] = useState(80);
  useEffect(() => {
    const el = selfRef.current;
    if (!el || !stack) return;
    const fit = () =>
      setTop(
        Math.min(80, Math.round(window.innerHeight - el.offsetHeight - 16)),
      );
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    window.addEventListener("resize", fit);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, [stack, selfRef]);

  return (
    <div
      ref={selfRef}
      style={stack ? { top } : undefined}
      className={`stack:sticky ${last ? "" : "mb-16 stack:mb-[28vh]"}`}
    >
      <motion.div
        style={active ? { scale, transformOrigin: "50% 0%" } : undefined}
        className="relative border border-line bg-bg p-5 md:p-8"
      >
        {children}
        {active && (
          <motion.div
            aria-hidden="true"
            style={{ opacity: dim }}
            className="pointer-events-none absolute inset-0 bg-bg"
          />
        )}
      </motion.div>
    </div>
  );
}

// Desktop: each case study sticks while the next slides up over it (the one
// underneath shrinks and darkens). Phone: a normal list.
export default function ProjectStack({ children }) {
  const items = Children.toArray(children);
  const n = items.length;
  const refs = useMemo(() => Array.from({ length: n }, () => createRef()), [n]);
  const stack = useMedia(STACK);
  return (
    <div>
      {items.map((child, i) => (
        <Item
          key={child.key ?? i}
          selfRef={refs[i]}
          nextRef={refs[i + 1]}
          last={i === n - 1}
          stack={stack}
        >
          {child}
        </Item>
      ))}
    </div>
  );
}
