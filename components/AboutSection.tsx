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
      <div className="relative z-10 mx-auto max-w-6xl">
      <SectionHeading
        eyebrow="About"
        title="Tentang saya dan arah kerja yang saya bawa."
        description="Bagian ini mengikuti struktur referensi: penjelasan singkat, dua paragraf deskripsi, lalu ringkasan pengalaman dan jumlah project."
      />
      <ScrollReveal className="mt-10 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="portfolio-card rounded-3xl p-8">
          <p className="text-lg leading-8 text-white/75">
            Saya adalah developer yang fokus membangun aplikasi web yang cepat,
            rapi, dan nyaman dipakai. Saya terbiasa mengerjakan komponen UI,
            integrasi data, dan struktur aplikasi yang mudah dikembangkan.
          </p>
          <p className="mt-5 text-lg leading-8 text-white/65">
            Selain web development, saya juga memiliki minat di IoT dan
            troubleshooting sistem, sehingga saya terbiasa melihat masalah dari
            sisi teknis dan sisi pengguna secara bersamaan.
          </p>
        </div>
        <div className="grid gap-4">
          <div className="portfolio-card rounded-2xl p-5">
            <p className="text-sm uppercase tracking-[0.25em] text-orange-400">
              Years Experience
            </p>
            <p className="mt-2 text-3xl font-black text-white">2+</p>
          </div>
          <div className="portfolio-card rounded-2xl p-5">
            <p className="text-sm uppercase tracking-[0.25em] text-orange-400">
              Projects Completed
            </p>
            <p className="mt-2 text-3xl font-black text-white">20+</p>
          </div>
        </div>
      </ScrollReveal>
      </div>
    </section>
  );
}
