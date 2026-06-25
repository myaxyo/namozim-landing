import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Namoz Vaqtlari 2026 — O'zbekiston | Bomdod, Peshin, Asr, Shom, Xufton",
  description:
    "O'zbekiston bo'ylab bugungi aniq namoz vaqtlari. Toshkent, Samarqand, Buxoro, Namangan, Andijon va boshqa shaharlar. Hanafiy mazhab, Muslim World League usuli. Bepul onlayn xizmat.",
  keywords: [
    "namoz vaqtlari",
    "namoz vaqti",
    "namoz vaqtlari bugun",
    "namoz vaqtlari toshkent",
    "bomdod vaqti",
    "peshin vaqti",
    "asr vaqti",
    "shom vaqti",
    "xufton vaqti",
    "prayer times uzbekistan",
    "prayer times tashkent",
    "namoz",
    "O'zbekiston",
    "tasbih",
    "zikr",
  ],
  openGraph: {
    title: "Namoz Vaqtlari — O'zbekiston bo'ylab aniq namoz vaqtlari",
    description: "Bugungi namoz vaqtlari: Bomdod, Peshin, Asr, Shom, Xufton. Hanafiy mazhab.",
    url: "https://namozim.uz",
    siteName: "Namozim",
    locale: "uz_UZ",
    type: "website",
  },
  alternates: {
    canonical: "https://namozim.uz",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Namozim — Namoz Vaqtlari",
              url: "https://namozim.uz",
              description: "O'zbekiston bo'ylab aniq namoz vaqtlari",
              inLanguage: "uz",
              publisher: {
                "@type": "Organization",
                name: "Prompter MChJ",
                url: "https://prompter.uz",
              },
            }),
          }}
        />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
