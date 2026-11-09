"use client";

import { useRef } from "react";
import Image from "next/image";
import { asset } from "@/lib/asset";
import { motion, useScroll, useTransform } from "motion/react";
import { REDUCED, useMedia } from "@/lib/motion";

// Screenshot inside a plain browser window. The image drifts slower than the
// frame while scrolling and zooms in slightly on hover.
export default function BrowserFrame({ src, alt, exists, ratio = "16 / 10" }) {
  const ref = useRef(null);
  const reduced = useMedia(REDUCED);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    ["-5%", reduced ? "-5%" : "5%"],
  );

  return (
    <figure className="border border-line bg-panel">
      <div
        aria-hidden="true"
        className="flex items-center gap-2 border-b border-line px-3 py-2"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-2.5 w-2.5 rounded-full border border-line"
          />
        ))}
      </div>
      <div
        ref={ref}
        style={{ aspectRatio: ratio }}
        className="group relative overflow-hidden bg-bg"
      >
        {exists ? (
          <motion.div
            style={{ y }}
            className="absolute inset-x-0 -inset-y-[6%]"
          >
            <Image
              src={asset(src)}
              alt={alt}
              fill
              sizes="(min-width: 1280px) 40vw, 90vw"
              className="object-cover object-top transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            />
          </motion.div>
        ) : (
          <div
            role="img"
            aria-label={`Placeholder: add the image at public${src}`}
            className="absolute inset-4 flex items-center justify-center border border-dashed border-line p-4 text-center text-muted"
          >
            <span>
              Add the screenshot here
              <br />
              <code className="font-mono text-sm text-ink">public{src}</code>
            </span>
          </div>
        )}
      </div>
    </figure>
  );
}
