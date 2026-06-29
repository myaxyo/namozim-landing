"use client";
import { useState, useEffect, useCallback } from "react";
import { City, getCityName } from "@/data/cities";
import { CITIES } from "@/data/cities";
import { PrayerInfo, getPrayerName, getPrayerDesc, PRAYERS } from "@/data/prayers";
import { Locale, t } from "@/data/translations";

export function PrayerPage({ city, prayer, locale }: { city: City; prayer: PrayerInfo; locale: Locale }) {
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(true);
  const cityName = getCityName(city, locale);
  const prayerName = getPrayerName(prayer, locale);
  const desc = getPrayerDesc(prayer, locale);
  const prayerKey = prayer.slug === "bomdod" ? "fajr" : prayer.slug === "peshin" ? "dhuhr" : prayer.slug === "xufton" ? "isha" : prayer.slug;

  useEffect(() => {
    const fetchTime = async () => {
      setLoading(true);
      try {
        const d = new Date();
        const ds = `${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`;
        const res = await fetch(`https://api.aladhan.com/v1/timings/${ds}?latitude=${city.lat}&longitude=${city.lng}&method=3&school=1`);
        const data = await res.json();
        if (data.data?.timings) {
          const key = prayerKey.charAt(0).toUpperCase() + prayerKey.slice(1);
          const raw = data.data.timings[key] || data.data.timings.Fajr;
          setTime(raw.replace(/ \(.*\)/, ""));
        }
      } catch {}
      setLoading(false);
    };
    fetchTime();
  }, [city, prayerKey]);

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-5">
        <div className="text-center mb-10">
          <span className="text-5xl mb-4 block">{prayer.icon}</span>
          <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-bold text-text mb-3">
            {prayerName} vaqti — {cityName}
          </h1>
          <p className="text-text-muted text-sm">{t(locale, "hero_method")}</p>
        </div>

        {/* Big time display */}
        <div className="bg-gradient-to-r from-hero-from to-hero-to rounded-2xl p-10 text-center mb-8">
          {loading ? (
            <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto" />
          ) : (
            <>
              <p className="text-white/70 text-sm uppercase tracking-wider mb-2">
                {locale === "ru" ? "Сегодня" : locale === "en" ? "Today" : "Bugun"}
              </p>
              <p className="text-white font-[family-name:var(--font-display)] text-6xl md:text-7xl font-bold tabular-nums">
                {time}
              </p>
            </>
          )}
        </div>

        {/* Description */}
        <div className="bg-surface border border-border rounded-2xl p-6 mb-8">
          <p className="text-text-secondary text-sm leading-relaxed">{desc}</p>
        </div>

        {/* Other prayers for this city */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-text mb-3">
            {locale === "ru" ? "Все намазы" : locale === "en" ? "All prayers" : "Barcha namozlar"} — {cityName}:
          </h2>
          <div className="flex flex-wrap gap-2">
            {PRAYERS.filter((p) => p.slug !== prayer.slug).map((p) => (
              <a key={p.slug} href={`/${locale}/${city.slug}/${p.slug}`}
                className="bg-surface-muted border border-border px-4 py-2 rounded-full text-sm text-text-secondary hover:text-primary hover:border-primary transition-colors flex items-center gap-2">
                <span>{p.icon}</span>
                {getPrayerName(p, locale)}
              </a>
            ))}
          </div>
        </div>

        {/* Same prayer in other cities */}
        <div>
          <h2 className="text-sm font-semibold text-text mb-3">
            {prayerName} {locale === "ru" ? "в других городах:" : locale === "en" ? "in other cities:" : "boshqa shaharlarda:"}
          </h2>
          <div className="flex flex-wrap gap-2">
            {CITIES.filter((c) => c.slug !== city.slug).slice(0, 12).map((c) => (
              <a key={c.slug} href={`/${locale}/${c.slug}/${prayer.slug}`}
                className="bg-surface-muted border border-border px-3 py-1.5 rounded-full text-xs text-text-secondary hover:text-primary hover:border-primary transition-colors">
                {getCityName(c, locale)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
