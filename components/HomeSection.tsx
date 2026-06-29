import ScrollReveal from "./ScrollReveal";
import AnimatedCounter from "./AnimatedCounter";
import ShapeGrid from "./ShapeGrid";

export default function HomeSection() {
  const stats = [
    { value: 1, suffix: "+", label: "Years experience" },
    { value: 10, suffix: "+", label: "Projects completed" },
    { value: 3, suffix: "", label: "Core services" },
  ];

  return (
    <section id="home" className="relative overflow-hidden scroll-mt-28">
      <div className="absolute inset-0 z-0">
        <ShapeGrid
          direction="diagonal"
          speed={0.18}
          squareSize={34}
          borderColor="rgba(255,255,255,0.16)"
          hoverFillColor="rgba(249,115,22,0.22)"
          shape="hexagon"
          hoverTrailAmount={4}
          className="opacity-70 mix-blend-screen"
        />
      </div>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_35%),linear-gradient(180deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.58)_50%,rgba(0,0,0,0.9)_100%)]" />
      <div className="relative z-10 mx-auto grid min-h-screen max-w-6xl items-center gap-12 px-6 py-24 lg:grid-cols-[1.2fr_0.8fr] lg:px-10">
        <ScrollReveal className="relative max-w-3xl">
          <p className="mb-5 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-orange-400 shadow-lg backdrop-blur">
            Available for Projects
          </p>
          <h1 className="max-w-3xl text-4xl font-black tracking-tight text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.35)] sm:text-6xl">
            Akhmad Febriyo Febriyansyah
          </h1>
          <div className="mt-4 flex flex-wrap gap-3">
            {["IT Helpdesk", "IoT Enthusiast"].map((role) => (
              <span
                key={role}
                className="portfolio-card rounded-full px-4 py-2 text-sm font-medium text-white/80"
              >
                {role}
              </span>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">
            Saya membangun website dan sistem digital yang efisien, responsif,
            dan mudah dipelihara, dengan fokus pada solusi yang membantu proses
            kerja berjalan lebih baik.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="https://drive.google.com/file/d/1vMVj9tFrC9DaCauJLrNig_TjPzkNYkhy/view?usp=drive_link" target="_blank" rel="noreferrer" className="portfolio-btn portfolio-btn-primary">
              Resume
            </a>
            {/* <a href="#contact" className="portfolio-btn portfolio-btn-secondary">
              Hubungi Saya
            </a> */}
            <a
              href="#projects"
              className="portfolio-btn border border-white/10 bg-white/5 text-white backdrop-blur transition hover:border-orange-400 hover:bg-white/10 hover:text-orange-300"
            >
              Lihat Project
            </a>
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
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {stats.map((item) => (
              <div key={item.label} className="portfolio-card rounded-2xl p-5">
                <p className="text-2xl font-bold text-white">
                  <AnimatedCounter end={item.value} suffix={item.suffix} />
                </p>
                <p className="mt-1 text-sm text-white/60">{item.label}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
        <ScrollReveal className="relative">
          <div className="portfolio-card relative overflow-hidden rounded-[2rem] p-6">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-white/5" />
            <div className="relative aspect-[4/5] rounded-[1.6rem] border border-white/10 bg-gradient-to-b from-white/10 via-white/5 to-transparent p-6">
              <div className="flex h-full flex-col justify-between">
                <div className="space-y-3">
                  <div className="h-4 w-24 rounded-full bg-white/20" />
                  <div className="h-10 w-40 rounded-2xl bg-white/15" />
                  <div className="h-10 w-52 rounded-2xl bg-orange-400/20" />
                </div>
                <div className="grid gap-3">
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-orange-300">
                      Focus
                    </p>
                    <p className="mt-2 text-sm text-white/80">
                      Web development, dashboard, dan IoT integration.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-orange-300">
                      Approach
                    </p>
                    <p className="mt-2 text-sm text-white/80">
                      Clean UI, fast delivery, dan struktur yang scalable.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
