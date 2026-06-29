import { Metadata } from "next";
import { notFound } from "next/navigation";
import { REGIONS, getRegionBySlug, getRegionName } from "@/data/regions";
import { CITIES, getCityName } from "@/data/cities";
import { getDistrictsByCity, getDistrictName } from "@/data/districts";
import { Locale, t } from "@/data/translations";
import { fetchPrayerTimesServer } from "@/lib/fetchPrayerTimes";
import { CityPrayerTimes } from "@/components/CityPrayerTimes";
import { Header } from "@/components/Header";
import { Download } from "@/components/Download";
import { Footer } from "@/components/Footer";

interface Props {
  params: Promise<{ locale: string; region: string }>;
}

export function generateStaticParams() {
  const locales = ["uz", "ru", "en"];
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
  const timesStr = times
    ? `Bomdod: ${times.fajr} | Peshin: ${times.dhuhr} | Asr: ${times.asr} | Shom: ${times.maghrib} | Xufton: ${times.isha}`
    : "";

  const titles: Record<Locale, string> = {
    uz: `Namoz vaqtlari ${name} bugun 2026`,
    ru: `Время намаза ${name} сегодня 2026`,
    en: `Prayer Times ${name} Today 2026`,
  };

  return {
    title: titles[l],
    description: `${name} namoz vaqtlari bugun: ${timesStr}. Hanafiy mazhab.`,
    alternates: {
      canonical: `https://namozim.uz/${locale}/viloyat/${slug}`,
      languages: { uz: `/uz/viloyat/${slug}`, ru: `/ru/viloyat/${slug}`, en: `/en/viloyat/${slug}` },
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
      <main>
        {mainCity && <CityPrayerTimes city={mainCity} locale={l} />}
        <section className="py-12">
          <div className="max-w-3xl mx-auto px-5">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-text mb-4">
              {name} — {l === "ru" ? "города и районы" : l === "en" ? "cities and districts" : "shaharlar va tumanlar"}
            </h2>

            {/* Cities in this region */}
            {regionCities.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-text-secondary mb-3">
                  {l === "ru" ? "Города:" : l === "en" ? "Cities:" : "Shaharlar:"}
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
                {l === "ru" ? "Другие области:" : l === "en" ? "Other regions:" : "Boshqa viloyatlar:"}
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
