import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CITIES, getCityBySlug, getCityName } from "@/data/cities";
import { DISTRICTS, getDistrictBySlug, getDistrictName, getDistrictsByCity } from "@/data/districts";
import { PRAYERS, getPrayerBySlug } from "@/data/prayers";
import { Locale, t } from "@/data/translations";
import { fetchPrayerTimesServer } from "@/lib/fetchPrayerTimes";
import { hreflangAlternates } from "@/lib/seo";
import { cityFaqItems } from "@/data/faq";
import { CityPrayerTimes } from "@/components/CityPrayerTimes";
import { PrayerPage } from "@/components/PrayerPage";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { Download } from "@/components/Download";
import { Footer } from "@/components/Footer";

interface Props {
  params: Promise<{ locale: string; city: string; district: string }>;
}

export function generateStaticParams() {
  const locales = ["uz", "uz-cyrl", "ru", "en", "tg", "ky"];
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
    const pName = l === "ru" ? prayer.nameRu : l === "en" ? prayer.nameEn : l === "tg" ? (prayer.nameTg || prayer.nameUz) : l === "ky" ? (prayer.nameKy || prayer.nameUz) : prayer.nameUz;
    const times = await fetchPrayerTimesServer(city.lat, city.lng);
    const prayerKey = dSlug === "bomdod" ? "fajr" : dSlug === "peshin" ? "dhuhr" : dSlug === "xufton" ? "isha" : dSlug;
    const timeStr = times ? (times as unknown as Record<string, string>)[prayerKey] || "" : "";

    const prayerTitles: Record<Locale, string> = {
      uz: times ? `${pName} ${cityName} bugun — ${timeStr} ✓ 2026` : `${pName} vaqti ${cityName} bugun 2026`,
      "uz-cyrl": times ? `${pName} ${cityName} бугун — ${timeStr} ✓ 2026` : `${pName} вақти ${cityName} бугун 2026`,
      ru: times ? `${pName} ${cityName} сегодня — ${timeStr} ✓ 2026` : `${pName} ${cityName} сегодня 2026`,
      en: times ? `${pName} ${cityName} Today — ${timeStr} ✓ 2026` : `${pName} Time ${cityName} Today 2026`,
      tg: times ? `${pName} ${cityName} имрӯз — ${timeStr} ✓ 2026` : `Вақти ${pName} ${cityName} имрӯз 2026`,
      ky: times ? `${pName} ${cityName} бүгүн — ${timeStr} ✓ 2026` : `${pName} убактысы ${cityName} бүгүн 2026`,
    };

    const prayerDescs: Record<Locale, string> = {
      uz: `${cityName} ${pName} namozi vaqti bugun: ${timeStr}. Hanafiy mazhab. ${prayer.descUz}`,
      "uz-cyrl": `${cityName} ${pName} намози вақти бугун: ${timeStr}. Ҳанафий мазҳаб. ${prayer.descUz}`,
      ru: `${pName} в ${cityName} сегодня: ${timeStr}. Ханафитский мазхаб. ${prayer.descRu}`,
      en: `${pName} in ${cityName} today: ${timeStr}. Hanafi school. ${prayer.descEn}`,
      tg: `${pName} дар ${cityName} имрӯз: ${timeStr}. Мазҳаби Ҳанафӣ. ${prayer.descUz}`,
      ky: `${pName} ${cityName} бүгүн: ${timeStr}. Ханафий мазхаб. ${prayer.descEn}`,
    };

    return {
      title: prayerTitles[l],
      description: prayerDescs[l],
      alternates: {
        canonical: `https://namozim.uz/${locale}/${citySlug}/${dSlug}`,
        languages: hreflangAlternates(`/${citySlug}/${dSlug}`),
      },
    };
  }

  // District page
  const district = getDistrictBySlug(dSlug);
  if (!district) return {};
  const name = getDistrictName(district, l);
  const city = getCityBySlug(citySlug);
  const cityName = city ? getCityName(city, l) : "";
  const times = await fetchPrayerTimesServer(district.lat, district.lng);

  // Localized prayer labels for the description
  const prayerLabels: Record<Locale, [string, string, string, string, string]> = {
    uz: ["Bomdod", "Peshin", "Asr", "Shom", "Xufton"],
    "uz-cyrl": ["Бомдод", "Пешин", "Аср", "Шом", "Хуфтон"],
    ru: ["Фаджр", "Зухр", "Аср", "Магриб", "Иша"],
    en: ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"],
    tg: ["Бомдод", "Пешин", "Аср", "Шом", "Хуфтон"],
    ky: ["Багымдат", "Бешим", "Аср", "Шам", "Куптан"],
  };
  const [lFajr, lDhuhr, lAsr, lMaghrib, lIsha] = prayerLabels[l];
  const timesStr = times ? `${lFajr}: ${times.fajr} | ${lDhuhr}: ${times.dhuhr} | ${lAsr}: ${times.asr} | ${lMaghrib}: ${times.maghrib} | ${lIsha}: ${times.isha}` : "";

  const distTitles: Record<Locale, string> = {
    uz: times ? `${name} namoz vaqtlari bugun ✓ Bomdod ${times.fajr} | Shom ${times.maghrib}` : `Namoz vaqtlari ${name} (${cityName}) bugun 2026`,
    "uz-cyrl": times ? `${name} намоз вақтлари бугун ✓ Бомдод ${times.fajr} | Шом ${times.maghrib}` : `Намоз вақтлари ${name} (${cityName}) бугун 2026`,
    ru: times ? `Намаз ${name} сегодня ✓ Фаджр ${times.fajr} | Магриб ${times.maghrib}` : `Время намаза ${name} (${cityName}) сегодня 2026`,
    en: times ? `${name} Prayer Times Today ✓ Fajr ${times.fajr} | Maghrib ${times.maghrib}` : `Prayer Times ${name} (${cityName}) Today 2026`,
    tg: times ? `Вақти намоз ${name} имрӯз ✓ Бомдод ${times.fajr} | Шом ${times.maghrib}` : `Вақти намоз ${name} (${cityName}) имрӯз 2026`,
    ky: times ? `Намаз убактысы ${name} бүгүн ✓ Багымдат ${times.fajr} | Шам ${times.maghrib}` : `Намаз убактысы ${name} (${cityName}) бүгүн 2026`,
  };

  const distDescs: Record<Locale, string> = {
    uz: `${name} namoz vaqtlari bugun. ${timesStr}. Hanafiy mazhab, MWL usuli.`,
    "uz-cyrl": `${name} намоз вақтлари бугун. ${timesStr}. Ҳанафий мазҳаб, MWL усули.`,
    ru: `Время намаза ${name} сегодня. ${timesStr}. Ханафитский мазхаб, метод MWL.`,
    en: `${name} prayer times today. ${timesStr}. Hanafi school, MWL method.`,
    tg: `Вақти намоз ${name} имрӯз. ${timesStr}. Мазҳаби Ҳанафӣ, усули MWL.`,
    ky: `${name} намаз убактысы бүгүн. ${timesStr}. Ханафий мазхаб, MWL ыкмасы.`,
  };

  return {
    title: distTitles[l],
    description: distDescs[l],
    alternates: {
      canonical: `https://namozim.uz/${locale}/${citySlug}/${dSlug}`,
      languages: hreflangAlternates(`/${citySlug}/${dSlug}`),
    },
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
    const cityName = getCityName(city, l);
    const pName = l === "ru" ? prayer.nameRu : l === "en" ? prayer.nameEn : prayer.nameUz;
    const times = await fetchPrayerTimesServer(city.lat, city.lng);
    return (
      <>
        <Header locale={l} />
        <Breadcrumbs
          items={[
            { name: t(l, "home"), url: `/${locale}` },
            { name: t(l, "nav_cities"), url: `/${locale}/shaharlar` },
            { name: cityName, url: `/${locale}/${citySlug}` },
            { name: pName, url: `/${locale}/${citySlug}/${dSlug}` },
          ]}
        />
        <main>
          <PrayerPage city={city} prayer={prayer} locale={l} />
          <Faq items={cityFaqItems(cityName, times, l)} heading={t(l, "faq_title")} />
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
  const districtName = getDistrictName(district, l);
  const cityName = getCityName(city, l);
  const times = await fetchPrayerTimesServer(district.lat, district.lng);

  return (
    <>
      <Header locale={l} />
      <Breadcrumbs
        items={[
          { name: t(l, "home"), url: `/${locale}` },
          { name: t(l, "nav_cities"), url: `/${locale}/shaharlar` },
          { name: cityName, url: `/${locale}/${citySlug}` },
          { name: districtName, url: `/${locale}/${citySlug}/${dSlug}` },
        ]}
      />
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
                  {l === "ru" ? "Другие районы:" : l === "en" ? "Other districts:" : l === "uz-cyrl" ? "Бошқа туманлар:" : "Boshqa tumanlar:"}
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
        <Faq items={cityFaqItems(districtName, times, l)} heading={t(l, "faq_title")} />
        <Download locale={l} />
      </main>
      <Footer locale={l} />
    </>
  );
}
