"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import DrawCheck from "./motion/DrawCheck";
import { EASE, FINE_HOVER, HERO, REDUCED, useMedia } from "@/lib/motion";

const FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
const TIMES = [12, 18, 9, 24]; // ms shown at the end of each line
const SPIN_MS = 620; // how long each line "runs"
const TOTAL = "0.84s";

function Spinner() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % FRAMES.length), 80);
    return () => clearInterval(id);
  }, []);
  return (
    <span aria-hidden="true" className="inline-block w-[14px] text-center">
      {FRAMES[i]}
    </span>
  );
}

// Test runner panel: each line spins, then turns into a drawn ✓ with its time.
// The server HTML (and reduced motion) shows the finished state.
export default function TestRunner({ command, lines, summary }) {
  const n = lines.length;
  const reduced = useMedia(REDUCED);
  const fine = useMedia(FINE_HOVER);
  const [runId, setRunId] = useState(0);
  const [st, setSt] = useState({ started: true, step: n, finished: true });

  useEffect(() => {
    const timers = [];
    const at = (ms, fn) => timers.push(setTimeout(fn, ms));
    if (reduced) {
      at(0, () => setSt({ started: true, step: n, finished: true }));
    } else {
      let t = runId === 0 ? HERO.runStart * 1000 : 250;
      at(0, () => setSt({ started: false, step: 0, finished: false }));
      at(t, () => setSt((s) => ({ ...s, started: true })));
      for (let i = 0; i < n; i++) {
        t += SPIN_MS;
        const step = i + 1;
        at(t, () => setSt((s) => ({ ...s, step })));
      }
      at(t + 300, () => setSt((s) => ({ ...s, finished: true })));
    }
    return () => timers.forEach(clearTimeout);
  }, [runId, reduced, n]);

  // Follows the mouse a little (max 8px), mouse devices only
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.5 });
  const y = useSpring(my, { stiffness: 120, damping: 20, mass: 0.5 });
  useEffect(() => {
    if (reduced || !fine) return;
    const move = (e) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 16);
      my.set((e.clientY / window.innerHeight - 0.5) * 16);
    };
    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointermove", move);
      mx.set(0);
      my.set(0);
    };
  }, [reduced, fine, mx, my]);

  const { started, step, finished } = st;

  return (
    <motion.div style={{ x, y }}>
      <div
        role="group"
        aria-label="Sample test run"
        className="border border-line bg-panel font-mono text-sm md:text-base"
      >
        <div className="relative h-0.5 bg-line">
          <motion.div
            aria-hidden="true"
            initial={false}
            animate={{ scaleX: finished ? 1 : step / n }}
            transition={{ duration: 0.5, ease: EASE }}
            className="absolute inset-0 origin-left bg-accent"
          />
        </div>
        <div className="p-5 md:p-6">
          <p className="text-ink/60">$ {command}</p>
          <ul className="mt-4 space-y-2">
            {lines.map((l, i) => {
              const done = i < step;
              const running = started && !finished && i === step;
              return (
                <li
                  key={l}
                  className={`flex items-start gap-3 ${done || running ? "" : "invisible"}`}
                >
                  <span className="mt-1 inline-flex w-[14px] justify-center text-accent">
                    {done ? (
                      <>
                        <DrawCheck size={14} />
                        <span className="sr-only">passed:</span>
                      </>
                    ) : running ? (
                      <span className="text-ink">
                        <Spinner />
                      </span>
                    ) : null}
                  </span>
                  <span className="flex-1">{l}</span>
                  <motion.span
                    aria-hidden="true"
                    initial={false}
                    animate={{ opacity: done ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="text-sm text-ink/60"
                  >
                    {TIMES[i % TIMES.length]}ms
                  </motion.span>
                </li>
              );
            })}
          </ul>
          <p
            className={`mt-5 flex items-center border-t border-line pt-4 font-medium text-accent ${finished ? "" : "invisible"}`}
          >
            {summary} in {TOTAL}
            <span aria-hidden="true" className="caret" />
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setRunId((r) => r + 1)}
        disabled={!finished}
        className="btn-ghost mt-3 min-h-9 px-3 py-1 text-sm disabled:opacity-50"
      >
        Re-run
      </button>
    </motion.div>
  );
}
