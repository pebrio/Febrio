"use client";

import ScrollReveal from "./ScrollReveal";

type Skill = {
  name: string;
  category: string;
};

type SkillsAutoSliderProps = {
  skills: Skill[];
};

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <div className="portfolio-card w-64 flex-shrink-0 cursor-pointer rounded-2xl p-5 transition transform hover:scale-105 active:scale-95">
      <p className="text-sm uppercase tracking-[0.28em] text-orange-400">
        {skill.category}
      </p>
      <h3 className="mt-3 text-xl font-semibold text-white">{skill.name}</h3>
    </div>
  );
}

export default function SkillsAutoSlider({ skills }: SkillsAutoSliderProps) {
  const loopedSkills = [...skills, ...skills];

  return (
    <ScrollReveal className="mt-10">
      <div className="skills-marquee relative overflow-hidden py-1">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-black/10 via-black/10 to-transparent sm:w-24"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-black/10 via-black/10 to-transparent sm:w-24"
          aria-hidden
        />
        <div className="skills-marquee-track flex w-max gap-4">
          {loopedSkills.map((skill, index) => (
            <SkillCard key={`${skill.name}-${index}`} skill={skill} />
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}
