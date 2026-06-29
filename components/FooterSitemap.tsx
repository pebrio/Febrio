const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function FooterSitemap() {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-white">
        Sitemap
      </h3>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="text-sm text-white/65 transition hover:text-orange-300"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
