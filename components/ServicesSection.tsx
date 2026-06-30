import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import SectionBackground from "./SectionBackground";

const services = [
  {
    title: "Company Profiles",
    description:
      "Website profil perusahaan yang elegan, cepat, dan fokus pada konversi.",
  },
  {
    title: "Landing Pages",
    description:
      "Halaman promosi dengan struktur jelas untuk menangkap perhatian dan lead.",
  },
  {
    title: "Business Systems",
    description:
      "Aplikasi internal untuk mengelola alur kerja, data operasional, dan laporan.",
  },
  {
    title: "Education Systems",
    description:
      "Sistem sekolah atau LMS yang membantu administrasi dan akses informasi.",
  },
  {
    title: "E-Commerce Systems",
    description:
      "Platform jual-beli online yang rapi, aman, dan mudah digunakan.",
  },
  {
    title: "IoT Development",
    description:
      "Dashboard monitoring dan kontrol perangkat untuk solusi berbasis IoT.",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative isolate overflow-hidden scroll-mt-28 px-6 py-24 sm:px-8 lg:px-10"
    >
      <SectionBackground />
      <div className="relative z-10 mx-auto max-w-6xl">
      <SectionHeading
        eyebrow="Services"
        title="Layanan yang bisa saya bantu bangun."
        description="Struktur ini mengikuti referensi: kumpulan service card yang menjelaskan jenis pekerjaan atau produk yang dapat Anda tawarkan."
      />
      <ScrollReveal className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <article key={service.title} className="portfolio-card rounded-3xl p-6 transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(29,78,216,0.16)] cursor-pointer">
            <div className="mb-5 h-12 w-12 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600" />
            <h3 className="text-xl font-semibold text-white">{service.title}</h3>
            <p className="mt-3 text-sm leading-6 text-white/75">
              {service.description}
            </p>
          </article>
        ))}
      </ScrollReveal>
      </div>
    </section>
  );
}

