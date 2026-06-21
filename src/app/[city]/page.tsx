import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CITIES, getCityBySlug } from "@/data/cities";
import { CityPrayerTimes } from "@/components/CityPrayerTimes";
import { Header } from "@/components/Header";
import { Download } from "@/components/Download";
import { Footer } from "@/components/Footer";

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return CITIES.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};

  const title = `Namoz vaqtlari ${city.name} 2026 — Bomdod, Peshin, Asr, Shom, Xufton`;
  const description = `${city.name} shahri uchun bugungi namoz vaqtlari. ${city.region}. Hanafiy mazhab, Muslim World League usuli. Bomdod, Peshin, Asr, Shom va Xufton vaqtlari.`;

  return {
    title,
    description,
    keywords: [
      `namoz vaqtlari ${city.name.toLowerCase()}`,
      `${city.name.toLowerCase()} namoz vaqti`,
      `bomdod vaqti ${city.name.toLowerCase()}`,
      `peshin vaqti ${city.name.toLowerCase()}`,
      "namoz vaqtlari",
      "prayer times",
      city.name,
      city.nameCyrillic,
    ],
    openGraph: {
      title,
      description,
      url: `https://namozim.uz/${city.slug}`,
    },
    alternates: {
      canonical: `https://namozim.uz/${city.slug}`,
    },
  };
}

export default async function CityPage({ params }: Props) {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  return (
    <>
      <Header />
      <main>
        <CityPrayerTimes city={city} />
        <section className="py-12">
          <div className="max-w-3xl mx-auto px-5">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-text mb-4">
              {city.name} haqida namoz vaqtlari
            </h2>
            <div className="prose prose-sm text-text-secondary space-y-3 text-sm leading-relaxed">
              <p>
                {city.name} ({city.nameCyrillic}) — {city.region} markazida joylashgan shahar.
                Namoz vaqtlari Hanafiy mazhabiga mos ravishda Muslim World League (MWL) usuli
                bo&apos;yicha hisoblanadi.
              </p>
              <p>
                Bomdod (Fajr), Peshin (Dhuhr), Asr, Shom (Maghrib) va Xufton (Isha) namozlari
                {city.name} shahrining geografik koordinatalari (kengligi: {city.lat.toFixed(2)}°,
                uzunligi: {city.lng.toFixed(2)}°) asosida aniq hisoblanadi.
              </p>
              <p>
                Eslatmalar va tasbih hisoblagich uchun Namozim ilovasini Google Play yoki App Store
                dan bepul yuklab olishingiz mumkin.
              </p>
            </div>

            {/* Internal links to other cities */}
            <div className="mt-10">
              <h3 className="text-sm font-semibold text-text mb-3">Boshqa shaharlar:</h3>
              <div className="flex flex-wrap gap-2">
                {CITIES.filter((c) => c.slug !== slug).slice(0, 12).map((c) => (
                  <a
                    key={c.slug}
                    href={`/${c.slug}`}
                    className="bg-surface-muted border border-border px-3 py-1.5 rounded-full text-xs text-text-secondary hover:text-primary hover:border-primary transition-colors"
                  >
                    {c.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
        <Download />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `Namoz vaqtlari ${city.name}`,
            description: `${city.name} shahri uchun bugungi namoz vaqtlari`,
            url: `https://namozim.uz/${city.slug}`,
            inLanguage: "uz",
            isPartOf: { "@type": "WebSite", url: "https://namozim.uz" },
            about: {
              "@type": "City",
              name: city.name,
              containedInPlace: { "@type": "Country", name: "O'zbekiston" },
            },
          }),
        }}
      />
    </>
  );
}
