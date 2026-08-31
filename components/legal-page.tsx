import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface LegalPageProps {
  title: string;
  effectiveDate: string;
  backLink?: {
    href: string;
    label: string;
  };
  children: React.ReactNode;
}

export function LegalPage({ title, effectiveDate, backLink, children }: LegalPageProps) {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          {/* Back Link */}
          {backLink && (
            <Link
              href={backLink.href}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft size={16} />
              {backLink.label}
            </Link>
          )}

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {title}
            </h1>
            <p className="text-muted-foreground">
              <strong className="text-foreground">Effective Date:</strong> {effectiveDate}
            </p>
          </div>

          {/* Content */}
          <div className="prose max-w-none">
            <div className="space-y-8 text-muted-foreground">
              {children}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      <div className="space-y-3 leading-relaxed">{children}</div>
    </div>
  );
}

export function LegalSubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium text-foreground">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

export function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc list-inside space-y-1 ml-4">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
