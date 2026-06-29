import { GithubIcon, InstagramIcon, LinkedinIcon, WhatsAppIcon } from "./SocialIcons";

const socials = [
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

export default function FooterSocial() {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-white">
        Social
      </h3>
      <ul className="mt-5 space-y-3">
        {socials.map((social) => {
          const Icon = social.icon;

          return (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 text-sm text-white/60 transition hover:text-white"
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition group-hover:border-white/15 group-hover:bg-white/8 ${
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
                <span>{social.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
