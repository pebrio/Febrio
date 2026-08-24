export type ExperienceIcon = "globe" | "tech" | "briefcase" | "education";

export type ExperienceLink = {
  label: string;
  href: string;
  type?: "news" | "instagram" | "website" | "document";
};

export type ExperienceItem = {
  id: string;
  title: string;
  company: string;
  period: string;
  summary: string;
  icon: ExperienceIcon;
  responsibilities: string[];
  achievements: string[];
  documentationLinks?: ExperienceLink[];
};

export const experiences: ExperienceItem[] = [
  {
    id: "it-helpdesk-tunas-dwipa-matra",
    title: "IT Helpdesk",
    company: "PT Tunas Dwipa Matra",
    period: "April - July 2026",
    summary:
      "Provided operational technical support, managed Odoo 18 ERP systems, and conducted Teds 2.0 testing with UAT reporting to ensure smooth business operations and efficient workflows.",
    icon: "globe",
    responsibilities: [
      "Memberikan dukungan teknis untuk kebutuhan operasional pengguna dan perangkat kerja.",
      "Mengelola serta membantu pemeliharaan sistem Odoo 18 ERP.",
      "Melakukan pengujian Teds 2.0 dan menyusun laporan UAT.",
    ],
    achievements: [
      "Mendukung kelancaran proses bisnis melalui penanganan kendala teknis yang terstruktur.",
      "Membantu memastikan fitur dan alur kerja sistem siap digunakan oleh tim terkait.",
    ],
    documentationLinks: [
      { label: "Google Drive", href: "https://www.google.com/search?q=PT+Tunas+Dwipa+Matra", type: "news" },
      { label: "Instagram", href: "https://www.instagram.com/", type: "instagram" },
    ],
  },
  {
    id: "housekeeping-20-kopi",
    title: "Housekeeping",
    company: "20 Kopi+",
    period: "October - December 2025",
    summary:
      "Maintained cleanliness, organization, and comfort across operational facilities while providing excellent service to ensure customer satisfaction.",
    icon: "tech",
    responsibilities: [
      "Menjaga kebersihan dan kerapian area operasional secara rutin.",
      "Memastikan fasilitas siap digunakan dan tetap nyaman bagi pelanggan.",
      "Memberikan pelayanan yang responsif untuk mendukung pengalaman pelanggan.",
    ],
    achievements: [
      "Membantu menjaga standar kebersihan dan kenyamanan selama operasional berlangsung.",
      "Mendukung kepuasan pelanggan melalui pelayanan yang konsisten.",
    ],
    documentationLinks: [
      // { label: "Berita/Promosi", href: "https://www.google.com/search?q=20+Kopi+Indonesia", type: "news" },
      // { label: "Instagram", href: "https://www.instagram.com/", type: "instagram" },
    ],
  },
  {
    id: "faculty-teaching-assistant-teknokrat",
    title: "Faculty Teaching Assistant",
    company: "Universitas Teknokrat Indonesia",
    period: "October 2024 - March 2026",
    summary:
      "Assisted programming, networking, and IoT labs while providing hardware/software technical support and managing lab administration and grading.",
    icon: "briefcase",
    responsibilities: [
      "Mendampingi praktikum pemrograman, jaringan komputer, dan IoT.",
      "Memberikan bantuan teknis untuk perangkat keras dan perangkat lunak laboratorium.",
      "Mengelola administrasi laboratorium serta membantu proses penilaian mahasiswa.",
    ],
    achievements: [
      "Membantu mahasiswa memahami materi dan menyelesaikan kendala saat praktikum.",
      "Menjaga kesiapan perangkat serta kelancaran administrasi kegiatan laboratorium.",
    ],
    documentationLinks: [
      { label: "Website universitas", href: "https://teknokrat.ac.id/", type: "website" },
      { label: "Instagram", href: "https://www.instagram.com/teknokratofficial/", type: "instagram" },
    ],
  },
  {
    id: "kampus-mengajar-batch-7",
    title: "Kampus Mengajar Batch 7",
    company: "Kemendikbud Ristek",
    period: "March - August 2024",
    summary:
      "Contributed to the Kampus Mengajar Batch 7 program by integrating technology with an automated bell system, school website development, and interactive learning media to improve student literacy and numeracy.",
    icon: "education",
    responsibilities: [
      "Mengembangkan sistem bel sekolah otomatis untuk membantu kegiatan operasional sekolah.",
      "Membangun website sekolah sebagai media informasi dan komunikasi.",
      "Membuat media pembelajaran interaktif untuk mendukung literasi dan numerasi siswa.",
    ],
    achievements: [
      "Mengintegrasikan solusi teknologi yang relevan dengan kebutuhan sekolah.",
      "Mendukung proses belajar yang lebih menarik melalui media pembelajaran interaktif.",
    ],
    documentationLinks: [
      { label: "Program Kampus Mengajar", href: "https://kampusmerdeka.kemdikbud.go.id/program/kampus-mengajar", type: "document" },
      { label: "Instagram", href: "https://www.instagram.com/kampusmerdeka/", type: "instagram" },
    ],
  },
];

export function getExperience(id: string) {
  return experiences.find((experience) => experience.id === id);
}