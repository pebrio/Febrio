import SectionHeading from "./SectionHeading";
import SectionBackground from "./SectionBackground";
import SkillsAutoSlider from "./SkillsAutoSlider";

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
      <SkillsAutoSlider skills={skills} />
      </div>
    </section>
  );
}

