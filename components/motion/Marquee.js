"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useTransform,
  useVelocity,
} from "motion/react";
import { useRef } from "react";
import { REDUCED, useMedia } from "@/lib/motion";

const wrap = (min, max, v) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

// Endless row of words. Slow by default, stops on hover, speeds up while the
// page is scrolling. direction: 1 moves right, -1 moves left.
// Reduced motion: a still, wrapped list instead.
export default function Marquee({
  items,
  direction = -1,
  speed = 0.9,
  className = "",
}) {
  const reduced = useMedia(REDUCED);
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const hovered = useRef(false);
  const factor = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    const target = hovered.current
      ? 0
      : 1 + Math.min(Math.abs(velocity.get()) / 500, 5);
    factor.current += (target - factor.current) * Math.min(1, delta / 180);
    x.set(x.get() + (direction * speed * factor.current * delta) / 1000);
  });
  const tx = useTransform(x, (v) => `${wrap(-50, 0, v)}%`);

  const list = (hidden) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center"
    >
      {items.map((t, i) => (
        <li key={i} className="marquee-item">
          {t}
        </li>
      ))}
    </ul>
  );

  if (reduced) {
    return (
      <ul className={`flex flex-wrap gap-x-8 gap-y-2 ${className}`}>
        {items.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    );
  }

  return (
    <div
      className={`overflow-hidden ${className}`}
      onPointerEnter={() => (hovered.current = true)}
      onPointerLeave={() => (hovered.current = false)}
    >
      <motion.div className="flex w-max" style={{ x: tx }}>
        {list(false)}
        {list(true)}
      </motion.div>
    </div>
  );
}
