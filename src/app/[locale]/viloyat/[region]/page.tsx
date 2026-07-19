import { Metadata } from "next";
import { notFound } from "next/navigation";
import { REGIONS, getRegionBySlug, getRegionName } from "@/data/regions";
import { CITIES, getCityName } from "@/data/cities";
import { getDistrictsByCity, getDistrictName } from "@/data/districts";
import { Locale, t } from "@/data/translations";
import { fetchPrayerTimesServer } from "@/lib/fetchPrayerTimes";
import { hreflangAlternates } from "@/lib/seo";
import { CityPrayerTimes } from "@/components/CityPrayerTimes";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Download } from "@/components/Download";
import { Footer } from "@/components/Footer";

interface Props {
  params: Promise<{ locale: string; region: string }>;
}

export function generateStaticParams() {
  const locales = ["uz", "uz-cyrl", "ru", "en", "tg", "ky"];
  return locales.flatMap((locale) =>
    REGIONS.map((r) => ({ locale, region: r.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, region: slug } = await params;
  const l = locale as Locale;
  const region = getRegionBySlug(slug);
  if (!region) return {};
  const name = getRegionName(region, l);
  const times = await fetchPrayerTimesServer(region.lat, region.lng);
  const prayerLabels: Record<Locale, [string, string, string, string, string]> = {
    uz: ["Bomdod", "Peshin", "Asr", "Shom", "Xufton"],
    "uz-cyrl": ["Бомдод", "Пешин", "Аср", "Шом", "Хуфтон"],
    ru: ["Фаджр", "Зухр", "Аср", "Магриб", "Иша"],
    en: ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"],
    tg: ["Бомдод", "Пешин", "Аср", "Шом", "Хуфтон"],
    ky: ["Багымдат", "Бешим", "Аср", "Шам", "Куптан"],
  };
  const [lF, lD, lA, lM, lI] = prayerLabels[l];
  const timesStr = times
    ? `${lF}: ${times.fajr} | ${lD}: ${times.dhuhr} | ${lA}: ${times.asr} | ${lM}: ${times.maghrib} | ${lI}: ${times.isha}`
    : "";

  const titles: Record<Locale, string> = {
    uz: `Namoz vaqtlari ${name} bugun 2026`,
    "uz-cyrl": `Намоз вақтлари ${name} бугун 2026`,
    ru: `Время намаза ${name} сегодня 2026`,
    en: `Prayer Times ${name} Today 2026`,
    tg: `Вақти намоз ${name} имрӯз 2026`,
    ky: `Намаз убактысы ${name} бүгүн 2026`,
  };

  const regionDescs: Record<Locale, string> = {
    uz: `${name} namoz vaqtlari bugun: ${timesStr}. Hanafiy mazhab. Shaharlar va tumanlar.`,
    "uz-cyrl": `${name} намоз вақтлари бугун: ${timesStr}. Ҳанафий мазҳаб.`,
    ru: `Время намаза ${name} сегодня: ${timesStr}. Ханафитский мазхаб. Города и районы.`,
    en: `Prayer times ${name} today: ${timesStr}. Hanafi school. Cities and districts.`,
    tg: `Вақти намоз ${name} имрӯз: ${timesStr}. Мазҳаби Ҳанафӣ.`,
    ky: `${name} намаз убактысы бүгүн: ${timesStr}. Ханафий мазхаб.`,
  };

  return {
    title: titles[l],
    description: regionDescs[l],
    alternates: {
      canonical: `https://namozim.uz/${locale}/viloyat/${slug}`,
      languages: hreflangAlternates(`/viloyat/${slug}`),
    },
  };
}

export default async function RegionPage({ params }: Props) {
  const { locale, region: slug } = await params;
  const l = locale as Locale;
  const region = getRegionBySlug(slug);
  if (!region) notFound();
  const name = getRegionName(region, l);

  // Get the main city for this region
  const mainCity = CITIES.find((c) => c.slug === region.citySlug);
  // Get cities in this region
  const regionCities = CITIES.filter((c) =>
    c.region === region.nameUz || c.region.includes(region.nameUz.split(" ")[0])
  );
  // Get districts
  const districts = getDistrictsByCity(region.citySlug);

  return (
    <>
      <Header locale={l} />
      <Breadcrumbs
        items={[
          { name: t(l, "home"), url: `/${locale}` },
          { name: t(l, "nav_cities"), url: `/${locale}/shaharlar` },
          { name, url: `/${locale}/viloyat/${slug}` },
        ]}
      />
      <main>
        {mainCity && <CityPrayerTimes city={mainCity} locale={l} />}
        <section className="py-12">
          <div className="max-w-3xl mx-auto px-5">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-text mb-4">
              {name} — {l === "ru" ? "города и районы" : l === "en" ? "cities and districts" : l === "uz-cyrl" ? "шаҳарлар ва туманлар" : "shaharlar va tumanlar"}
            </h2>

            {/* Cities in this region */}
            {regionCities.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-text-secondary mb-3">
                  {l === "ru" ? "Города:" : l === "en" ? "Cities:" : l === "uz-cyrl" ? "Шаҳарлар:" : "Shaharlar:"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {regionCities.map((c) => (
                    <a key={c.slug} href={`/${locale}/${c.slug}`}
                      className="bg-surface border border-border px-3 py-1.5 rounded-full text-xs text-text-secondary hover:text-primary hover:border-primary transition-colors">
                      {getCityName(c, l)}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Districts */}
            {districts.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-text-secondary mb-3">
                  {l === "ru" ? "Районы:" : l === "en" ? "Districts:" : "Tumanlar:"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {districts.map((d) => (
                    <a key={d.slug} href={`/${locale}/${region.citySlug}/${d.slug}`}
                      className="bg-surface-muted border border-border px-3 py-1.5 rounded-full text-xs text-text-secondary hover:text-primary hover:border-primary transition-colors">
                      {getDistrictName(d, l)}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Other regions */}
            <div className="mt-10">
              <h3 className="text-sm font-semibold text-text mb-3">
                {l === "ru" ? "Другие области:" : l === "en" ? "Other regions:" : l === "uz-cyrl" ? "Бошқа вилоятлар:" : "Boshqa viloyatlar:"}
              </h3>
              <div className="flex flex-wrap gap-2">
                {REGIONS.filter((r) => r.slug !== slug).map((r) => (
                  <a key={r.slug} href={`/${locale}/viloyat/${r.slug}`}
                    className="bg-surface-muted border border-border px-3 py-1.5 rounded-full text-xs text-text-secondary hover:text-primary hover:border-primary transition-colors">
                    {getRegionName(r, l)}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
        <Download locale={l} />
      </main>
      <Footer locale={l} />
    </>
  );
}
