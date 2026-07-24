import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Grain } from "@/components/grain";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? "Recruiter Agent";

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — Autonomous job-application agent`,
    template: `%s — ${SITE_NAME}`,
  },
  description:
    "An autonomous agent that discovers, scores, tailors, and applies to jobs while you sleep — with a live instrument-panel dashboard.",
  applicationName: SITE_NAME,
  openGraph: {
    title: `${SITE_NAME} — Autonomous job-application agent`,
    description:
      "An autonomous agent that discovers, scores, tailors, and applies to jobs while you sleep.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-bg text-text antialiased">
        <Grain />
        <Nav />
        <div className="relative z-10 flex min-h-screen flex-col pt-14">
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
