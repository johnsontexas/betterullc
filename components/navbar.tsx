"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { APPS } from "@/lib/apps";

// Floating pill. Shows which app world you're scrolled into, in that app's colour.
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setCurrent(e.target.id);
          else setCurrent((c) => (c === e.target.id ? null : c));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    APPS.forEach((a) => {
      const el = document.getElementById(a.id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav className="fixed top-3 md:top-4 inset-x-3 md:inset-x-0 z-50 flex justify-center pointer-events-none">
        <div
          className={`pointer-events-auto flex items-center gap-1 w-full md:w-auto rounded-full border pl-2 pr-2 py-1.5 transition-colors duration-300 ${
            scrolled || open ? "bg-[#0d0f11]/90 border-white/10 backdrop-blur-md" : "bg-transparent border-transparent"
          }`}
        >
          <Link href="/" className="flex items-center gap-2.5 pl-1 pr-3" onClick={() => setOpen(false)}>
            <span className="brand-chip w-7 h-7 rounded-full grid place-items-center font-display font-extrabold text-[13px]">
              B
            </span>
            <span className="font-display font-bold text-white text-[14px] tracking-wide whitespace-nowrap">
              BetterU LLC
            </span>
          </Link>

          <div className="hidden md:flex items-center">
            {APPS.map((a) => {
              const on = current === a.id;
              return (
                <a
                  key={a.id}
                  href={`/#${a.id}`}
                  className="relative px-3.5 py-2 rounded-full text-[13px] transition-colors"
                  style={{ color: on ? "#07080a" : "rgba(255,255,255,0.7)", background: on ? a.color : "transparent" }}
                >
                  {a.short}
                </a>
              );
            })}
            <a href="/#team" className="px-3.5 py-2 rounded-full text-[13px] text-white/70 hover:text-white transition-colors">
              Team
            </a>
          </div>

          <a
            href="mailto:app@betterullc.com"
            className="hidden md:inline-flex ml-2 rounded-full bg-white text-black px-4 py-2 text-[13px] font-semibold hover:bg-white/90 transition-colors"
          >
            Say hi
          </a>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="md:hidden ml-auto w-10 h-10 grid place-items-center rounded-full text-white"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span className="relative block w-5 h-3">
              <span
                className={`absolute left-0 right-0 h-[2px] bg-white rounded transition-transform duration-300 ${
                  open ? "top-[5px] rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 right-0 h-[2px] bg-white rounded transition-transform duration-300 ${
                  open ? "top-[5px] -rotate-45" : "top-[10px]"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* phone menu: full screen, big type */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-[#07080a] transition-[opacity,visibility] duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="h-full flex flex-col justify-center px-7 pt-16">
          {APPS.map((a, i) => (
            <a
              key={a.id}
              href={`/#${a.id}`}
              onClick={() => setOpen(false)}
              className="menu-item flex items-baseline gap-3 py-2.5 border-b border-white/10"
              style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
              data-open={open}
            >
              <span className="font-mono text-xs" style={{ color: a.color }}>
                {a.n}
              </span>
              <span className="font-display font-extrabold text-white text-4xl tracking-[-0.03em]">{a.short}</span>
              <span className="ml-auto text-xs text-white/40">{a.tag}</span>
            </a>
          ))}
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-white/60 text-sm">
            <a href="/#team" onClick={() => setOpen(false)}>
              Team
            </a>
            <Link href="/privacy" onClick={() => setOpen(false)}>
              Privacy
            </Link>
            <Link href="/terms" onClick={() => setOpen(false)}>
              Terms
            </Link>
            <a href="mailto:app@betterullc.com">app@betterullc.com</a>
          </div>
        </div>
      </div>
    </>
  );
}
