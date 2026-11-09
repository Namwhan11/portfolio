"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { FINE_HOVER, REDUCED, useMedia } from "@/lib/motion";

const clamp = (v, m) => Math.max(-m, Math.min(m, v));

// Leans a little toward the pointer when it comes close (mouse devices only).
export default function MagneticButton({ children, strength = 0.3, max = 10 }) {
  const ref = useRef(null);
  const fine = useMedia(FINE_HOVER);
  const reduced = useMedia(REDUCED);
  const on = fine && !reduced;
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 28, mass: 0.6 });
  const y = useSpring(my, { stiffness: 260, damping: 28, mass: 0.6 });

  const move = (e) => {
    if (!on || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(clamp((e.clientX - (r.left + r.width / 2)) * strength, max));
    my.set(clamp((e.clientY - (r.top + r.height / 2)) * strength, max));
  };
  const leave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={leave}
      style={{ x, y }}
      className="-m-6 inline-block p-6"
    >
      {children}
    </motion.div>
  );
}
