"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#team", label: "Team" },
  { href: "/snapshot", label: "Snapshot" },
  { href: "/cogtrack", label: "CogTrack" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-primary-foreground/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-full bg-primary-foreground flex items-center justify-center">
              <span className="text-primary font-bold text-sm">B</span>
            </div>
            <span className="text-primary-foreground font-medium tracking-wide text-lg font-display whitespace-nowrap">
              BETTERU LLC
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-5 lg:gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm tracking-wide"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://apps.apple.com/us/app/betteru-social-fitness/id6744857930"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary-foreground text-primary px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-primary-foreground/90 transition-colors whitespace-nowrap"
            >
              Get the App
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-primary-foreground p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-primary-foreground/10 pt-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm tracking-wide"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://apps.apple.com/us/app/betteru-social-fitness/id6744857930"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-foreground text-primary px-5 py-2.5 rounded-lg font-medium text-sm text-center hover:bg-primary-foreground/90 transition-colors"
              >
                Get the App
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
