import { experiences } from "./experienceData";
import { SEED_PROJECTS } from "./seedProjects";

export function getPortfolioData() {
  let data = "";

  data += "### PROFIL & INFORMASI UMUM ###\n";
  data += "Nama Lengkap: Akhmad Febriyo Febriyansyah (Febrio)\n";
  data += "Peran / Bidang: IT Support, IT Helpdesk, IoT Enthusiast\n";
  data += "Pendidikan: Sarjana Teknik Komputer (Computer Engineering), Universitas Teknokrat Indonesia (Fresh Graduate 2025)\n";
  data += "Ringkasan Profil: Profesional IT Support dan IT Helpdesk yang berpengalaman dalam menjaga stabilitas sistem operasional dan bisnis. Memiliki spesialisasi dalam first-line technical support, User Acceptance Testing (UAT), administrasi ERP (Odoo 18), perancangan IoT, serta pemeliharaan hardware dan software jaringan.\n";
  data += "Resume / CV: https://drive.google.com/file/d/1vMVj9tFrC9DaCauJLrNig_TjPzkNYkhy/view?usp=drive_link\n\n";

  data += "### KONTAK & MEDIA SOSIAL ###\n";
  data += "Email: fahirfebrio18@gmail.com\n";
  data += "WhatsApp / Telepon: +6285896192273 (https://wa.me/6285896192273)\n";
  data += "LinkedIn: https://www.linkedin.com/in/akhmadfebriyo18/\n";
  data += "GitHub: https://github.com/pebrio\n";
  data += "Instagram: https://www.instagram.com/adapebri_/\n\n";

  data += "### KEAHLIAN & TEKNOLOGI (SKILLS) ###\n";
  data += "- Internet of Things (IoT) & Embedded Systems: Arduino Uno, ESP32, Blynk IoT Platform, Sensor MQ-137, MQ-135, Sensor Suhu Thermocouple, Sensor Jarak/Ultrasonik\n";
  data += "- IT Support & Helpdesk: Troubleshooting Komputer (Hardware & Software), Jaringan Komputer, Pemeliharaan Lab Komputer\n";
  data += "- ERP & Testing: Administrasi ERP Odoo 18, User Acceptance Testing (UAT), Teds 2.0 Testing\n";
  data += "- Administrasi & Office: Microsoft Office, Microsoft Teams, Pelaporan Kasir & Administrasi Operasional\n";
  data += "- Web Development: Next.js, React, Tailwind CSS, TypeScript, WordPress\n\n";

  data += "### LAYANAN / SERVICES YANG DITAWARKAN ###\n";
  data += "1. Monitoring Systems: Integrasi sensor dan dashboard web untuk monitoring fasilitas secara real-time.\n";
  data += "2. Landing Pages: Pembuatan halaman web promosi/portofolio yang modern, cepat, dan responsif.\n";
  data += "3. Automation Systems: Prototipe otomasi berbasis mikrokontroler dan sensor untuk mempermudah operasional.\n";
  data += "4. Education Systems: Solusi web sekolah untuk informasi akademik dan komunikasi.\n";
  data += "5. E-Commerce Platforms: Pembuatan platform informasi dan transaksi penjualan produk online.\n";
  data += "6. IoT Development: Pengembangan sistem kendali perangkat pintar dan dashboard IoT.\n\n";

  data += "### PENGALAMAN KERJA & ORGANISASI ###\n";
  experiences.forEach((exp) => {
    data += `Posisi: ${exp.title}\n`;
    data += `Instansi / Perusahaan: ${exp.company}\n`;
    data += `Periode: ${exp.period}\n`;
    data += `Ringkasan: ${exp.summary}\n`;
    data += `Tanggung Jawab: ${exp.responsibilities.join("; ")}\n`;
    data += `Pencapaian: ${exp.achievements.join("; ")}\n`;
    if (exp.documentationLinks && exp.documentationLinks.length > 0) {
      data += `Dokumentasi/Tautan: ${exp.documentationLinks.map(link => `${link.label} (${link.href})`).join(", ")}\n`;
    }
    data += "\n";
  });

  data += "### PROYEK PORTFOLIO ###\n";
  SEED_PROJECTS.forEach((project) => {
    data += `Nama Proyek: ${project.name}\n`;
    data += `Deskripsi: ${project.description}\n`;
    data += `Kategori: ${project.category}\n`;
    data += `Status: ${project.status}\n`;
    data += `Teknologi / Tag: ${project.tags.join(", ")}\n`;
    if (project.workItems && project.workItems.length > 0) {
      data += `Item Pekerjaan: ${project.workItems.map(item => item.title).join(", ")}\n`;
    }
    data += "\n";
  });

  return data;
}
