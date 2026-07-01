import { Download, Mail, PhoneCall } from "lucide-react";
import type { ComponentType } from "react";

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
    href: "https://wa.me/6285896192273",
    icon: WhatsAppIcon,
  },
];

function ContactLine({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="group flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 bg-opacity-5 px-4 py-4 transition duration-300 hover:-translate-y-0.5 hover:border-orange-400/30 hover:bg-white/10"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#141414] text-orange-300 shadow-[0_0_0_1px_rgba(255,255,255,0.05)] transition duration-300 group-hover:scale-105 group-hover:bg-[#1a1a1a] group-hover:text-orange-200">
        <Icon className="h-6 w-6" />
      </span>
      <span>
        <span className="block text-sm font-medium text-orange-300/75">{label}</span>
        <span className="block text-lg font-semibold tracking-tight text-white">
          {value}
        </span>
      </span>
    </a>
  );
}

function SocialButton({
  icon: Icon,
  href,
  label,
}: {
  icon: ComponentType<{ className?: string }>;
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-orange-300 transition duration-300 hover:-translate-y-0.5 hover:border-orange-400/30 hover:bg-white/10 hover:text-orange-200"
    >
      <Icon className="h-5 w-5" />
    </a>
  );
}

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
          title="Let's connect for your next project."
          description="Reach out by email or phone on the left, and explore social links and action buttons on the right."
        />

        <ScrollReveal className="mt-10">
          <div className="portfolio-card grid gap-8 rounded-[2rem] p-6 md:p-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <ContactLine
                icon={Mail}
                label="Email Me At"
                value="fahirfebrio18@gmail.com"
                href="mailto:fahirfebrio18@gmail.com"
              />
              <ContactLine
                icon={PhoneCall}
                label="Call Me At"
                value="WhatsApp"
                href="https://wa.me/6285896192273"
              />
            </div>

            <div className="flex flex-col justify-between gap-6">
              <div className="flex justify-start gap-3 sm:justify-end">
                {socialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <SocialButton
                      key={social.label}
                      icon={Icon}
                      href={social.href}
                      label={social.label}
                    />
                  );
                })}
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <a
                  href="https://wa.me/6285896192273"
                  className="portfolio-btn portfolio-btn-primary flex h-14 items-center justify-center rounded-2xl text-base"
                >
                  Hire Me
                </a>
                <a
                  href="https://drive.google.com/file/d/1vMVj9tFrC9DaCauJLrNig_TjPzkNYkhy/view?usp=drive_link"
                  target="_blank"
                  rel="noreferrer"
                  className="portfolio-btn portfolio-btn-secondary flex h-14 items-center justify-center rounded-2xl text-base"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Resume
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
