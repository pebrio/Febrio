"use client";

import { useEffect, useState } from "react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "Project", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const updateFromHash = () => {
      const hash = window.location.hash || "#home";
      setActive(hash);
    };

    updateFromHash();
    window.addEventListener("hashchange", updateFromHash);
    return () => window.removeEventListener("hashchange", updateFromHash);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-6 py-3 sm:px-8 lg:px-10">
        <a href="#home" className="text-sm font-black tracking-[0.28em] uppercase text-white">
          FEBRIYO
        </a>
        <nav className="ml-auto hidden items-center gap-3 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setActive(item.href)}
              className={`nav-link text-[11px] font-semibold uppercase tracking-[0.18em] transition ${
                active === item.href ? "nav-link-active" : "text-white/60"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
