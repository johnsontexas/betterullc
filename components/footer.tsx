import Link from "next/link";
import { Instagram } from "lucide-react";
import { APPS } from "@/lib/apps";

export function Footer() {
  return (
    <footer className="relative bg-ink border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8 pt-16 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2">
            <div className="flex items-center gap-3">
              <span className="brand-chip w-8 h-8 rounded-full grid place-items-center font-display font-extrabold text-sm">
                B
              </span>
              <span className="font-display font-bold text-white">BetterU LLC</span>
            </div>
            <p className="mt-5 text-white/50 text-sm leading-relaxed max-w-sm">
              Social apps built around one idea: people get better, together.
            </p>
            <a
              href="https://www.instagram.com/betterullc"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
            >
              <Instagram size={16} />
              @betterullc
            </a>
          </div>

          <div>
            <h4 className="text-white/40 text-xs font-semibold tracking-[0.16em] uppercase mb-4">Apps</h4>
            <ul className="space-y-2.5">
              {APPS.map((a) => (
                <li key={a.id}>
                  {a.external ? (
                    <a
                      href={a.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: a.color }} />
                      {a.short}
                    </a>
                  ) : (
                    <Link
                      href={a.href}
                      className="group inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: a.color }} />
                      {a.short}
                      {a.status.startsWith("Coming") && <span className="text-xs text-white/35">· soon</span>}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white/40 text-xs font-semibold tracking-[0.16em] uppercase mb-4">Legal</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/privacy" className="text-white/70 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-white/70 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/snapshot/privacy" className="text-white/70 hover:text-white transition-colors">
                  Snapshot Privacy
                </Link>
              </li>
              <li>
                <Link href="/snapshot/terms" className="text-white/70 hover:text-white transition-colors">
                  Snapshot Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* oversized wordmark */}
        <p
          className="footer-mark mt-16 md:mt-20 font-display font-extrabold leading-[0.8] tracking-[-0.06em] select-none"
          aria-hidden
        >
          BetterU
        </p>

        <div className="mt-6 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row justify-between gap-3 text-sm text-white/45">
          <p>&copy; {new Date().getFullYear()} BetterU LLC</p>
          <a href="mailto:app@betterullc.com" className="hover:text-white transition-colors">
            app@betterullc.com
          </a>
        </div>
      </div>
    </footer>
  );
}
