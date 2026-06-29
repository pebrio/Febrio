import SectionHeading from "./SectionHeading";
import ScrollReveal from "./ScrollReveal";
import SectionBackground from "./SectionBackground";
import { GithubIcon, InstagramIcon, LinkedinIcon, WhatsAppIcon } from "./SocialIcons";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/pebrio",
    icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/akhmadfebriyo18/",
    icon: LinkedinIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/adapebri_/",
    icon: InstagramIcon,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/6285267216405",
    icon: WhatsAppIcon,
  },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden scroll-mt-28 px-6 py-24 sm:px-8 lg:px-10"
    >
      <SectionBackground />
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Contact"
          title="Mari terhubung untuk project berikutnya."
          description="Menutup halaman dengan informasi kontak utama agar pengunjung bisa langsung menghubungi Anda."
        />
        <ScrollReveal className="portfolio-card mt-10 rounded-3xl p-8">
          <p className="max-w-2xl text-lg leading-8 text-white/75">
            Anda bisa menghubungi saya lewat email, telepon, atau media sosial
            untuk berdiskusi tentang website, dashboard, maupun solusi IoT.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-[1fr_0.9fr]">
            <div className="space-y-4">
              <a
                href="mailto:fermanf91@gmail.com"
                className="portfolio-btn portfolio-btn-primary w-full justify-center"
              >
                fermanf91@gmail.com
              </a>
              <a
                href="tel:+6285267216405"
                className="portfolio-btn portfolio-btn-secondary w-full justify-center"
              >
                +62 852 6721 6405
              </a>
            </div>
            <div className="grid gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/70 transition hover:border-white/15 hover:bg-white/8 hover:text-white"
                  >
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-xl transition ${
                        social.label === "GitHub"
                          ? "text-white/80 group-hover:text-white"
                          : social.label === "LinkedIn"
                            ? "text-sky-400 group-hover:text-sky-300"
                            : social.label === "Instagram"
                              ? "text-pink-400 group-hover:text-pink-300"
                              : "text-emerald-400 group-hover:text-emerald-300"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm font-medium">{social.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
