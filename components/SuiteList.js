"use client";

import { Stagger, StaggerItem } from "./motion/Reveal";
import DrawCheck from "./motion/DrawCheck";

// Skills as a test suite: each item gets a ✓ line by line.
export default function SuiteList({ groups }) {
  return (
    <dl className="max-w-4xl divide-y divide-line border-y border-line">
      {groups.map((g) => (
        <div
          key={g.label}
          className="grid gap-3 py-6 sm:grid-cols-[13rem_1fr] sm:gap-6"
        >
          <dt className="font-display text-xl">{g.label}</dt>
          <dd>
            <Stagger as="ul" className="space-y-1.5">
              {g.items.map((item, i) => (
                <StaggerItem
                  as="li"
                  key={item}
                  y={10}
                  className="flex items-center gap-3 text-lg"
                >
                  <span className="text-accent">
                    <DrawCheck size={14} onView delay={0.15 + i * 0.06} />
                  </span>
                  {item}
                </StaggerItem>
              ))}
            </Stagger>
          </dd>
        </div>
      ))}
    </dl>
  );
}
