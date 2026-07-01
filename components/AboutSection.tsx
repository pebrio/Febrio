import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import SectionBackground from "./SectionBackground";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative isolate overflow-hidden scroll-mt-28 px-6 py-24 sm:px-8 lg:px-10"
    >
      <SectionBackground />
      <div className="relative z-10 mx-auto max-w-10xl">
      <SectionHeading
        eyebrow="About"
        title="About Me"
        description="Fresh Graduate | Universitas Teknokrat Indonesia | Computer Engineering | 2025"
      />
      <ScrollReveal className="mt-10 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="portfolio-card rounded-3xl p-8">
          <p className="text-lg leading-8 text-white/75">
          A results-driven IT Support and Helpdesk professional with hands-on
          experience maintaining stable business systems. Specialized in first-
          line technical support, User Acceptance Testing (UAT), and ERP (Odoo
          18) administration to enhance digital workflow efficiency. With a
          Computer Engineering background, I combine analytical skills, application
          testing, and troubleshooting to keep technology running smoothly for both
          internal and external users.
          </p>
        </div>
        <div className="grid gap-4">
          <div className="portfolio-card rounded-2xl p-5">
            <p className="text-sm uppercase tracking-[0.25em] text-orange-400">
              Years Experience
            </p>
            <p className="mt-2 text-3xl font-black text-white">1+</p>
          </div>
          <div className="portfolio-card rounded-2xl p-5">
            <p className="text-sm uppercase tracking-[0.25em] text-orange-400">
              Projects Completed
            </p>
            <p className="mt-2 text-3xl font-black text-white">15+</p>
          </div>
        </div>
      </ScrollReveal>
      </div>
    </section>
  );
}
