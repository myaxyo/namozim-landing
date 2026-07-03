import { Metadata } from "next";
import { Locale, t } from "@/data/translations";
import { CITIES, getCityName } from "@/data/cities";
import { hreflangAlternates, SITE_URL } from "@/lib/seo";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { PrayerTimes } from "@/components/PrayerTimes";
import { Cities } from "@/components/Cities";
import { About } from "@/components/About";
import { Download } from "@/components/Download";
import { Footer } from "@/components/Footer";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;
  return {
    title: t(l, "seo_title"),
    description: t(l, "seo_desc"),
    alternates: {
      canonical: `https://namozim.uz/${locale}`,
      languages: hreflangAlternates(""),
    },
  };
}

export default async function LocaleHome({ params }: Props) {
  const { locale } = await params;
  const l = locale as Locale;

  // Top cities ItemList — signals page hierarchy to Google for sitelinks
  const topCities = CITIES.slice(0, 20);
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t(l, "nav_cities"),
    numberOfItems: topCities.length,
    itemListElement: topCities.map((city, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: getCityName(city, l),
      url: `${SITE_URL}/${locale}/${city.slug}`,
    })),
  };

  return (
    <>
      <Header locale={l} />
      <main>
        <PrayerTimes locale={l} />
        <Cities locale={l} />
        <About locale={l} />
        <Download locale={l} />
        <JsonLd data={itemListJsonLd} />
      </main>
      <Footer locale={l} />
    </>
  );
}
