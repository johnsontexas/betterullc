import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">B</span>
              </div>
              <span className="text-foreground font-medium tracking-wide">BETTERU LLC</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              Building innovative apps that transform how people connect, compete, and improve. 
              From social fitness to strategic gaming, we create experiences that matter.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-foreground font-medium mb-4 text-sm tracking-wide">Products</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://apps.apple.com/us/app/betteru-social-fitness/id6744857930"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  BetterU Social Fitness
                </a>
              </li>
              <li>
                <Link href="/snapshot" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Snapshot Assassin
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
