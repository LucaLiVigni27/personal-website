type SectionHeadingProps = {
  id?: string;
  eyebrow?: string;
  title: string;
};

export function SectionHeading({ id, eyebrow, title }: SectionHeadingProps) {
  return (
    <div id={id} className="scroll-mt-28">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-400">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}
