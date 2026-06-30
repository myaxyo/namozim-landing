import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CITIES, getCityBySlug, getCityName, getCityRegion } from "@/data/cities";
import { getDistrictsByCity, getDistrictName } from "@/data/districts";
import { Locale, t } from "@/data/translations";
import { fetchPrayerTimesServer } from "@/lib/fetchPrayerTimes";
import { CityPrayerTimes } from "@/components/CityPrayerTimes";
import { PrayerTimesImage } from "@/components/PrayerTimesImage";
import { Header } from "@/components/Header";
import { Download } from "@/components/Download";
import { Footer } from "@/components/Footer";

interface Props {
  params: Promise<{ locale: string; city: string }>;
}

export function generateStaticParams() {
  const locales = ["uz", "uz-cyrl", "ru", "en"];
  return locales.flatMap((locale) =>
    CITIES.map((c) => ({ locale, city: c.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, city: slug } = await params;
  const l = locale as Locale;
  const city = getCityBySlug(slug);
  if (!city) return {};
  const name = getCityName(city, l);

  // Fetch actual prayer times for meta description
  const times = await fetchPrayerTimesServer(city.lat, city.lng);
  const timesStr = times
    ? `Bomdod: ${times.fajr} | Peshin: ${times.dhuhr} | Asr: ${times.asr} | Shom: ${times.maghrib} | Xufton: ${times.isha}`
    : "";

  const titles: Record<Locale, string> = {
    uz: `Namoz vaqtlari ${name} bugun 2026 | Bugun namoz vaqti`,
    "uz-cyrl": `Намоз вақтлари ${name} бугун 2026 | Бугун намоз вақти`,
    ru: `\u0412\u0440\u0435\u043C\u044F \u043D\u0430\u043C\u0430\u0437\u0430 ${name} \u0441\u0435\u0433\u043E\u0434\u043D\u044F 2026`,
    en: `Prayer Times ${name} Today 2026 | Fajr, Dhuhr, Asr, Maghrib, Isha`,
  };

  const descs: Record<Locale, string> = {
    uz: `${name} namoz vaqtlari bugun: ${timesStr}. Hanafiy mazhab. Bomdod, Peshin, Asr, Shom, Xufton.`,
    "uz-cyrl": `${name} намоз вақтлари бугун: ${timesStr}. Ҳанафий мазҳаб. Бомдод, Пешин, Аср, Шом, Хуфтон.`,
    ru: `\u0412\u0440\u0435\u043C\u044F \u043D\u0430\u043C\u0430\u0437\u0430 \u0432 ${name} \u0441\u0435\u0433\u043E\u0434\u043D\u044F: ${timesStr}. \u0425\u0430\u043D\u0430\u0444\u0438\u0442\u0441\u043A\u0438\u0439 \u043C\u0430\u0437\u0445\u0430\u0431.`,
    en: `Prayer times in ${name} today: ${timesStr}. Hanafi school.`,
  };

  return {
    title: titles[l],
    description: descs[l],
    openGraph: {
      title: titles[l],
      description: descs[l],
      url: `https://namozim.uz/${locale}/${slug}`,
      images: [`https://namozim.uz/${locale}/${slug}/opengraph-image`],
    },
    alternates: {
      canonical: `https://namozim.uz/${locale}/${slug}`,
      languages: { uz: `/uz/${slug}`, ru: `/ru/${slug}`, en: `/en/${slug}` },
    },
  };
}

export default async function CityPage({ params }: Props) {
  const { locale, city: slug } = await params;
  const l = locale as Locale;
  const city = getCityBySlug(slug);
  if (!city) notFound();
  const name = getCityName(city, l);
  const region = getCityRegion(city, l);
  const serverTimes = await fetchPrayerTimesServer(city.lat, city.lng);

  return (
    <>
      <Header locale={l} />
      <main>
        <CityPrayerTimes city={city} locale={l} />

        {/* Static visual card for Google Images indexing */}
        <PrayerTimesImage locale={l} city={name} times={serverTimes} />

        <section className="py-12">
          <div className="max-w-3xl mx-auto px-5">
            <article className="text-text-secondary space-y-3 text-sm leading-relaxed">
              <p>{name} ({region}) {t(l, "city_about_p1")}</p>
              <p>{t(l, "city_about_p2")}</p>
              <p>{t(l, "city_about_p3")}</p>
            </article>
            <div className="mt-10">
              <h3 className="text-sm font-semibold text-text mb-3">{t(l, "other_cities")}</h3>
              <div className="flex flex-wrap gap-2">
                {CITIES.filter((c) => c.slug !== slug).slice(0, 12).map((c) => (
                  <a key={c.slug} href={`/${locale}/${c.slug}`}
                    className="bg-surface-muted border border-border px-3 py-1.5 rounded-full text-xs text-text-secondary hover:text-primary hover:border-primary transition-colors">
                    {getCityName(c, l)}
                  </a>
                ))}
              </div>
            </div>

            {/* Districts */}
            {(() => {
              const districts = getDistrictsByCity(slug);
              if (districts.length === 0) return null;
              return (
                <div className="mt-10">
                  <h3 className="text-sm font-semibold text-text mb-3">
                    {l === "ru" ? "Районы:" : l === "en" ? "Districts:" : l === "uz-cyrl" ? "Туманлар:" : "Tumanlar:"}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {districts.map((d) => (
                      <a key={d.slug} href={`/${locale}/${slug}/${d.slug}`}
                        className="bg-surface-muted border border-border px-3 py-1.5 rounded-full text-xs text-text-secondary hover:text-primary hover:border-primary transition-colors">
                        {getDistrictName(d, l)}
                      </a>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Monthly link */}
            <div className="mt-8">
              <a href={`/${locale}/${slug}/oylik`} className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:underline">
                {l === "ru" ? "Месячный календарь" : l === "en" ? "Monthly calendar" : l === "uz-cyrl" ? "Ойлик тақвим" : "Oylik taqvim"} &rarr;
              </a>
            </div>
          </div>
        </section>
        <Download locale={l} />
      </main>
      <Footer locale={l} />
    </>
  );
}
