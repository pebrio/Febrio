"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { getProjectAccessRole, setProjectAccessRole, isProjectAdmin } from "@/lib/projectAccess";

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
  const [loggedIn, setLoggedIn] = useState(false);
  const isProjectPage = pathname.includes("/project");
  const isLoginPage = pathname === "/login";

  useEffect(() => {
    const syncAccess = () => {
      setLoggedIn(isProjectAdmin(getProjectAccessRole()));
    };

    syncAccess();
    window.addEventListener("storage", syncAccess);
    window.addEventListener("projectAccessChanged", syncAccess);
    return () => {
      window.removeEventListener("storage", syncAccess);
      window.removeEventListener("projectAccessChanged", syncAccess);
    };
  }, []);

  if (isLoginPage) {
    return null;
  }

  const handleLogout = () => {
    setProjectAccessRole("guest");
    setLoggedIn(false);
    window.dispatchEvent(new Event("projectAccessChanged"));
  };

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
        {isProjectPage && (
          <div className="hidden md:flex items-center gap-2 ml-4 pl-4 border-l border-white/10">
            {loggedIn ? (
              <button
                onClick={handleLogout}
                className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-400 px-4 py-2 rounded-lg border border-orange-400/30 hover:bg-orange-400/10 transition"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="text-xs font-semibold uppercase tracking-[0.18em] text-white px-4 py-2 rounded-lg bg-orange-400 hover:bg-orange-500 transition"
              >
                Admin Login
              </Link>
            )}
          </div>
        )}
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
            {isProjectPage && (
              <div className="space-y-2 py-3 border-t border-white/10 pt-4 mt-2">
                {loggedIn ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-400 px-4 py-2 rounded-lg border border-orange-400/30 hover:bg-orange-400/10 transition w-full"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="text-xs font-semibold uppercase tracking-[0.18em] text-white px-4 py-2 rounded-lg bg-orange-400 hover:bg-orange-500 transition w-full"
                  >
                    Admin Login
                  </Link>
                )}
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}


