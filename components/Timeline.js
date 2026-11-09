"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { REDUCED, useMedia } from "@/lib/motion";
import { Stagger, StaggerItem } from "./motion/Reveal";

function Dot({ progress, at }) {
  const bg = useTransform(progress, [at, at + 0.06], ["#0d1321", "#52b69a"]);
  const border = useTransform(
    progress,
    [at, at + 0.06],
    ["#3e5c76", "#52b69a"],
  );
  return (
    <motion.span
      aria-hidden="true"
      data-mc
      style={{ backgroundColor: bg, borderColor: border }}
      className="absolute -left-10 top-2.5 h-[15px] w-[15px] rounded-full border"
    />
  );
}

// Vertical line that draws as you scroll; each job's dot fills when it arrives.
export default function Timeline({ items }) {
  const ref = useRef(null);
  const reduced = useMedia(REDUCED);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "end 0.6"],
  });

  return (
    <div ref={ref} className="relative pl-10">
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-[7px] top-2 w-px bg-line"
      />
      <motion.span
        aria-hidden="true"
        className="absolute bottom-0 left-[7px] top-2 w-px origin-top bg-accent"
        style={{ scaleY: reduced ? 1 : scrollYProgress }}
      />
      <div className="space-y-12">
        {items.map((e, i) => (
          <div key={e.role} className="relative">
            {reduced ? (
              <span
                aria-hidden="true"
                className="absolute -left-10 top-2.5 h-[15px] w-[15px] rounded-full border border-accent bg-accent"
              />
            ) : (
              <Dot
                progress={scrollYProgress}
                at={(i / items.length) * 0.6 + 0.02}
              />
            )}
            <h3 className="text-3xl">{e.role}</h3>
            <p className="mt-2 max-w-3xl text-muted">
              {e.org} · {e.period}
            </p>
            <Stagger
              as="ul"
              className="mt-6 max-w-3xl list-disc space-y-2 pl-5 marker:text-line"
            >
              {e.points.map((pt) => (
                <StaggerItem as="li" key={pt} y={10}>
                  {pt}
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        ))}
      </div>
    </div>
  );
}
