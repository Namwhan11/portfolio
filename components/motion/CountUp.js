"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { animate, useInView } from "motion/react";
import { EASE, REDUCED, useMedia } from "@/lib/motion";

// Counts from 0 up to `to` when first seen. The final value is in the HTML.
export default function CountUp({ to, decimals = 0, duration = 1.4 }) {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -6% 0px" });
  const reduced = useMedia(REDUCED);
  const fmt = (v) => v.toFixed(decimals);

  useLayoutEffect(() => {
    if (ref.current) ref.current.textContent = fmt(reduced ? to : 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  useEffect(() => {
    if (reduced || !seen || !ref.current) return;
    const c = animate(0, to, {
      duration,
      ease: EASE,
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = fmt(v);
      },
    });
    return () => c.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seen, reduced, to, duration]);

  return (
    <>
      <span className="sr-only">{fmt(to)}</span>
      <span ref={ref} aria-hidden="true" className="tabular-nums">
        {fmt(to)}
      </span>
    </>
  );
}
