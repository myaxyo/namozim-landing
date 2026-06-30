import { CITIES, getCityName } from "@/data/cities";
import { Locale, t } from "@/data/translations";

export function Cities({ locale }: { locale: Locale }) {
  return (
    <section id="cities" className="py-16 md:py-20 bg-bg-warm pattern-bg">
      <div className="max-w-5xl mx-auto px-5">
        <div className="text-center mb-10">
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-text mb-2">{t(locale, "cities_title")}</h2>
          <p className="text-text-secondary text-sm">{t(locale, "cities_subtitle")}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {CITIES.slice(0, 20).map((c) => (
            <a key={c.slug} href={`/${locale}/${c.slug}`}
              className="bg-surface border border-border px-3 py-1.5 rounded-full text-xs text-text-secondary hover:border-primary hover:text-primary hover:bg-primary-soft transition-colors">
              {getCityName(c, locale)}
            </a>
          ))}
        </div>
        <div className="text-center mt-6">
          <a href={`/${locale}/shaharlar`} className="inline-flex items-center gap-1.5 text-primary text-sm font-medium hover:underline">
            {locale === "ru" ? "Все города" : locale === "en" ? "All cities" : locale === "uz-cyrl" ? "Барча шаҳарлар" : "Barcha shaharlar"} &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
