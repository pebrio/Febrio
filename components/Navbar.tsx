"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Skills", href: "/skill" },
  { label: "Services", href: "/service" },
  { label: "Experience", href: "/experience" },
  { label: "Project", href: "/project" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-6 py-3 sm:px-8 lg:px-10">
        <Link href="/" className="text-sm font-black tracking-[0.28em] uppercase text-white">
          FEBRIYO
        </Link>
        <nav className="ml-auto hidden items-center gap-3 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link text-[11px] font-semibold uppercase tracking-[0.18em] transition ${
                  isActive ? "nav-link-active" : "text-white/60"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="ml-auto flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <div className="border-t border-white/10 bg-black/95 backdrop-blur-3xl md:hidden">
          <nav className="flex flex-col gap-2 px-6 py-4 sm:px-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-200 py-3 border-b border-white/5 last:border-b-0 ${
                    isActive ? "text-orange-400" : "text-white/60 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}


