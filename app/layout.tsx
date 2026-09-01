import type { Metadata, Viewport } from "next";
import { Inter, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "BetterU LLC - Get better, together",
  description:
    "BetterU LLC builds social apps around one idea: people improve faster with their friends in it with them. BetterU Social Fitness, Snapshot, and CogTrack.",
  keywords: ["BetterU", "social fitness", "snapshot", "cogtrack", "cognitive training", "mobile apps", "startup"],
  authors: [{ name: "BetterU LLC" }],
  openGraph: {
    title: "BetterU LLC - Get better, together",
    description: "Social apps for fitness, friendly competition, and progress you can see.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a8043",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${dmSans.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
