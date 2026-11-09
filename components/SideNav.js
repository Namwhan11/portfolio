"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll } from "motion/react";
import { EASE, REDUCED, useMedia } from "@/lib/motion";
import DrawCheck from "./motion/DrawCheck";

export default function SideNav({ name, items }) {
  const [active, setActive] = useState("top");
  const reduced = useMedia(REDUCED);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const ids = ["top", ...items.map((i) => i.id)];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -54% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  const activeIndex = items.findIndex((i) => i.id === active);
  const current = items[activeIndex]?.label ?? "Intro";
  // Reduced motion: the bars step with the section instead of following scroll
  const progress = reduced ? (activeIndex + 1) / items.length : scrollYProgress;

  return (
    <>
      {/* Phone: thin top bar. Section name rolls up when it changes. */}
      <div className="fixed inset-x-0 top-0 z-30 h-11 border-b border-line bg-bg lg:hidden">
        <div className="flex h-full items-center justify-between px-6">
          <span className="font-display text-base">{name}</span>
          <span className="relative h-6 overflow-hidden text-sm text-muted">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={current}
                className="block leading-6"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.25, ease: EASE }}
              >
                {current}
              </motion.span>
            </AnimatePresence>
          </span>
        </div>
        <motion.div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-[-1px] h-[2px] origin-left bg-accent"
          style={{ scaleX: progress }}
        />
      </div>

      {/* Wide screens: checklist, its line fills as you scroll */}
      <div className="hidden border-r border-line lg:block">
        <nav
          aria-label="Sections"
          className="sticky top-0 flex h-svh flex-col justify-center pl-10 pr-6"
        >
          <a
            href="#top"
            className="nav-link link-run mb-10 self-start font-display text-xl"
          >
            {name}
          </a>
          <ul className="relative space-y-3">
            <span
              aria-hidden="true"
              className="absolute bottom-2 left-[7px] top-2 w-px bg-line"
            />
            <motion.span
              aria-hidden="true"
              className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-accent"
              style={{ scaleY: progress }}
            />
            {items.map((item, i) => {
              const isActive = item.id === active;
              const isRead = activeIndex > i;
              return (
                <li key={item.id} className="relative flex items-center gap-3">
                  <span
                    className={`inline-flex h-4 w-4 items-center justify-center border bg-bg ${
                      isRead || isActive ? "border-accent" : "border-line"
                    } ${isRead ? "text-accent" : ""}`}
                  >
                    {isRead && (
                      <>
                        <DrawCheck size={11} />
                        <span className="sr-only">passed</span>
                      </>
                    )}
                    {isActive && (
                      <motion.span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full bg-accent"
                        animate={
                          reduced
                            ? undefined
                            : { opacity: [1, 0.35, 1], scale: [1, 1.3, 1] }
                        }
                        transition={{
                          duration: 2.4,
                          ease: "easeInOut",
                          repeat: Infinity,
                        }}
                      />
                    )}
                  </span>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={`nav-link link-run ${isActive ? "font-semibold text-ink" : "text-muted"}`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
