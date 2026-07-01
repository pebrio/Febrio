type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.4em] text-orange-300/90">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-8 text-white/70 sm:text-lg">
        {description}
      </p>
    </div>
  );
}
