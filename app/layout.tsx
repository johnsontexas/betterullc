import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "BetterU LLC - Building Innovative Apps",
  description: "BetterU LLC creates innovative social apps including BetterU Social Fitness and Snapshot Assassin. Transform your potential with our cutting-edge solutions.",
  keywords: ["BetterU", "social fitness", "snapshot", "mobile apps", "startup"],
  authors: [{ name: "BetterU LLC" }],
  openGraph: {
    title: "BetterU LLC - Building Innovative Apps",
    description: "Transform your potential with our innovative social apps",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
