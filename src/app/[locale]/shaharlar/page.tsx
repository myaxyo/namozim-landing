import { Metadata } from "next";
import { Locale, t } from "@/data/translations";
import { CITIES, getCityName } from "@/data/cities";
import { INTERNATIONAL_CITIES, getInternationalCityName, getInternationalCityCountry } from "@/data/internationalCities";
import { hreflangAlternates, SITE_URL } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { CitiesSearch } from "@/components/CitiesSearch";

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
    uz: "Namoz vaqtlari — O'zbekiston va dunyo shaharlari",
    "uz-cyrl": "Намоз вақтлари — Ўзбекистон ва дунё шаҳарлари",
    ru: "Время намаза — города Узбекистана и мира",
    en: "Prayer Times — Uzbekistan & Worldwide Cities",
  };
  const descs: Record<Locale, string> = {
    uz: "O'zbekiston va dunyo shaharlari uchun namoz vaqtlarini toping. 80+ shahar: Toshkent, Moskva, Istanbul, Dubay. Hanafiy mazhab.",
    "uz-cyrl": "Ўзбекистон ва дунё шаҳарлари учун намоз вақтларини топинг. 80+ шаҳар. Ҳанафий мазҳаб.",
    ru: "Время намаза для городов Узбекистана и мира. 80+ городов: Ташкент, Москва, Стамбул, Дубай. Ханафитский мазхаб.",
    en: "Find prayer times for cities in Uzbekistan and worldwide. 80+ cities: Tashkent, Moscow, Istanbul, Dubai. Hanafi school.",
  };
  return {
    title: titles[l],
    description: descs[l],
    alternates: {
      canonical: `https://namozim.uz/${locale}/shaharlar`,
      languages: hreflangAlternates("/shaharlar"),
    },
  };
}

export default async function CitiesPage({ params }: Props) {
  const { locale } = await params;
  const l = locale as Locale;

  // ItemList tells Google all city pages belong to one authoritative collection
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t(l, "cities_title"),
    numberOfItems: CITIES.length,
    itemListElement: CITIES.map((city, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: getCityName(city, l),
      url: `${SITE_URL}/${locale}/${city.slug}`,
    })),
  };

  return (
    <>
      <Header locale={l} />
      <Breadcrumbs
        items={[
          { name: t(l, "home"), url: `/${locale}` },
          { name: t(l, "nav_cities"), url: `/${locale}/shaharlar` },
        ]}
      />
      <main className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-5">
          <div className="text-center mb-10">
            <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-text mb-3">
              {t(l, "cities_title")}
            </h1>
            <p className="text-text-secondary text-sm">{t(l, "cities_subtitle")}</p>
          </div>
          <CitiesSearch locale={l} />

          {/* International cities section */}
          <div className="mt-16">
            <h2 className="font-[family-name:var(--font-display)] text-xl md:text-2xl font-bold text-text mb-2 text-center">
              {t(l, "international_cities_title")}
            </h2>
            <p className="text-text-secondary text-sm text-center mb-8">
              {t(l, "international_cities_subtitle")}
            </p>
            <div className="space-y-6">
              {Object.entries(
                INTERNATIONAL_CITIES.reduce(
                  (acc, city) => {
                    const country = getInternationalCityCountry(city, l);
                    if (!acc[country]) acc[country] = [];
                    acc[country].push(city);
                    return acc;
                  },
                  {} as Record<string, typeof INTERNATIONAL_CITIES>
                )
              ).map(([country, cities]) => (
                <div key={country}>
                  <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                    {country}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {cities.map((city) => (
                      <a
                        key={city.slug}
                        href={`/${locale}/dunyo/${city.slug}`}
                        className="bg-surface-muted border border-border px-3 py-1.5 rounded-full text-xs text-text-secondary hover:text-primary hover:border-primary transition-colors"
                      >
                        {getInternationalCityName(city, l)}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <a
                href={`/${locale}/dunyo`}
                className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:underline"
              >
                {t(l, "international_cities")} &rarr;
              </a>
            </div>
          </div>
        </div>
        <JsonLd data={itemListJsonLd} />
      </main>
      <Footer locale={l} />
    </>
  );
}
