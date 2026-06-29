import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import SectionBackground from "./SectionBackground";

const skills = [
  { name: "Laravel", category: "Backend" },
  { name: "PHP", category: "Backend" },
  { name: "React JS", category: "Frontend" },
  { name: "MySQL", category: "Database" },
  { name: "Tailwind CSS", category: "UI" },
  { name: "Node.js", category: "Backend" },
  { name: "Express JS", category: "Backend" },
];

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative isolate overflow-hidden scroll-mt-28 px-6 py-24 sm:px-8 lg:px-10"
    >
      <SectionBackground />
      <div className="relative z-10 mx-auto max-w-6xl">
      <SectionHeading
        eyebrow="Skills"
        title="Teknologi yang saya gunakan untuk membangun solusi."
        description="Bagian ini menampilkan skill utama agar pengunjung cepat menangkap stack yang Anda kuasai."
      />
      <ScrollReveal className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((skill) => (
          <div key={skill.name} className="portfolio-card rounded-2xl p-5">
            <p className="text-sm uppercase tracking-[0.28em] text-orange-400">
              {skill.category}
            </p>
          <h3 className="mt-3 text-xl font-semibold text-white">{skill.name}</h3>
        </div>
      ))}
      </ScrollReveal>
      </div>
    </section>
  );
}
