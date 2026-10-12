import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CITIES, getCityBySlug, getCityName } from "@/data/cities";
import { Locale, t } from "@/data/translations";
import { hreflangAlternates } from "@/lib/seo";
import { monthlyCopy } from "@/lib/seoCopy";
import { getMonthPrayerTimes } from "@/lib/prayerTimes";
import { placeForCity } from "@/lib/places";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MonthlyCalendar } from "@/components/MonthlyCalendar";

interface Props {
  params: Promise<{ locale: string; city: string }>;
}

// Re-render daily so the month in the title/description never goes stale
// (previously frozen at the build date).
export const revalidate = 86400;

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
  const { title, description } = monthlyCopy(l, name);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://namozim.uz/${locale}/${slug}/oylik`,
    },
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
  const place = placeForCity(city);

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
        <MonthlyCalendar city={city} locale={l} place={place} initial={getMonthPrayerTimes(place)} />
      </main>
      <Footer locale={l} />
    </>
  );
}
