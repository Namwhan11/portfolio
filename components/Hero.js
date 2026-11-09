"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { HERO, REDUCED, useMedia } from "@/lib/motion";
import SplitText from "./motion/SplitText";
import { Reveal } from "./motion/Reveal";
import TestRunner from "./TestRunner";
import ScrollHint from "./ScrollHint";

export default function Hero({ name, role, intro }) {
  const ref = useRef(null);
  const reduced = useMedia(REDUCED);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // The hero moves slower than the page and fades a little as you leave it
  const y = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 140]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.9],
    [1, reduced ? 1 : 0.2],
  );

  return (
    <section
      ref={ref}
      id="top"
      aria-label="Intro"
      className="relative flex min-h-svh flex-col justify-center px-6 pb-28 pt-24 md:px-12"
    >
      <motion.div style={{ y, opacity }} className="inner w-full">
        <SplitText
          as="h1"
          block
          trigger="load"
          delay={HERO.name}
          text={intro.title}
          className="text-[clamp(3.75rem,13vw,11rem)]"
        />
        <div className="mt-8 grid gap-12 xl:grid-cols-[minmax(0,1fr)_24rem] xl:items-center">
          <div>
            <div>
              <div>
                <SplitText
                  as="p"
                  trigger="load"
                  delay={HERO.role}
                  text={name}
                  className="font-display whitespace-nowrap text-[clamp(1.75rem,4.2vw,3.5rem)] font-semibold leading-[1.05] tracking-tight"
                />
                <Reveal
                  as="p"
                  trigger="load"
                  delay={HERO.role + 0.1}
                  className="mt-3 font-display text-xl text-muted md:text-2xl"
                >
                  {role}
                </Reveal>
              </div>
            </div>
            <Reveal
              as="p"
              trigger="load"
              delay={HERO.summary}
              className="mt-8 max-w-xl text-lg"
            >
              {intro.summary}
            </Reveal>
            <Reveal
              trigger="load"
              delay={HERO.buttons}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a href="#projects" className="btn-primary">
                {intro.primary}
              </a>
              <a href="#contact" className="btn-ghost">
                {intro.secondary}
              </a>
            </Reveal>
          </div>
          <Reveal trigger="load" delay={HERO.runner}>
            <TestRunner
              command={intro.runner.command}
              lines={intro.runner.lines}
              summary={intro.runner.summary}
            />
          </Reveal>
        </div>
      </motion.div>
      <ScrollHint />
    </section>
  );
}
