"use client";

import { useRef, useState } from "react";
import { CopyIcon } from "./Icons";
import DrawCheck from "./motion/DrawCheck";
import MagneticButton from "./motion/MagneticButton";

// "Copy email" leans toward the pointer; the label flips to "Copied ✓" for 2s.
export default function CopyEmail({ email, label, doneText }) {
  const [state, setState] = useState("idle"); // idle | done | failed
  const timer = useRef(null);

  async function copy() {
    let ok = false;
    try {
      await navigator.clipboard.writeText(email);
      ok = true;
    } catch {
      ok = false;
    }
    setState(ok ? "done" : "failed");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2000);
  }

  const done = state === "done";
  return (
    <>
      <MagneticButton>
        <button type="button" onClick={copy} className="btn-primary">
          <span className="flip" data-flipped={done}>
            <span className="flip-a">
              <CopyIcon />
              {label}
            </span>
            <span className="flip-b" aria-hidden="true">
              {doneText}
              <DrawCheck key={String(done)} size={16} />
            </span>
          </span>
        </button>
      </MagneticButton>
      <span
        role="status"
        aria-live="polite"
        className={state === "failed" ? "text-sm" : "sr-only"}
      >
        {done
          ? doneText
          : state === "failed"
            ? "Copy failed — use the address above"
            : ""}
      </span>
    </>
  );
}
