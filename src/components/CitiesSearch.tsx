"use client";
import { useState, useMemo } from "react";
import { CITIES, getCityName, getCityRegion } from "@/data/cities";
import { Locale, t } from "@/data/translations";

const SEARCH_PLACEHOLDER: Record<Locale, string> = {
  uz: "Shahar nomini yozing...",
  "uz-cyrl": "Шаҳар номини ёзинг...",
  ru: "Введите название города...",
  en: "Search city...",
};

export function CitiesSearch({ locale }: { locale: Locale }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CITIES;
    return CITIES.filter((c) =>
      c.name.toLowerCase().includes(q) ||
      c.nameRu.toLowerCase().includes(q) ||
      c.nameEn.toLowerCase().includes(q) ||
      c.region.toLowerCase().includes(q) ||
      c.regionRu.toLowerCase().includes(q)
    );
  }, [query]);

  // Group by region
  const grouped = useMemo(() => {
    const map = new Map<string, typeof CITIES>();
    for (const city of filtered) {
      const region = getCityRegion(city, locale);
      if (!map.has(region)) map.set(region, []);
      map.get(region)!.push(city);
    }
    return Array.from(map.entries());
  }, [filtered, locale]);

  return (
    <div>
      {/* Search input */}
      <div className="relative mb-8">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={SEARCH_PLACEHOLDER[locale]}
          className="w-full pl-11 pr-4 py-3.5 bg-surface border border-border rounded-xl text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
        />
        {query && (
          <button onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        )}
      </div>

      {/* Results count */}
      <p className="text-text-muted text-xs mb-6">
        {filtered.length} {locale === "ru" ? "городов" : locale === "en" ? "cities" : locale === "uz-cyrl" ? "шаҳар" : "shahar"}
      </p>

      {/* Grouped city list */}
      {grouped.length === 0 ? (
        <div className="text-center py-12 text-text-muted">
          {locale === "ru" ? "Ничего не найдено" : locale === "en" ? "No results found" : locale === "uz-cyrl" ? "Ҳеч нарса топилмади" : "Hech narsa topilmadi"}
        </div>
      ) : (
        <div className="space-y-8">
          {grouped.map(([region, cities]) => (
            <div key={region}>
              <h2 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3 px-1">{region}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {cities.map((city) => (
                  <a
                    key={city.slug}
                    href={`/${locale}/${city.slug}`}
                    className="flex items-center gap-3 bg-surface border border-border rounded-xl px-4 py-3 hover:border-primary hover:shadow-sm transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary-soft flex items-center justify-center flex-shrink-0">
                      <span className="text-primary text-xs font-bold">{getCityName(city, locale)[0]}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-text group-hover:text-primary transition-colors truncate">
                        {getCityName(city, locale)}
                      </p>
                    </div>
                    <svg className="ml-auto text-text-muted group-hover:text-primary transition-colors flex-shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="m9 18 6-6-6-6"/>
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
