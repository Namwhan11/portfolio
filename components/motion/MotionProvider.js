"use client";

import { useEffect } from "react";
import { MotionConfig } from "motion/react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { REDUCED, useMedia } from "@/lib/motion";
import GridGlow from "./GridGlow";

// Smooth scrolling (Lenis) + global motion settings.
// Lenis is off when the visitor prefers reduced motion.
export default function MotionProvider({ children }) {
  const reduced = useMedia(REDUCED);

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    let raf = requestAnimationFrame(function loop(time) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    });

    // In-page links (menu, buttons, Back to top) scroll through Lenis
    const onClick = (e) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const a = e.target.closest?.('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href").slice(1);
      const el = id ? document.getElementById(id) : null;
      if (!el) return;
      e.preventDefault();
      const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
      lenis.scrollTo(id === "top" ? 0 : el, {
        offset: -margin,
        duration: 1.4,
      });
      history.replaceState(null, "", `#${id}`);
      el.setAttribute("tabindex", "-1");
      el.focus({ preventScroll: true });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [reduced]);

  return (
    <MotionConfig reducedMotion="user">
      <GridGlow />
      <div className="relative z-[1]">{children}</div>
    </MotionConfig>
  );
}
