"use client";

import { useId, useState } from "react";
import { motion } from "motion/react";
import { DUR, EASE, REDUCED, useMedia } from "@/lib/motion";

// "Read the case study": expands the test strategy and the problems found.
// Opens instantly when the visitor prefers reduced motion.
export default function CaseStudy({ strategy, problems }) {
  const [open, setOpen] = useState(false);
  const reduced = useMedia(REDUCED);
  const id = useId();

  return (
    <div className="mt-6">
      <button
        type="button"
        className="btn-ghost"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          aria-hidden="true"
          className={`transition-transform duration-200 ${open ? "rotate-45" : ""}`}
        >
          <path d="M12 4v16M4 12h16" />
        </svg>
        {open ? "Hide the case study" : "Read the case study"}
      </button>

      <motion.div
        id={id}
        data-case
        inert={!open}
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: reduced ? 0 : DUR.in, ease: EASE }}
        className="overflow-hidden"
      >
        <div className="pt-8">
          <h4 className="font-display text-2xl">Test strategy</h4>
          <dl className="mt-4 divide-y divide-line border-y border-line">
            {strategy.map((s) => (
              <div key={s.label} className="py-3">
                <dt className="font-semibold">
                  {s.label}{" "}
                  <span className="font-normal text-muted">({s.tool})</span>
                </dt>
                <dd className="mt-1">{s.text}</dd>
              </div>
            ))}
          </dl>

          <h4 className="mt-10 font-display text-2xl">
            Problems I found and fixed
          </h4>
          <ol className="mt-4 space-y-6">
            {problems.map((p, i) => (
              <li
                key={p.problem}
                className="grid grid-cols-[1.5rem_1fr] gap-x-3"
              >
                <span className="pt-0.5 font-mono text-sm text-muted">
                  {i + 1}.
                </span>
                <div className="space-y-2">
                  <p>
                    <span className="mr-2 inline-block border border-line px-2 py-0.5 text-sm font-semibold">
                      Problem
                    </span>
                    {p.problem}
                  </p>
                  <p>
                    <span className="mr-2 inline-block border border-ink bg-panel px-2 py-0.5 text-sm font-semibold">
                      Fix
                    </span>
                    {p.fix}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </motion.div>
    </div>
  );
}
