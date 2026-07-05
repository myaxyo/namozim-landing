import { Metadata } from "next";
import {
  INTERNATIONAL_CITIES,
  getInternationalCityName,
  getInternationalCityCountry,
} from "@/data/internationalCities";
import { Locale, t } from "@/data/translations";
import { hreflangAlternates, SITE_URL } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";

interface Props {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return [{ locale: "uz" }, { locale: "uz-cyrl" }, { locale: "ru" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;

  const titles: Record<Locale, string> = {
    uz: "Namoz vaqtlari dunyo bo'ylab — xorijdagi shaharlar",
    "uz-cyrl": "Намоз вақтлари дунё бўйлаб — хориждаги шаҳарлар",
    ru: "Время намаза по всему миру — города за рубежом",
    en: "Prayer Times Worldwide — International Cities",
  };

  const descs: Record<Locale, string> = {
    uz: "Moskva, Istanbul, Dubay, Seul, Almaty va boshqa xorijiy shaharlar uchun namoz vaqtlari. O'zbek diasporasi uchun.",
    "uz-cyrl": "Москва, Истанбул, Дубай, Сеул, Олмаота ва бошқа хорижий шаҳарлар учун намоз вақтлари.",
    ru: "Время намаза в Москве, Стамбуле, Дубае, Сеуле, Алматы и других городах мира. Ханафитский мазхаб.",
    en: "Prayer times in Moscow, Istanbul, Dubai, Seoul, Almaty and other cities worldwide. Hanafi school.",
  };

  return {
    title: titles[l],
    description: descs[l],
    alternates: {
      canonical: `https://namozim.uz/${locale}/dunyo`,
      languages: hreflangAlternates("/dunyo"),
    },
  };
}

export default async function InternationalCitiesPage({ params }: Props) {
  const { locale } = await params;
  const l = locale as Locale;

  // Group cities by country
  const grouped = INTERNATIONAL_CITIES.reduce(
    (acc, city) => {
      const country = getInternationalCityCountry(city, l);
      if (!acc[country]) acc[country] = [];
      acc[country].push(city);
      return acc;
    },
    {} as Record<string, typeof INTERNATIONAL_CITIES>
  );

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t(l, "international_cities"),
    numberOfItems: INTERNATIONAL_CITIES.length,
    itemListElement: INTERNATIONAL_CITIES.map((city, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: getInternationalCityName(city, l),
      url: `${SITE_URL}/${locale}/dunyo/${city.slug}`,
    })),
  };

  return (
    <>
      <Header locale={l} />
      <Breadcrumbs
        items={[
          { name: t(l, "home"), url: `/${locale}` },
          { name: t(l, "international_cities"), url: `/${locale}/dunyo` },
        ]}
      />
      <main className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-5">
          <div className="text-center mb-10">
            <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-text mb-3">
              {t(l, "international_cities_title")}
            </h1>
            <p className="text-text-secondary text-sm">
              {t(l, "international_cities_subtitle")}
            </p>
          </div>

          <div className="space-y-8">
            {Object.entries(grouped).map(([country, cities]) => (
              <div key={country}>
                <h2 className="text-sm font-semibold text-text mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                  {country}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {cities.map((city) => (
                    <a
                      key={city.slug}
                      href={`/${locale}/dunyo/${city.slug}`}
                      className="bg-surface-muted border border-border px-4 py-2 rounded-xl text-sm text-text-secondary hover:text-primary hover:border-primary transition-colors"
                    >
                      {getInternationalCityName(city, l)}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href={`/${locale}/shaharlar`}
              className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:underline"
            >
              {t(l, "nav_cities")} ({l === "ru" ? "Узбекистан" : l === "en" ? "Uzbekistan" : "O'zbekiston"}) &rarr;
            </a>
          </div>
        </div>
        <JsonLd data={itemListJsonLd} />
      </main>
      <Footer locale={l} />
    </>
  );
}
