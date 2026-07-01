type SectionBackgroundProps = {
  className?: string;
};

export default function SectionBackground({ className = "" }: SectionBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.01),rgba(255,255,255,0.02))]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:54px_54px] opacity-15" />
      <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-orange-500/12 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-orange-300/6 blur-3xl" />
    </div>
  );
}
