"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { FINE_HOVER, REDUCED, useMedia } from "@/lib/motion";

const SIZE = 380;
const BRIGHT_GRID =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Cpath d='M48 0H0v48' fill='none' stroke='%23748cab' stroke-opacity='0.55' stroke-width='1'/%3E%3C/svg%3E\")";
const MASK = "radial-gradient(circle at center, #000 0%, transparent 70%)";

// The grid lines around the pointer get brighter. A moving window (masked)
// shows a brighter copy of the same grid, counter-moved so it stays aligned.
export default function GridGlow() {
  const reduced = useMedia(REDUCED);
  const fine = useMedia(FINE_HOVER);
  const [shown, setShown] = useState(false);
  const x = useSpring(useMotionValue(-SIZE), { stiffness: 220, damping: 32 });
  const y = useSpring(useMotionValue(-SIZE), { stiffness: 220, damping: 32 });
  const ix = useTransform(x, (v) => -v);
  const iy = useTransform(y, (v) => -v);
  const on = fine && !reduced;

  useEffect(() => {
    if (!on) return;
    const move = (e) => {
      x.set(e.clientX - SIZE / 2);
      y.set(e.clientY - SIZE / 2);
      setShown(true);
    };
    const leave = () => setShown(false);
    window.addEventListener("pointermove", move);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [on, x, y]);

  if (!on) return null;
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 overflow-hidden"
      initial={false}
      animate={{ opacity: shown ? 1 : 0 }}
      transition={{ duration: 0.4 }}
      style={{
        x,
        y,
        width: SIZE,
        height: SIZE,
        maskImage: MASK,
        WebkitMaskImage: MASK,
      }}
    >
      <motion.div
        className="absolute left-0 top-0"
        style={{
          x: ix,
          y: iy,
          width: "100vw",
          height: "100vh",
          backgroundImage: BRIGHT_GRID,
          backgroundSize: "48px 48px",
        }}
      />
    </motion.div>
  );
}
