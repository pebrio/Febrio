import Link from "next/link";
import { ArrowLeft, BriefcaseBusiness, CheckCircle2 } from "lucide-react";
import SectionBackground from "./SectionBackground";
import { getExperience } from "@/lib/experienceData";

type ExperienceDetailProps = {
  experienceId: string;
};

export default function ExperienceDetail({ experienceId }: ExperienceDetailProps) {
  const experience = getExperience(experienceId);

  if (!experience) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6 pt-24">
        <div className="text-center">
          <p className="text-sm text-white/60">Pengalaman tidak ditemukan.</p>
          <Link
            href="/experience"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-orange-300 hover:text-orange-200"
          >
            <ArrowLeft size={16} aria-hidden="true" /> Kembali ke pengalaman
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative isolate min-h-screen overflow-hidden px-6 pb-24 pt-32 sm:px-8 lg:px-10">
      <SectionBackground />
      <div className="relative z-10 mx-auto max-w-5xl">
        <Link
          href="/experience"
          className="inline-flex items-center gap-2 text-sm text-white/55 transition-colors hover:text-white"
        >
          <ArrowLeft size={16} aria-hidden="true" /> Kembali ke pengalaman
        </Link>

        <header className="mt-8 border-b border-white/10 pb-10">
          <div className="flex flex-wrap items-center gap-3 text-sm text-orange-300">
            <BriefcaseBusiness size={18} aria-hidden="true" />
            <span>{experience.period}</span>
          </div>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
            {experience.title}
          </h1>
          <p className="mt-3 text-lg text-orange-300">{experience.company}</p>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/70">
            {experience.summary}
          </p>
        </header>

        <div className="grid gap-6 pt-10 md:grid-cols-2">
          <section className="portfolio-card rounded-3xl p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-300/90">
              Riwayat Pekerjaan
            </p>
            <h2 className="mt-3 text-2xl font-bold text-white">Peran dan lingkungan kerja</h2>
            <p className="mt-4 leading-8 text-white/65">
              {experience.title} di {experience.company} pada periode {experience.period}.
              Pengalaman ini memperkuat kemampuan profesional melalui pekerjaan langsung dan kolaborasi dengan tim.
            </p>
          </section>

          <section className="portfolio-card rounded-3xl p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-300/90">
              Detail Pekerjaan
            </p>
            <h2 className="mt-3 text-2xl font-bold text-white">Tanggung jawab utama</h2>
            <ul className="mt-5 space-y-4 text-sm leading-7 text-white/70">
              {experience.responsibilities.map((responsibility) => (
                <li key={responsibility} className="flex gap-3">
                  <CheckCircle2 className="mt-1 shrink-0 text-orange-400" size={17} aria-hidden="true" />
                  <span>{responsibility}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="portfolio-card rounded-3xl p-6 sm:p-8 md:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-300/90">
              Kontribusi
            </p>
            <h2 className="mt-3 text-2xl font-bold text-white">Hasil dan pembelajaran</h2>
            <ul className="mt-5 grid gap-4 text-sm leading-7 text-white/70 md:grid-cols-2">
              {experience.achievements.map((achievement) => (
                <li key={achievement} className="flex gap-3">
                  <CheckCircle2 className="mt-1 shrink-0 text-orange-400" size={17} aria-hidden="true" />
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </section>

          {experience.documentationLinks && experience.documentationLinks.length > 0 && (
            <section className="portfolio-card rounded-3xl p-6 sm:p-8 md:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-300/90">
                Dokumentasi
              </p>
              <h2 className="mt-3 text-2xl font-bold text-white">Link terkait</h2>
              <div className="mt-5 flex flex-wrap gap-3">
                {experience.documentationLinks.map((link) => (
                  <a
                    key={`${link.label}-${link.href}`}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-full border border-orange-400/40 bg-orange-500/10 px-3 py-2 text-sm font-medium text-orange-200 transition hover:border-orange-300 hover:bg-orange-500/20 hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}