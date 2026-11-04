import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Raleway } from "next/font/google";
import { Suspense } from "react";
import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Nebiyou Daniel — Backend Engineer & AI Developer",
    template: "%s | Nebiyou Daniel",
  },
  description:
    "Backend Engineer & AI Developer in Addis Ababa, Ethiopia. Building reliable backend systems, APIs, databases, and AI-powered products. Learn More. Build Better.",
  keywords: [
    "Nebiyou Daniel",
    "backend engineer",
    "AI developer",
    "Go",
    "Python",
    "TypeScript",
    "PostgreSQL",
    "LLM",
    "RAG",
    "Addis Ababa",
    "Ethiopia",
  ],
  authors: [{ name: "Nebiyou Daniel" }],
  creator: "Nebiyou Daniel",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Nebiyou Daniel — Backend Engineer & AI Developer",
    description:
      "Building reliable backend systems and AI-powered products. Learn More. Build Better.",
    siteName: "Nebiyou Daniel",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nebiyou Daniel — Backend Engineer & AI Developer",
    description: "Learn More. Build Better.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${raleway.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <Suspense fallback={null}>
            {children}
          </Suspense>
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
