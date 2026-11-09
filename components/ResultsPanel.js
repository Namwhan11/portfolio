"use client";

import { motion } from "motion/react";
import { EASE, VIEW } from "@/lib/motion";
import CountUp from "./motion/CountUp";
import DrawCheck from "./motion/DrawCheck";

// Test summary: numbers count up, a green bar fills for each passing group.
export default function ResultsPanel({ lines }) {
  return (
    <div
      role="group"
      aria-label="Test results"
      className="border border-line bg-panel p-4 font-mono text-sm"
    >
      <ul className="space-y-3">
        {lines.map((r) => {
          const numeric = /^\d+$/.test(r.count);
          return (
            <li key={r.text}>
              <div className="flex items-center gap-3">
                {r.passed ? (
                  <span className="text-accent">
                    <DrawCheck size={14} onView />
                    <span className="sr-only">passed:</span>
                  </span>
                ) : (
                  <span className="inline-block w-3.5" />
                )}
                <span>
                  {numeric ? <CountUp to={Number(r.count)} /> : r.count}{" "}
                  {r.text}
                  {r.passed && <span className="text-accent"> passed</span>}
                </span>
              </div>
              {numeric && r.passed && (
                <div aria-hidden="true" className="mt-2 h-0.5 bg-line">
                  <motion.div
                    data-m
                    className="h-full origin-left bg-accent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={VIEW}
                    transition={{ duration: 1.2, ease: EASE }}
                  />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
