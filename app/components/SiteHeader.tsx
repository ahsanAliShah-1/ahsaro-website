"use client";

import { useEffect, useState } from "react";
import MagneticButton from "./MagneticButton";

const links = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Hide on scroll down, reveal on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - last;
      setScrolled(y > 24);
      if (y < 120) setHidden(false);
      else if (delta > 6) setHidden(true);
      else if (delta < -6) setHidden(false);
      if (Math.abs(delta) > 6) last = y;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Escape closes the mobile menu.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const isHidden = hidden && !menuOpen;
  const glass = scrolled || menuOpen;

  return (
    <header
      onFocus={() => setHidden(false)}
      className={`fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none md:px-8 md:pt-5 ${
        isHidden ? "-translate-y-[130%]" : "translate-y-0"
      }`}
    >
      <div
        className={`mx-auto max-w-[1600px] border transition-colors duration-500 ${
          glass
            ? "border-white/10 bg-[#111111]/50 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-3 md:px-8 md:py-4">
          {/* Monogram, far left */}
          <a
            href="#"
            aria-label="AHSARO, back to top"
            className="flex items-center gap-4"
          >
            <svg
              width="38"
              height="38"
              viewBox="0 0 40 40"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M7 33 L20 7 L33 33"
                stroke="#F5F1E8"
                strokeWidth="3.5"
                strokeLinejoin="miter"
              />
              <path d="M13 24.5 H27" stroke="#F5F1E8" strokeWidth="3.5" />
              <circle cx="35" cy="33" r="2.4" fill="#B89B68" />
            </svg>
            <span className="hidden text-xs tracking-[0.35em] sm:inline">
              AHSARO
            </span>
          </a>

          {/* Links + CTA, far right (desktop) */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-10 md:flex"
          >
            {links.map((link) => (
              <a key={link.href} href={link.href} className="ahsaro-link text-sm">
                {link.label}
              </a>
            ))}
            <MagneticButton
              href="mailto:hello@ahsaro.com"
              variant="outline"
            >
              LET&apos;S TALK ↗
            </MagneticButton>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen((open) => !open)}
            className="text-sm tracking-[0.2em] md:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? "CLOSE" : "MENU"}
          </button>
        </div>

        {menuOpen && (
          <nav
            id="mobile-menu"
            aria-label="Mobile"
            className="flex flex-col gap-5 border-t border-white/10 px-5 py-6 text-sm md:hidden"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a href="mailto:hello@ahsaro.com">Contact us ↗</a>
          </nav>
        )}
      </div>
    </header>
  );
}