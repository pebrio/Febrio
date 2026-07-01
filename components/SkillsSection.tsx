import SectionHeading from "./SectionHeading";
import SectionBackground from "./SectionBackground";
import SkillsAutoSlider from "./SkillsAutoSlider";

const skills = [
  { name: "IoT", category: "Arduino Uno" },
  { name: "Embedded Systems", category: "Arduino Uno" },
  { name: "Microsoft", category: "Administration" },
  { name: "Microsoft Teams", category: "Administration" },
  { name: "Automation", category: "Blynk IoT" },
  { name: "Helpdesk", category: "ERP" },
  { name: "Computer", category: "Troubleshooting" },
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
        title="Technologies I use to build solutions."
        description="A selection of tools and technologies I use for building digital products."
      />
      <SkillsAutoSlider skills={skills} />
      </div>
    </section>
  );
}

