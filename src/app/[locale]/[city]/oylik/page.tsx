import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CITIES, getCityBySlug, getCityName } from "@/data/cities";
import { Locale, t } from "@/data/translations";
import { hreflangAlternates } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MonthlyCalendar } from "@/components/MonthlyCalendar";

interface Props {
  params: Promise<{ locale: string; city: string }>;
}

export function generateStaticParams() {
  const locales = ["uz", "uz-cyrl", "ru", "en", "tg", "ky"];
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
  const month = new Date().toLocaleDateString(
    l === "ru" ? "ru-RU" : l === "en" ? "en-US" : "uz-Latn-UZ",
    { month: "long", year: "numeric" }
  );

  const titles: Record<Locale, string> = {
    uz: `Oylik namoz vaqtlari ${name} | ${month}`,
    "uz-cyrl": `Ойлик намоз вақтлари ${name} | ${month}`,
    ru: `Месячный календарь намаза ${name} | ${month}`,
    en: `Monthly Prayer Times ${name} | ${month}`,
    tg: `Тақвими моҳонаи намоз ${name} | ${month}`,
    ky: `Айлык намаз убактысы ${name} | ${month}`,
  };

  const descs: Record<Locale, string> = {
    uz: `${name} uchun ${month} oyi namoz vaqtlari taqvimi: har kuni Bomdod, Peshin, Asr, Shom va Xufton vaqtlari. Hanafiy mazhab, Muslim World League usuli.`,
    "uz-cyrl": `${name} учун ${month} ойи намоз вақтлари тақвими: ҳар куни Бомдод, Пешин, Аср, Шом ва Хуфтон вақтлари. Ҳанафий мазҳаб.`,
    ru: `Календарь времени намаза ${name} на ${month}: ежедневное время Фаджр, Зухр, Аср, Магриб и Иша. Ханафитский мазхаб.`,
    en: `${name} prayer times calendar for ${month}: daily Fajr, Dhuhr, Asr, Maghrib and Isha times. Hanafi school, Muslim World League method.`,
    tg: `Тақвими вақти намоз ${name} барои ${month}: ҳаррӯза Бомдод, Пешин, Аср, Шом ва Хуфтон. Мазҳаби Ҳанафӣ.`,
    ky: `${name} намаз убактысы ${month} календары: күн сайын Багымдат, Бешим, Аср, Шам жана Куптан. Ханафий мазхаб.`,
  };

  return {
    title: titles[l],
    description: descs[l],
    alternates: {
      canonical: `https://namozim.uz/${locale}/${slug}/oylik`,
      languages: hreflangAlternates(`/${slug}/oylik`),
    },
  };
}

export default async function MonthlyPage({ params }: Props) {
  const { locale, city: slug } = await params;
  const l = locale as Locale;
  const city = getCityBySlug(slug);
  if (!city) notFound();
  const name = getCityName(city, l);

  return (
    <>
      <Header locale={l} />
      <Breadcrumbs
        items={[
          { name: t(l, "home"), url: `/${locale}` },
          { name: t(l, "nav_cities"), url: `/${locale}/shaharlar` },
          { name, url: `/${locale}/${slug}` },
          { name: t(l, "monthly"), url: `/${locale}/${slug}/oylik` },
        ]}
      />
      <main className="py-16 md:py-24">
        <MonthlyCalendar city={city} locale={l} />
      </main>
      <Footer locale={l} />
    </>
  );
}
