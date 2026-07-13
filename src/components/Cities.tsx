import { CITIES, getCityName } from "@/data/cities";
import { Locale, t } from "@/data/translations";

/** Map locale to the "home" country that should appear first */
const LOCALE_COUNTRY: Record<Locale, "uz" | "tj" | "kg"> = {
  uz: "uz",
  "uz-cyrl": "uz",
  ru: "uz",
  en: "uz",
  tg: "tj",
  ky: "kg",
};

export function Cities({ locale }: { locale: Locale }) {
  const homeCountry = LOCALE_COUNTRY[locale];

  // Primary: cities from the locale's home country (show more)
  const primaryCities = CITIES.filter((c) => (c.country || "uz") === homeCountry).slice(0, 14);
  // Secondary: a few cities from the other two countries
  const otherCountries = (["uz", "tj", "kg"] as const).filter((cc) => cc !== homeCountry);
  const secondaryCities = otherCountries.flatMap((cc) =>
    CITIES.filter((c) => (c.country || "uz") === cc).slice(0, 3)
  );

  return (
    <section id="cities" className="py-16 md:py-20 bg-bg-warm pattern-bg">
      <div className="max-w-5xl mx-auto px-5">
        <div className="text-center mb-10">
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-text mb-2">{t(locale, "cities_title")}</h2>
          <p className="text-text-secondary text-sm">{t(locale, "cities_subtitle")}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {primaryCities.map((c) => (
            <a key={c.slug} href={`/${locale}/${c.slug}`}
              className="bg-surface border border-border px-3 py-1.5 rounded-full text-xs text-text-secondary hover:border-primary hover:text-primary hover:bg-primary-soft transition-colors">
              {getCityName(c, locale)}
            </a>
          ))}
        </div>
        {secondaryCities.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mt-3 pt-3 border-t border-border-light">
            {secondaryCities.map((c) => (
              <a key={c.slug} href={`/${locale}/${c.slug}`}
                className="bg-surface border border-border px-3 py-1.5 rounded-full text-xs text-text-muted hover:border-primary hover:text-primary hover:bg-primary-soft transition-colors">
                {getCityName(c, locale)}
              </a>
            ))}
          </div>
        )}
        <div className="text-center mt-6">
          <a href={`/${locale}/shaharlar`} className="inline-flex items-center gap-1.5 text-primary text-sm font-medium hover:underline">
            {locale === "ru" ? "Все города" : locale === "en" ? "All cities" : locale === "tg" ? "Ҳамаи шаҳрҳо" : locale === "ky" ? "Бардык шаарлар" : locale === "uz-cyrl" ? "Барча шаҳарлар" : "Barcha shaharlar"} &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
