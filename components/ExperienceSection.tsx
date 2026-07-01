import SectionBackground from "./SectionBackground";
import ScrollReveal from "./ScrollReveal";
import SectionHeading from "./SectionHeading";

type ExperienceItem = {
  title: string;
  company: string;
  period: string;
  summary: string;
  icon: "globe" | "tech" | "briefcase" | "education";
};

const experiences: ExperienceItem[] = [
  {
    title: "IT Helpdesk",
    company: "PT Tunas Dwipa Matra",
    period: "April - July 2026",
    summary:
      "Provided operational technical support, managed Odoo 18 ERP systems, and conducted Teds 2.0 testing with UAT reporting to ensure smooth business operations and efficient workflows.",
    icon: "globe",
  },
  {
    title: "Housekeeping",
    company: "20 Kopi+",
    period: "October - December 2025",
    summary:
      "Maintained cleanliness, organization, and comfort across operational facilities while providing excellent service to ensure customer satisfaction.",
    icon: "tech",
  },
  {
    title: "Faculty Teaching Assistant",
    company: "Universitas Teknokrat Indonesia",
    period: "October 2024 - March 2026",
    summary:
      "Assisted programming, networking, and IoT labs while providing hardware/software technical support and managing lab administration and grading.",
    icon: "briefcase",
  },
  {
    title: "Kampus Mengajar Batch 7",
    company: "Kemendikbud Ristek",
    period: "March - August 2024",
    summary:
      "Contributed to the Kampus Mengajar Batch 7 program by integrating technology with an automated bell system, school website development, and interactive learning media to improve student literacy and numeracy.",
    icon: "education",
  },
];

function TimelineIcon({ type }: { type: ExperienceItem["icon"] }) {
  const common = "h-5 w-5 text-orange-400";

  if (type === "tech") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
        <path
          d="M9 3h6l1 2.5 2.6 1.1-.2 2.8L21 11l-1.1 2.4.2 2.8-2.6 1.1L15 20H9l-1-2.5-2.6-1.1.2-2.8L3 11l1.1-2.4-.2-2.8L6.5 4.5 9 3Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M12 8.2a3.8 3.8 0 1 1 0 7.6 3.8 3.8 0 0 1 0-7.6Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    );
  }

  if (type === "briefcase") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
        <path
          d="M8 7V6.2A2.2 2.2 0 0 1 10.2 4h3.6A2.2 2.2 0 0 1 16 6.2V7"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M4.5 9.5h15a1.5 1.5 0 0 1 1.5 1.5v6.5A2.5 2.5 0 0 1 18.5 20h-13A2.5 2.5 0 0 1 3 17.5V11a1.5 1.5 0 0 1 1.5-1.5Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M3 13.5h18"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "education") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
        <path
          d="M12 4 2.8 8.5 12 13l9.2-4.5L12 4Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M6.3 10.2V14c0 1.6 2.6 3.5 5.7 3.5s5.7-1.9 5.7-3.5v-3.8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 8.5v6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
      <path
        d="M12 3a9 9 0 1 0 9 9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M3.8 9h16.4M3.8 15h16.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M12 3c2.6 2.3 4 5.2 4 9s-1.4 6.7-4 9c-2.6-2.3-4-5.2-4-9s1.4-6.7 4-9Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative isolate overflow-hidden scroll-mt-28 px-6 py-24 sm:px-8 lg:px-10"
    >
      <SectionBackground />
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Experience"
          title="Work and Internship Experience"
          description="A vertical timeline layout with alternating cards on both sides of the center line."
        />

        <div className="relative mt-14">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-orange-400/70 to-transparent md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-12 md:space-y-16">
            {experiences.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <ScrollReveal key={item.title}>
                  <div className="grid grid-cols-[2rem_1fr] gap-4 md:grid-cols-[1fr_5rem_1fr] md:items-center md:gap-8">
                    <div
                      className={`relative flex items-center md:col-start-2 md:row-start-1 ${
                        isLeft ? "md:justify-center" : "md:justify-center"
                      }`}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-orange-400/30 bg-white/5 shadow-[0_0_0_6px_rgba(249,115,22,0.06),0_0_30px_rgba(249,115,22,0.14)]">
                        <TimelineIcon type={item.icon} />
                      </div>
                    </div>

                    <div className="hidden md:block md:col-start-1 md:row-start-1 md:pr-10">
                      {isLeft ? (
                        <article className="portfolio-card rounded-3xl p-6 md:ml-auto md:max-w-xl">
                          <div className="flex flex-wrap items-start justify-between gap-4">
                            <div>
                              <h3 className="text-xl font-semibold text-white">
                                {item.title}
                              </h3>
                              <p className="mt-1 text-sm text-orange-400">
                                {item.company}
                              </p>
                            </div>
                            <span className="rounded-full border border-orange-400/25 bg-orange-500/10 px-3 py-1 text-sm font-semibold text-orange-300">
                              {item.period}
                            </span>
                          </div>
                          <p className="mt-4 text-sm leading-7 text-white/75">
                            {item.summary}
                          </p>
                        </article>
                      ) : null}
                    </div>

                    <div className="hidden md:block md:col-start-3 md:row-start-1 md:pl-10">
                      {!isLeft ? (
                        <article className="portfolio-card rounded-3xl p-6 md:max-w-xl">
                          <div className="flex flex-wrap items-start justify-between gap-4">
                            <div>
                              <h3 className="text-xl font-semibold text-white">
                                {item.title}
                              </h3>
                              <p className="mt-1 text-sm text-orange-400">
                                {item.company}
                              </p>
                            </div>
                            <span className="rounded-full border border-orange-400/25 bg-orange-500/10 px-3 py-1 text-sm font-semibold text-orange-300">
                              {item.period}
                            </span>
                          </div>
                          <p className="mt-4 text-sm leading-7 text-white/75">
                            {item.summary}
                          </p>
                        </article>
                      ) : null}
                    </div>

                    <div className="md:hidden">
                      <article className="portfolio-card rounded-3xl p-6">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div>
                            <h3 className="text-xl font-semibold text-white">
                              {item.title}
                            </h3>
                            <p className="mt-1 text-sm text-orange-400">
                              {item.company}
                            </p>
                          </div>
                          <span className="rounded-full border border-orange-400/25 bg-orange-500/10 px-3 py-1 text-sm font-semibold text-orange-300">
                            {item.period}
                          </span>
                        </div>
                        <p className="mt-4 text-sm leading-7 text-white/75">
                          {item.summary}
                        </p>
                      </article>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
