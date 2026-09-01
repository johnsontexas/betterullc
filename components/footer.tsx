import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg brand-chip flex items-center justify-center">
                <span className="font-bold text-sm font-display">B</span>
              </div>
              <span className="text-foreground font-semibold tracking-wide font-display">BETTERU LLC</span>
            </div>
            <span className="brand-rule mb-4" />
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md mt-4">
              We build social apps around one idea: people get better, together. From social fitness
              to friendly competition, we make progress something you share.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-foreground font-medium mb-4 text-sm tracking-wide">Products</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://betteruai.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  BetterU Social Fitness
                </a>
              </li>
              <li>
                <Link href="/snapshot" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Snapshot
                </Link>
              </li>
              <li>
                <Link href="/cogtrack" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  CogTrack
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-foreground font-medium mb-4 text-sm tracking-wide">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/snapshot/privacy" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Snapshot Privacy
                </Link>
              </li>
              <li>
                <Link href="/snapshot/terms" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Snapshot Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} BetterU LLC. All rights reserved.
          </p>
          <a
            href="mailto:app@betterullc.com"
            className="text-primary hover:text-primary/80 transition-colors text-sm"
          >
            app@betterullc.com
          </a>
        </div>
      </div>
    </footer>
  );
}
