import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import SectionBackground from "./SectionBackground";

const projects = [
  {
    name: "IoT-Based Room Monitoring System Using Blynk",
    description: "Developed a room attendance and facility control monitoring system using Blynk, capable of tracking entry/exit counts, displaying real-time sensor distances, and managing electrical devices like lights and fans automatically.",
    image: "/Febrio/images/Smart-Monitoring.jpeg",
  },
  {
    name: "AIoT Smoke Detection System with Digital Image Analysis",
    description: "Designed an AIoT smoke detection solution using MQ-137 gas sensors and digital image analysis to automate monitoring in public spaces such as malls and educational facilities.",
    image: "/Febrio/images/AloT.jpeg",
  },
  {
    name: "SMP 11 Maret Sumberagung Website",
    description: "Built a WordPress school website for SMP 11 Maret Sumberagung to share academic information, school activities, and communication between teachers, students, and parents.",
    image: "/Febrio/images/Smp11-Maret.png",
  },
];

export default function ProjectSection() {
  return (
    <section
      id="projects"
      className="relative isolate overflow-hidden scroll-mt-28 px-6 py-24 sm:px-8 lg:px-10"
    >
      <SectionBackground />
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Featured Projects"
          title="Top projects that best showcase my skills."
          description="A refined layout designed to highlight standout work with informative project details."
        />
        <ScrollReveal className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.name}
              className="portfolio-card group flex h-full flex-col rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-hover"
            >
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.name}
                  className="mb-6 h-80 w-full rounded-2xl object-cover"
                />
              ) : (
                <div className="mb-6 h-60 rounded-2xl bg-gradient-to-br from-orange-500/20 via-white/10 to-transparent" />
              )}
              <h3 className="text-xl font-semibold text-white">{project.name}</h3>
              <p className="mt-3 text-sm leading-6 text-white/70">
                {project.description}
              </p>
              <a
                href="#contact"
                className="mt-auto inline-flex items-center gap-3 pt-8 text-sm font-semibold text-white transition group-hover:text-orange-300"
              >
                View Details
                <span className="text-2xl leading-none transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </article>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
