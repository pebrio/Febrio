import FooterBrand from "./FooterBrand";
import FooterSitemap from "./FooterSitemap";
import FooterSocial from "./FooterSocial";
import FooterStatus from "./FooterStatus";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/95">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-4">
          <FooterBrand />
          <FooterSitemap />
          <FooterSocial />
          <FooterStatus />
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>{new Date().getFullYear()} Akhmad Febriyo Febriyansyah S.T.</p>
          <p>Built with Next.js, Tailwind CSS, and Lucide React.</p>
        </div>
      </div>
    </footer>
  );
}
