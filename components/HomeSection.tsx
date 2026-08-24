import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import AnimatedCounter from "./AnimatedCounter";
import MusicPlayer from "./MusicPlayer";

export default function HomeSection() {
  const stats = [
    { value: 1, suffix: "+", label: "Years experience" },
    { value: 15, suffix: "+", label: "Projects completed" },
    { value: 2, suffix: "", label: "Core Competencies" },
  ];

  return (
    <section id="home" className="relative overflow-hidden scroll-mt-28">
      <div className="relative z-10 mx-auto grid max-w-6xl items-stretch gap-10 px-4 py-16 sm:gap-12 sm:px-8 sm:py-20 lg:min-h-[calc(100svh-4rem)] lg:grid-cols-[1.12fr_0.88fr] lg:gap-10 lg:px-10 lg:py-16 xl:gap-16">

        <ScrollReveal className="relative flex h-full max-w-3xl flex-col justify-center">
          <p className="mb-5 inline-flex w-fit max-w-full rounded-full border border-orange-400/20 bg-white/5 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-300 shadow-[0_8px_20px_rgba(245,158,11,0.12)] backdrop-blur sm:px-4 sm:text-sm sm:tracking-[0.28em]">
            Available for Projects
          </p>
          <h1 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-tight text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.35)] sm:text-5xl lg:text-6xl">
            Akhmad Febriyo Febriyansyah
          </h1>
          <div className="mt-5 flex flex-wrap gap-2 sm:gap-3">
            {["IT Helpdesk", "IoT Enthusiast", "IT Support"].map((role) => (
              <span
                key={role}
                className="portfolio-card rounded-full px-3 py-2 text-xs font-medium text-white/80 sm:px-4 sm:text-sm"
              >
                {role}
              </span>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
            I build efficient, responsive, and maintainable websites and digital
            systems that help workflows run more smoothly.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="https://drive.google.com/file/d/1vMVj9tFrC9DaCauJLrNig_TjPzkNYkhy/view?usp=drive_link" target="_blank" rel="noreferrer" className="portfolio-btn portfolio-btn-primary">
              Resume
            </a>
            {/* <a href="#contact" className="portfolio-btn portfolio-btn-secondary">
              Contact Me
            </a> */}
            <Link
              href="/project"
              className="portfolio-btn portfolio-btn-secondary"
            >
              View Projects
            </Link>
          </div>

          <div className="mt-5">
            <MusicPlayer
              src="/Febrio/music/Evry.mp3"
              title="Evry"
              artist="Background Music"
            />
          </div>
          {/* <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/70">
            <a className="transition hover:text-orange-300" href="https://github.com/pebrio" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <span className="text-white/30">/</span>
            <a className="transition hover:text-orange-300" href="https://www.linkedin.com/in/akhmadfebriyo18/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <span className="text-white/30">/</span>
            <a className="transition hover:text-orange-300" href="https://www.instagram.com/adapebri_/" target="_blank" rel="noreferrer">
              Instagram
            </a>
          </div> */}
          <div className="mt-10 grid grid-cols-1 gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-4">
            {stats.map((item) => (
              <div key={item.label} className="portfolio-card rounded-2xl p-4 sm:p-5">
                <p className="text-xl font-bold text-white sm:text-2xl">
                  <AnimatedCounter end={item.value} suffix={item.suffix} />
                </p>
                <p className="mt-1 text-xs text-white/60 sm:text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
        <ScrollReveal className="relative">
          <div className="portfolio-card relative mx-auto w-full max-w-[440px] overflow-hidden rounded-[2rem] border border-white/10 p-4 sm:p-6 lg:mx-0 lg:p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-white/5" />
            <div className="relative flex h-full flex-col">
              <div className="relative rounded-[1.6rem] overflow-hidden border border-white/10">
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src="/Febrio/images/profile.png"
                    alt="Akhmad Febriyo Febriyansyah"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 400px"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                </div>
              </div>

              <div className="grid gap-3 pt-5 sm:pt-6">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-orange-300">
                    Focus
                  </p>
                  <p className="mt-2 text-sm text-white/80">
                    IT Helpdesk, IT Support, IoT.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-orange-300">
                    Approach
                  </p>
                  <p className="mt-2 text-sm text-white/80">
                    Clean UI, fast delivery, and scalable architecture.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
