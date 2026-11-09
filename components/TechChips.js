"use client";

import { Stagger, StaggerItem } from "./motion/Reveal";

// Tech names appear one by one.
export default function TechChips({ tech }) {
  return (
    <Stagger as="ul" aria-label="Tech" className="mt-5 flex flex-wrap gap-2">
      {tech.split(", ").map((t) => (
        <StaggerItem
          as="li"
          key={t}
          y={8}
          className="border border-line px-3 py-1 text-sm"
        >
          {t}
        </StaggerItem>
      ))}
    </Stagger>
  );
}
