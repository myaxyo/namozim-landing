import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CITIES, getCityBySlug, getCityName } from "@/data/cities";
import { DISTRICTS, getDistrictBySlug, getDistrictName, getDistrictsByCity } from "@/data/districts";
import { PRAYERS, getPrayerBySlug } from "@/data/prayers";
import { Locale, t } from "@/data/translations";
import { fetchPrayerTimesServer } from "@/lib/fetchPrayerTimes";
import { CityPrayerTimes } from "@/components/CityPrayerTimes";
import { PrayerPage } from "@/components/PrayerPage";
import { Header } from "@/components/Header";
import { Download } from "@/components/Download";
import { Footer } from "@/components/Footer";

interface Props {
  params: Promise<{ locale: string; city: string; district: string }>;
}

export function generateStaticParams() {
  const locales = ["uz", "uz-cyrl", "ru", "en"];
  // District pages
  const districtParams = locales.flatMap((locale) =>
    DISTRICTS.map((d) => ({ locale, city: d.citySlug, district: d.slug }))
  );
  // Prayer pages (under each city)
  const prayerParams = locales.flatMap((locale) =>
    CITIES.flatMap((c) =>
      PRAYERS.map((p) => ({ locale, city: c.slug, district: p.slug }))
    )
  );
  return [...districtParams, ...prayerParams];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, city: citySlug, district: dSlug } = await params;
  const l = locale as Locale;

  // Check if it's a prayer page
  const prayer = getPrayerBySlug(dSlug);
  if (prayer) {
    const city = getCityBySlug(citySlug);
    if (!city) return {};
    const cityName = getCityName(city, l);
    const pName = l === "ru" ? prayer.nameRu : l === "en" ? prayer.nameEn : prayer.nameUz;
    const times = await fetchPrayerTimesServer(city.lat, city.lng);
    const prayerKey = dSlug === "bomdod" ? "fajr" : dSlug === "peshin" ? "dhuhr" : dSlug === "xufton" ? "isha" : dSlug;
    const timeStr = times ? (times as unknown as Record<string, string>)[prayerKey] || "" : "";

    return {
      title: `${pName} vaqti ${cityName} bugun 2026 — ${timeStr || "namoz vaqti"}`,
      description: `${cityName} ${pName} namozi vaqti bugun: ${timeStr}. Hanafiy mazhab. ${l === "uz" ? prayer.descUz : l === "ru" ? prayer.descRu : prayer.descEn}`,
      alternates: { canonical: `https://namozim.uz/${locale}/${citySlug}/${dSlug}` },
    };
  }

  // District page
  const district = getDistrictBySlug(dSlug);
  if (!district) return {};
  const name = getDistrictName(district, l);
  const city = getCityBySlug(citySlug);
  const cityName = city ? getCityName(city, l) : "";
  const times = await fetchPrayerTimesServer(district.lat, district.lng);
  const timesStr = times ? `Bomdod: ${times.fajr} | Peshin: ${times.dhuhr} | Asr: ${times.asr} | Shom: ${times.maghrib} | Xufton: ${times.isha}` : "";

  return {
    title: `Namoz vaqtlari ${name} (${cityName}) bugun 2026`,
    description: `${name} namoz vaqtlari bugun. ${timesStr}. Hanafiy mazhab.`,
    alternates: { canonical: `https://namozim.uz/${locale}/${citySlug}/${dSlug}` },
  };
}

export default async function DistrictOrPrayerPage({ params }: Props) {
  const { locale, city: citySlug, district: dSlug } = await params;
  const l = locale as Locale;

  // Prayer page
  const prayer = getPrayerBySlug(dSlug);
  if (prayer) {
    const city = getCityBySlug(citySlug);
    if (!city) notFound();
    return (
      <>
        <Header locale={l} />
        <main>
          <PrayerPage city={city} prayer={prayer} locale={l} />
          <Download locale={l} />
        </main>
        <Footer locale={l} />
      </>
    );
  }

  // District page
  const district = getDistrictBySlug(dSlug);
  const city = getCityBySlug(citySlug);
  if (!district || !city) notFound();

  const districtAsCity = {
    ...city,
    slug: district.slug,
    name: district.name,
    nameRu: district.nameRu,
    nameEn: district.nameEn,
    lat: district.lat,
    lng: district.lng,
  };

  const siblings = getDistrictsByCity(citySlug).filter((d) => d.slug !== dSlug);

  return (
    <>
      <Header locale={l} />
      <main>
        <CityPrayerTimes city={districtAsCity} locale={l} />
        <section className="py-12">
          <div className="max-w-3xl mx-auto px-5">
            <a href={`/${locale}/${citySlug}`} className="text-primary text-sm font-medium hover:underline mb-4 block">
              &larr; {getCityName(city, l)}
            </a>
            {siblings.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-text mb-3">
                  {l === "ru" ? "Другие районы:" : l === "en" ? "Other districts:" : "Boshqa tumanlar:"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {siblings.slice(0, 15).map((d) => (
                    <a key={d.slug} href={`/${locale}/${citySlug}/${d.slug}`}
                      className="bg-surface-muted border border-border px-3 py-1.5 rounded-full text-xs text-text-secondary hover:text-primary hover:border-primary transition-colors">
                      {getDistrictName(d, l)}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
        <Download locale={l} />
      </main>
      <Footer locale={l} />
    </>
  );
}
