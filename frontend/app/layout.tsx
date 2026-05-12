import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { TopProgressBar } from "@/components/shared/TopProgressBar";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ummah Foundation of Durham — Masjid Al-Ummah, Oshawa",
  description:
    "Home of Masjid Al-Ummah in Oshawa, ON. Daily prayers, Darul-Uloom UFD Alim & Hifz programs, Children's Madrasah, and the $10M masjid construction project.",
  metadataBase: new URL("https://ummahfoundation.ca"),
  openGraph: {
    title: "Ummah Foundation of Durham",
    description:
      "Building Masjid Al-Ummah — prayer space for 850 musallis in Oshawa, ON.",
    type: "website",
  },
  icons: { icon: "/logo-ufd.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="min-h-screen bg-cream font-sans text-ink antialiased overflow-x-hidden">
        <TopProgressBar />
        {children}
      </body>
    </html>
  );
}
