import { useSyncExternalStore } from "react";

// Shared motion settings. Change timing for the whole site here.
// (The CSS copies live in app/globals.css under :root — keep them in sync.)
export const EASE = [0.22, 1, 0.36, 1]; // the only easing used
export const EASE_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";
export const DUR = { in: 0.75, hover: 0.2 }; // seconds
export const STAGGER = 0.06; // seconds between siblings
export const RISE = 24; // px that blocks travel upward when they appear

// Hero timeline (seconds from page load)
export const HERO = {
  name: 0.1,
  role: 0.6,
  summary: 0.72,
  buttons: 0.84,
  runner: 0.95,
  runStart: 1.7,
};

// Reveal once, a little before the element is fully inside the screen
export const VIEW = { once: true, margin: "0px 0px -6% 0px" };

export const REDUCED = "(prefers-reduced-motion: reduce)";
export const FINE_HOVER = "(hover: hover) and (pointer: fine)";
export const STACK = "(min-width: 1024px) and (min-height: 880px)";

export function useMedia(query) {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(query);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
