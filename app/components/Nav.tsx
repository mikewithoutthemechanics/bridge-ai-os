"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#platform", label: "Platform" },
  { href: "#runtime", label: "Runtime" },
  { href: "#observability", label: "Observability" },
  { href: "#governance", label: "Governance" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 72);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The mobile sheet overlays the hero, so it keeps the light-on-dark treatment.
  const onDark = !scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "border-b border-line bg-paper/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-6 py-5 lg:px-10">
        <a
          href="#top"
          className={`font-display text-lg tracking-tight transition-colors duration-500 ${
            onDark ? "text-paper" : "text-ink"
          }`}
        >
          Bridge AI OS
        </a>

        <nav
          aria-label="Primary"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 md:flex"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-[13px] tracking-wide transition-colors duration-500 hover:opacity-100 ${
                onDark
                  ? "text-paper/75 hover:text-paper"
                  : "text-ink-soft hover:text-ink"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#"
            className={`hidden text-[13px] tracking-wide transition-colors duration-500 sm:block ${
              onDark
                ? "text-paper/75 hover:text-paper"
                : "text-ink-soft hover:text-ink"
            }`}
          >
            Sign in
          </a>
          <a
            href="#demo"
            className={`rounded-full border px-4 py-2 text-[13px] tracking-wide transition-colors duration-500 ${
              onDark
                ? "border-paper/40 text-paper hover:bg-paper hover:text-ink"
                : "border-ink/25 text-ink hover:bg-ink hover:text-paper"
            }`}
          >
            Book a demo
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className={`-mr-1 flex h-10 w-10 items-center justify-center md:hidden ${
              onDark ? "text-paper" : "text-ink"
            }`}
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute left-0 block h-px w-5 bg-current transition-all duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-5 bg-current transition-all duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav
          aria-label="Mobile"
          className="border-t border-paper/15 bg-night/95 backdrop-blur-md md:hidden"
        >
          <ul className="mx-auto flex max-w-[1600px] flex-col px-6 py-2">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-paper/10 py-4 font-display text-2xl text-paper"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}