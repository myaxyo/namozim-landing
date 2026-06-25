import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CITIES, getCityBySlug, getCityName } from "@/data/cities";
import { DISTRICTS, getDistrictBySlug, getDistrictName, getDistrictsByCity } from "@/data/districts";
import { Locale, t } from "@/data/translations";
import { fetchPrayerTimesServer } from "@/lib/fetchPrayerTimes";
import { CityPrayerTimes } from "@/components/CityPrayerTimes";
import { Header } from "@/components/Header";
import { Download } from "@/components/Download";
import { Footer } from "@/components/Footer";

interface Props {
  params: Promise<{ locale: string; city: string; district: string }>;
}

export function generateStaticParams() {
  const locales = ["uz", "ru", "en"];
  return locales.flatMap((locale) =>
    DISTRICTS.map((d) => ({ locale, city: d.citySlug, district: d.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, city: citySlug, district: dSlug } = await params;
  const l = locale as Locale;
  const district = getDistrictBySlug(dSlug);
  if (!district) return {};
  const name = getDistrictName(district, l);
  const city = getCityBySlug(citySlug);
  const cityName = city ? getCityName(city, l) : "";

  const times = await fetchPrayerTimesServer(district.lat, district.lng);
  const timesStr = times
    ? `Bomdod: ${times.fajr} | Peshin: ${times.dhuhr} | Asr: ${times.asr} | Shom: ${times.maghrib} | Xufton: ${times.isha}`
    : "";

  return {
    title: `Namoz vaqtlari ${name} (${cityName}) 2026`,
    description: `${name} namoz vaqtlari bugun. ${timesStr}. Hanafiy mazhab.`,
    alternates: {
      canonical: `https://namozim.uz/${locale}/${citySlug}/${dSlug}`,
    },
  };
}

export default async function DistrictPage({ params }: Props) {
  const { locale, city: citySlug, district: dSlug } = await params;
  const l = locale as Locale;
  const district = getDistrictBySlug(dSlug);
  const city = getCityBySlug(citySlug);
  if (!district || !city) notFound();

  // Use district as a pseudo-city for the prayer times component
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
            <div className="flex flex-wrap gap-2">
              <a href={`/${locale}/${citySlug}`} className="text-primary text-sm font-medium hover:underline mb-4 block">
                &larr; {getCityName(city, l)}
              </a>
            </div>
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
