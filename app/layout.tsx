import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Editorial display serif — the signature voice of the brand.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "opsz"],
});

export const metadata: Metadata = {
  title: "PrepSync — AI Interview Prep",
  description:
    "Paste any job description. Get tailored interview questions. Practice with AI-scored feedback.",
  openGraph: {
    title: "PrepSync — AI Interview Prep",
    description:
      "Paste any job description. Get tailored interview questions. Practice with AI-scored feedback.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#0a0a0c] text-zinc-100">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
