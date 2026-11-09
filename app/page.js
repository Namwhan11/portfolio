import fs from "node:fs";
import path from "node:path";
import {
  profile,
  nav,
  intro,
  about,
  projects,
  skills,
  experience,
  contact,
} from "@/data/profile";
import SideNav from "@/components/SideNav";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import AboutPhoto from "@/components/AboutPhoto";
import CopyEmail from "@/components/CopyEmail";
import BrowserFrame from "@/components/BrowserFrame";
import ResultsPanel from "@/components/ResultsPanel";
import TechChips from "@/components/TechChips";
import BleIcon from "@/components/BleIcon";
import ProjectStack from "@/components/ProjectStack";
import CaseStudy from "@/components/CaseStudy";
import SuiteList from "@/components/SuiteList";
import Timeline from "@/components/Timeline";
import ScrubText from "@/components/motion/ScrubText";
import CountUp from "@/components/motion/CountUp";
import Marquee from "@/components/motion/Marquee";
import RollText from "@/components/motion/RollText";
import DrawCheck from "@/components/motion/DrawCheck";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { GitHubIcon, MailIcon } from "@/components/Icons";

const hasFile = (p) =>
  fs.existsSync(path.join(process.cwd(), "public", p.replace(/^\//, "")));

// "… GPA 3.38" -> the number counts up when seen
function FactValue({ value }) {
  const m = value.match(/^(.*GPA )(\d+\.\d+)(.*)$/);
  if (!m) return value;
  return (
    <>
      {m[1]}
      <CountUp to={parseFloat(m[2])} decimals={2} />
      {m[3]}
    </>
  );
}

function Project({ p, flip }) {
  const ble = p.points.some((pt) => pt.text.includes("BLE"));
  return (
    <article className="grid gap-8 xl:grid-cols-12 xl:items-start xl:gap-10">
      {p.images && (
        <div className={`space-y-6 xl:col-span-6 ${flip ? "xl:order-2" : ""}`}>
          {p.images.map((img) => (
            <BrowserFrame
              key={img.src}
              src={img.src}
              alt={img.alt}
              exists={hasFile(img.src)}
              ratio={img.ratio}
            />
          ))}
        </div>
      )}
      <div
        className={
          p.images
            ? `xl:col-span-6 ${flip ? "xl:order-1" : ""}`
            : "max-w-3xl xl:col-span-12"
        }
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-3xl md:text-4xl">{p.title ?? p.name}</h3>
            <p className="mt-2 text-muted">
              {p.kind} · {p.meta}
            </p>
          </div>
          {ble && <BleIcon />}
        </div>
        {p.summary && <p className="mt-6">{p.summary}</p>}
        <ul className="mt-6 space-y-3">
          {p.points.map((pt) => (
            <li key={pt.text}>
              {pt.label && (
                <strong className="font-semibold">{pt.label}. </strong>
              )}
              {pt.text}
            </li>
          ))}
        </ul>
        {p.results && (
          <div className="mt-6">
            <ResultsPanel lines={p.results.lines} />
            {p.results.caption && (
              <p className="mt-3 text-sm text-muted">{p.results.caption}</p>
            )}
          </div>
        )}
        {p.tech && <TechChips tech={p.tech} />}
        {p.link && (
          <a
            href={p.link.url}
            className="text-link link-run mt-5 inline-flex items-center gap-2"
          >
            <GitHubIcon />
            {p.link.label}
          </a>
        )}
        {p.strategy && (
          <CaseStudy strategy={p.strategy} problems={p.problems} />
        )}
      </div>
    </article>
  );
}

export default function Home() {
  const rows = [
    skills.groups.slice(0, 2).flatMap((g) => g.items),
    skills.groups.slice(2).flatMap((g) => g.items),
  ];

  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-accent focus:px-4 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>

      <div className="lg:grid lg:grid-cols-[15rem_minmax(0,1fr)]">
        <SideNav name={profile.name} items={nav} />

        <main className="min-w-0">
          <Hero name={profile.name} role={profile.role} intro={intro} />

          <div className="max-w-[74rem]">
            <Section id="about" title={about.title}>
              <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-14">
                <AboutPhoto photo={profile.photo} />
                <div className="min-w-0 flex-1">
                  <ScrubText
                    text={about.profile}
                    className="max-w-3xl text-xl"
                  />
                  <Stagger
                    as="dl"
                    className="mt-12 max-w-3xl divide-y divide-line border-y border-line"
                  >
                    {about.facts.map((f) => (
                      <StaggerItem
                        key={f.label}
                        className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6"
                      >
                        <dt className="text-muted">{f.label}</dt>
                        <dd>
                          <FactValue value={f.value} />
                        </dd>
                      </StaggerItem>
                    ))}
                  </Stagger>
                </div>
              </div>
            </Section>

            <Section id="projects" title={projects.title}>
              <ProjectStack>
                {projects.items.map((p, i) => (
                  <Project key={p.name} p={p} flip={i % 2 === 1} />
                ))}
              </ProjectStack>
            </Section>

            <Section id="skills" title={skills.title}>
              <div className="-mx-6 space-y-4 md:-mx-12">
                <Marquee
                  items={rows[0]}
                  direction={-1}
                  className="font-display text-4xl md:text-6xl"
                />
                <Marquee
                  items={rows[1]}
                  direction={1}
                  speed={0.75}
                  className="font-display text-4xl text-muted md:text-6xl"
                />
              </div>
              <div className="mt-16">
                <SuiteList groups={skills.groups} />
              </div>
            </Section>

            <Section id="experience" title={experience.title}>
              <Timeline items={experience.items} />
            </Section>

            <Section id="contact" title={contact.title}>
              <Reveal className="max-w-3xl">
                <p className="text-xl">{contact.text}</p>
                <a
                  href={`mailto:${profile.email}`}
                  className="roll-group mt-6 inline-block font-display text-[clamp(1.4rem,5.2vw,3rem)] leading-tight"
                >
                  <RollText text={profile.email} />
                </a>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <CopyEmail
                    email={profile.email}
                    label={contact.copy}
                    doneText={contact.copied}
                  />
                </div>
                <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-link link-run inline-flex items-center gap-2"
                  >
                    <MailIcon />
                    {contact.emailLink}
                  </a>
                  <a
                    href={profile.github.url}
                    className="text-link link-run inline-flex items-center gap-2"
                  >
                    <GitHubIcon />
                    {profile.github.label}
                  </a>
                </div>
              </Reveal>
              <Reveal className="mt-24 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
                <p className="flex items-center gap-2 font-mono text-sm">
                  <span className="text-accent">
                    <DrawCheck size={14} onView />
                  </span>
                  All checks passed
                </p>
                <a href="#top" className="btn-ghost">
                  Back to top
                </a>
              </Reveal>
              <p className="mt-6 text-sm text-muted">
                © {profile.year} {profile.name}
              </p>
            </Section>
          </div>
        </main>
      </div>
    </>
  );
}
