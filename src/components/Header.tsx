"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/20 shadow-sm">
      <div className="container-max flex items-center justify-between px-4 sm:px-6 lg:px-8 h-18">
        <Link href="/" className="flex items-center gap-1">
          <img src="/belmek-logo.png" alt="Belmek Psychiatry" className="w-12 h-12 md:w-16 md:h-16 object-contain" />
          <div>
            <div className="font-bold text-sm md:text-lg text-gray-900 leading-tight" style={{ fontFamily: "var(--font-cinzel)" }}>
              Belmek Psychiatry
            </div>
            <div className="text-gray-400 font-medium text-[10px] md:text-sm tracking-tight -mt-1" style={{ fontFamily: "var(--font-cinzel)" }}>
              and Wellness
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "text-primary bg-primary/5"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50/50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:+14433398634" className="text-sm text-gray-500 hover:text-primary transition-colors font-medium">
            (443) 339-8634
          </a>
          <Link
            href="/contact"
            className="gold-primary text-white px-6 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-[#ab7b3b]/30"
          >
            Book Appointment
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2.5 rounded-xl text-gray-600 hover:bg-gray-50/50 transition-colors"
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-white/10 bg-white/95 backdrop-blur-xl">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive ? "text-primary bg-primary/5" : "text-gray-600 hover:bg-gray-50/50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-3 border-t border-gray-100 space-y-3">
              <a href="tel:+14433398634" className="block px-4 py-3 text-sm text-gray-500 font-medium">
                (443) 339-8634
              </a>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="block text-center gold-primary text-white px-5 py-3 rounded-xl text-sm font-semibold"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
