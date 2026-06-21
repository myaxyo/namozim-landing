import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CITIES, getCityBySlug, getCityName, getCityRegion } from "@/data/cities";
import { Locale, t } from "@/data/translations";
import { CityPrayerTimes } from "@/components/CityPrayerTimes";
import { Header } from "@/components/Header";
import { Download } from "@/components/Download";
import { Footer } from "@/components/Footer";

interface Props {
  params: Promise<{ locale: string; city: string }>;
}

export function generateStaticParams() {
  const locales = ["uz", "ru", "en"];
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

  const titles: Record<Locale, string> = {
    uz: `Namoz vaqtlari ${name} 2026 \u2014 Bomdod, Peshin, Asr, Shom, Xufton`,
    ru: `\u0412\u0440\u0435\u043C\u044F \u043D\u0430\u043C\u0430\u0437\u0430 ${name} 2026 \u2014 \u0424\u0430\u0434\u0436\u0440, \u0417\u0443\u0445\u0440, \u0410\u0441\u0440, \u041C\u0430\u0433\u0440\u0438\u0431, \u0418\u0448\u0430`,
    en: `Prayer Times ${name} 2026 \u2014 Fajr, Dhuhr, Asr, Maghrib, Isha`,
  };

  const descs: Record<Locale, string> = {
    uz: `${name} shahri uchun bugungi namoz vaqtlari. ${getCityRegion(city, l)}. Hanafiy mazhab.`,
    ru: `\u0422\u043E\u0447\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F \u043D\u0430\u043C\u0430\u0437\u0430 \u0432 ${name}. ${getCityRegion(city, l)}. \u0425\u0430\u043D\u0430\u0444\u0438\u0442\u0441\u043A\u0438\u0439 \u043C\u0430\u0437\u0445\u0430\u0431.`,
    en: `Today's prayer times for ${name}. ${getCityRegion(city, l)}. Hanafi school.`,
  };

  return {
    title: titles[l],
    description: descs[l],
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

  return (
    <>
      <Header locale={l} />
      <main>
        <CityPrayerTimes city={city} locale={l} />
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
          </div>
        </section>
        <Download locale={l} />
      </main>
      <Footer locale={l} />
    </>
  );
}
