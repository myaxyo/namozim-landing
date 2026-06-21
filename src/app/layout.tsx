import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Namozim — Namoz Vaqtlari, Tasbih, Zikr",
  description:
    "O'zbekiston uchun aniq namoz vaqtlari, tasbih hisoblagich va namoz kuzatish. Hanafiy mazhabiga mos. Bepul yuklab oling.",
  keywords: [
    "namoz vaqti",
    "namoz vaqtlari",
    "tasbih",
    "zikr",
    "islom",
    "muslim",
    "O'zbekiston",
    "prayer times",
    "uzbekistan",
  ],
  openGraph: {
    title: "Namozim — Namoz Vaqtlari, Tasbih",
    description: "O'zbekiston uchun aniq namoz vaqtlari va tasbih hisoblagich",
    url: "https://namozim.uz",
    siteName: "Namozim",
    locale: "uz_UZ",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
