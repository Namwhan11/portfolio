import SectionTitle from "./motion/SectionTitle";

export default function Section({ id, title, children }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="section scroll-mt-12 lg:scroll-mt-0"
    >
      <SectionTitle id={`${id}-title`} title={title} />
      <div className="mt-12 md:mt-16">{children}</div>
    </section>
  );
}
