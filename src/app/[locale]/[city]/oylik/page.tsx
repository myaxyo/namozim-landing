import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CITIES, getCityBySlug, getCityName } from "@/data/cities";
import { Locale, t } from "@/data/translations";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MonthlyCalendar } from "@/components/MonthlyCalendar";

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
  const month = new Date().toLocaleDateString(
    l === "ru" ? "ru-RU" : l === "en" ? "en-US" : "uz-Latn-UZ",
    { month: "long", year: "numeric" }
  );

  const titles: Record<Locale, string> = {
    uz: `Oylik namoz vaqtlari ${name} | ${month}`,
    ru: `Месячный календарь намаза ${name} | ${month}`,
    en: `Monthly Prayer Times ${name} | ${month}`,
  };

  return {
    title: titles[l],
    description: titles[l],
    alternates: {
      canonical: `https://namozim.uz/${locale}/${slug}/oylik`,
    },
  };
}

export default async function MonthlyPage({ params }: Props) {
  const { locale, city: slug } = await params;
  const l = locale as Locale;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  return (
    <>
      <Header locale={l} />
      <main className="py-16 md:py-24">
        <MonthlyCalendar city={city} locale={l} />
      </main>
      <Footer locale={l} />
    </>
  );
}
