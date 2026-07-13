import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  INTERNATIONAL_CITIES,
  getInternationalCityBySlug,
  getInternationalCityName,
  getInternationalCityCountry,
} from "@/data/internationalCities";
import { Locale, t } from "@/data/translations";
import { fetchPrayerTimesServer } from "@/lib/fetchPrayerTimes";
import { hreflangAlternates } from "@/lib/seo";
import { cityFaqItems } from "@/data/faq";
import { CityPrayerTimes } from "@/components/CityPrayerTimes";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { Download } from "@/components/Download";
import { Footer } from "@/components/Footer";

interface Props {
  params: Promise<{ locale: string; city: string }>;
}

export function generateStaticParams() {
  const locales = ["uz", "uz-cyrl", "ru", "en", "tg", "ky"];
  return locales.flatMap((locale) =>
    INTERNATIONAL_CITIES.map((c) => ({ locale, city: c.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, city: slug } = await params;
  const l = locale as Locale;
  const city = getInternationalCityBySlug(slug);
  if (!city) return {};
  const name = getInternationalCityName(city, l);
  const country = getInternationalCityCountry(city, l);

  const times = await fetchPrayerTimesServer(city.lat, city.lng);

  const titles: Record<Locale, string> = {
    uz: times
      ? `${name} namoz vaqtlari bugun ✓ Bomdod ${times.fajr} | Shom ${times.maghrib}`
      : `${name} namoz vaqtlari bugun 2026 — ${country}`,
    "uz-cyrl": times
      ? `${name} намоз вақтлари бугун ✓ Бомдод ${times.fajr} | Шом ${times.maghrib}`
      : `${name} намоз вақтлари бугун 2026 — ${country}`,
    ru: times
      ? `Намаз ${name} сегодня ✓ Фаджр ${times.fajr} | Магриб ${times.maghrib}`
      : `Время намаза ${name} сегодня 2026 — ${country}`,
    en: times
      ? `${name} Prayer Times Today ✓ Fajr ${times.fajr} | Maghrib ${times.maghrib}`
      : `${name} Prayer Times Today 2026 — ${country}`,
    tg: times
      ? `${name} вақти намоз имрӯз ✓ Бомдод ${times.fajr} | Шом ${times.maghrib}`
      : `${name} вақти намоз имрӯз 2026 — ${country}`,
    ky: times
      ? `${name} намаз убактысы бүгүн ✓ Багымдат ${times.fajr} | Шам ${times.maghrib}`
      : `${name} намаз убактысы бүгүн 2026 — ${country}`,
  };

  const timesStr = times
    ? `Bomdod: ${times.fajr} | Peshin: ${times.dhuhr} | Asr: ${times.asr} | Shom: ${times.maghrib} | Xufton: ${times.isha}`
    : "";

  const descs: Record<Locale, string> = {
    uz: `${name} (${country}) namoz vaqtlari bugun: ${timesStr}. Hanafiy mazhab, MWL usuli.`,
    "uz-cyrl": `${name} (${country}) намоз вақтлари бугун: ${timesStr}. Ҳанафий мазҳаб, MWL усули.`,
    ru: `Время намаза в городе ${name} (${country}) сегодня: ${timesStr}. Ханафитский мазхаб, метод MWL.`,
    en: `Prayer times in ${name}, ${country} today: ${timesStr}. Hanafi school, MWL method.`,
    tg: `Вақти намоз дар ${name} (${country}) имрӯз: ${timesStr}. Мазҳаби Ҳанафӣ, усули MWL.`,
    ky: `${name} (${country}) намаз убактысы бүгүн: ${timesStr}. Ханафий мазхаб, MWL ыкмасы.`,
  };

  return {
    title: titles[l],
    description: descs[l],
    openGraph: {
      title: titles[l],
      description: descs[l],
      url: `https://namozim.uz/${locale}/dunyo/${slug}`,
    },
    alternates: {
      canonical: `https://namozim.uz/${locale}/dunyo/${slug}`,
      languages: hreflangAlternates(`/dunyo/${slug}`),
    },
  };
}

export default async function InternationalCityPage({ params }: Props) {
  const { locale, city: slug } = await params;
  const l = locale as Locale;
  const city = getInternationalCityBySlug(slug);
  if (!city) notFound();

  const name = getInternationalCityName(city, l);
  const country = getInternationalCityCountry(city, l);
  const serverTimes = await fetchPrayerTimesServer(city.lat, city.lng);

  // Adapt InternationalCity to the City interface expected by CityPrayerTimes
  const cityAdapter = {
    slug: city.slug,
    name: city.name,
    nameCyrl: city.nameCyrl,
    nameRu: city.nameRu,
    nameEn: city.nameEn,
    lat: city.lat,
    lng: city.lng,
    region: city.country,
    regionRu: city.countryRu,
  };

  // Nearby international cities in the same country
  const siblings = INTERNATIONAL_CITIES.filter(
    (c) => c.country === city.country && c.slug !== slug
  );

  return (
    <>
      <Header locale={l} />
      <Breadcrumbs
        items={[
          { name: t(l, "home"), url: `/${locale}` },
          { name: t(l, "international_cities"), url: `/${locale}/dunyo` },
          { name, url: `/${locale}/dunyo/${slug}` },
        ]}
      />
      <main>
        <CityPrayerTimes city={cityAdapter} locale={l} />

        <section className="py-12">
          <div className="max-w-3xl mx-auto px-5">
            <article className="text-text-secondary space-y-3 text-sm leading-relaxed">
              <p>
                {l === "ru"
                  ? `Точное время намаза для города ${name}, ${country}. Расчёт производится по ханафитскому мазхабу методом Muslim World League (MWL) на основе географических координат.`
                  : l === "en"
                  ? `Accurate prayer times for ${name}, ${country}. Calculated using the Hanafi school and Muslim World League (MWL) method based on geographic coordinates.`
                  : l === "uz-cyrl"
                  ? `${name}, ${country} шаҳри учун аниқ намоз вақтлари. Ҳанафий мазҳаби ва Muslim World League (MWL) усули бўйича ҳисобланади.`
                  : `${name}, ${country} shahri uchun aniq namoz vaqtlari. Hanafiy mazhabi va Muslim World League (MWL) usuli bo'yicha hisoblanadi.`}
              </p>
              <p>
                {l === "ru"
                  ? `Если вы находитесь в ${name} — используйте Намозим для точных уведомлений о каждом намазе.`
                  : l === "en"
                  ? `If you're in ${name} — use Namozim for accurate notifications for every prayer.`
                  : l === "uz-cyrl"
                  ? `Агар сиз ${name}да бўлсангиз — ҳар бир намоз учун аниқ эслатмалар олиш учун Намозим ишлатинг.`
                  : `Agar siz ${name}da bo'lsangiz — har bir namoz uchun aniq eslatmalar olish uchun Namozim ishlating.`}
              </p>
            </article>

            {siblings.length > 0 && (
              <div className="mt-10">
                <h3 className="text-sm font-semibold text-text mb-3">
                  {l === "ru"
                    ? `Другие города (${country}):`
                    : l === "en"
                    ? `Other cities (${country}):`
                    : l === "uz-cyrl"
                    ? `Бошқа шаҳарлар (${country}):`
                    : `Boshqa shaharlar (${country}):`}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {siblings.map((c) => (
                    <a
                      key={c.slug}
                      href={`/${locale}/dunyo/${c.slug}`}
                      className="bg-surface-muted border border-border px-3 py-1.5 rounded-full text-xs text-text-secondary hover:text-primary hover:border-primary transition-colors"
                    >
                      {getInternationalCityName(c, l)}
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8">
              <a
                href={`/${locale}/dunyo`}
                className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:underline"
              >
                &larr; {t(l, "international_cities")}
              </a>
            </div>
          </div>
        </section>

        <Faq items={cityFaqItems(name, serverTimes, l)} heading={t(l, "faq_title")} />
        <Download locale={l} />
      </main>
      <Footer locale={l} />
    </>
  );
}
