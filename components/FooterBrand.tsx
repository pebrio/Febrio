import { TerminalSquare } from "lucide-react";

export default function FooterBrand() {
  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-orange-400">
          <TerminalSquare className="h-5 w-5" />
        </div>
        <div>
          <p className="text-lg font-semibold text-white">Febri</p>
        </div>
      </div>
      <p className="mt-4 max-w-sm text-sm leading-7 text-white/65">
        Saya membangun website modern, dashboard, dan solusi digital yang rapi,
        cepat, dan mudah dikembangkan.
      </p>
    </div>
  );
}
