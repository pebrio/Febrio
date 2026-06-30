import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import SectionBackground from "./SectionBackground";

const projects = [
  {
    name: "Sistem Monitoring Berbasis IoT Menggunakan Blynk",
    description: "Sistem informasi keuangan bisnis dengan dashboard, transaksi, dan laporan terintegrasi.",
  },
  {
    name: "Perancangan Sistem Pendeteksi Asap Rokok Menggunakan Citra Digital Berbasis AIoT",
    description: "Perancangan sistem AIoT untuk mendeteksi asap rokok melalui sinergi antara sensor gas MQ-137 dan analisis citra digital guna mendukung otomatisasi pemantauan pada tempat umum seperti Mall, Are pendidikan.",
  },
  {
    name: "Smartfert",
    description: "Mengembangkan sistem monitoring kehadiran dan kontrol fasilitas ruangan berbasis IoT menggunakan platform Blynk, yang mampu melacak jumlah mahasiswa masuk/keluar, memantau jarak sensor secara real-time, serta mengendalikan status perangkat listrik seperti lampu dan kipas secara otomatis.",
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
          title="Project unggulan yang paling merepresentasikan kemampuan saya."
          description="Bagian ini mengikuti referensi dengan tampilan project yang lebih menonjol dan informatif."
        />
        <ScrollReveal className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.name}
              className="portfolio-card group flex h-full flex-col rounded-3xl p-6 transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(29,78,216,0.16)]"
            >
              <div className="mb-6 h-40 rounded-2xl bg-gradient-to-br from-orange-500/20 via-white/10 to-transparent" />
              <h3 className="text-xl font-semibold text-white">{project.name}</h3>
              <p className="mt-3 text-sm leading-6 text-white/75">
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
