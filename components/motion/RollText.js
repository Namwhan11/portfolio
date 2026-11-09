// Letters roll up one by one when the parent link (.roll-group) is hovered
// or focused. The styles are in app/globals.css (.roll-l).
export default function RollText({ text }) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {[...text].map((ch, i) => (
          <span key={i} className="roll-l" style={{ "--d": `${i * 18}ms` }}>
            <span>{ch === " " ? " " : ch}</span>
            <span>{ch === " " ? " " : ch}</span>
          </span>
        ))}
      </span>
    </>
  );
}
