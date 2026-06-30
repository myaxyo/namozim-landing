import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { JsonLd } from "@/components/JsonLd";
import { hreflangAlternates, SITE_URL } from "@/lib/seo";
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
  metadataBase: new URL(SITE_URL),
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
    alternateLocale: ["ru_RU", "en_US"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Namoz Vaqtlari — O'zbekiston | Namozim",
    description:
      "O'zbekiston bo'ylab bugungi aniq namoz vaqtlari. Hanafiy mazhab, Muslim World League usuli.",
  },
  alternates: {
    canonical: "https://namozim.uz",
    languages: hreflangAlternates(""),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#0E7C6B",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": `${SITE_URL}/#organization`,
                name: "Namozim",
                url: SITE_URL,
                logo: `${SITE_URL}/icon-512.png`,
                sameAs: [
                  "https://play.google.com/store/apps/details?id=com.mo_dev.nomozvaqti",
                  "https://apps.apple.com/us/app/namozim/id6761498579",
                ],
              },
              {
                "@type": "WebSite",
                "@id": `${SITE_URL}/#website`,
                name: "Namozim",
                alternateName: ["Namozim.uz", "Намозим"],
                url: SITE_URL,
                description: "O'zbekiston bo'ylab aniq namoz vaqtlari",
                inLanguage: ["uz", "uz-Cyrl", "ru", "en"],
                publisher: { "@id": `${SITE_URL}/#organization` },
              },
              {
                "@type": "MobileApplication",
                "@id": `${SITE_URL}/#app`,
                name: "Namozim — Namoz Vaqtlari",
                operatingSystem: "ANDROID, IOS",
                applicationCategory: "LifestyleApplication",
                url: SITE_URL,
                downloadUrl: [
                  "https://play.google.com/store/apps/details?id=com.mo_dev.nomozvaqti",
                  "https://apps.apple.com/us/app/namozim/id6761498579",
                ],
                offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
                author: {
                  "@type": "Organization",
                  name: "Prompter MChJ",
                  url: "https://prompter.uz",
                },
              },
            ],
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
