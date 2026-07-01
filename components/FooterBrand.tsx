import { TerminalSquare } from "lucide-react";

export default function FooterBrand() {
  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-orange-400/15 bg-orange-500/10 text-orange-300 shadow-[0_0_0_4px_rgba(245,158,11,0.1)]">
          <TerminalSquare className="h-5 w-5" />
        </div>
        <div>
          <p className="text-lg font-semibold text-white">Febri</p>
        </div>
      </div>
      {/* <p className="mt-4 max-w-sm text-sm leading-7 text-white/65">
        I build modern websites, dashboards, and digital solutions that are clean,
        fast, and easy to maintain.
      </p> */}
    </div>
  );
}
