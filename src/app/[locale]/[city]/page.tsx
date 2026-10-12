import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CITIES, getCityBySlug, getCityName, getCityRegion } from "@/data/cities";
import { getDistrictsByCity, getDistrictName } from "@/data/districts";
import { Locale, t } from "@/data/translations";
import { getPrayerTimes } from "@/lib/prayerTimes";
import { placeForCity } from "@/lib/places";
import { hreflangAlternates } from "@/lib/seo";
import { cityCopy } from "@/lib/seoCopy";
import { cityFaqItems } from "@/data/faq";
import { CityPrayerTimes } from "@/components/CityPrayerTimes";
import { PrayerTimesImage } from "@/components/PrayerTimesImage";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { Download } from "@/components/Download";
import { Footer } from "@/components/Footer";

interface Props {
  params: Promise<{ locale: string; city: string }>;
}

// Hourly ISR keeps server-rendered times and the month in the title current.
export const revalidate = 3600;

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

  // No live times in the snippet on purpose: showing them answered the query in
  // the SERP (zero-click) and Google often displayed stale cached times.
  const { title, description } = cityCopy(l, name);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://namozim.uz/${locale}/${slug}`,
      images: [`https://namozim.uz/${locale}/${slug}/opengraph-image`],
    },
    alternates: {
      canonical: `https://namozim.uz/${locale}/${slug}`,
      languages: hreflangAlternates(`/${slug}`),
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
  const place = placeForCity(city);
  const serverTimes = getPrayerTimes(place);
  const officialUz = place.method === "uzbekistan";

  return (
    <>
      <Header locale={l} />
      <Breadcrumbs
        items={[
          { name: t(l, "home"), url: `/${locale}` },
          { name: t(l, "nav_cities"), url: `/${locale}/shaharlar` },
          { name, url: `/${locale}/${slug}` },
        ]}
      />
      <main>
        <CityPrayerTimes city={city} locale={l} place={place} initialTimes={serverTimes} />

        {/* Static visual card for Google Images indexing */}
        <PrayerTimesImage locale={l} city={name} times={serverTimes} officialUz={officialUz} />

        <section className="py-12">
          <div className="max-w-3xl mx-auto px-5">
            <article className="text-text-secondary space-y-3 text-sm leading-relaxed">
              <p>{name} ({region}) {t(l, officialUz ? "city_about_p1_uz" : "city_about_p1")}</p>
              <p>{t(l, "city_about_p2")}</p>
              <p>{t(l, "city_about_p3")}</p>
              {(city.country === "tj") && (
                <p>{l === "tg" ? `${name} — яке аз шаҳрҳои Тоҷикистон аст. Вақти намоз дар ин ҷо мувофиқи мазҳаби Ҳанафӣ ва координатаҳои дақиқи ҷуғрофӣ ҳисоб карда мешавад. Барои огоҳномаи намоз барномаи Намозимро насб кунед.` : l === "ru" ? `${name} — город в Таджикистане. Время намаза рассчитывается по ханафитскому мазхабу на основе точных географических координат. Установите приложение Намозим для уведомлений.` : `${name} — Tojikistondagi shahar. Namoz vaqtlari Hanafiy mazhab va aniq geografik koordinatalar asosida hisoblanadi.`}</p>
              )}
              {(city.country === "kg") && (
                <p>{l === "ky" ? `${name} — Кыргызстандагы шаар. Намаз убактысы Ханафий мазхабы боюнча так географиялык координаттардын негизинде эсептелет. Эскертмелер үчүн Намозим тиркемесин орнотуңуз.` : l === "ru" ? `${name} — город в Кыргызстане. Время намаза рассчитывается по ханафитскому мазхабу на основе точных географических координат. Установите приложение Намозим для уведомлений.` : `${name} — Qirg'izistondagi shahar. Namoz vaqtlari Hanafiy mazhab va aniq geografik koordinatalar asosida hisoblanadi.`}</p>
              )}
            </article>
            <div className="mt-10">
              <h3 className="text-sm font-semibold text-text mb-3">{t(l, "other_cities")}</h3>
              <div className="flex flex-wrap gap-2">
                {CITIES.filter((c) => c.slug !== slug && (c.country || "uz") === (city.country || "uz")).slice(0, 12).map((c) => (
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
        <Faq items={cityFaqItems(name, serverTimes, l, officialUz)} heading={t(l, "faq_title")} />
        <Download locale={l} />
      </main>
      <Footer locale={l} />
    </>
  );
}
