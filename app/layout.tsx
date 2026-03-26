import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
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
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#09090b] text-zinc-100">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
